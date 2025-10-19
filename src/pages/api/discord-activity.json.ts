export const prerender = false;

export async function GET() {
  const res = await fetch(
    "https://api.lanyard.rest/v1/users/819936632874336267"
  );

  if (!res.ok) {
    return new Response(
      JSON.stringify({ error: "Failed to fetch data from Lanyard" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  const data = await res.json();

  // Optionally, you can manipulate or filter `data` here before returning
  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
