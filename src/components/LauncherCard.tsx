import { useState } from "react";
import ImGuiParticles from "./ImGuiParticles";
import DashboardView from "./DashboardView";

// ImGui equivalent:
// static char license[256] = "";
// static bool logged_in = false;

const LauncherCard = () => {
  const [license, setLicense] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // ImGui: if (logged_in) { RenderDashboard(); return; }
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  if (isLoggedIn) {
    return <DashboardView />;
  }

  // ImGui equivalent:
  // ImGui::BeginChild("LoginCard", ImVec2(420, 300), true);
  // 
  // // Draw particles using ImDrawList (see ImGuiParticles)
  // RenderParticles(ImGui::GetWindowDrawList(), ImGui::GetWindowPos());
  // 
  // ImGui::SetCursorPosX((420 - ImGui::CalcTextSize("Ahujien").x) / 2);
  // ImGui::TextColored(ImVec4(0.06f, 0.72f, 0.50f, 1.0f), "Ahujien");
  // 
  // ImGui::Text("License");
  // ImGui::InputText("##license", license, 256);
  // 
  // if (ImGui::Button("Login", ImVec2(-1, 40))) {
  //     logged_in = true;
  // }
  // 
  // ImGui::EndChild();

  return (
    <div className="launcher-card relative w-[420px] p-8">
      {/* Particles - ImDrawList circles */}
      <ImGuiParticles />

      {/* Title - ImGui::TextColored */}
      <h1 className="title-glow relative z-10 mb-12 text-center text-4xl font-bold tracking-wide text-primary">
        Ahujien
      </h1>

      {/* License input - ImGui::InputText */}
      <div className="relative z-10 mb-6">
        <label className="mb-2 block text-sm text-muted-foreground">
          License
        </label>
        <input
          type="text"
          value={license}
          onChange={(e) => setLicense(e.target.value)}
          placeholder=""
          className="launcher-input w-full px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground"
        />
      </div>

      {/* Login button - ImGui::Button */}
      <button
        onClick={handleLogin}
        className="launcher-button relative z-10 w-full py-3 text-sm font-medium text-foreground"
      >
        Login
      </button>
    </div>
  );
};

export default LauncherCard;
