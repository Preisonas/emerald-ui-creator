import { useState } from "react";
import { Shield, Zap } from "lucide-react";
import Particle from "./Particle";

interface Software {
  id: string;
  name: string;
  description: string;
  icon: "stealth" | "full";
}

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

  const particles = [
    { top: "10%", left: "5%", delay: 0 },
    { top: "20%", right: "8%", delay: 1.2 },
    { top: "50%", left: "12%", delay: 0.6 },
    { top: "65%", right: "5%", delay: 1.8 },
  ];

  const handleLaunch = () => {
    if (selectedSoftware) {
      console.log("Launching:", selectedSoftware);
    }
  };

  return (
    <div className="launcher-card relative w-[420px] p-8">
      {/* Floating particles */}
      {particles.map((pos, i) => (
        <Particle
          key={i}
          style={{
            top: pos.top,
            left: pos.left,
            right: pos.right,
          }}
          delay={pos.delay}
        />
      ))}

      {/* Title */}
      <h1 className="title-glow mb-8 text-center text-4xl font-bold tracking-wide text-primary">
        Ahujien
      </h1>

      {/* Software selection */}
      <div className="mb-6 space-y-3">
        {softwareList.map((software) => (
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

      {/* Launch button */}
      <button
        onClick={handleLaunch}
        disabled={!selectedSoftware}
        className="launcher-button mb-6 w-full py-3 text-sm font-medium text-foreground disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Launch
      </button>

      {/* Notification / Expiry */}
      <div className="notification-box px-4 py-3">
        <div className="text-sm font-medium text-primary">Notification</div>
        <div className="text-xs text-muted-foreground">
          Session is validated. Expires: {expiryDate}
        </div>
      </div>
    </div>
  );
};

export default DashboardView;
