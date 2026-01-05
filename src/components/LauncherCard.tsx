import { useState } from "react";
import ImGuiParticles from "./ImGuiParticles";
import DashboardView from "./DashboardView";
import LoadingSpinner from "./LoadingSpinner";
import dashboardBg from "@/assets/dashboard-bg.png";

type ViewState = "login" | "loading" | "dashboard";

const LauncherCard = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [view, setView] = useState<ViewState>("login");

  const handleLogin = () => {
    setView("loading");
  };

  const handleLoadingComplete = () => {
    setView("dashboard");
  };

  if (view === "dashboard") {
    return <DashboardView />;
  }

  return (
    <div className="animate-fade-in relative w-[380px] overflow-hidden rounded-2xl">
      {/* Background image - contained to show full image */}
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

      <div className="relative z-10 p-6">
        <ImGuiParticles />

      <h1 className="relative z-10 mb-8 text-center text-2xl font-bold tracking-wide">
        <span className="text-foreground">Welcome to </span>
        <span className="title-glow text-primary">Ahujien</span>
      </h1>

      {view === "loading" ? (
        <LoadingSpinner onComplete={handleLoadingComplete} />
      ) : (
        <div className="animate-fade-in">
          <div className="relative z-10 mb-4">
            <label className="mb-1.5 block text-xs text-muted-foreground">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="launcher-input w-full px-3 py-2.5 text-sm text-foreground"
            />
          </div>

          <div className="relative z-10 mb-5">
            <label className="mb-1.5 block text-xs text-muted-foreground">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="launcher-input w-full px-3 py-2.5 text-sm text-foreground"
            />
          </div>

          <button
            onClick={handleLogin}
            className="launcher-button relative z-10 w-full py-2.5 text-sm font-medium text-foreground transition-all duration-200"
          >
            Login
          </button>

          <p className="relative z-10 mt-4 text-center text-[10px] text-muted-foreground">
            Don't have an account?{" "}
            <a
              href="https://clearx.tech/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline transition-colors"
            >
              Register here
            </a>
          </p>
        </div>
      )}
      </div>
    </div>
  );
};

export default LauncherCard;
