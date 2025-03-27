import React, { createContext, useContext, useState } from 'react';

// Export the context for potential use elsewhere and provide a default value
export const DataContext = createContext({});

// Initial data cache
const initialDataCache = {
    selectedChain: localStorage.getItem('selectedChain') || 'eth'
};

// Custom hook to use the context
export const useData = () => {
  return useContext(DataContext);
}

// Data provider component
export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [globalDataCache, setGlobalDataCache] = useState(initialDataCache);

  // Debugging line
  console.log('Inside DataProvider', globalDataCache);

  return (
    <DataContext.Provider value={{ globalDataCache, setGlobalDataCache }}>
      {children}
    </DataContext.Provider>
  );
} 