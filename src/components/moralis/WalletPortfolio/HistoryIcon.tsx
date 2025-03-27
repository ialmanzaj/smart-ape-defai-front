import React from "react";

interface HistoryIconProps {
  category: string;
}

const HistoryIcon: React.FC<HistoryIconProps> = ({ category }) => {
  const getIcon = (category: string) => {
    switch (category) {
      case "send":
        return <svg> {/* SVG for send */} </svg>;
      case "receive":
        return <svg> {/* SVG for receive */} </svg>;
      // Add other cases as needed
      default:
        return null;
    }
  };

  return <div>{getIcon(category)}</div>;
};

export default HistoryIcon;
