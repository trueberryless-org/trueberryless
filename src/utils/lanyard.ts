export async function fetchLanyardData(
  origin: string
): Promise<LanyardData | null> {
  try {
    const response = await fetch(`${origin}/api/discord-activity.json`);
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.error("Error fetching Lanyard data:", error);
  }
  return null;
}

export interface LanyardData {
  data: {
    discord_user: {
      username: string;
      global_name: string;
      avatar: string;
      id: string;
      discriminator: string;
    };
    discord_status: "online" | "idle" | "dnd" | "offline";
    activities: Activity[];
    listening_to_spotify: boolean;
    spotify?: SpotifyData;
  };
  success: boolean;
}

interface Activity {
  id: string;
  name: string;
  type: number;
  state?: string;
  details?: string;
  emoji?: { name: string };
  timestamps?: { start: number; end: number };
  assets?: {
    large_image?: string;
    large_text?: string;
    small_image?: string;
    small_text?: string;
  };
}

interface SpotifyData {
  track_id: string;
  song: string;
  artist: string;
  album: string;
  album_art_url: string;
  timestamps: { start: number; end: number };
}
