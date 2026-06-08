import type { LiveLoader } from "astro/loaders";

import type { Main as DocumentRecord } from "../lexicons/site/standard/document";

interface DocumentsConfig {
  pdsEndpoint: string;
  slingshotEndpoint: string;
  actorDid: string;
}

interface EntryFilter {
  id?: string;
  [key: string]: any;
}

export function postsLoader(
  config: DocumentsConfig
): LiveLoader<DocumentRecord, EntryFilter> {
  return {
    name: "site-standard-documents",
    loadCollection: async () => {
      let cursor: string | undefined;
      const allRecords = [];

      do {
        const url = new URL(
          "/xrpc/com.atproto.repo.listRecords",
          config.pdsEndpoint
        );
        url.searchParams.set("repo", config.actorDid);
        url.searchParams.set("collection", "site.standard.document");
        url.searchParams.set("limit", "100");
        if (cursor) url.searchParams.set("cursor", cursor);

        const response = await fetch(url);
        if (!response.ok)
          throw new Error(`List failed: ${response.statusText}`);

        const data = await response.json();
        allRecords.push(...data.records);
        cursor = data.cursor;
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
      url.searchParams.set("collection", "site.standard.document");
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
