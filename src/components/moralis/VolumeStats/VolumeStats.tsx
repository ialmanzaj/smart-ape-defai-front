import React, { useState, useEffect } from "react";
import { useData } from "../../../DataContext";
import VolumeCategoryBars from "./VolumeCategoryBars";
import Loader from "../Misc/Loader";

const VolumeStats: React.FC = () => {
  const { globalDataCache, setGlobalDataCache } = useData();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/api/volume/categories`,
        );
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }
        const data = await response.json();
        setGlobalDataCache((prevData) => ({
          ...prevData,
          volumeCategories: data.categories,
          volumeChains: data.chains,
        }));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, [setGlobalDataCache]);

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <VolumeCategoryBars categories={globalDataCache.volumeCategories} />
      )}
    </div>
  );
};

export default VolumeStats;
