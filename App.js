import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'react-native';
import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';
import ArtistLoginScreen from './ArtistLoginScreen';
import ArtistRegisterScreen from './ArtistRegisterScreen';
import MusicUploadScreen from './MusicUploadScreen';
import ContentLabelingScreen from './ContentLabelingScreen';
import RoleSelectionScreen from './RoleSelectionScreen';
import ModeratorDashboardScreen from './ModeratorDashboardScreen';
import UserPreferencesScreen from './UserPreferencesScreen';
import ArtistVerificationScreen from './ArtistVerificationScreen';
import PlayAudioTest from './PlayAudioTest'; // Import PlayAudioTest

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: '#000' },
          presentation: 'modal',
          detachPreviousScreen: false,
          transitionSpec: {
            open: {
              animation: 'spring',
              config: {
                stiffness: 300,
                damping: 30,
                mass: 1,
                overshootClamping: false,
                restDisplacementThreshold: 0.01,
                restSpeedThreshold: 0.01,
                useNativeDriver: true,
              },
            },
            close: {
              animation: 'spring',
              config: {
                stiffness: 300,
                damping: 30,
                mass: 1,
                overshootClamping: false,
                restDisplacementThreshold: 0.01,
                restSpeedThreshold: 0.01,
                useNativeDriver: true,
              },
            },
          },
          cardStyleInterpolator: ({ current, layouts }) => ({
            cardStyle: {
              transform: [
                {
                  translateY: current.progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [layouts.screen.height * 0.05, 0],
                  }),
                },
              ],
              opacity: current.progress.interpolate({
                inputRange: [0, 0.5, 1],
                outputRange: [0, 0.8, 1],
              }),
            },
            overlayStyle: {
              opacity: current.progress.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 0.3],
              }),
            },
          }),
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="ArtistRegister" component={ArtistRegisterScreen} />
        <Stack.Screen name="ArtistLogin" component={ArtistLoginScreen} />
        <Stack.Screen name="MusicUpload" component={MusicUploadScreen} />
        <Stack.Screen name="ContentLabel" component={ContentLabelingScreen} />
        <Stack.Screen name="RoleSelection" component={RoleSelectionScreen} />
        <Stack.Screen name="ModeratorDashboard" component={ModeratorDashboardScreen} />
        <Stack.Screen name="UserPreferences" component={UserPreferencesScreen} />
        <Stack.Screen name="ArtistVerification" component={ArtistVerificationScreen} />
        
        {/* Add PlayAudioTest as a screen */}
        <Stack.Screen name="PlayAudioTest" component={PlayAudioTest} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
