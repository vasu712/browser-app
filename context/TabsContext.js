
import React, { createContext, useContext, useState } from 'react';

const TabsContext = createContext();

export const TabsProvider = ({ children }) => {
  const [tabs, setTabs] = useState([
    {
      id: Date.now(),
      url: 'https://www.google.com',
      history: ['https://www.google.com'],
    },
  ]);

  const [currentTabId, setCurrentTabId] = useState(tabs[0].id);

  const addTab = () => {
    if (tabs.length >= 3) return;
    const newTab = {
      id: Date.now(),
      url: 'https://www.google.com',
      history: ['https://www.google.com'],
    };
    setTabs(prev => [...prev, newTab]);
    setCurrentTabId(newTab.id);
  };

  const closeTab = (tabId) => {
    if (tabs.length === 1) return;
    const newTabs = tabs.filter(tab => tab.id !== tabId);
    setTabs(newTabs);
    if (currentTabId === tabId) {
      setCurrentTabId(newTabs[0].id);
    }
  };

  const switchTab = (tabId) => {
    setCurrentTabId(tabId);
  };

  const updateTabUrl = (tabId, url) => {
    setTabs(prev =>
      prev.map(tab =>
        tab.id === tabId
          ? {
              ...tab,
              url,
              history: tab.history.includes(url)
                ? tab.history
                : [...tab.history, url],
            }
          : tab
      )
    );
  };

  return (
    <TabsContext.Provider
      value={{
        tabs,
        currentTabId,
        addTab,
        closeTab,
        switchTab,
        updateTabUrl,
      }}
    >
      {children}
    </TabsContext.Provider>
  );
};

export const useTabs = () => useContext(TabsContext);
