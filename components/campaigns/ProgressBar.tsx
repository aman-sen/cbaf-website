"use client";
import { useEffect, useRef, useState } from "react";

interface Props {
  raised: number;
  goal: number;
  animated?: boolean;
  showLabels?: boolean;
  size?: "sm" | "md";
}

export function ProgressBar({ raised, goal, animated = true, showLabels = true, size = "md" }: Props) {
  const percentage = Math.round((raised / goal) * 100);
  const [width, setWidth] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!animated) { setWidth(Math.min(percentage, 100)); return; }
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setWidth(Math.min(percentage, 100)); },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [percentage, animated]);

  const formatINR = (n: number) => {
    if (n >= 100000) return `₹${(n / 100000).toFixed(1)}L`;
    if (n >= 1000) return `₹${(n / 1000).toFixed(1)}K`;
    return `₹${n.toLocaleString("en-IN")}`;
  };

  const barColor =
    percentage >= 100 ? "bg-blue-500" : percentage > 60 ? "bg-blue-500" : "bg-amber-500";

  return (
    <div ref={ref}>
      {showLabels && (
        <div className="flex justify-between items-center mb-1.5">
          <span className="text-sm font-bold text-gray-800">{formatINR(raised)}</span>
          <span
            className={`text-xs font-bold px-2 py-0.5 rounded-full ${
              percentage >= 100 ? "bg-blue-100 text-blue-700" : "bg-blue-100 text-blue-700"
            }`}
          >
            {percentage}%
          </span>
        </div>
      )}
      <div className={`${size === "sm" ? "h-1.5" : "h-2"} bg-gray-100 rounded-full overflow-hidden`}>
        <div
          className={`h-full rounded-full transition-all duration-1000 ease-out ${barColor}`}
          style={{ width: `${width}%` }}
        />
      </div>
      {showLabels && (
        <div className="text-xs text-gray-400 mt-1">Goal: {formatINR(goal)}</div>
      )}
    </div>
  );
}
