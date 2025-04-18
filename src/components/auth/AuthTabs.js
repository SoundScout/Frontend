import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function AuthTabs({ isLogin, setIsLogin }) {
  return (
    <View style={styles.tabContainer}>
      <TouchableOpacity 
        style={[styles.tab, isLogin && styles.activeTab]} 
        onPress={() => setIsLogin(true)}
      >
        <Text style={[styles.tabText, isLogin && styles.activeTabText]}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={[styles.tab, !isLogin && styles.activeTab]} 
        onPress={() => setIsLogin(false)}
      >
        <Text style={[styles.tabText, !isLogin && styles.activeTabText]}>Register</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 24,
    justifyContent: 'space-between',
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  activeTab: {
    backgroundColor: '#555',
    borderWidth: 2,
    borderColor: '#2a9df4',
  },
  tabText: {
    color: '#aaa',
    fontSize: 18,
  },
  activeTabText: {
    color: 'white',
    fontWeight: '600',
  },
});