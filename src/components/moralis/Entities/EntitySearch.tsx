import React, { useState, useEffect, useRef } from "react";
import * as utilities from "../../../utilities.js";
import { useNavigate } from "react-router-dom";
import { useData } from "../../../DataContext.js";

const EntitySearch: React.FC = () => {
  const { globalDataCache, setGlobalDataCache } = useData();
  const [query, setQuery] = useState<string>("");
  const [entities, setEntities] = useState<any[]>([]);
  const [addresses, setAddresses] = useState<any[]>([]);
  const [searchCategories, setSearchCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const searchRef = useRef<HTMLDivElement | null>(null);
  const hasResults = entities.length > 0 || addresses.length > 0;
  const navigate = useNavigate();

  const performSearch = async () => {
    if (query.length < 3) {
      setEntities([]);
      setAddresses([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/entities?query=${query}`,
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setEntities(data.result.entities.slice(0, 5));
      setAddresses(data.result.addresses.slice(0, 5));
      setSearchCategories(data.result.categories.slice(0, 5));
    } catch (error) {
      console.error("Search error:", error.message);
      alert("Failed to fetch data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timerId = setTimeout(performSearch, 300);
    return () => clearTimeout(timerId);
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setEntities([]);
        setAddresses([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/api/entities/categories`,
        );
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }
        const data = await response.json();
        setGlobalDataCache((prevData) => ({
          ...prevData,
          entityCategories: data,
        }));
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    if (!globalDataCache.entities) {
      fetchCategories();
    }
  }, [globalDataCache, setGlobalDataCache]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleAddressClick = (address: string) => {
    navigate(`/wallets/${address}`);
  };

  const handleEntityClick = (entity: any) => {
    navigate(`/entities/${entity.id}`, { state: { entity } });
  };

  return (
    <div ref={searchRef}>
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search for entities..."
      />
      {/* Render entities and addresses */}
    </div>
  );
};

export default EntitySearch;
