

import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo-av';

export default function TrackReviewScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { track } = route.params;

  const [isPlaying, setIsPlaying] = useState(false);
  const [sound, setSound] = useState(null);
  const [rejectModalVisible, setRejectModalVisible] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');

  async function playPauseAudio() {
    if (sound) {
      if (isPlaying) {
        await sound.pauseAsync();
        setIsPlaying(false);
      } else {
        await sound.playAsync();
        setIsPlaying(true);
      }
    } else {
      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: 'https://sample-videos.com/audio/mp3/crowd-cheering.mp3' },
        { shouldPlay: true }
      );
      setSound(newSound);
      setIsPlaying(true);
    }
  }

  const handleAccept = () => {
    console.log('Track Accepted:', track.title);
    navigation.goBack();
  };

  const handleReject = () => {
    if (rejectionReason.trim() === '') return;
    console.log('Track Rejected:', track.title, 'Reason:', rejectionReason);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={26} color="#2a9df4" />
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={styles.title}>{track.title}</Text>
        <Text style={styles.artist}>by {track.artist}</Text>

        <TouchableOpacity style={styles.audioButton} onPress={playPauseAudio}>
          <Ionicons name={isPlaying ? 'pause' : 'play'} size={32} color="#2a9df4" />
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>Lyrics</Text>
        <ScrollView style={styles.lyricsContainer}>
          <Text style={styles.lyricsText}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum. 
            Cras venenatis euismod malesuada. (sample lyrics - replace with real lyrics)
          </Text>
        </ScrollView>

        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.acceptButton} onPress={handleAccept}>
            <Text style={styles.buttonText}>Accept</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.rejectButton} onPress={() => setRejectModalVisible(true)}>
            <Text style={styles.buttonText}>Reject</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        animationType="slide"
        transparent
        visible={rejectModalVisible}
        onRequestClose={() => setRejectModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Rejection Reason</Text>
            <TextInput
              placeholder="Enter reason..."
              placeholderTextColor="#aaa"
              style={styles.textInput}
              value={rejectionReason}
              onChangeText={setRejectionReason}
              multiline
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity onPress={() => setRejectModalVisible(false)}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleReject}>
                <Text style={styles.submitText}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0A0A0A', paddingTop: 50 },
  backButton: { marginLeft: 20, marginBottom: 10 },
  content: { flex: 1, alignItems: 'center', paddingHorizontal: 20 },
  title: { fontSize: 26, fontWeight: 'bold', color: '#fff', marginBottom: 8 },
  artist: { fontSize: 16, color: '#aaa', marginBottom: 20 },
  audioButton: { marginBottom: 30, backgroundColor: 'rgba(42,157,244,0.2)', padding: 20, borderRadius: 50 },
  sectionTitle: { fontSize: 18, color: '#2a9df4', fontWeight: 'bold', alignSelf: 'flex-start', marginBottom: 8 },
  lyricsContainer: { height: 200, width: '100%', backgroundColor: '#1a1a2e', borderRadius: 10, padding: 15 },
  lyricsText: { color: '#aaa', fontSize: 14 },
  buttonRow: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 30, width: '100%' },
  acceptButton: { backgroundColor: '#4CAF50', padding: 15, borderRadius: 10, width: '40%', alignItems: 'center' },
  rejectButton: { backgroundColor: '#f44336', padding: 15, borderRadius: 10, width: '40%', alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { width: '85%', backgroundColor: '#18182a', borderRadius: 15, padding: 20 },
  modalTitle: { color: '#2a9df4', fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  textInput: { backgroundColor: '#1a1a2e', color: '#fff', padding: 10, borderRadius: 10, height: 100, textAlignVertical: 'top' },
  modalButtons: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 },
  cancelText: { color: '#aaa', fontSize: 16 },
  submitText: { color: '#2a9df4', fontSize: 16, fontWeight: 'bold' },
});