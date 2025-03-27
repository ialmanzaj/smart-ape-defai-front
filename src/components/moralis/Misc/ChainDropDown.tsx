import React from "react";

interface Chain {
	chain: string;
	label: string;
}

interface ChainDropDownProps {
	chains: Chain[];
	onChange: (value: string) => void;
	selectedChain: string;
}

const ChainDropDown: React.FC<ChainDropDownProps> = ({
	chains,
	onChange,
	selectedChain,
}) => {
	const handleDropdownChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const value = e.target.value;
		// Invoke the passed-in onChange callback.
		if (onChange) {
			onChange(value);
		}
	};

	return (
		<div>
			<select value={selectedChain} onChange={handleDropdownChange}>
				{chains.map((chain) => (
					<option key={chain.chain} value={chain.chain}>
						{chain.label}
					</option>
				))}
			</select>
		</div>
	);
};

export default ChainDropDown;
