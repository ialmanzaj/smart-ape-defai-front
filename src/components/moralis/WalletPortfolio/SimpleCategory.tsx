import React from "react";

interface SimpleCategoryProps {
	category: string;
}

const SimpleCategory: React.FC<SimpleCategoryProps> = ({ category }) => {
	const setCategory = (category: string) => {
		switch (category) {
			case "send":
				return "Sent";
			case "receive":
				return "Received";
			// Add other cases as needed
			default:
				return "";
		}
	};

	return <div>{setCategory(category)}</div>;
};

export default SimpleCategory;
