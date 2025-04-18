import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginRegisterScreen from '../screens/LoginRegisterScreen';
import ArtistRegisterScreen from '../screens/ArtistRegisterScreen';
import BottomNavigator from './BottomNavigator';
import PlaylistScreen from '../screens/playlist/PlaylistScreen';
import PendingTracksScreen from '../screens/moderator/PendingTracksScreen';
import TrackReviewScreen from '../screens/moderator/TrackReviewScreen';
import PendingArtistsScreen from '../screens/moderator/PendingArtistsScreen';
import ArtistReviewScreen from '../screens/moderator/ArtistReviewScreen';
import UserPreferencesScreen from '../components/auth/UserPreferencesScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Auth" component={LoginRegisterScreen} />
      <Stack.Screen name="ArtistRegister" component={ArtistRegisterScreen} />
      <Stack.Screen name="MainApp" component={BottomNavigator} />
      <Stack.Screen name="Playlist" component={PlaylistScreen} />
      <Stack.Screen name="PendingTracks" component={PendingTracksScreen} />
      <Stack.Screen name="TrackReview" component={TrackReviewScreen} />
      <Stack.Screen name="PendingArtists" component={PendingArtistsScreen} />
      <Stack.Screen name="ArtistReview" component={ArtistReviewScreen} />
      <Stack.Screen name="UserPreferences" component={UserPreferencesScreen} />
      
    </Stack.Navigator>
  );
}