import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { validateEmail, validatePassword } from '../../utils/validators';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigation } from '@react-navigation/native';

export default function RegisterForm() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const { login } = useAuth();
  const navigation = useNavigation();

  const handleRegister = () => {
    let hasError = false;
  
    if (!username.trim()) {
      setUsernameError('Username is required.');
      hasError = true;
    }
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address.');
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
  
    // ✅ Success: Register as listener
    login({ email, username }, 'listener');
  
    // ✅ Clear fields
    setUsername('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  
    // ✅ Correct navigation:
    navigation.reset({
      index: 0,
      routes: [{ name: 'MainApp' }],
    });
  };
  return (
    <>
      <View style={styles.inputWrapper}>
        <TextInput
          style={[styles.input, usernameError && styles.inputError]}
          placeholder="Username"
          placeholderTextColor="#aaa"
          value={username}
          onChangeText={text => {
            setUsername(text);
            if (usernameError) setUsernameError('');
          }}
        />
        {usernameError ? <Text style={styles.errorText}>{usernameError}</Text> : null}
      </View>

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

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  inputWrapper: {
    width: '100%',
    marginBottom: 16,
  },
  input: {
    backgroundColor: '#fff',
    color: '#333',
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
});