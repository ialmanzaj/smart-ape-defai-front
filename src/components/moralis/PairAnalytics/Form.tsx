import React, { useState } from "react";
import { Button } from "reactstrap";
import { useData } from "../../DataContext";

interface FormProps {
	onSubmit: (data: { chain: string; address: string }) => void;
	loading: boolean;
	placeholder: string;
	buttonText: string;
}

const Form: React.FC<FormProps> = ({
	onSubmit,
	loading,
	placeholder,
	buttonText,
}) => {
	const [address, setAddress] = useState<string>("");
	const [chain, setChain] = useState<string>("eth"); // Default to Ethereum
	const { globalDataCache } = useData();

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		onSubmit({ chain, address });
	};

	return (
		<div className="container wallet-form">
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					placeholder={placeholder}
					value={address}
					onChange={(e) => setAddress(e.target.value)}
				/>
				<select
					value={chain}
					onChange={(e) => setChain(e.target.value)}
					className="chain-selector"
				>
					<option value="eth">Ethereum</option>
					<option value="base">Base</option>
					<option value="linea">Linea</option>
					<option value="solana">Solana</option>
				</select>
				<Button color="primary" type="submit" disabled={loading}>
					{loading ? "Loading..." : buttonText}
				</Button>
			</form>
		</div>
	);
};

export default Form;
