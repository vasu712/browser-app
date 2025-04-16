import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, SafeAreaView, Text, TouchableOpacity, ScrollView } from 'react-native';
import { WebView } from 'react-native-webview';
import { useTabs } from '../context/TabsContext';
import TabBar from '../components/TabBar';

const BrowserScreen = () => {
  const { tabs, currentTabId, switchTab, addTab, closeTab, updateTabUrl } = useTabs();
  const currentTab = tabs.find(tab => tab.id === currentTabId);
  const [address, setAddress] = useState(currentTab.url);
  const [showHistory, setShowHistory] = useState(false);

  const handleGo = () => {
    let formatted = address;
    if (!formatted.startsWith('http')) {
      formatted = `https://www.google.com/search?q=${encodeURIComponent(formatted)}`;
    }
    updateTabUrl(currentTabId, formatted);
    setAddress(formatted);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchBar}>
        <TextInput
          style={styles.input}
          value={address}
          onChangeText={setAddress}
          placeholder="Enter URL or search..."
          onSubmitEditing={handleGo}
        />
        <Button title="Go" onPress={handleGo} />
      </View>

      <View style={styles.toggleHistory}>
        <Button
          title={showHistory ? 'Hide History' : 'Show History'}
          onPress={() => setShowHistory(!showHistory)}
        />
      </View>

      {showHistory && (
        <ScrollView style={styles.historyContainer}>
          <Text style={styles.historyTitle}>Browsing History</Text>
          {currentTab.history.map((url, index) => (
            <TouchableOpacity key={index} onPress={() => {
              updateTabUrl(currentTabId, url);
              setAddress(url);
              setShowHistory(false);
            }}>
              <Text style={styles.historyItem}>{url}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}

      <WebView
        source={{ uri: currentTab.url }}
        onNavigationStateChange={(navState) => {
          updateTabUrl(currentTabId, navState.url);
          setAddress(navState.url);
        }}
        style={styles.webview}
      />

      <TabBar
        tabs={tabs}
        currentTabId={currentTabId}
        onSwitch={switchTab}
        onClose={closeTab}
        onAdd={addTab}
      />
    </SafeAreaView>
  );
};

export default BrowserScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  searchBar: {
    flexDirection: 'row',
    padding: 10,
    gap: 10,
  },
  input: {
    flex: 1,
    borderColor: '#888',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  webview: {
    flex: 1,
    marginVertical: 10,
  },
  toggleHistory: {
    alignItems: 'flex-end',
    marginHorizontal: 10,
  },
  historyContainer: {
    maxHeight: 200,
    padding: 10,
    backgroundColor: '#f4f4f4',
    marginHorizontal: 10,
    borderRadius: 10,
  },
  historyTitle: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  historyItem: {
    paddingVertical: 4,
    color: '#007AFF',
  },
});
