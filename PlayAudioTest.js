import React, { useEffect, useState } from 'react';
import { View, Button } from 'react-native';
import { Audio } from 'expo-av';

export default function PlayAudioTest() {
  const [sound, setSound] = useState();

  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(
      require('./assets/Audio.mp3') // Correct path to your audio file
    );
    setSound(sound);
    await sound.playAsync();
  }

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync(); // Clean up sound when the component unmounts
        }
      : undefined;
  }, [sound]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Play Audio" onPress={playSound} />
    </View>
  );
}
