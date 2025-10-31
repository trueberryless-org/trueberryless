export const prerender = false;

let cachedData: any = null;
let cacheTime = 0;
const CACHE_DURATION = 30000; // 30 seconds in milliseconds

export async function GET() {
  const now = Date.now();

  // Return cached data if it's still fresh
  if (cachedData && now - cacheTime < CACHE_DURATION) {
    return new Response(JSON.stringify(cachedData), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": `public, max-age=${Math.floor((CACHE_DURATION - (now - cacheTime)) / 1000)}`,
        "X-Cache": "HIT",
      },
    });
  }

  // Fetch fresh data from Lanyard
  try {
    const res = await fetch(
      "https://api.lanyard.rest/v1/users/819936632874336267"
    );

    if (!res.ok) {
      // If we have stale cached data, return it as fallback
      if (cachedData) {
        return new Response(JSON.stringify(cachedData), {
          status: 200,
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "public, max-age=60",
            "X-Cache": "STALE",
          },
        });
      }

      return new Response(
        JSON.stringify({ error: "Failed to fetch data from Lanyard" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    const data = await res.json();

    // Update cache
    cachedData = data;
    cacheTime = now;

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": `public, max-age=${Math.floor(CACHE_DURATION / 1000)}`,
        "X-Cache": "MISS",
      },
    });
  } catch (error) {
    // If we have stale cached data, return it as fallback
    if (cachedData) {
      return new Response(JSON.stringify(cachedData), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "public, max-age=60",
          "X-Cache": "STALE",
        },
      });
    }

    return new Response(
      JSON.stringify({ error: "Failed to fetch data from Lanyard" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
