import { useState } from "react";
import stealthLogo from "@/assets/stealth-logo.png";
import dashboardBg from "@/assets/dashboard-bg.png";
import ImGuiParticles from "./ImGuiParticles";

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
    <div className="animate-fade-in relative w-[480px] overflow-hidden rounded-2xl">
      {/* Background image */}
      <div 
        className="absolute inset-0 bg-cover bg-top"
        style={{ backgroundImage: `url(${dashboardBg})` }}
      />
      
      {/* Gradient overlay - clean emerald top, black bottom */}
      <div 
        className="absolute inset-0"
        style={{ 
          background: "linear-gradient(to bottom, hsla(160, 70%, 20%, 0.75) 0%, hsla(0, 0%, 5%, 0.95) 60%)" 
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 p-8">
        <ImGuiParticles />
        
        {/* Header */}
        <div className="mb-8 flex items-center justify-between animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <div>
            <h1 className="text-2xl font-bold tracking-wide">
              <span className="text-foreground">Welcome to </span>
              <span className="title-glow text-primary">Ahujien</span>
            </h1>
            <p className="mt-1 text-xs text-foreground/80">Select your software</p>
          </div>
          <div className="flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5">
            <div className="h-2 w-2 animate-pulse rounded-full bg-primary" />
            <span className="text-xs font-medium text-primary">Undetected - Online</span>
          </div>
        </div>

        {/* Software Grid */}
        <div className="mb-6 grid grid-cols-2 gap-4">
          {softwareList.map((software, index) => (
            <div
              key={software.id}
              onClick={() => software.status === "available" && setSelectedSoftware(software.id)}
              className={`group relative cursor-pointer overflow-hidden rounded-xl p-4 transition-all duration-300 animate-fade-in hover:scale-[1.02] ${
                selectedSoftware === software.id
                  ? "bg-primary/15 ring-1 ring-primary/50 scale-[1.02]"
                  : "bg-secondary/80 hover:bg-secondary"
              }`}
              style={{ animationDelay: `${0.2 + index * 0.1}s` }}
            >
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-background/50 transition-transform duration-300 group-hover:scale-105">
                  <img
                    src={software.image}
                    alt={software.name}
                    className="h-8 w-8 object-contain"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-foreground">{software.name}</h3>
                  <p className="mt-0.5 text-xs text-muted-foreground">{software.description}</p>
                </div>
              </div>
              
              {/* Selection indicator */}
              {selectedSoftware === software.id && (
                <div className="absolute right-3 top-3 h-2.5 w-2.5 rounded-full bg-primary shadow-lg shadow-primary/50 animate-scale-in" />
              )}
            </div>
          ))}
        </div>

        {/* Launch Button */}
        <button
          onClick={handleLaunch}
          disabled={!selectedSoftware || isInjecting}
          className="relative mb-6 w-full overflow-hidden rounded-xl bg-primary py-3.5 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {isInjecting && (
            <div
              className="absolute inset-y-0 left-0 bg-white/20 transition-all duration-75"
              style={{ width: `${injectionProgress}%` }}
            />
          )}
          <span className="relative z-10">
            {isInjecting
              ? injectionProgress < 100
                ? `Injecting ${injectionProgress}%`
                : "Success!"
              : "Launch"}
          </span>
        </button>

        {/* Footer Info */}
        <div className="flex items-center justify-between rounded-xl bg-secondary/60 px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="h-8 w-1 rounded-full bg-primary" />
            <div>
              <div className="text-xs font-medium text-foreground">Session Active</div>
              <div className="text-[11px] text-muted-foreground">Expires {expiryDate}</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-[11px] text-muted-foreground">Version</div>
            <div className="text-xs font-semibold text-foreground">v1.2.4</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardView;
