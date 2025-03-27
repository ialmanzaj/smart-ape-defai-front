import React, { useState, useEffect } from "react";

interface TransactionImageProps {
	transaction: any; // Replace 'any' with the appropriate type
	chain: string;
}

const TransactionImage: React.FC<TransactionImageProps> = ({
	transaction,
	chain,
}) => {
	const [imageUrl, setImageUrl] = useState<string | null>(null);

	useEffect(() => {
		const fetchImageUrl = async () => {
			// Logic to fetch image URL based on transaction and chain
		};

		fetchImageUrl();
	}, [transaction, chain]);

	return <img src={imageUrl || "/path/to/placeholder.png"} alt="Transaction" />;
};

export default TransactionImage;
