import React, { createContext, useContext, useState } from "react";

const AppContext = createContext();

export function useAppContext() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useAppContext must be used within a AppContextProvider");
  }

  return context;
}

export function AppContextProvider(props) {
  const [stories, setStories] = useState({});

  const value = {
    storiesObj: stories,
    stories: Object.values(stories),
    setStories
  };

  return <AppContext.Provider value={value} {...props} />;
}

export default {
  AppContextProvider,
  useAppContext
};
