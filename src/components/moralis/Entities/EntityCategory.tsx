import React from "react";

interface EntityCategoryProps {
  category: string;
}

const EntityCategory: React.FC<EntityCategoryProps> = ({ category }) => {
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

export default EntityCategory;
