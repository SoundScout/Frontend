import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Eye, EyeOff } from 'lucide-react-native';
import { validateEmail, validatePassword } from '../../utils/validators';
import { useAuth } from '../../contexts/AuthContext'; // ✅ Context
import { useNavigation } from '@react-navigation/native'; // ✅ Navigation

/**
 * LoginForm Use Cases:
 *
 * 1. Validate email format before proceeding.
 * 2. Validate password complexity before proceeding.
 * 3. If both fields are valid:
 *    - Save the user login information using AuthContext.
 *    - Set the role as "listener" by default after login.
 *    - Reset navigation stack and redirect user to "MainApp" (BottomNavigator).
 * 
 * Additional Notes:
 * - Password visibility toggle (eye icon) allows user to see or hide the password.
 * - Error messages are dynamically shown if validation fails.
 */

export default function LoginForm() {
  const [email, setEmail] = useState('test@example.com');
  const [password, setPassword] = useState('Test1234');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const { login } = useAuth(); // ✅ Auth
  const navigation = useNavigation(); // ✅ Navigation

  const handleLogin = () => {
    let hasError = false;

    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address.');
      hasError = true;
    }

    if (!validatePassword(password)) {
      setPasswordError('Password must be at least 6 characters with one letter and one number.');
      hasError = true;
    }

    if (hasError) return;

    // ✅ Save user info and role
    login({ email }, 'listener'); // Default login as "listener"

    // ✅ Navigate to Home screen and reset stack
    navigation.reset({
      index: 0,
      routes: [{ name: 'MainApp' }],
    });
  };

  return (
    <>
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
        <View style={styles.passwordContainer}>
          <TextInput
            style={[styles.input, passwordError && styles.inputError]}
            placeholder="Password"
            placeholderTextColor="#aaa"
            secureTextEntry={!passwordVisible}
            value={password}
            onChangeText={text => {
              setPassword(text);
              if (passwordError) setPasswordError('');
            }}
          />
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => setPasswordVisible(!passwordVisible)}
          >
            {passwordVisible ? (
              <Eye size={22} color="#aaa" />
            ) : (
              <EyeOff size={22} color="#aaa" />
            )}
          </TouchableOpacity>
        </View>
        {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
      </View>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
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
  passwordContainer: {
    position: 'relative',
    width: '100%',
  },
  eyeIcon: {
    position: 'absolute',
    right: 16,
    top: 12,
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