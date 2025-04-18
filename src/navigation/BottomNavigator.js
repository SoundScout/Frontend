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
          switch (route.name) {
            case 'Home':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'Explore':
              iconName = focused ? 'search' : 'search-outline';
              break;
            case 'Notifications':
              iconName = focused ? 'notifications' : 'notifications-outline';
              break;
            case 'Profile':
              iconName = focused ? 'person' : 'person-outline';
              break;
            case 'Settings':
              iconName = focused ? 'settings' : 'settings-outline';
              break;
            case 'Upload':
              iconName = focused ? 'cloud-upload' : 'cloud-upload-outline';
              break;
            case 'Stats':
              iconName = focused ? 'stats-chart' : 'stats-chart-outline';
              break;
            case 'Review':
              iconName = focused ? 'clipboard' : 'clipboard-outline';
              break;
            default:
              iconName = focused ? 'ellipse' : 'ellipse-outline';
          }

          // 🔥 Animate if focused
          return (
            <Animatable.View
              animation={focused ? 'bounceIn' : undefined}
              duration={800}
            >
              <Ionicons name={iconName} size={size} color={color} />
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