import React from "react";
import { useData } from "../../../DataContext";

interface HistoryItemProps {
  transaction: any; // Replace 'any' with the appropriate type
}

const HistoryItem: React.FC<HistoryItemProps> = ({ transaction }) => {
  const { globalDataCache } = useData();

  return (
    <div>
      <h3>{transaction.title}</h3>
      {/* Render other transaction details */}
    </div>
  );
};

export default HistoryItem;
