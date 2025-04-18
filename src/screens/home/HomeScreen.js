import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const navigation = useNavigation();

  const dummyTracks = Array.from({ length: 10 }).map((_, index) => ({
    id: index.toString(),
    title: `Track ${index + 1}`,
  }));

  const playlists = [
    { id: '1', title: 'For You', tracks: dummyTracks, isForYou: true },
    { id: '2', title: 'Most Liked', tracks: dummyTracks, isForYou: false },
    { id: '3', title: 'Admin Picks', tracks: dummyTracks, isForYou: false },
    { id: '4', title: 'Liked Songs', tracks: dummyTracks, isForYou: false },
  ];

  const handleOpenPlaylist = (playlist) => {
    navigation.navigate('Playlist', {
      playlistTitle: playlist.title,
      tracks: playlist.tracks,
      isForYou: playlist.isForYou,
    });
  };

  const renderPlaylistItem = ({ item }) => (
    <TouchableOpacity style={styles.playlistItem} onPress={() => handleOpenPlaylist(item)}>
      <Text style={styles.playlistTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#0A0A0A', '#18182a', '#1f1f2e']}
        style={StyleSheet.absoluteFillObject}
      />
      <FlatList
        data={playlists}
        keyExtractor={(item) => item.id}
        renderItem={renderPlaylistItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 50 : 30, // margin under status bar
  },
  centeredContainer: {
    flex: 1,
    paddingTop: 100,
    justifyContent: 'center', // ✅ center vertically
  },
  listContent: {
    paddingHorizontal: 20,
    marginTop: 100,
  },
  playlistItem: {
    backgroundColor: '#1a1a2e',
    borderRadius: 20,
    paddingVertical: 25,
    paddingHorizontal: 24,
    marginBottom: 20,
    shadowColor: '#2a9df4',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
    borderWidth: 1,
    borderColor: '#2a9df4',
  },
  playlistTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});