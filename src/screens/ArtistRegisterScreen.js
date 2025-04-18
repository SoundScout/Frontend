import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { validateEmail, validatePassword } from '../utils/validators'; 

export default function ArtistRegisterScreen() {
  const navigation = useNavigation();

  const [artistName, setArtistName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [portfolioLink, setPortfolioLink] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [artistNameError, setArtistNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [portfolioError, setPortfolioError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const handleArtistRegister = () => {
    let hasError = false;

    if (!artistName.trim()) {
      setArtistNameError('Artist Name is required.');
      hasError = true;
    }
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address.');
      hasError = true;
    }
    if (!phoneNumber.trim() || !/^\d{7,15}$/.test(phoneNumber)) {
      setPhoneError('Please enter a valid phone number (7-15 digits).');
      hasError = true;
    }
    if (!portfolioLink.trim()) {
      setPortfolioError('Portfolio link is required.');
      hasError = true;
    } else if (!/^https?:\/\/\S+\.\S+$/.test(portfolioLink)) {
      setPortfolioError('Please enter a valid URL starting with http or https.');
      hasError = true;
    }
    if (!validatePassword(password)) {
      setPasswordError('Password must be at least 6 characters long and contain at least one letter and one number.');
      hasError = true;
    }
    if (password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match.');
      hasError = true;
    }

    if (hasError) return;

    console.log('Artist Register successful:', { artistName, email, phoneNumber, portfolioLink, password });
  };

  return (
    <View style={styles.container}>
      {/* Background Gradient */}
      <LinearGradient
        colors={['#0A0A0A', '#101020', '#18182a']}
        style={styles.backgroundGradient}
      />

      {/* Background Circles */}
      <View style={styles.backgroundElements}>
        <View style={[styles.circleBg, { top: '5%', left: '10%', opacity: 0.2 }]} />
        <View style={[styles.circleBg, { top: '30%', right: '-5%', opacity: 0.15 }]} />
        <View style={[styles.circleBg, { bottom: '10%', left: '5%', opacity: 0.1 }]} />
      </View>

      <Text style={styles.logo}>Artist Registration</Text>

      <View style={styles.card}>
        {/* Artist Name */}
        <View style={styles.inputWrapper}>
          <TextInput
            style={[styles.input, artistNameError && styles.inputError]}
            placeholder="Artist Name"
            placeholderTextColor="#aaa"
            value={artistName}
            onChangeText={text => {
              setArtistName(text);
              if (artistNameError) setArtistNameError('');
            }}
          />
          {artistNameError ? <Text style={styles.errorText}>{artistNameError}</Text> : null}
        </View>

        {/* Email */}
        <View style={styles.inputWrapper}>
          <TextInput
            style={[styles.input, emailError && styles.inputError]}
            placeholder="Email"
            placeholderTextColor="#aaa"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={text => {
              setEmail(text);
              if (emailError) setEmailError('');
            }}
          />
          {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
        </View>

        {/* Phone Number */}
        <View style={styles.inputWrapper}>
          <TextInput
            style={[styles.input, phoneError && styles.inputError]}
            placeholder="Phone Number"
            placeholderTextColor="#aaa"
            keyboardType="phone-pad"
            value={phoneNumber}
            onChangeText={text => {
              setPhoneNumber(text);
              if (phoneError) setPhoneError('');
            }}
          />
          {phoneError ? <Text style={styles.errorText}>{phoneError}</Text> : null}
        </View>

        {/* Portfolio Link */}
        <View style={styles.inputWrapper}>
          <TextInput
            style={[styles.input, portfolioError && styles.inputError]}
            placeholder="Portfolio Link"
            placeholderTextColor="#aaa"
            value={portfolioLink}
            onChangeText={text => {
              setPortfolioLink(text);
              if (portfolioError) setPortfolioError('');
            }}
          />
          {portfolioError ? <Text style={styles.errorText}>{portfolioError}</Text> : null}
        </View>

        {/* Password */}
        <View style={styles.inputWrapper}>
          <TextInput
            style={[styles.input, passwordError && styles.inputError]}
            placeholder="Password"
            placeholderTextColor="#aaa"
            secureTextEntry
            value={password}
            onChangeText={text => {
              setPassword(text);
              if (passwordError) setPasswordError('');
            }}
          />
          {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
        </View>

        {/* Confirm Password */}
        <View style={styles.inputWrapper}>
          <TextInput
            style={[styles.input, confirmPasswordError && styles.inputError]}
            placeholder="Confirm Password"
            placeholderTextColor="#aaa"
            secureTextEntry
            value={confirmPassword}
            onChangeText={text => {
              setConfirmPassword(text);
              if (confirmPasswordError) setConfirmPasswordError('');
            }}
          />
          {confirmPasswordError ? <Text style={styles.errorText}>{confirmPasswordError}</Text> : null}
        </View>

        {/* Register Button */}
        <TouchableOpacity style={styles.button} onPress={handleArtistRegister}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>

        {/* Back to Login Link */}
        <TouchableOpacity style={styles.backLink} onPress={() => navigation.goBack()}>
          <Text style={styles.backLinkText}>Back to Login</Text>
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
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
    marginTop: 20,
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
  inputWrapper: {
    width: '100%',
    marginBottom: 16,
  },
  input: {
    backgroundColor: "#fff",
    color: "#333",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#ccc',
  },
  inputError: {
    borderColor: '#FF4C4C',
  },
  errorText: {
    color: '#FF4C4C',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 10,
  },
  button: {
    backgroundColor: "#555",
    paddingVertical: 12,
    borderRadius: 25,
    marginTop: 24,
    alignItems: "center",
    borderWidth: 2,
    borderColor: '#2a9df4',
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
  backLink: {
    marginTop: 16,
    alignItems: "center",
  },
  backLinkText: {
    color: "#bbb",
    fontSize: 14,
  },
});