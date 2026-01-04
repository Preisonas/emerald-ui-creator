import { useState } from "react";
import Particle from "./Particle";

const LauncherCard = () => {
  const [license, setLicense] = useState("");

  const particles = [
    { top: "15%", left: "10%", delay: 0 },
    { top: "25%", right: "15%", delay: 1.5 },
    { top: "40%", left: "20%", delay: 0.8 },
    { top: "50%", right: "10%", delay: 2.2 },
    { top: "70%", left: "8%", delay: 1.2 },
    { top: "60%", right: "20%", delay: 0.5 },
  ];

  const handleLogin = () => {
    console.log("Login with license:", license);
  };

  return (
    <div className="launcher-card relative w-[420px] rounded-lg p-8">
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
      <h1 className="title-glow mb-12 text-center text-4xl font-bold tracking-wide text-primary">
        Neptune
      </h1>

      {/* License input */}
      <div className="mb-6">
        <label className="mb-2 block text-sm text-muted-foreground">
          License
        </label>
        <input
          type="text"
          value={license}
          onChange={(e) => setLicense(e.target.value)}
          placeholder=""
          className="launcher-input w-full rounded px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground"
        />
      </div>

      {/* Login button */}
      <button
        onClick={handleLogin}
        className="launcher-button w-full rounded py-3 text-sm font-medium text-foreground"
      >
        Login
      </button>
    </div>
  );
};

export default LauncherCard;
