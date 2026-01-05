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
    Array.from({ length: 6 }, (_, i) => ({
      id: i,
      x: 30 + Math.random() * 340,
      y: 30 + Math.random() * 280,
      size: 2 + Math.random() * 2,
      speed: 0.4 + Math.random() * 0.3,
      opacity: 0.3 + Math.random() * 0.3,
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
        const x = p.x + Math.sin(time * p.speed + p.id) * 12;
        const y = p.y + Math.cos(time * p.speed * 0.7 + p.id) * 8;
        const pulse = 0.8 + Math.sin(time * 1.5 + p.id) * 0.2;

        return (
          <g key={p.id}>
            <circle
              cx={x}
              cy={y}
              r={p.size * 2.5}
              fill={`hsla(160, 84%, 39%, ${p.opacity * 0.08 * pulse})`}
            />
            <circle
              cx={x}
              cy={y}
              r={p.size * 1.5}
              fill={`hsla(160, 84%, 39%, ${p.opacity * 0.2 * pulse})`}
            />
            <circle
              cx={x}
              cy={y}
              r={p.size}
              fill={`hsla(160, 84%, 45%, ${p.opacity * 0.8 * pulse})`}
            />
          </g>
        );
      })}
    </svg>
  );
};

export default ImGuiParticles;
