import React, { useState, useEffect } from "react";
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  FlatList, 
  StatusBar, 
  Share,
  SafeAreaView,
  Animated,
  Dimensions
} from "react-native";
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  Play, 
  Pause, 
  MoreVertical, 
  Share2, 
  ChevronLeft, 
  Music, 
  Skull, 
  Check,
  Heart
} from "lucide-react-native";

const { width } = Dimensions.get('window');

export default function ForYouPlaylistScreen() {
  const navigation = useNavigation();
  const [selectedSongs, setSelectedSongs] = useState({});
  const [currentlyPlaying, setCurrentlyPlaying] = useState(null);
  const [likedSongs, setLikedSongs] = useState({});
  
  // Animated values for entrance animations
  const fadeAnim = useState(new Animated.Value(0))[0];
  const slideAnim = useState(new Animated.Value(50))[0];
  
  // Animation for the header pulse effect
  const pulseAnim = useState(new Animated.Value(1))[0];

  useEffect(() => {
    // Entrance animation - run only once
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true
      })
    ]).start();
  
    // Start the pulse animation for the icon
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 1500,
          useNativeDriver: true
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true
        })
      ])
    ).start();
  }, []);
  
  const goBack = () => {
    navigation.goBack();
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: "Check out this awesome playlist on SoundScout!",
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const toggleSongSelection = (id) => {
    setSelectedSongs(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const togglePlaySong = (id) => {
    if (currentlyPlaying === id) {
      setCurrentlyPlaying(null); // Pause if already playing
    } else {
      setCurrentlyPlaying(id); // Play the selected song
    }
  };

  const toggleLike = (id) => {
    setLikedSongs(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Are any songs selected?
  const hasSelectedSongs = Object.values(selectedSongs).some(value => value);
  
  // Sample song data with updated styling
  const songs = [
    {
      id: '1',
      title: 'METAMORPHOSIS',
      artist: 'INTERWORLD',
      color: '#3b4880',
      duration: '2:45'
    },
    {
      id: '2',
      title: 'Murder In My Mind',
      artist: 'Kordhell',
      color: '#6a4ca6',
      duration: '3:18'
    },
    {
      id: '3',
      title: 'GigaChad Theme',
      artist: 'g3ox_em',
      color: '#3c7ebf',
      duration: '1:55'
    },
    {
      id: '4',
      title: 'SHADOW',
      artist: 'ONIMXRU, SMITHMANE',
      color: '#a64c9f',
      duration: '2:37'
    },
    {
      id: '5',
      title: 'Phonky Town',
      artist: 'PlayaPhonk',
      color: '#bf3c5e',
      duration: '2:10'
    },
    {
      id: '6',
      title: 'Close Eyes',
      artist: 'DVRST',
      color: '#3cbf5e',
      duration: '2:59'
    }
  ];

  const renderSongItem = ({ item }) => (
    <TouchableOpacity 
      style={[
        styles.songItem, 
        currentlyPlaying === item.id && styles.nowPlayingItem
      ]}
      onLongPress={() => toggleSongSelection(item.id)}
    >
      {/* Checkbox or Album Art */}
      <TouchableOpacity 
        style={styles.checkboxContainer}
        onPress={() => toggleSongSelection(item.id)}
      >
        {selectedSongs[item.id] ? (
          <View style={styles.checkedBox}>
            <Check size={16} color="#fff" />
          </View>
        ) : (
          <LinearGradient
            colors={['rgba(42, 157, 244, 0.1)', 'rgba(58, 119, 222, 0.2)']}
            style={[styles.songThumbnail, { backgroundColor: item.color }]}
          >
            <Music size={16} color="#fff" />
          </LinearGradient>
        )}
      </TouchableOpacity>
      
      {/* Song Details */}
      <TouchableOpacity 
        style={styles.songDetails}
        onPress={() => togglePlaySong(item.id)}
      >
        <Text style={styles.songTitle}>{item.title}</Text>
        <Text style={styles.artistName}>{item.artist}</Text>
      </TouchableOpacity>
      
      {/* Duration */}
      <Text style={styles.duration}>{item.duration}</Text>
      
      {/* Like Button */}
      <TouchableOpacity 
        style={styles.likeButton}
        onPress={() => toggleLike(item.id)}
      >
        <Heart 
          size={18} 
          color={likedSongs[item.id] ? "#2a9df4" : "#555"} 
          fill={likedSongs[item.id] ? "#2a9df4" : "transparent"} 
        />
      </TouchableOpacity>
      
      {/* Play Button */}
      <TouchableOpacity 
        style={styles.playButton}
        onPress={() => togglePlaySong(item.id)}
      >
        <LinearGradient
          colors={currentlyPlaying === item.id ? 
            ['#2a9df4', '#3a77de'] : 
            ['rgba(42, 157, 244, 0.1)', 'rgba(58, 119, 222, 0.2)']}
          style={styles.playButtonGradient}
        >
          {currentlyPlaying === item.id ? (
            <Pause size={14} color="#fff" />
          ) : (
            <Play size={14} color="#2a9df4" />
          )}
        </LinearGradient>
      </TouchableOpacity>
      
      {/* More Options */}
      <TouchableOpacity style={styles.moreButton}>
        <MoreVertical size={18} color="#888" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
      
      {/* Background */}
      <LinearGradient
        colors={['#0A0A0A', '#101020', '#18182a']}
        style={styles.backgroundGradient}
      />
      
      {/* Animated background elements */}
      <View style={styles.backgroundElements}>
        <View style={[styles.circleBg, { top: '5%', left: '10%', opacity: 0.2 }]} />
        <View style={[styles.circleBg, { top: '30%', right: '-5%', opacity: 0.15 }]} />
        <View style={[styles.circleBg, { bottom: '10%', left: '5%', opacity: 0.1 }]} />
      </View>

      {/* Back button with SoundScout styling */}
      <TouchableOpacity style={styles.backButtonContainer} onPress={goBack}>
        <LinearGradient
          colors={['#2a9df4', '#3a77de']}
          style={styles.backButton}
        >
          <ChevronLeft size={24} color="#fff" />
        </LinearGradient>
      </TouchableOpacity>

      {/* Header with Skull Icon */}
      <View style={styles.headerContainer}>
        <Animated.View 
          style={[
            styles.headerBackground,
            {
              transform: [{ scale: pulseAnim }]
            }
          ]}
        >
          <Skull size={120} color="#2a9df4" style={styles.skullIcon} />
        </Animated.View>
        
        <LinearGradient
          colors={['rgba(0,0,0,0.2)', 'rgba(0,0,0,0.95)']}
          style={styles.headerOverlay}
        >
          <Animated.View
            style={{
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }]
            }}
          >
            <Text style={styles.playlistLabel}>PLAYLIST</Text>
            <Text style={styles.playlistTitle}>For You</Text>
            
            <View style={styles.playlistInfo}>
              <Text style={styles.playlistSongs}>{songs.length} songs</Text>
              
              <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
                <LinearGradient
                  colors={['rgba(42, 157, 244, 0.1)', 'rgba(58, 119, 222, 0.2)']}
                  style={styles.iconButtonGradient}
                >
                  <Share2 size={20} color="#2a9df4" />
                </LinearGradient>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.playAllButtonContainer}
                onPress={() => {
                  if (currentlyPlaying) {
                    setCurrentlyPlaying(null);
                  } else {
                    setCurrentlyPlaying(songs[0].id);
                  }
                }}
              >
                <LinearGradient
                  colors={['#2a9df4', '#3a77de']}
                  style={styles.playAllButtonGradient}
                >
                  {currentlyPlaying ? (
                    <Pause size={22} color="#fff" />
                  ) : (
                    <Play size={22} color="#fff" fill="#fff" />
                  )}
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </LinearGradient>
      </View>

      {/* Selection actions that appear when songs are selected */}
      {hasSelectedSongs && (
        <View style={styles.selectionToolbar}>
          <Text style={styles.selectionCount}>
            {Object.values(selectedSongs).filter(v => v).length} selected
          </Text>
          <TouchableOpacity 
            style={styles.selectionAction}
            onPress={() => setSelectedSongs({})}
          >
            <Text style={styles.selectionActionText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.selectionAction}>
            <LinearGradient
              colors={['#2a9df4', '#3a77de']}
              style={styles.selectionActionButton}
            >
              <Text style={styles.selectionActionButtonText}>Add to Playlist</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      )}

      {/* Songs List */}
      <Animated.FlatList
        data={songs}
        renderItem={renderSongItem}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.songsList}
        style={{
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }]
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
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
  backButtonContainer: {
    position: 'absolute',
    top: 50,
    left: 24,
    zIndex: 10,
  },
  backButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2a9df4',
    shadowColor: '#2a9df4',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 8,
    elevation: 5,
  },
  headerContainer: {
    height: 260,
    width: '100%',
    position: 'relative',
  },
  headerBackground: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(16, 16, 32, 0.8)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  skullIcon: {
    opacity: 0.8,
    shadowColor: '#2a9df4',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 20,
  },
  headerOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    paddingHorizontal: 16,
    paddingTop: 120,
    justifyContent: 'flex-end',
    paddingBottom: 20,
  },
  playlistLabel: {
    color: '#2a9df4',
    fontSize: 12,
    letterSpacing: 2,
    fontWeight: '700',
    marginBottom: 4,
  },
  playlistTitle: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 16,
    textShadowColor: 'rgba(42, 157, 244, 0.4)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  playlistInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  playlistSongs: {
    color: '#aaa',
    fontSize: 14,
    flex: 1,
  },
  shareButton: {
    marginRight: 12,
  },
  iconButtonGradient: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(42, 157, 244, 0.3)',
  },
  playAllButtonContainer: {
    shadowColor: '#2a9df4',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 8,
    elevation: 5,
  },
  playAllButtonGradient: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(42, 157, 244, 0.3)',
  },
  songsList: {
    paddingHorizontal: 16,
    paddingBottom: 80,
  },
  songItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: 'rgba(42, 157, 244, 0.2)',
    marginBottom: 4,
  },
  nowPlayingItem: {
    backgroundColor: 'rgba(42, 157, 244, 0.08)',
    borderRadius: 8,
    borderBottomWidth: 0,
    paddingHorizontal: 6,
  },
  checkboxContainer: {
    marginRight: 4,
  },
  songThumbnail: {
    width: 42,
    height: 42,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(42, 157, 244, 0.3)',
  },
  checkedBox: {
    width: 42,
    height: 42,
    borderRadius: 8,
    backgroundColor: '#2a9df4',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#2a9df4',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 8,
  },
  songDetails: {
    flex: 1,
    marginLeft: 12,
  },
  songTitle: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '500',
  },
  artistName: {
    color: '#aaa',
    fontSize: 13,
    marginTop: 2,
  },
  duration: {
    color: '#777',
    fontSize: 12,
    marginRight: 10,
  },
  likeButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 4,
  },
  playButton: {
    marginRight: 4,
  },
  playButtonGradient: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(42, 157, 244, 0.3)',
  },
  moreButton: {
    padding: 6,
  },
  selectionToolbar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(16, 16, 32, 0.95)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(42, 157, 244, 0.3)',
  },
  selectionCount: {
    color: '#fff',
    fontWeight: '500',
    flex: 1,
  },
  selectionAction: {
    marginLeft: 10,
  },
  selectionActionText: {
    color: '#2a9df4',
    fontWeight: '500',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  selectionActionButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  selectionActionButtonText: {
    color: '#fff',
    fontWeight: '500',
  }
});