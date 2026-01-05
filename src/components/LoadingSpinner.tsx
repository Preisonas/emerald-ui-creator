import { useState, useEffect } from "react";

interface LoadingSpinnerProps {
  onComplete: () => void;
}

const LoadingSpinner = ({ onComplete }: LoadingSpinnerProps) => {
  const [progress, setProgress] = useState(0);
  const [glowOpacity, setGlowOpacity] = useState(0);

  useEffect(() => {
    // Fade in the glow effect
    const glowTimer = setTimeout(() => setGlowOpacity(1), 100);
    
    const duration = 3000;
    const interval = 30;
    const steps = duration / interval;
    const increment = 100 / steps;

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 200);
          return 100;
        }
        return next;
      });
    }, interval);

    return () => {
      clearInterval(timer);
      clearTimeout(glowTimer);
    };
  }, [onComplete]);

  const circumference = 2 * Math.PI * 44;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center py-16 animate-fade-in">
      {/* Spinner with fade-in glow */}
      <div 
        className="relative mb-8"
        style={{
          filter: `drop-shadow(0 0 ${16 + progress * 0.2}px hsl(160 84% 39% / ${glowOpacity * 0.5}))`,
          transition: "filter 0.8s ease-out",
        }}
      >
        <svg 
          className="h-28 w-28" 
          viewBox="0 0 100 100"
          style={{ transform: "rotate(-90deg)" }}
        >
          {/* Background track */}
          <circle
            cx="50"
            cy="50"
            r="44"
            stroke="hsl(var(--secondary))"
            strokeWidth="4"
            fill="none"
            opacity="0.5"
          />
          {/* Progress arc - smooth with proper anti-aliasing */}
          <circle
            cx="50"
            cy="50"
            r="44"
            stroke="hsl(var(--primary))"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            style={{
              transition: "stroke-dashoffset 0.15s ease-out",
            }}
          />
        </svg>
        {/* Center percentage */}
        <div className="absolute inset-0 flex items-center justify-center" style={{ transform: "rotate(0deg)" }}>
          <span 
            className="text-2xl font-semibold text-primary"
            style={{
              textShadow: `0 0 ${10 + progress * 0.1}px hsl(160 84% 39% / ${glowOpacity * 0.4})`,
              transition: "text-shadow 0.5s ease-out",
            }}
          >
            {Math.round(progress)}%
          </span>
        </div>
      </div>

      {/* Loading text */}
      <p className="mb-2 text-sm font-medium text-foreground animate-fade-in" style={{ animationDelay: "0.2s" }}>
        Authenticating
      </p>
      <p className="text-xs text-muted-foreground animate-fade-in" style={{ animationDelay: "0.3s" }}>
        Please wait while we verify your credentials...
      </p>
    </div>
  );
};

export default LoadingSpinner;
