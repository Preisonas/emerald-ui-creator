import { useState } from "react";
import ImGuiParticles from "./ImGuiParticles";
import stealthLogo from "@/assets/stealth-logo.png";

interface Software {
  id: string;
  name: string;
  description: string;
  image: string;
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
      description: "Undetected mode",
      image: stealthLogo,
    },
    {
      id: "external",
      name: "FiveM External",
      description: "All features enabled",
      image: "https://cdn-icons-png.flaticon.com/512/7016/7016344.png",
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

  return (
    <div className="launcher-card animate-fade-in relative w-[440px] overflow-hidden p-8">
      <ImGuiParticles />

      {/* Header */}
      <h1 className="title-glow relative z-10 mb-8 text-center text-3xl font-bold tracking-wide text-primary">
        Ahujien
      </h1>

      {/* Software selection */}
      <div className="relative z-10 mb-6 grid grid-cols-2 gap-4">
        {softwareList.map((software) => (
          <div
            key={software.id}
            onClick={() => setSelectedSoftware(software.id)}
            className={`software-card group cursor-pointer p-4 text-center transition-all duration-300 hover:scale-[1.02] ${
              selectedSoftware === software.id ? "selected" : ""
            }`}
          >
            {/* Image */}
            <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center overflow-hidden rounded-lg bg-secondary/50">
              <img
                src={software.image}
                alt={software.name}
                className="h-12 w-12 object-contain transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            
            {/* Name */}
            <div className="mb-1 text-sm font-medium text-foreground">
              {software.name}
            </div>
            
            {/* Description */}
            <div className="text-xs text-muted-foreground">
              {software.description}
            </div>

            {/* Selection indicator */}
            <div
              className={`mx-auto mt-3 h-1.5 w-8 rounded-full transition-all duration-300 ${
                selectedSoftware === software.id
                  ? "bg-primary shadow-[0_0_10px_hsl(var(--primary))]"
                  : "bg-muted"
              }`}
            />
          </div>
        ))}
      </div>

      {/* Launch button with progress */}
      <div className="relative z-10 mb-6">
        <button
          onClick={handleLaunch}
          disabled={!selectedSoftware || isInjecting}
          className="launcher-button relative w-full overflow-hidden py-3 text-sm font-medium text-foreground transition-all duration-200 hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isInjecting && (
            <div
              className="absolute inset-y-0 left-0 bg-primary/30 transition-all duration-100"
              style={{ width: `${injectionProgress}%` }}
            />
          )}
          <span className="relative z-10">
            {isInjecting
              ? injectionProgress < 100
                ? `Injecting... ${injectionProgress}%`
                : "Injected!"
              : "Launch"}
          </span>
        </button>
      </div>

      {/* Status section */}
      <div className="notification-box relative z-10 px-4 py-3">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-medium text-primary">Status</div>
            <div className="text-xs text-muted-foreground">
              Session valid until {expiryDate}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 animate-pulse rounded-full bg-primary shadow-[0_0_8px_hsl(var(--primary))]" />
            <span className="text-xs text-primary">Online</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardView;
