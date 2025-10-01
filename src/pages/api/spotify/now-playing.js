// src/pages/api/spotify/now-playing.js

export const prerender = false;

const CLIENT_ID = import.meta.env.CLIENT_ID;
const CLIENT_SECRET = import.meta.env.CLIENT_SECRET;
const REFRESH_TOKEN = import.meta.env.REFRESH_TOKEN;

const basic = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64");
const NOW_PLAYING_ENDPOINT =
  "https://api.spotify.com/v1/me/player/currently-playing";
const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";

const getAccessToken = async () => {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: REFRESH_TOKEN,
    }),
  });

  return response.json();
};

const getNowPlaying = async () => {
  const { access_token } = await getAccessToken();

  return fetch(NOW_PLAYING_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};

export async function GET() {
  const response = await getNowPlaying();

  if (response.status === 204 || response.status > 400) {
    return new Response(null, { status: 204 });
  }

  const song = await response.json();

  if (!song.item) {
    return new Response(null, { status: 204 });
  }

  const isPlaying = song.is_playing;
  const title = song.item.name;
  const artist = song.item.artists.map((_artist) => _artist.name).join(", ");
  const album = song.item.album.name;
  const albumArt = song.item.album.images[0]?.url;
  const trackUrl = song.item.external_urls.spotify;
  const progress = song.progress_ms
    ? Math.floor((song.progress_ms / song.item.duration_ms) * 100)
    : 0;

  return new Response(
    JSON.stringify({
      isPlaying,
      title,
      artist,
      album,
      albumArt,
      trackUrl,
      progress,
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=30",
      },
    }
  );
}
