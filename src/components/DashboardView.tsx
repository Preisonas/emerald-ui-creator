import { useState } from "react";
import ImGuiParticles from "./ImGuiParticles";
import stealthLogo from "@/assets/stealth-logo.png";

interface Software {
  id: string;
  name: string;
  description: string;
  image: string;
  status: "available" | "coming-soon";
}

const DashboardView = () => {
  const [selectedSoftware, setSelectedSoftware] = useState<string | null>(null);
  const [isInjecting, setIsInjecting] = useState(false);
  const [injectionProgress, setInjectionProgress] = useState(0);
  const expiryDate = "2025-02-15";

  const softwareList: Software[] = [
    {
      id: "stealth",
      name: "FiveM Stealth",
      description: "Undetected bypass",
      image: stealthLogo,
      status: "available",
    },
    {
      id: "external",
      name: "FiveM External",
      description: "Full features",
      image: "https://cdn-icons-png.flaticon.com/512/7016/7016344.png",
      status: "available",
    },
    {
      id: "spoofer",
      name: "HWID Spoofer",
      description: "Hardware ID reset",
      image: "https://cdn-icons-png.flaticon.com/512/2099/2099058.png",
      status: "available",
    },
    {
      id: "gtav",
      name: "GTA V Menu",
      description: "Recovery & mods",
      image: "https://cdn-icons-png.flaticon.com/512/5073/5073059.png",
      status: "coming-soon",
    },
  ];

  const handleLaunch = () => {
    if (!selectedSoftware || isInjecting) return;
    
    setIsInjecting(true);
    setInjectionProgress(0);
    
    const interval = setInterval(() => {
      setInjectionProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsInjecting(false), 500);
          return 100;
        }
        return prev + 2;
      });
    }, 50);
  };

  const availableSoftware = softwareList.filter(s => s.status === "available");
  const comingSoonSoftware = softwareList.filter(s => s.status === "coming-soon");

  return (
    <div className="launcher-card animate-fade-in relative w-[520px] overflow-hidden p-6">
      <ImGuiParticles />

      {/* Header */}
      <div className="relative z-10 mb-6 flex items-center justify-between">
        <h1 className="title-glow text-2xl font-bold tracking-wide text-primary">
          Ahujien
        </h1>
        <div className="flex items-center gap-2">
          <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
          <span className="text-xs text-muted-foreground">Connected</span>
        </div>
      </div>

      {/* Available Software */}
      <div className="relative z-10 mb-4">
        <p className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Available
        </p>
        <div className="grid grid-cols-3 gap-3">
          {availableSoftware.map((software) => (
            <div
              key={software.id}
              onClick={() => setSelectedSoftware(software.id)}
              className={`software-card group cursor-pointer p-3 text-center transition-all duration-200 hover:scale-[1.02] ${
                selectedSoftware === software.id ? "selected" : ""
              }`}
            >
              <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-md bg-secondary/60">
                <img
                  src={software.image}
                  alt={software.name}
                  className="h-6 w-6 object-contain transition-transform duration-200 group-hover:scale-110"
                />
              </div>
              <div className="text-xs font-medium text-foreground">
                {software.name}
              </div>
              <div className="text-[10px] text-muted-foreground">
                {software.description}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Coming Soon */}
      {comingSoonSoftware.length > 0 && (
        <div className="relative z-10 mb-4">
          <p className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Coming Soon
          </p>
          <div className="grid grid-cols-3 gap-3">
            {comingSoonSoftware.map((software) => (
              <div
                key={software.id}
                className="software-card cursor-not-allowed p-3 text-center opacity-50"
              >
                <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-md bg-secondary/60">
                  <img
                    src={software.image}
                    alt={software.name}
                    className="h-6 w-6 object-contain grayscale"
                  />
                </div>
                <div className="text-xs font-medium text-foreground">
                  {software.name}
                </div>
                <div className="text-[10px] text-muted-foreground">
                  {software.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="relative z-10 mb-4 flex gap-3">
        <button
          onClick={handleLaunch}
          disabled={!selectedSoftware || isInjecting}
          className="launcher-button relative flex-1 overflow-hidden py-2.5 text-xs font-medium text-foreground transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {isInjecting && (
            <div
              className="absolute inset-y-0 left-0 bg-primary/20 transition-all duration-75"
              style={{ width: `${injectionProgress}%` }}
            />
          )}
          <span className="relative z-10">
            {isInjecting
              ? injectionProgress < 100
                ? `Injecting ${injectionProgress}%`
                : "Done!"
              : "Launch"}
          </span>
        </button>
        <button className="launcher-button px-4 py-2.5 text-xs font-medium text-muted-foreground transition-all duration-200">
          Settings
        </button>
      </div>

      {/* Footer */}
      <div className="notification-box relative z-10 flex items-center justify-between px-3 py-2.5">
        <div>
          <div className="text-xs font-medium text-primary">Session Active</div>
          <div className="text-[10px] text-muted-foreground">
            Expires {expiryDate}
          </div>
        </div>
        <div className="text-right">
          <div className="text-[10px] text-muted-foreground">Version</div>
          <div className="text-xs font-medium text-foreground">1.2.4</div>
        </div>
      </div>
    </div>
  );
};

export default DashboardView;
