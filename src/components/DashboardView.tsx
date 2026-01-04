import { useState } from "react";
import { Power, User } from "lucide-react";
import Particle from "./Particle";

interface SoftwareOption {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  icon: "power" | "user";
}

const DashboardView = () => {
  const [options, setOptions] = useState<SoftwareOption[]>([
    {
      id: "randomizer",
      name: "Randomizer",
      description: "Randomize all your serials",
      enabled: false,
      icon: "power",
    },
    {
      id: "virtualizer",
      name: "Virtualizer [ Tournaments ]",
      description: "Virtualize all your serials",
      enabled: false,
      icon: "user",
    },
  ]);

  const expiryDate = "2025-02-15";

  const particles = [
    { top: "10%", left: "5%", delay: 0 },
    { top: "20%", right: "8%", delay: 1.2 },
    { top: "50%", left: "12%", delay: 0.6 },
    { top: "65%", right: "5%", delay: 1.8 },
  ];

  const toggleOption = (id: string) => {
    setOptions((prev) =>
      prev.map((opt) =>
        opt.id === id ? { ...opt, enabled: !opt.enabled } : opt
      )
    );
  };

  const handleLaunch = () => {
    console.log("Launching FiveM with options:", options);
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

      {/* Software options */}
      <div className="mb-6 space-y-4">
        {options.map((option) => (
          <div key={option.id} className="flex items-center gap-4">
            <div className="software-icon">
              {option.icon === "power" ? (
                <Power className="h-5 w-5 text-primary" />
              ) : (
                <User className="h-5 w-5 text-muted-foreground" />
              )}
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium text-foreground">
                {option.name}
              </div>
              <div className="text-xs text-muted-foreground">
                {option.description}
              </div>
            </div>
            <div
              className={`toggle-switch flex items-center px-0.5 ${
                option.enabled ? "active" : ""
              }`}
              onClick={() => toggleOption(option.id)}
            >
              <div className="toggle-knob" />
            </div>
          </div>
        ))}
      </div>

      {/* Launch button */}
      <button
        onClick={handleLaunch}
        className="launcher-button mb-6 w-full py-3 text-sm font-medium text-foreground"
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
