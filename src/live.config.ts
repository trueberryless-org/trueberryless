import { defineAtProtoLiveCollection } from "@fujocoded/astro-atproto-loader";
import {
  EventOutputSchema,
  EventRecordSchema,
  transformEventRecord,
} from "./types/events";

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

export const collections = { events };
