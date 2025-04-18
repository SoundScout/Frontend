import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { User } from 'lucide-react-native';
import BackButton from '../../components/BackButton';

export default function PendingArtistsScreen() {
  const navigation = useNavigation();

  const pendingArtists = [
    { id: '1', name: 'Cosmic Wanderers', email: 'cosmic@example.com', phone: '1234567890', portfolio: 'https://cosmicportfolio.com' },
    { id: '2', name: 'Stellar Echo', email: 'stellar@example.com', phone: '9876543210', portfolio: 'https://stellarecho.com' },
  ];

  const handleArtistPress = (artist) => {
    navigation.navigate('ArtistReview', { artist }); // ✅ Pass artist info to ArtistReviewScreen
  };

  const renderArtistItem = ({ item }) => (
    <TouchableOpacity style={styles.artistCard} onPress={() => handleArtistPress(item)}>
      <LinearGradient
        colors={['rgba(42, 157, 244, 0.1)', 'rgba(58, 119, 222, 0.2)']}
        style={styles.artistGradient}
      >
        <View style={styles.artistInfo}>
          <User size={26} color="#2a9df4" />
          <View style={{ marginLeft: 15 }}>
            <Text style={styles.artistName}>{item.name}</Text>
            <Text style={styles.artistEmail}>{item.email}</Text>
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <BackButton />
        <Text style={styles.headerTitle}>Pending Artists</Text>
      </View>
      <FlatList
        data={pendingArtists}
        keyExtractor={(item) => item.id}
        renderItem={renderArtistItem}
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
  listContent: { padding: 20 },
  artistCard: { marginBottom: 20, borderRadius: 15, overflow: 'hidden' },
  artistGradient: { padding: 20, borderRadius: 15 },
  artistInfo: { flexDirection: 'row', alignItems: 'center' },
  artistName: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  artistEmail: { color: '#aaa', fontSize: 14, marginTop: 4 },
});