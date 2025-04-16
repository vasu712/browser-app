
import React from 'react';
import { TabsProvider } from './context/TabsContext';
import BrowserScreen from './screens/BrowserScreen';

export default function App() {
  return (
    <TabsProvider>
      <BrowserScreen />
    </TabsProvider>
  );
}
