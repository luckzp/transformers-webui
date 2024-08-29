import React from "react";

interface ProgressProps {
  text: string;
  percentage: number;
}

export default function Progress({ text, percentage }: ProgressProps) {
  percentage = percentage ?? 0;
  return (
    <div className="relative h-6 bg-gray-200 rounded overflow-hidden">
      <div
        className="absolute top-0 left-0 h-full bg-blue-500 transition-all duration-300 ease-in-out"
        style={{ width: `${percentage}%` }}
      ></div>
      <div className="absolute inset-0 flex items-center justify-between px-2 text-xs text-white">
        <span>{text}</span>
        <span>{percentage.toFixed(2)}%</span>
      </div>
    </div>
  );
}
