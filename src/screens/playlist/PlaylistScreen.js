import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useRoute } from '@react-navigation/native';
import BackButton from '../../components/BackButton'; // ✅ Correct import!
import CheckBox from 'react-native-check-box';

export default function PlaylistScreen() {
  const route = useRoute();
  const { playlistTitle, tracks, isForYou } = route.params;
  const [checkedTracks, setCheckedTracks] = useState({});

  const renderTrack = ({ item }) => {
    const isChecked = !!checkedTracks[item.id];
    return (
      <View style={styles.trackItem}>
        <Text style={styles.trackTitle}>{item.title}</Text>
        {isForYou && (
          <CheckBox
            isChecked={isChecked}
            onClick={() =>
              setCheckedTracks(prev => ({
                ...prev,
                [item.id]: !prev[item.id],
              }))
            }
            style={styles.checkboxButton}
            checkBoxColor="#2a9df4"
          />
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Top Bar with BackButton and Playlist Title */}
      <View style={styles.topBar}>
        <BackButton />
        <Text style={styles.topBarTitle}>{playlistTitle}</Text>
      </View>

      {/* Tracks List */}
      <FlatList
        data={tracks}
        keyExtractor={(item) => item.id}
        renderItem={renderTrack}
        contentContainerStyle={styles.trackList}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0A',
    paddingTop: 50,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  topBarTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 20,
  },
  trackList: {
    paddingBottom: 100,
    paddingHorizontal: 20,
  },
  trackItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a2e',
    borderRadius: 15,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#2a9df4',
  },
  trackTitle: {
    flex: 1,
    color: '#fff',
    fontSize: 18,
  },
  checkboxButton: {
    width: 24,
    height: 24,
    borderWidth: 0,
    borderColor: '#2a9df4',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkbox: {
    width: 12,
    height: 12,
    backgroundColor: 'transparent',
    borderRadius: 2,
  },
});