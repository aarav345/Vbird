// BottomNavContext.js
import React, { createContext, useContext, useState } from 'react';

const BottomNavContext = createContext();

export const useBottomNav = () => {
  const context = useContext(BottomNavContext);
  if (!context) {
    throw new Error('useBottomNav must be used within a BottomNavProvider');
  }
  return context;
};

export const BottomNavProvider = ({ children }) => {
  const [activeNav, setActiveNav] = useState('Home');

  const setBottomNavActive = (nav) => {
    setActiveNav(nav);
  };

  const value = {
    activeNav,
    setBottomNavActive,
  };

  return (
    <BottomNavContext.Provider value={value}>
      {children}
    </BottomNavContext.Provider>
  );
};
