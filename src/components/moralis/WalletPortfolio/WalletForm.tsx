import React, { useState } from "react";
import { Button } from "reactstrap";

interface WalletFormProps {
  onSubmit: (address: string) => void;
  loading: boolean;
  placeholder: string;
  buttonText: string;
}

const WalletForm: React.FC<WalletFormProps> = ({
  onSubmit,
  loading,
  placeholder,
  buttonText,
}) => {
  const [address, setAddress] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const isValidEthereumAddress = (address: string) =>
    /^(0x[a-fA-F0-9]{40})|([a-zA-Z0-9-]+\.eth)$/.test(address);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValidEthereumAddress(address)) {
      setError(null);
      onSubmit(address);
    } else {
      setError("Please enter a valid Ethereum address.");
    }
  };

  return (
    <div className="wallet-form container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder={placeholder}
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <Button color="primary">{loading ? "Loading..." : buttonText}</Button>
      </form>
      {error && <p className="error-msg">{error}</p>}
    </div>
  );
};

export default WalletForm;
