import { getLiveCollection } from "astro:content";

export const getProcessedEvents = async () => {
  const rsvpsResult = await getLiveCollection("rsvps").catch(() => null);
  const now = new Date().getTime();

  if (!rsvpsResult) {
    return [];
  }

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

  const resolvedRsvps = await Promise.all(
    rawRsvps.map(async (rsvp: any) => {
      const eventRef =
        rsvp.data?.event || rsvp.data?.subject || rsvp.event || rsvp.subject;
      const uri = typeof eventRef === "string" ? eventRef : eventRef?.uri;

      if (!uri || typeof uri !== "string") return null;

      const match = uri.match(/^at:\/\/([^/]+)\/([^/]+)\/(.+)$/);
      if (!match) return null;

      const repo = match[1];
      const collection = match[2];
      const rkey = match[3];

      try {
        const getUrl = new URL(
          "/xrpc/com.atproto.repo.getRecord",
          "https://slingshot.microcosm.blue"
        );
        getUrl.searchParams.set("repo", repo);
        getUrl.searchParams.set("collection", collection);
        getUrl.searchParams.set("rkey", rkey);

        const res = await fetch(getUrl);
        if (res.ok) {
          const targetData = await res.json();
          return {
            id: uri,
            data: targetData.value,
          };
        } else {
          const bskyUrl = new URL(
            "/xrpc/com.atproto.repo.getRecord",
            "https://public.api.bsky.app"
          );
          bskyUrl.searchParams.set("repo", repo);
          bskyUrl.searchParams.set("collection", collection);
          bskyUrl.searchParams.set("rkey", rkey);

          const bskyRes = await fetch(bskyUrl);
          if (bskyRes.ok) {
            const bskyData = await bskyRes.json();
            return {
              id: uri,
              data: bskyData.value,
            };
          }
        }
      } catch (e) {}
      return null;
    })
  );

  const eventMap = new Map();
  resolvedRsvps.forEach((event: any) => {
    if (event && event.id && event.data && event.data.name) {
      eventMap.set(event.id, event);
    }
  });

  const allEvents = Array.from(eventMap.values());

  const processed = await Promise.all(
    allEvents.map(async (event: any) => {
      const eventData = event.data || event;

      const startDate = eventData?.startsAt
        ? new Date(eventData.startsAt)
        : eventData?.createdAt
          ? new Date(eventData.createdAt)
          : new Date();

      const endDate = eventData?.endsAt
        ? new Date(eventData.endsAt)
        : startDate;
      const isPast = endDate.getTime() < now;

      const match = event.id
        ? event.id.match(/^at:\/\/[^/]+\/[^/]+\/(.+)$/)
        : null;
      const rkey = match ? match[1] : "";
      const didMatch = event.id ? event.id.match(/^at:\/\/([^/]+)\//) : null;
      const did = didMatch ? didMatch[1] : "";

      const atmoUrl =
        rkey && did
          ? `https://atmo.rsvp/p/${did}/e/${rkey}`
          : "https://atmo.rsvp/";

      let locationText = "";
      if (
        Array.isArray(eventData?.locations) &&
        eventData.locations.length > 0
      ) {
        const loc = eventData.locations[0];
        locationText = loc.name || loc.street || loc.city || loc.address || "";
      }

      let attendees: string[] = [];
      let totalAttendees = 0;

      if (did) {
        try {
          const hostRes = await fetch(
            `https://public.api.bsky.app/xrpc/app.bsky.actor.getProfile?actor=${did}`
          );
          if (hostRes.ok) {
            const hostData = await hostRes.json();
            if (hostData.avatar) attendees.push(hostData.avatar);
            totalAttendees = 1;
          }
        } catch (e) {}
      }

      let imageUrl = null;

      if (Array.isArray(eventData.media)) {
        const thumbnail = eventData.media.find(
          (m: any) => m.role === "thumbnail" || m.content?.$type === "blob"
        );
        if (thumbnail && thumbnail.content?.ref?.$link) {
          const cid = thumbnail.content.ref.$link;
          if (did && cid) {
            imageUrl = `https://cdn.bsky.app/img/feed_thumbnail/plain/${did}/${cid}@jpeg`;
          }
        }
      }

      if (!imageUrl) {
        const coverBlob = eventData?.cover || eventData?.image;
        if (coverBlob && did) {
          let cid = null;
          if (coverBlob.ref) {
            if (typeof coverBlob.ref === "string") {
              cid = coverBlob.ref;
            } else if (coverBlob.ref.$link) {
              cid = coverBlob.ref.$link;
            } else if (typeof coverBlob.ref.toString === "function") {
              const str = coverBlob.ref.toString();
              if (str !== "[object Object]") {
                cid = str;
              }
            }
          } else if (coverBlob.cid) {
            cid = coverBlob.cid;
          }

          if (cid) {
            imageUrl = `https://cdn.bsky.app/img/feed_thumbnail/plain/${did}/${cid}@jpeg`;
          }
        }
      }

      return {
        ...event,
        data: eventData || {},
        startDate,
        endDate,
        isPast,
        atmoUrl,
        locationText,
        attendees,
        totalAttendees,
        imageUrl,
      };
    })
  );

  const sorted = processed.sort(
    (a: any, b: any) => b.startDate.getTime() - a.startDate.getTime()
  );

  return sorted;
};
