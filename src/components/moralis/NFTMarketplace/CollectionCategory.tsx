import React from "react";

interface CollectionCategoryProps {
	category: string;
}

const CollectionCategory: React.FC<CollectionCategoryProps> = ({
	category,
}) => {
	const setCategory = (category: string) => {
		switch (category) {
			case "pfps":
				return `PFPs`;
			case "gaming":
				return `Gaming`;
			default:
				return category;
		}
	};

	return <div>{setCategory(category)}</div>;
};

export default CollectionCategory;
