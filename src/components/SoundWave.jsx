import { useEffect, useState } from "react";

const SoundWave = ({ progress, isPlaying }) => {
  const [animationTimings, setAnimationTimings] = useState([]);

  useEffect(() => {
    const timings = [];
    for (let i = 0; i < 50; i++) {
      timings.push(Math.floor(Math.random() * 800) + 700);
    }
    setAnimationTimings(timings);
  }, []);

  const createLines = () => {
    const progressNum = Math.floor(progress / 2);
    const lines = [];
    const y1 = isPlaying ? 3 : 8;
    const y2 = isPlaying ? 25 : 20;

    for (let i = 1; i < 51; i++) {
      const isFull = i <= progressNum;
      lines.push(
        <line
          key={i}
          x1={i + i * 6}
          y1={y1}
          x2={i + i * 6}
          y2={y2}
          strokeWidth="2"
          stroke={isFull ? "var(--ctp-green)" : "var(--ctp-overlay0)"}
          style={{
            transformOrigin: "center",
            transition: "stroke 1s ease-in-out",
            animation: isPlaying
              ? `sound ${animationTimings[i]}ms linear infinite alternate`
              : "none",
          }}
        />
      );
    }
    return lines;
  };

  return (
    <div>
      <svg
        width="302"
        height="28"
        viewBox="0 0 344 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ maxWidth: "100%", height: "auto" }}
      >
        {createLines()}
      </svg>
      <style>{`
        @keyframes sound {
          0% {
            transform: scaleY(0.4);
          }
          100% {
            transform: scaleY(1);
          }
        }
      `}</style>
    </div>
  );
};

export default SoundWave;
