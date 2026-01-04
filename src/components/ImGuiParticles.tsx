import { useEffect, useState } from "react";

interface ParticleData {
  id: number;
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  phase: number;
  speed: number;
}

const ImGuiParticles = () => {
  const [particles, setParticles] = useState<ParticleData[]>([
    { id: 0, x: 40, y: 60, baseX: 40, baseY: 60, phase: 0, speed: 0.02 },
    { id: 1, x: 350, y: 80, baseX: 350, baseY: 80, phase: 1.5, speed: 0.015 },
    { id: 2, x: 60, y: 150, baseX: 60, baseY: 150, phase: 0.8, speed: 0.025 },
    { id: 3, x: 370, y: 180, baseX: 370, baseY: 180, phase: 2.2, speed: 0.018 },
    { id: 4, x: 30, y: 250, baseX: 30, baseY: 250, phase: 1.2, speed: 0.022 },
    { id: 5, x: 380, y: 220, baseX: 380, baseY: 220, phase: 0.5, speed: 0.02 },
  ]);

  const [time, setTime] = useState(0);

  // Animation loop - similar to ImGui frame update
  useEffect(() => {
    const interval = setInterval(() => {
      setTime((t) => t + 0.016); // ~60fps delta time
    }, 16);
    return () => clearInterval(interval);
  }, []);

  // Update particle positions - like ImGui would do each frame
  useEffect(() => {
    setParticles((prev) =>
      prev.map((p) => ({
        ...p,
        x: p.baseX + Math.sin(time * p.speed * 60 + p.phase) * 10,
        y: p.baseY + Math.cos(time * p.speed * 60 + p.phase) * 15,
      }))
    );
  }, [time]);

  // ImGui equivalent:
  // ImDrawList* draw_list = ImGui::GetWindowDrawList();
  // ImVec2 window_pos = ImGui::GetWindowPos();
  // float time = ImGui::GetTime();
  // 
  // for each particle:
  //   float x = base_x + sin(time * speed + phase) * 10;
  //   float y = base_y + cos(time * speed + phase) * 15;
  //   ImVec2 pos = window_pos + ImVec2(x, y);
  //   
  //   // Glow layers (outer to inner)
  //   draw_list->AddCircleFilled(pos, 24.0f, IM_COL32(16, 185, 129, 15));
  //   draw_list->AddCircleFilled(pos, 16.0f, IM_COL32(16, 185, 129, 40));
  //   draw_list->AddCircleFilled(pos, 10.0f, IM_COL32(16, 185, 129, 80));
  //   draw_list->AddCircleFilled(pos, 5.0f, IM_COL32(16, 185, 129, 200));
  //   draw_list->AddCircleFilled(pos, 3.0f, IM_COL32(16, 185, 129, 255));

  return (
    <svg className="pointer-events-none absolute inset-0 h-full w-full overflow-visible">
      {particles.map((p) => (
        <g key={p.id}>
          {/* Glow layer 1 - outermost */}
          <circle cx={p.x} cy={p.y} r={24} fill="rgba(16, 185, 129, 0.06)" />
          {/* Glow layer 2 */}
          <circle cx={p.x} cy={p.y} r={16} fill="rgba(16, 185, 129, 0.15)" />
          {/* Glow layer 3 */}
          <circle cx={p.x} cy={p.y} r={10} fill="rgba(16, 185, 129, 0.3)" />
          {/* Glow layer 4 */}
          <circle cx={p.x} cy={p.y} r={5} fill="rgba(16, 185, 129, 0.7)" />
          {/* Core - brightest */}
          <circle cx={p.x} cy={p.y} r={3} fill="rgba(16, 185, 129, 1)" />
        </g>
      ))}
    </svg>
  );
};

export default ImGuiParticles;
