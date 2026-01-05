import { useState, useEffect } from "react";

interface ParticleData {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
}

const ImGuiParticles = () => {
  const [particles] = useState<ParticleData[]>(() =>
    Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: 20 + Math.random() * 360,
      y: 20 + Math.random() * 300,
      size: 4 + Math.random() * 4,
      speed: 0.3 + Math.random() * 0.5,
      opacity: 0.4 + Math.random() * 0.4,
    }))
  );

  const [time, setTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((t) => t + 0.02);
    }, 16);
    return () => clearInterval(interval);
  }, []);

  return (
    <svg
      className="pointer-events-none absolute inset-0 z-0 h-full w-full overflow-hidden"
      style={{ filter: "blur(0.5px)" }}
    >
      {particles.map((p) => {
        const x = p.x + Math.sin(time * p.speed + p.id) * 15;
        const y = p.y + Math.cos(time * p.speed * 0.8 + p.id) * 10;
        const pulse = 0.7 + Math.sin(time * 2 + p.id) * 0.3;

        return (
          <g key={p.id}>
            {/* Outer glow */}
            <circle
              cx={x}
              cy={y}
              r={p.size * 3}
              fill={`hsla(160, 84%, 39%, ${p.opacity * 0.1 * pulse})`}
            />
            {/* Middle glow */}
            <circle
              cx={x}
              cy={y}
              r={p.size * 1.8}
              fill={`hsla(160, 84%, 39%, ${p.opacity * 0.25 * pulse})`}
            />
            {/* Core */}
            <circle
              cx={x}
              cy={y}
              r={p.size}
              fill={`hsla(160, 84%, 50%, ${p.opacity * pulse})`}
            />
          </g>
        );
      })}
    </svg>
  );
};

export default ImGuiParticles;
