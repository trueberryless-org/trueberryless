import { useEffect, useState } from "react";

import SoundWave from "./SoundWave";

const SpotifyPlayer = () => {
  const [track, setTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const fetchNowPlaying = async () => {
      try {
        const response = await fetch("/api/spotify/now-playing");
        if (response.status === 204) {
          setTrack(null);
          setIsPlaying(false);
          setLoading(false);
          return;
        }

        const data = await response.json();
        setTrack(data);
        setIsPlaying(data.isPlaying);
        setProgress(data.progress || 0);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching now playing:", error);
        setLoading(false);
      }
    };

    fetchNowPlaying();
    const interval = setInterval(fetchNowPlaying, 10000);

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: "center", color: "var(--ctp-subtext0)" }}>
        Loading...
      </div>
    );
  }

  if (!track) {
    return (
      <div style={{ textAlign: "center", color: "var(--ctp-subtext0)" }}>
        <svg
          width="64"
          height="64"
          viewBox="0 0 24 24"
          fill="none"
          style={{ margin: "0 auto 1rem", color: "var(--ctp-green)" }}
        >
          <path
            d="M9 18V5l12-2v13M9 18c0 1.657-1.343 3-3 3s-3-1.343-3-3 1.343-3 3-3 3 1.343 3 3zm12-2c0 1.657-1.343 3-3 3s-3-1.343-3-3 1.343-3 3-3 3 1.343 3 3z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <p>Not playing anything right now</p>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <div style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
        {track.albumArt && (
          <img
            src={track.albumArt}
            alt={track.album}
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "8px",
              border: "2px solid var(--ctp-green)",
            }}
          />
        )}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              fontSize: "1.25rem",
              fontWeight: "600",
              color: "var(--ctp-text)",
              marginBottom: "0.25rem",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {track.title}
          </div>
          <div
            style={{
              fontSize: "1rem",
              color: "var(--ctp-subtext0)",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {track.artist}
          </div>
          {track.album && (
            <div
              style={{
                fontSize: "0.9rem",
                color: "var(--ctp-subtext1)",
                marginTop: "0.25rem",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {track.album}
            </div>
          )}
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <SoundWave progress={progress} isPlaying={isPlaying} />
      </div>

      {track.trackUrl && (
        <a
          href={track.trackUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.75rem 1.5rem",
            backgroundColor: "var(--ctp-green)",
            color: "var(--ctp-base)",
            borderRadius: "9999px",
            textDecoration: "none",
            fontWeight: "500",
            alignSelf: "center",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.05)";
            e.currentTarget.style.backgroundColor = "var(--ctp-teal)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.backgroundColor = "var(--ctp-green)";
          }}
        >
          Open in Spotify
        </a>
      )}
    </div>
  );
};

export default SpotifyPlayer;
