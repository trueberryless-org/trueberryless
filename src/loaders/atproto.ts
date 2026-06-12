import type { LiveLoader } from "astro/loaders";

interface AtprotoConfig<M> {
  pdsEndpoint: string;
  slingshotEndpoint: string;
  actorDid: string;
  collection: string;
  maxItems?: number;
  mappers?: M;
}

interface EntryFilter {
  id?: string;
  [key: string]: any;
}

const transformData = (
  data: any,
  mappers: Record<string, Record<string, string>> = {}
) => {
  const transformed = { ...data };
  for (const [key, map] of Object.entries(mappers)) {
    if (data[key] && map[data[key]]) {
      transformed[key] = map[data[key]];
    }
  }
  return transformed;
};

export function atprotoLoader<
  T extends Record<string, any> = Record<string, any>,
  M = {},
>(config: AtprotoConfig<M>): LiveLoader<T, EntryFilter> {
  return {
    name: config.collection.replace(/\./g, "-"),
    loadCollection: async () => {
      let cursor: string | undefined;
      const allRecords: any[] = [];
      const batchSize = config.maxItems ? Math.min(config.maxItems, 100) : 100;

      do {
        const url = new URL(
          "/xrpc/com.atproto.repo.listRecords",
          config.pdsEndpoint
        );
        url.searchParams.set("repo", config.actorDid);
        url.searchParams.set("collection", config.collection);
        url.searchParams.set("limit", String(batchSize));
        if (cursor) url.searchParams.set("cursor", cursor);

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 30000);

        const response = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId);
        if (!response.ok)
          throw new Error(`List failed: ${response.statusText}`);

        const data = await response.json();
        if (!Array.isArray(data.records))
          throw new Error(`Invalid response: expected records array`);

        allRecords.push(...data.records);
        cursor = data.cursor;

        if (config.maxItems && allRecords.length >= config.maxItems) {
          allRecords.splice(config.maxItems);
          break;
        }
      } while (cursor);

      return {
        entries: allRecords.map((record: any) => ({
          id: record.uri,
          data: transformData(record.value, config.mappers as any) as T,
        })),
      };
    },
    loadEntry: async (context) => {
      const id = context.filter?.id;
      if (!id) throw new Error("Record URI string is required");

      const match = id.match(/^at:\/\/[^/]+\/[^/]+\/(.+)$/);
      if (!match) throw new Error(`Invalid record URI format: ${id}`);
      const rkey = match[1];

      const url = new URL(
        "/xrpc/com.atproto.repo.getRecord",
        config.slingshotEndpoint
      );
      url.searchParams.set("repo", config.actorDid);
      url.searchParams.set("collection", config.collection);
      url.searchParams.set("rkey", rkey);

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000);

      const response = await fetch(url, { signal: controller.signal });
      clearTimeout(timeoutId);
      if (!response.ok) throw new Error(`Fetch failed: ${response.statusText}`);

      const data = await response.json();
      if (!data || data.uri === undefined)
        throw new Error(`Invalid response: expected uri`);

      return {
        id: String(data.uri),
        data: transformData(data.value, config.mappers as any) as T,
      };
    },
  };
}
