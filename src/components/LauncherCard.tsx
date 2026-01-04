import { useState } from "react";
import ImGuiParticles from "./ImGuiParticles";
import DashboardView from "./DashboardView";

// ImGui equivalent:
// static char username[256] = "";
// static char password[256] = "";
// static bool logged_in = false;

const LauncherCard = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // ImGui: if (logged_in) { RenderDashboard(); return; }
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  if (isLoggedIn) {
    return <DashboardView />;
  }

  // ImGui equivalent:
  // ImGui::BeginChild("LoginCard", ImVec2(420, 350), true);
  // 
  // RenderParticles(ImGui::GetWindowDrawList(), ImGui::GetWindowPos());
  // 
  // ImGui::SetCursorPosX((420 - ImGui::CalcTextSize("Ahujien").x) / 2);
  // ImGui::TextColored(ImVec4(0.06f, 0.72f, 0.50f, 1.0f), "Ahujien");
  // 
  // ImGui::Text("Username");
  // ImGui::InputText("##username", username, 256);
  // 
  // ImGui::Text("Password");
  // ImGui::InputText("##password", password, 256, ImGuiInputTextFlags_Password);
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
      <h1 className="title-glow relative z-10 mb-10 text-center text-4xl font-bold tracking-wide text-primary">
        Ahujien
      </h1>

      {/* Username input - ImGui::InputText */}
      <div className="relative z-10 mb-4">
        <label className="mb-2 block text-sm text-muted-foreground">
          Username
        </label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder=""
          className="launcher-input w-full px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground"
        />
      </div>

      {/* Password input - ImGui::InputText with ImGuiInputTextFlags_Password */}
      <div className="relative z-10 mb-6">
        <label className="mb-2 block text-sm text-muted-foreground">
          Password
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
