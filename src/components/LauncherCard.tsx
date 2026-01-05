import { useState } from "react";
import ImGuiParticles from "./ImGuiParticles";
import DashboardView from "./DashboardView";
import LoadingSpinner from "./LoadingSpinner";

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
    <div className="launcher-card animate-fade-in relative w-[380px] overflow-hidden p-6">
      <ImGuiParticles />

      <h1 className="title-glow relative z-10 mb-8 text-center text-3xl font-bold tracking-wide text-primary">
        Ahujien
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
            Forgot password? Contact support
          </p>
        </div>
      )}
    </div>
  );
};

export default LauncherCard;
