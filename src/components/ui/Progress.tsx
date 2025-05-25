import * as React from "react";
import { cn } from "../../lib/utils";

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  indicatorColor?: string;
  className?: string;
}

export const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ value, className, indicatorColor = "bg-blue-500", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("h-2 w-full overflow-hidden rounded-full bg-gray-200", className)}
        {...props}
      >
        <div
          className={cn(
            "h-full w-full flex-1 transition-all duration-200",
            indicatorColor
          )}
          style={{
            transform: `translateX(-${100 - Math.min(Math.max(value, 0), 100)}%)`
          }}
        />
      </div>
    );
  }
);
Progress.displayName = "Progress";
