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

  return (
    <div className="flex flex-col items-center justify-center py-16">
      {/* Spinner with fade-in glow */}
      <div 
        className="relative mb-8"
        style={{
          filter: `drop-shadow(0 0 ${12 + progress * 0.2}px hsl(160 84% 39% / ${glowOpacity * 0.6}))`,
          transition: "filter 0.8s ease-out",
        }}
      >
        <svg className="h-24 w-24" viewBox="0 0 100 100">
          {/* Background track */}
          <circle
            cx="50"
            cy="50"
            r="42"
            stroke="hsl(var(--secondary))"
            strokeWidth="6"
            fill="none"
          />
          {/* Progress arc */}
          <circle
            cx="50"
            cy="50"
            r="42"
            stroke="hsl(var(--primary))"
            strokeWidth="6"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={`${progress * 2.64} 264`}
            transform="rotate(-90 50 50)"
            style={{
              transition: "stroke-dasharray 0.1s ease-out",
            }}
          />
        </svg>
        {/* Center percentage */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span 
            className="text-xl font-semibold text-primary"
            style={{
              textShadow: `0 0 ${8 + progress * 0.1}px hsl(160 84% 39% / ${glowOpacity * 0.5})`,
              transition: "text-shadow 0.5s ease-out",
            }}
          >
            {Math.round(progress)}%
          </span>
        </div>
      </div>

      {/* Loading text */}
      <p className="mb-2 text-sm font-medium text-foreground">Authenticating</p>
      <p className="text-xs text-muted-foreground">
        Please wait while we verify your credentials...
      </p>
    </div>
  );
};

export default LoadingSpinner;
