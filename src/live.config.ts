import { defineAtProtoLiveCollection } from "@fujocoded/astro-atproto-loader";
import {
  EventOutputSchema,
  EventRecordSchema,
  transformEventRecord,
} from "./types/events";
import {
  BlogOutputSchema,
  BlogRecordSchema,
  transformBlogRecord,
} from "./types/blog";

const events = defineAtProtoLiveCollection({
  source: {
    repo: "did:plc:pbjvqaziagcyv2vqodldn5op",
    collection: "community.lexicon.calendar.event",
    parseRecord: (value) => EventRecordSchema.parse(value),
  },
  transform: async ({ value, rkey }) => {
    return {
      id: rkey,
      data: transformEventRecord(value),
    };
  },
  outputSchema: EventOutputSchema,
});

const blog = defineAtProtoLiveCollection({
  source: {
    repo: "did:plc:pbjvqaziagcyv2vqodldn5op",
    collection: "site.standard.document",
    parseRecord: (value) => BlogRecordSchema.parse(value),
  },
  transform: async ({ value, rkey }) => {
    return {
      id: rkey,
      data: transformBlogRecord(value),
    };
  },
  outputSchema: BlogOutputSchema,
});

export const collections = { events, blog };
