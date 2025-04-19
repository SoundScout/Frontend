import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { User, Shield } from "lucide-react-native";

export default function RoleSelectionScreen() {
  const navigation = useNavigation();
  
  const continueAsUser = () => {
    navigation.navigate('UserPreferences'); // Navigate to user dashboard
  };

  const continueAsModerator = () => {
    navigation.navigate('ModeratorDashboard'); // Navigate to moderator dashboard
  };
  const goBack = () => {
    navigation.goBack();
  };
  return (
    <View style={styles.container}>
      {/* Background Gradient */}
      <LinearGradient
        colors={['#0A0A0A', '#101020', '#18182a']}
        style={styles.backgroundGradient}
      />

      {/* Animated Background Elements */}
      <View style={styles.backgroundElements}>
        <View style={[styles.circleBg, { top: '5%', left: '10%', opacity: 0.2 }]} />
        <View style={[styles.circleBg, { top: '30%', right: '-5%', opacity: 0.15 }]} />
        <View style={[styles.circleBg, { bottom: '10%', left: '5%', opacity: 0.1 }]} />
      </View>

      {/* Welcome Text */}
      <Text style={styles.welcomeText}>Welcome to</Text>
      <Text style={styles.logo}>SoundScout</Text>
      
      {/* Selection Title */}
      <Text style={styles.selectionTitle}>Continue as:</Text>

      {/* Role Selection Card */}
      <View style={styles.cardsContainer}>
        {/* User Option */}
        <TouchableOpacity 
          style={styles.roleCard} 
          onPress={continueAsUser}
        >
          <User size={48} color="#2a9df4" />
          <Text style={styles.roleTitle}>User</Text>
          <Text style={styles.roleDescription}>
            Discover and enjoy music, create playlists, and follow artists
          </Text>
        </TouchableOpacity>

        {/* Moderator Option - This is where the error was */}
        <TouchableOpacity 
          style={styles.roleCard} 
          onPress={continueAsModerator}
        >
          <Shield size={48} color="#2a9df4" />
          <Text style={styles.roleTitle}>Moderator</Text>
          <Text style={styles.roleDescription}>
            Review content, manage reports, and ensure community guidelines
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  
  welcomeText: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 8,
  },
  
  logo: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#fff',
    textShadowColor: '#2a9df4',
    textShadowRadius: 10,
    textShadowOffset: { width: 10, height: 5 },
    marginBottom: 40,
  },
  
  selectionTitle: {
    fontSize: 24,
    color: "#fff",
    marginBottom: 24,
    textAlign: "center",
  },

  cardsContainer: {
    width: "100%",
    flexDirection: "column",
    justifyContent: "space-between",
  },

  roleCard: {
    backgroundColor: "#444",
    borderRadius: 20,
    width: "100%",
    padding: 24,
    marginBottom: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    borderWidth: 2,
    borderColor: '#2a9df4'
  },
  
  roleTitle: {
    color: "white",
    fontSize: 24,
    fontWeight: "600",
    marginTop: 16,
    marginBottom: 8,
  },
  
  roleDescription: {
    color: "#bbb",
    fontSize: 16,
    textAlign: "center",
  },

  // Background Gradient
  backgroundGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },

  // Animated Background Elements
  backgroundElements: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },

  // Circles for background
  circleBg: {
    position: 'absolute',
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: '#2a9df4',
    opacity: 0.1,
  },
});