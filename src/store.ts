import { atom } from "nanostores";

import type { LanyardData } from "./utils/lanyard";

export const $lanyard = atom<LanyardData | null>(null);

export async function refreshLanyard() {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);
  try {
    const response = await fetch(
      "https://api.lanyard.rest/v1/users/819936632874336267",
      { signal: controller.signal }
    );
    if (!response.ok) {
      $lanyard.set(null);
      return;
    }
    const data = await response.json();
    $lanyard.set(data);
  } catch (e) {
    console.error("Lanyard fetch failed", e);
    $lanyard.set(null);
  } finally {
    clearTimeout(timeout);
  }
}
