import { atom } from "nanostores";

import type { LanyardData } from "./utils/lanyard";

export const $lanyard = atom<LanyardData | null>(null);

export async function refreshLanyard() {
  try {
    const response = await fetch(
      "https://api.lanyard.rest/v1/users/819936632874336267"
    );
    if (response.ok) {
      const data = await response.json();
      $lanyard.set(data);
    }
  } catch (e) {
    console.error("Lanyard fetch failed", e);
  }
}
