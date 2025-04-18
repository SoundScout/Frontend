import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useAuth } from '../contexts/AuthContext';
import { Ionicons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable'; // ✅ import Animatable

// Listener Screens
import HomeScreen from '../screens/home/HomeScreen';
import ExploreScreen from '../screens/listener/SearchScreen';
import NotificationScreen from '../screens/listener/NotificationScreen';
import ProfileScreen from '../screens/listener/ProfileScreen';
import SettingsScreen from '../screens/listener/SettingsScreen';

// Artist Screens
import UploadMusicScreen from '../screens/artist/UploadMusicScreen';
import MusicStatisticsScreen from '../screens/artist/MusicStatisticsScreen';

// Moderator Screens
import ReviewScreen from '../screens/moderator/ReviewScreen';

const Tab = createBottomTabNavigator();

export default function BottomNavigator() {
  const { role } = useAuth();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#2a9df4',
        tabBarInactiveTintColor: '#aaa',
        tabBarStyle: {
          backgroundColor: '#101020',
          borderTopColor: '#2a9df4',
          borderTopWidth: 1,
          height: 90,
          paddingBottom: 20,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          marginBottom: 5,
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') iconName = 'home';
          else if (route.name === 'Explore') iconName = 'search';
          else if (route.name === 'Notifications') iconName = 'notifications';
          else if (route.name === 'Profile') iconName = 'person';
          else if (route.name === 'Settings') iconName = 'settings';
          else if (route.name === 'Upload') iconName = 'cloud-upload-outline';
          else if (route.name === 'Stats') iconName = 'stats-chart';
          else if (route.name === 'Review') iconName = 'clipboard-outline';

          // 🔥 Animate if focused
          return (
            <Animatable.View
              animation={focused ? 'bounceIn' : undefined}
              duration={800}
            >
              <Ionicons name={iconName} size={10} color={color} />
            </Animatable.View>
          );
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />

      {role === 'listener' && (
        <>
          <Tab.Screen name="Explore" component={ExploreScreen} />
          <Tab.Screen name="Notifications" component={NotificationScreen} />
          <Tab.Screen name="Profile" component={ProfileScreen} />
          <Tab.Screen name="Settings" component={SettingsScreen} />
        </>
      )}

      {role === 'artist' && (
        <>
          <Tab.Screen name="Upload" component={UploadMusicScreen} />
          <Tab.Screen name="Stats" component={MusicStatisticsScreen} />
          <Tab.Screen name="Explore" component={ExploreScreen} />
          <Tab.Screen name="Notifications" component={NotificationScreen} />
          <Tab.Screen name="Profile" component={ProfileScreen} />
          <Tab.Screen name="Settings" component={SettingsScreen} />
        </>
      )}

      {role === 'moderator' && (
        <>
          <Tab.Screen name="Review" component={ReviewScreen} />
          <Tab.Screen name="Explore" component={ExploreScreen} />
          <Tab.Screen name="Notifications" component={NotificationScreen} />
          <Tab.Screen name="Profile" component={ProfileScreen} />
          <Tab.Screen name="Settings" component={SettingsScreen} />
        </>
      )}
    </Tab.Navigator>
  );
}