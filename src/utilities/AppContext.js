import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export function useAppContext() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error('useAppContext must be used within a AppContextProvider');
  }

  return context;
}

const getInitialStories = () => {
  const storedStories = localStorage.getItem('stories');

  if (storedStories) {
    return JSON.parse(storedStories);
  }

  return {};
};

export function AppContextProvider(props) {
  const [stories, setStories] = useState(getInitialStories);
  const [contentType, setContentType] = useState(
    localStorage.getItem('contentType')
  );

  const setContentTypeAndStore = (state) => {
    localStorage.setItem('contentType', state);
    setContentType(state);
  };

  const value = {
    contentType,
    setContentType: setContentTypeAndStore,
    storiesObj: stories,
    stories: Object.values(stories),
    setStories,
  };

  return <AppContext.Provider value={value} {...props} />;
}

export default {
  AppContextProvider,
  useAppContext,
};
