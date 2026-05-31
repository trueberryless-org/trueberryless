import { z } from "astro/zod";

export const EventRecordSchema = z.object({
  name: z.string(),
  createdAt: z.string(),
  description: z.string().optional(),
  startsAt: z.string().optional(),
  endsAt: z.string().optional(),
  mode: z.string().optional(),
  status: z.string().optional(),
});

export type RawEventRecord = z.infer<typeof EventRecordSchema>;

export const EventOutputSchema = z.object({
  name: z.string(),
  description: z.string().nullable(),
  startsAt: z.date().nullable(),
  endsAt: z.date().nullable(),
  createdAt: z.date(),
  mode: z.enum(["inperson", "hybrid", "virtual"]).nullable(),
  status: z
    .enum(["cancelled", "planned", "postponed", "rescheduled", "scheduled"])
    .nullable(),
});

export type CleanedEvent = z.infer<typeof EventOutputSchema>;

export function transformEventRecord(value: RawEventRecord): CleanedEvent {
  const cleanEnum = (val?: string) => (val ? val.split("#")[1] : null);

  return {
    name: value.name,
    description: value.description ?? null,
    startsAt: value.startsAt ? new Date(value.startsAt) : null,
    endsAt: value.endsAt ? new Date(value.endsAt) : null,
    createdAt: new Date(value.createdAt),
    mode: cleanEnum(value.mode) as CleanedEvent["mode"],
    status: cleanEnum(value.status) as CleanedEvent["status"],
  };
}
