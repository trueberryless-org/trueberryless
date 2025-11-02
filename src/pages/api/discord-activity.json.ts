export const prerender = false;

export async function GET() {
  try {
    const res = await fetch(
      "https://api.lanyard.rest/v1/users/819936632874336267"
    );

    if (!res.ok) {
      return new Response(
        JSON.stringify({ error: "Failed to fetch data from Lanyard" }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "public, max-age=60, s-maxage=60",
          },
        }
      );
    }

    const data = await res.json();

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control":
          "public, max-age=300, s-maxage=300, stale-while-revalidate=600",
        "CDN-Cache-Control": "public, max-age=300, stale-while-revalidate=600",
      },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Failed to fetch data from Lanyard" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "public, max-age=60, s-maxage=60",
        },
      }
    );
  }
}
