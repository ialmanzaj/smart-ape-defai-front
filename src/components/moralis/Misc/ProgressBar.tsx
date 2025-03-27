import React from "react";

interface ProgressBarProps {
  value: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ value }) => {
  // Ensure the value does not exceed 100 or fall below 0
  const progress = Math.max(0, Math.min(100, value));

  return (
    <div className="progress-bar-container">
      <div
        className="progress-bar-fill"
        style={{ width: `${progress}%` }}
      ></div>
      <span className="progress-bar-text">{`${progress}%`}</span>
    </div>
  );
};

export default ProgressBar;
