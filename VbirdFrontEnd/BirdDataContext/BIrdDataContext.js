import React, { createContext, useContext, useState } from 'react';

const BirdDataContext = createContext();

export const BirdDataProvider = ({ children }) => {
  const [birdData, setBirdData] = useState([]);

  const setBirdDataAndStore = (data) => {
    setBirdData(data);
  };

  return (
    <BirdDataContext.Provider value={{ birdData, setBirdData: setBirdDataAndStore }}>
      {children}
    </BirdDataContext.Provider>
  );
};

export const useBirdData = () => {
  const context = useContext(BirdDataContext);
  if (!context) {
    throw new Error('useBirdData must be used within a BirdDataProvider');
  }
  return context;
};
