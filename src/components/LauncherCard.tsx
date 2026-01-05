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
    <div className="launcher-card animate-fade-in relative w-[420px] overflow-hidden p-8">
      <ImGuiParticles />

      <h1 className="title-glow relative z-10 mb-10 text-center text-4xl font-bold tracking-wide text-primary">
        Ahujien
      </h1>

      {view === "loading" ? (
        <LoadingSpinner onComplete={handleLoadingComplete} />
      ) : (
        <div className="animate-fade-in">
          {/* Username input */}
          <div className="relative z-10 mb-4">
            <label className="mb-2 block text-sm text-muted-foreground">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="launcher-input w-full px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground"
            />
          </div>

          {/* Password input */}
          <div className="relative z-10 mb-6">
            <label className="mb-2 block text-sm text-muted-foreground">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="launcher-input w-full px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground"
            />
          </div>

          {/* Login button */}
          <button
            onClick={handleLogin}
            className="launcher-button relative z-10 w-full py-3 text-sm font-medium text-foreground transition-all duration-200 hover:scale-[1.02]"
          >
            Login
          </button>
        </div>
      )}
    </div>
  );
};

export default LauncherCard;
