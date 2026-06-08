import type { LiveLoader } from "astro/loaders";

interface AtprotoConfig {
  pdsEndpoint: string;
  slingshotEndpoint: string;
  actorDid: string;
  collection: string;
  maxItems?: number;
}

interface EntryFilter {
  id?: string;
  [key: string]: any;
}

export function atprotoLoader<
  T extends Record<string, any> = Record<string, any>,
>(config: AtprotoConfig): LiveLoader<T, EntryFilter> {
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

        const response = await fetch(url);
        if (!response.ok)
          throw new Error(`List failed: ${response.statusText}`);

        const data = await response.json();
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
          data: record.value,
        })),
      };
    },
    loadEntry: async (context) => {
      const id = context.filter?.id;
      if (!id) throw new Error("Record URI string is required");

      const rkey = id.split("/").pop();
      if (!rkey) throw new Error("Invalid record URI");

      const url = new URL(
        "/xrpc/com.atproto.repo.getRecord",
        config.slingshotEndpoint
      );
      url.searchParams.set("repo", config.actorDid);
      url.searchParams.set("collection", config.collection);
      url.searchParams.set("rkey", rkey);

      const response = await fetch(url);
      if (!response.ok) throw new Error(`Fetch failed: ${response.statusText}`);

      const data = await response.json();

      return {
        id: String(data.uri),
        data: data.value,
      };
    },
  };
}
