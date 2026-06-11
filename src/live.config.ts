import { defineLiveCollection } from "astro:content";

import type { Main as BookRecord } from "../src/lexicons/buzz/bookhive/book";
import type { Main as DocumentRecord } from "../src/lexicons/site/standard/document";
import { atprotoLoader } from "./loaders/atproto";
import { BookStatusMap } from "./loaders/enums";

const actorDid = "did:plc:pbjvqaziagcyv2vqodldn5op";
const pdsEndpoint = "https://npmx.social";
const slingshotEndpoint = "https://slingshot.microcosm.blue";

const baseConfig = { pdsEndpoint, slingshotEndpoint, actorDid };

export const collections = {
  posts: defineLiveCollection({
    loader: atprotoLoader<DocumentRecord>({
      ...baseConfig,
      collection: "site.standard.document",
    }),
  }),
  books: defineLiveCollection({
    loader: atprotoLoader<BookRecord>({
      ...baseConfig,
      collection: "buzz.bookhive.book",
      mappers: {
        status: BookStatusMap,
      },
    }),
  }),
  rsvps: defineLiveCollection({
    loader: atprotoLoader({
      ...baseConfig,
      collection: "community.lexicon.calendar.rsvp",
    }),
  }),
  likes: defineLiveCollection({
    loader: atprotoLoader({ ...baseConfig, collection: "dev.npmx.feed.like" }),
  }),
  education: defineLiveCollection({
    loader: atprotoLoader({
      ...baseConfig,
      collection: "id.sifa.profile.education",
    }),
  }),
  honor: defineLiveCollection({
    loader: atprotoLoader({
      ...baseConfig,
      collection: "id.sifa.profile.honor",
    }),
  }),
  skill: defineLiveCollection({
    loader: atprotoLoader({
      ...baseConfig,
      collection: "id.sifa.profile.skill",
    }),
  }),
  position: defineLiveCollection({
    loader: atprotoLoader({
      ...baseConfig,
      collection: "id.sifa.profile.position",
    }),
  }),
  repos: defineLiveCollection({
    loader: atprotoLoader({ ...baseConfig, collection: "sh.tangled.repo" }),
  }),
  blueskyPosts: defineLiveCollection({
    loader: atprotoLoader({
      ...baseConfig,
      collection: "app.bsky.feed.post",
      maxItems: 10,
    }),
  }),
  follows: defineLiveCollection({
    loader: atprotoLoader({
      ...baseConfig,
      collection: "app.bsky.graph.follow",
    }),
  }),
};
