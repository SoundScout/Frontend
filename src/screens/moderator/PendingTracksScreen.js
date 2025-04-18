import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Music } from 'lucide-react-native';
import BackButton from '../../components/BackButton';

export default function PendingTracksScreen() {
  const navigation = useNavigation();

  // Dummy pending tracks (later you fetch from backend)
  const pendingTracks = [
    { id: '1', title: 'Horizon Dreams', artist: 'Cosmic Wanderers' },
    { id: '2', title: 'Neon Streets', artist: 'Stellar Echo' },
    { id: '3', title: 'Deep Blue', artist: 'WaveRunner' },
  ];

  const handleTrackPress = (track) => {
    navigation.navigate('TrackReview', { track }); // ✅ Pass track info to review screen
  };

  const renderTrackItem = ({ item }) => (
    <TouchableOpacity style={styles.trackCard} onPress={() => handleTrackPress(item)}>
      <LinearGradient
        colors={['rgba(42, 157, 244, 0.1)', 'rgba(58, 119, 222, 0.2)']}
        style={styles.trackGradient}
      >
        <View style={styles.trackInfo}>
          <Music size={26} color="#2a9df4" />
          <View style={{ marginLeft: 15 }}>
            <Text style={styles.trackTitle}>{item.title}</Text>
            <Text style={styles.trackArtist}>{item.artist}</Text>
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <BackButton />
        <Text style={styles.headerTitle}>Pending Tracks</Text>
      </View>
      <FlatList
        data={pendingTracks}
        keyExtractor={(item) => item.id}
        renderItem={renderTrackItem}
        contentContainerStyle={[styles.listContent, { paddingTop: 20 }]}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0A0A0A' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 22,
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 10,
  },
  listContent: { 
    paddingHorizontal: 20,
  },
  trackCard: { marginBottom: 20, borderRadius: 15, overflow: 'hidden' },
  trackGradient: { padding: 20, borderRadius: 15 },
  trackInfo: { flexDirection: 'row', alignItems: 'center' },
  trackTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  trackArtist: { color: '#aaa', fontSize: 14, marginTop: 4 },
});