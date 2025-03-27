import React from "react";

interface CopyToClipboardProps {
  valueToCopy: string;
}

const CopyToClipboard: React.FC<CopyToClipboardProps> = ({ valueToCopy }) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(valueToCopy);
    alert("Copied to clipboard!");
  };

  return <button onClick={handleCopy}>Copy</button>;
};

export default CopyToClipboard;
