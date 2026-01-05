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
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: 20 + Math.random() * 340,
      y: 20 + Math.random() * 350,
      size: 3 + Math.random() * 4,
      speed: 0.3 + Math.random() * 0.4,
      opacity: 0.5 + Math.random() * 0.5,
    }))
  );

  const [time, setTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((t) => t + 0.015);
    }, 16);
    return () => clearInterval(interval);
  }, []);

  return (
    <svg className="pointer-events-none absolute inset-0 z-0 h-full w-full overflow-hidden">
      {particles.map((p) => {
        const x = p.x + Math.sin(time * p.speed + p.id) * 15;
        const y = p.y + Math.cos(time * p.speed * 0.7 + p.id) * 12;
        const pulse = 0.8 + Math.sin(time * 1.5 + p.id) * 0.2;

        return (
          <g key={p.id}>
            {/* Outer glow */}
            <circle
              cx={x}
              cy={y}
              r={p.size * 3}
              fill={`hsla(160, 84%, 39%, ${p.opacity * 0.15 * pulse})`}
            />
            {/* Middle glow */}
            <circle
              cx={x}
              cy={y}
              r={p.size * 1.8}
              fill={`hsla(160, 84%, 45%, ${p.opacity * 0.4 * pulse})`}
            />
            {/* Core */}
            <circle
              cx={x}
              cy={y}
              r={p.size}
              fill={`hsla(160, 84%, 55%, ${p.opacity * pulse})`}
            />
          </g>
        );
      })}
    </svg>
  );
};

export default ImGuiParticles;
