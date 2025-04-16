
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const TabBar = ({ tabs, currentTabId, onSwitch, onAdd, onClose }) => {
  return (
    <View style={styles.tabBar}>
      {tabs.map(tab => (
        <TouchableOpacity
          key={tab.id}
          onPress={() => onSwitch(tab.id)}
          onLongPress={() => onClose(tab.id)}
          style={[
            styles.tab,
            tab.id === currentTabId && styles.activeTab
          ]}
        >
          <Text style={styles.tabText}>
            Tab {tabs.indexOf(tab) + 1}
          </Text>
        </TouchableOpacity>
      ))}
      {tabs.length < 3 && (
        <TouchableOpacity onPress={onAdd} style={styles.newTab}>
          <Text style={styles.tabText}>+</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default TabBar;

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#eee',
    padding: 5,
    justifyContent: 'space-around',
  },
  tab: {
    padding: 10,
    backgroundColor: '#ccc',
    marginHorizontal: 4,
    borderRadius: 6,
  },
  activeTab: {
    backgroundColor: '#007AFF',
  },
  tabText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  newTab: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 6,
  },
});
