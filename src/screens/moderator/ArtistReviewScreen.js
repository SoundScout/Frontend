import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

export default function ArtistReviewScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { artist } = route.params;

  const handleAccept = () => {
    console.log('Artist Approved:', artist.name);
    navigation.goBack();
  };

  const handleReject = () => {
    console.log('Artist Kept as Listener:', artist.name);
    navigation.goBack();
  };

  const openPortfolio = () => {
    if (artist.portfolio) {
      Linking.openURL(artist.portfolio);
    } else {
      Alert.alert('No portfolio link available.');
    }
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={28} color="#2a9df4" />
      </TouchableOpacity>

      {/* Artist Information */}
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Name</Text>
        <Text style={styles.value}>{artist.name}</Text>

        <Text style={styles.label}>Email</Text>
        <Text style={styles.value}>{artist.email}</Text>

        <Text style={styles.label}>Phone Number</Text>
        <Text style={styles.value}>{artist.phone}</Text>

        <Text style={styles.label}>Portfolio</Text>
        <TouchableOpacity onPress={openPortfolio}>
          <Text style={[styles.value, { color: '#2a9df4', textDecorationLine: 'underline' }]}>
            {artist.portfolio || 'No portfolio link'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Buttons */}
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.acceptButton} onPress={handleAccept}>
          <Text style={styles.buttonText}>Activate</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.rejectButton} onPress={handleReject}>
          <Text style={styles.buttonText}>Keep as Listener</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0A0A0A', paddingTop: 50, paddingHorizontal: 20 },
  backButton: { marginBottom: 20 },
  infoContainer: { flex: 1 },
  label: { color: '#2a9df4', fontSize: 16, fontWeight: 'bold', marginBottom: 5, marginTop: 15 },
  value: { color: '#fff', fontSize: 16, marginBottom: 10 },
  buttonRow: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 30 },
  acceptButton: { backgroundColor: '#4CAF50', paddingVertical: 14, paddingHorizontal: 24, borderRadius: 10 },
  rejectButton: { backgroundColor: '#f44336', paddingVertical: 14, paddingHorizontal: 24, borderRadius: 10 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});