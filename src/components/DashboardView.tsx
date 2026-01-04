import { useState } from "react";
import { Shield, Zap } from "lucide-react";
import ImGuiParticles from "./ImGuiParticles";

interface Software {
  id: string;
  name: string;
  description: string;
  icon: "stealth" | "full";
}

// ImGui equivalent:
// static int selected_software = -1;

const DashboardView = () => {
  const [selectedSoftware, setSelectedSoftware] = useState<string | null>(null);
  const expiryDate = "2025-02-15";

  const softwareList: Software[] = [
    {
      id: "stealth",
      name: "FiveM Stealth",
      description: "Undetected mode",
      icon: "stealth",
    },
    {
      id: "full",
      name: "FiveM Full",
      description: "All features enabled",
      icon: "full",
    },
  ];

  // ImGui: if (ImGui::Button("Launch") && selected_software >= 0) { Launch(); }
  const handleLaunch = () => {
    if (selectedSoftware) {
      console.log("Launching:", selectedSoftware);
    }
  };

  // ImGui equivalent:
  // ImGui::BeginChild("Dashboard", ImVec2(420, 400), true);
  // 
  // RenderParticles(ImGui::GetWindowDrawList(), ImGui::GetWindowPos());
  // 
  // ImGui::TextColored(emerald, "Ahujien");
  // 
  // for (int i = 0; i < software_count; i++) {
  //     bool is_selected = (selected_software == i);
  //     if (ImGui::Selectable(software[i].name, is_selected, 0, ImVec2(-1, 50))) {
  //         selected_software = i;
  //     }
  // }
  // 
  // if (ImGui::Button("Launch", ImVec2(-1, 40))) { Launch(); }
  // 
  // ImGui::TextColored(emerald, "Notification");
  // ImGui::Text("Session validated. Expires: %s", expiry_date);
  // 
  // ImGui::EndChild();

  return (
    <div className="launcher-card relative w-[420px] p-8">
      {/* Particles - ImDrawList circles */}
      <ImGuiParticles />

      {/* Title - ImGui::TextColored */}
      <h1 className="title-glow relative z-10 mb-8 text-center text-4xl font-bold tracking-wide text-primary">
        Ahujien
      </h1>

      {/* Software selection - ImGui::Selectable */}
      <div className="relative z-10 mb-6 space-y-3">
        {softwareList.map((software, index) => (
          <div
            key={software.id}
            onClick={() => setSelectedSoftware(software.id)}
            className={`software-card flex cursor-pointer items-center gap-4 p-4 ${
              selectedSoftware === software.id ? "selected" : ""
            }`}
          >
            <div className="software-icon">
              {software.icon === "stealth" ? (
                <Shield className="h-5 w-5 text-primary" />
              ) : (
                <Zap className="h-5 w-5 text-primary" />
              )}
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium text-foreground">
                {software.name}
              </div>
              <div className="text-xs text-muted-foreground">
                {software.description}
              </div>
            </div>
            <div
              className={`radio-dot ${
                selectedSoftware === software.id ? "active" : ""
              }`}
            />
          </div>
        ))}
      </div>

      {/* Launch button - ImGui::Button */}
      <button
        onClick={handleLaunch}
        disabled={!selectedSoftware}
        className="launcher-button relative z-10 mb-6 w-full py-3 text-sm font-medium text-foreground disabled:cursor-not-allowed disabled:opacity-50"
      >
        Launch
      </button>

      {/* Notification - ImGui::TextColored + ImGui::Text */}
      <div className="notification-box relative z-10 px-4 py-3">
        <div className="text-sm font-medium text-primary">Notification</div>
        <div className="text-xs text-muted-foreground">
          Session is validated. Expires: {expiryDate}
        </div>
      </div>
    </div>
  );
};

export default DashboardView;
