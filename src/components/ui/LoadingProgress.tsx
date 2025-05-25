import { useEffect, useState } from 'react';
import { cn } from '../../lib/utils';

export const LoadingProgress = () => {
  const [progress, setProgress] = useState(0);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const duration = 1500;  
    const steps = 100;
    const increment = 100 / steps;
    const stepDuration = duration / steps;

    const timer = setInterval(() => {
      setProgress(prev => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(() => setOpacity(0), 200);
          return 100;
        }
        return next;
      });
    }, stepDuration);

    return () => clearInterval(timer);
  }, []);

  return (
    <div 
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#FBFBFD]"
      style={{ 
        transition: 'opacity 0.5s ease-out',
        opacity 
      }}
    >
      <div className="w-full max-w-sm px-6">
        <div className="relative">
          <div className="mb-6 flex h-1 overflow-hidden rounded-full bg-gray-100">
            <div
              style={{ width: `${progress}%` }}
              className={cn(
                "flex flex-col justify-center bg-gradient-to-r from-blue-500 to-blue-600",
                "transition-all duration-300 ease-out"
              )}
            />
          </div>
          <div className="text-center">
            <div className="inline-flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-600">
                Loading document system...
              </span>
              <span className="text-sm font-medium text-blue-600">
                {Math.round(progress)}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
