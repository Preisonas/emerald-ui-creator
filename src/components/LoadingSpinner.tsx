import { useState, useEffect } from "react";

interface LoadingSpinnerProps {
  onComplete: () => void;
}

const LoadingSpinner = ({ onComplete }: LoadingSpinnerProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
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

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="flex flex-col items-center justify-center py-12">
      {/* Spinner */}
      <div className="relative mb-6">
        <svg className="h-20 w-20 animate-spin" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="40"
            stroke="hsl(var(--secondary))"
            strokeWidth="8"
            fill="none"
          />
          <circle
            cx="50"
            cy="50"
            r="40"
            stroke="hsl(var(--primary))"
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={`${progress * 2.51} 251`}
            className="transition-all duration-100 ease-out"
            style={{
              filter: "drop-shadow(0 0 8px hsl(var(--primary)))",
            }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg font-bold text-primary">
            {Math.round(progress)}%
          </span>
        </div>
      </div>

      {/* Loading text */}
      <div className="text-center">
        <p className="mb-1 text-sm font-medium text-foreground">
          Authenticating
        </p>
        <p className="text-xs text-muted-foreground">
          Please wait while we verify your credentials...
        </p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
