import querystring from "querystring";

const clientID = import.meta.env.CLIENT_ID;
const clientSecret = import.meta.env.CLIENT_SECRET;
const refreshToken = import.meta.env.REFRESH_TOKEN;

const TOKEN_URL = `https://accounts.spotify.com/api/token`;
const basicAuth = Buffer.from(`${clientID}:${clientSecret}`).toString("base64");

const getAccessToken = async () => {
  const response = await fetch(TOKEN_URL, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basicAuth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: querystring.stringify({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
  });

  return response.json();
};

const NOW_PLAYING_URL = `https://api.spotify.com/v1/me/player/currently-playing`;

const getNowPlaying = async () => {
  const { access_token } = await getAccessToken();

  return fetch(NOW_PLAYING_URL, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};

export { getAccessToken, getNowPlaying };
