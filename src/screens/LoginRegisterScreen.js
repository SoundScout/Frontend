import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native'; // ✅ you forgot this also
import AuthTabs from '../components/auth/AuthTabs';
import LoginForm from '../components/auth/LoginForm';
import RegisterForm from '../components/auth/RegisterForm';

export default function LoginRegisterScreen() {
  const [isLogin, setIsLogin] = useState(true);
  const navigation = useNavigation(); // ✅ important for navigating to ArtistRegister

  return (
    <View style={styles.container}>
      {/* Background Gradient */}
      <LinearGradient
        colors={['#0A0A0A', '#101020', '#18182a']}
        style={styles.backgroundGradient}
      />

      {/* Animated Background Circles */}
      <View style={styles.backgroundElements}>
        <View style={[styles.circleBg, { top: '5%', left: '10%', opacity: 0.2 }]} />
        <View style={[styles.circleBg, { top: '30%', right: '-5%', opacity: 0.15 }]} />
        <View style={[styles.circleBg, { bottom: '10%', left: '5%', opacity: 0.1 }]} />
      </View>

      {/* Logo and Tagline */}
      <Text style={styles.logo}>SoundScout</Text>
      <Text style={styles.tagline}>Your personal music scout</Text>
      <Text style={styles.discoveryText}>
        Discover music that resonates with your{" "}
        <Text style={styles.italic}>soul</Text>
      </Text>

      {/* Auth Card */}
      <View style={styles.card}>
        {/* Tabs */}
        <AuthTabs isLogin={isLogin} setIsLogin={setIsLogin} />

        {/* Form */}
        {isLogin ? <LoginForm /> : <RegisterForm />}

        {/* Register as Artist Link */}
        <TouchableOpacity 
          style={styles.artistLink} 
          onPress={() => navigation.navigate('ArtistRegister')}
        >
          <Text style={styles.artistLinkText}>Register as an Artist</Text>
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
  backgroundGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  backgroundElements: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  circleBg: {
    position: 'absolute',
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: '#2a9df4',
    opacity: 0.1,
  },
  logo: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#fff',
    textShadowColor: '#2a9df4',
    textShadowRadius: 10,
    textShadowOffset: { width: 10, height: 5 },
    marginBottom: 8,
  },
  tagline: {
    fontSize: 16,
    fontStyle: "italic",
    color: "#aaa",
    marginTop: 4,
  },
  discoveryText: {
    color: "#aaa",
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
  },
  italic: {
    fontStyle: "italic",
  },
  card: {
    backgroundColor: "#444",
    borderRadius: 20,
    width: "100%",
    marginTop: 32,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    borderWidth: 2,
    borderColor: '#2a9df4',
  },
  artistLink: {
    marginTop: 16,
    alignItems: "center",
  },
  artistLinkText: {
    color: "#bbb",
    fontSize: 14,
  },
});