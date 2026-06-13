import { getLiveCollection } from "astro:content";

const slingshotEndpoint = "https://slingshot.microcosm.blue";
const bskyPublicApi = "https://public.api.bsky.app";
const constellationEndpoint = "https://constellation.microcosm.blue";

const defaultFetchOptions = {
  headers: {
    "User-Agent": "trueberryless.org (bsky: @trueberryless.org)",
  },
};

async function fetchRecord(uri: string): Promise<any | null> {
  const match = uri.match(/^at:\/\/([^/]+)\/([^/]+)\/(.+)$/);
  if (!match) return null;
  const [, repo, collection, rkey] = match;

  for (const base of [slingshotEndpoint, bskyPublicApi]) {
    try {
      const url = new URL("/xrpc/com.atproto.repo.getRecord", base);
      url.searchParams.set("repo", repo);
      url.searchParams.set("collection", collection);
      url.searchParams.set("rkey", rkey);
      const res = await fetch(url, defaultFetchOptions);
      if (res.ok) {
        const data = await res.json();
        return data.value ?? null;
      }
    } catch {}
  }
  return null;
}

async function fetchProfile(did: string): Promise<any | null> {
  try {
    const res = await fetch(
      `${bskyPublicApi}/xrpc/app.bsky.actor.getProfile?actor=${did}`,
      defaultFetchOptions
    );
    if (res.ok) return await res.json();
  } catch {}
  return null;
}

async function fetchBacklinks(subjectUri: string): Promise<string[]> {
  try {
    const url = new URL(
      "/xrpc/blue.microcosm.links.getBacklinks",
      constellationEndpoint
    );
    url.searchParams.set("subject", subjectUri);
    url.searchParams.set(
      "source",
      "community.lexicon.calendar.rsvp:subject.uri"
    );

    const res = await fetch(url.toString(), defaultFetchOptions);

    if (res.ok) {
      const data = await res.json();

      const list =
        data.links || data.records || data.items || data.backlinks || [];
      return list
        .map((item: any) => {
          if (typeof item === "string") return item;
          if (item?.uri) return item.uri;
          if (item?.did && item?.collection && item?.rkey) {
            return `at://${item.did}/${item.collection}/${item.rkey}`;
          }
          return item?.source;
        })
        .filter(
          (uri: any) => typeof uri === "string" && uri.startsWith("at://")
        );
    }
  } catch {}
  return [];
}

export const getProcessedEvents = async () => {
  const rsvpsResult = await getLiveCollection("rsvps").catch(() => null);
  const now = new Date().getTime();

  if (!rsvpsResult) return [];

  let rawRsvps: any[] = [];
  if ("data" in rsvpsResult && rsvpsResult.data) {
    rawRsvps = Array.isArray(rsvpsResult.data)
      ? rsvpsResult.data
      : Object.values(rsvpsResult.data);
  } else if (
    "entries" in rsvpsResult &&
    Array.isArray((rsvpsResult as any).entries)
  ) {
    rawRsvps = (rsvpsResult as any).entries;
  } else if (!("error" in rsvpsResult)) {
    rawRsvps = Array.isArray(rsvpsResult)
      ? rsvpsResult
      : Object.values(rsvpsResult);
  }

  const uniqueUris = [
    ...new Set(
      rawRsvps
        .map((rsvp: any) => {
          const ref =
            rsvp.data?.event ||
            rsvp.data?.subject ||
            rsvp.event ||
            rsvp.subject;
          return typeof ref === "string" ? ref : ref?.uri;
        })
        .filter(
          (uri: any) => typeof uri === "string" && uri.startsWith("at://")
        )
    ),
  ] as string[];

  const [recordResults, backlinksResults] = await Promise.all([
    Promise.all(uniqueUris.map((uri) => fetchRecord(uri))),
    Promise.all(uniqueUris.map((uri) => fetchBacklinks(uri))),
  ]);

  const allDids = new Set<string>();

  uniqueUris.forEach((uri) => {
    const match = uri.match(/^at:\/\/([^/]+)\//);
    if (match) allDids.add(match[1]);
  });

  backlinksResults.forEach((links) => {
    links.forEach((linkUri) => {
      const match = linkUri.match(/^at:\/\/([^/]+)\//);
      if (match) allDids.add(match[1]);
    });
  });

  const uniqueDids = [...allDids] as string[];

  const profileResults = await Promise.all(
    uniqueDids.map((did) => fetchProfile(did))
  );

  const profileMap = new Map<string, any>();
  uniqueDids.forEach((did, i) => {
    if (profileResults[i]) profileMap.set(did, profileResults[i]);
  });

  const processed = uniqueUris
    .map((uri, i) => {
      const value = recordResults[i];
      if (!value || !value.name) return null;

      const rkeyMatch = uri.match(/^at:\/\/[^/]+\/[^/]+\/(.+)$/);
      const rkey = rkeyMatch?.[1] ?? "";
      const didMatch = uri.match(/^at:\/\/([^/]+)\//);
      const did = didMatch?.[1] ?? "";

      const startDate = value.startsAt
        ? new Date(value.startsAt)
        : value.createdAt
          ? new Date(value.createdAt)
          : new Date();
      const endDate = value.endsAt ? new Date(value.endsAt) : startDate;

      const atmoUrl =
        rkey && did
          ? `https://atmo.rsvp/p/${did}/e/${rkey}`
          : "https://atmo.rsvp/";

      let locationText = "";
      if (Array.isArray(value.locations) && value.locations.length > 0) {
        const loc = value.locations[0];
        locationText = loc.name || loc.street || loc.city || loc.address || "";
      }

      const backlinks = backlinksResults[i];

      const attendeeDids = [
        ...new Set(
          backlinks
            .map((l) => l.match(/^at:\/\/([^/]+)\//)?.[1])
            .filter(Boolean)
        ),
      ] as string[];

      const attendeesAvatars = attendeeDids
        .map((attendeeDid) => profileMap.get(attendeeDid)?.avatar)
        .filter((avatar): avatar is string => Boolean(avatar));

      const attendees = attendeesAvatars.slice(0, 5);
      const totalAttendees = attendeeDids.length;

      let imageUrl: string | null = null;
      if (Array.isArray(value.media)) {
        const thumbnail = value.media.find(
          (m: any) => m.role === "thumbnail" || m.content?.$type === "blob"
        );
        if (thumbnail?.content?.ref?.$link && did) {
          imageUrl = `https://cdn.bsky.app/img/feed_thumbnail/plain/${did}/${thumbnail.content.ref.$link}@jpeg`;
        }
      }
      if (!imageUrl) {
        const coverBlob = value.cover || value.image;
        if (coverBlob && did) {
          let cid: string | null = null;
          if (typeof coverBlob.ref === "string") cid = coverBlob.ref;
          else if (coverBlob.ref?.$link) cid = coverBlob.ref.$link;
          else if (coverBlob.ref) {
            const str = coverBlob.ref.toString();
            if (str !== "[object Object]") cid = str;
          } else if (coverBlob.cid) cid = coverBlob.cid;
          if (cid)
            imageUrl = `https://cdn.bsky.app/img/feed_thumbnail/plain/${did}/${cid}@jpeg`;
        }
      }

      return {
        id: uri,
        data: value,
        startDate,
        endDate,
        isPast: endDate.getTime() < now,
        atmoUrl,
        locationText,
        attendees,
        totalAttendees,
        imageUrl,
      };
    })
    .filter((e): e is NonNullable<typeof e> => e !== null);

  return processed.sort(
    (a, b) => b.startDate.getTime() - a.startDate.getTime()
  );
};

export const getTopPosts = async (
  handle: string,
  limit: number = 3,
  lookback: number = 50
) => {
  try {
    const res = await fetch(
      `${bskyPublicApi}/xrpc/app.bsky.feed.getAuthorFeed?actor=${handle}&limit=${lookback}`,
      defaultFetchOptions
    );
    if (!res.ok) return [];
    const data = await res.json();
    return data.feed
      .filter((item: any) => item.post.author.handle === handle)
      .sort(
        (a: any, b: any) => (b.post.likeCount || 0) - (a.post.likeCount || 0)
      )
      .slice(0, limit);
  } catch {
    return [];
  }
};
