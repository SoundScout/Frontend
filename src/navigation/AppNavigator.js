import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginRegisterScreen from '../screens/LoginRegisterScreen';
import ArtistRegisterScreen from '../screens/ArtistRegisterScreen';
import BottomNavigator from './BottomNavigator';
import PlaylistScreen from '../screens/playlist/PlaylistScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Auth" component={LoginRegisterScreen} />
      <Stack.Screen name="ArtistRegister" component={ArtistRegisterScreen} />
      <Stack.Screen name="MainApp" component={BottomNavigator} />
      <Stack.Screen name="Playlist" component={PlaylistScreen} />
    </Stack.Navigator>
  );
}