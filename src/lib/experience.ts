import { getLiveCollection } from "astro:content";

export interface Skill {
  id: string;
  name: string;
}

export interface Education {
  id: string;
  institution: string;
  degree?: string;
  endedAt?: string;
}

export async function getSkills(limit = 30): Promise<Skill[]> {
  const { entries: skills } = (await getLiveCollection("skill")) || {
    entries: [],
  };

  return (skills || [])
    .sort((a: any, b: any) => a.data.name.localeCompare(b.data.name))
    .slice(0, limit)
    .map((s: any) => ({ id: s.id, name: s.data.name as string }));
}

export async function getEducation(limit = 30): Promise<Education[]> {
  const { entries: education } = (await getLiveCollection("education")) || {
    entries: [],
  };

  return (education || [])
    .sort((a: any, b: any) => {
      const dateA = a.data.endedAt ? new Date(a.data.endedAt).getTime() : 0;
      const dateB = b.data.endedAt ? new Date(b.data.endedAt).getTime() : 0;
      return dateB - dateA;
    })
    .slice(0, limit)
    .map((e: any) => ({
      id: e.id,
      institution: e.data.institution as string,
      degree: e.data.degree as string | undefined,
      endedAt: e.data.endedAt as string | undefined,
    }));
}
