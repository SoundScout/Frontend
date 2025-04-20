// HomeScreen.js
import React, { useState, useEffect } from "react";
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  ScrollView,
  Animated,
  Dimensions,
  StatusBar,
  SafeAreaView,
  Share as RNShare,
  Alert
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { 
  Play, 
  Music, 
  Star, 
  Heart, 
  User,
  ChevronLeft,
  Pause,
  SkipForward,
  SkipBack,
  Share2,
  MoreVertical,
  Check,
  Skull
} from "lucide-react-native";

// Sample song data with extended information
const MUSIC_DATA = {
    adminPicks: [
      { 
        id: 1, 
        title: "Blinding Lights", 
        artist: "The Weeknd", 
        album: "After Hours",
        year: "2020",
        duration: "3:20",
        genre: "Synth-pop",
        lyrics: "I've been tryna call\nI've been on my own for long enough\nMaybe you can show me how to love, maybe...",
        description: "\"Blinding Lights\" is a song by Canadian singer The Weeknd, released as the second single from his fourth studio album After Hours. It features 1980s-inspired synth-pop production with retro vibes.",
        color: "#3b4880", 
        icon: <Music color="#fff" size={26} /> 
      },
      { 
        id: 2, 
        title: "Save Your Tears", 
        artist: "The Weeknd", 
        album: "After Hours",
        year: "2020",
        duration: "3:35",
        genre: "Synth-pop",
        lyrics: "I saw you dancing in a crowded room\nYou look so happy when I'm not with you\nBut then you saw me, caught you by surprise...",
        description: "\"Save Your Tears\" is a song by Canadian singer The Weeknd from his fourth studio album After Hours. It features retro-inspired synth-pop production and became a global hit.",
        color: "#6a4ca6", 
        icon: <Music color="#fff" size={26} /> 
      },
      { 
        id: 3, 
        title: "Levitating", 
        artist: "Dua Lipa", 
        album: "Future Nostalgia",
        year: "2020",
        duration: "3:23",
        genre: "Dance-pop",
        lyrics: "If you wanna run away with me, I know a galaxy\nAnd I can take you for a ride\nI had a premonition that we fell into a rhythm...",
        description: "\"Levitating\" is a song by English singer Dua Lipa from her second studio album Future Nostalgia. It's a retro-futuristic dance-pop track that became one of her biggest hits.",
        color: "#3c7ebf", 
        icon: <Music color="#fff" size={26} /> 
      }
    ],
    mostLiked: [
      { 
        id: 1, 
        title: "Bad Habits", 
        artist: "Ed Sheeran", 
        album: "=",
        year: "2021",
        duration: "3:51",
        genre: "Dance-pop",
        lyrics: "Every time you come around, you know I can't say no\nEvery time the sun goes down, I let you take control...",
        description: "\"Bad Habits\" is a song by English singer-songwriter Ed Sheeran. It marked his return to music after a hiatus and features an upbeat dance sound with themes of destructive behaviors.",
        color: "#bf3c5e", 
        icon: <Heart color="#fff" size={26} /> 
      },
      { 
        id: 2, 
        title: "Easy On Me", 
        artist: "Adele", 
        album: "30",
        year: "2021",
        duration: "3:44",
        genre: "Pop Ballad",
        lyrics: "There ain't no gold in this river\nThat I've been washing my hands in forever\nI know there is hope in these waters...",
        description: "\"Easy On Me\" is a song by English singer-songwriter Adele from her fourth studio album 30. It's a piano ballad that explores themes of divorce, change, and personal growth.",
        color: "#3cbf5e", 
        icon: <Heart color="#fff" size={26} /> 
      },
      { 
        id: 3, 
        title: "Heat Waves", 
        artist: "Glass Animals", 
        album: "Dreamland",
        year: "2020",
        duration: "3:58",
        genre: "Indie pop",
        lyrics: "Sometimes, all I think about is you\nLate nights in the middle of June\nHeat waves been faking me out...",
        description: "\"Heat Waves\" is a song by English indie rock band Glass Animals from their third studio album Dreamland. The song slowly gained popularity and became a sleeper hit.",
        color: "#bf793c", 
        icon: <Heart color="#fff" size={26} /> 
      }
    ],
    likedSongs: [
      { 
        id: 1, 
        title: "Inside Out", 
        artist: "The Chainsmokers", 
        album: "Memories...Do Not Open",
        year: "2017",
        duration: "3:30",
        genre: "Electronic",
        lyrics: "You've been running on empty\nYou and me against the world\nLike we're trying to prove something...",
        description: "\"Inside Out\" is a song by American electronic music duo The Chainsmokers featuring vocals from Charlee. It showcases a softer, more melodic side of the duo's production style.",
        color: "#3c7ebf", 
        icon: <Star color="#fff" size={26} /> 
      },
      { 
        id: 2, 
        title: "Shivers", 
        artist: "Ed Sheeran", 
        album: "=",
        year: "2021",
        duration: "3:27",
        genre: "Pop",
        lyrics: "I took an arrow to the heart\nI never kissed a mouth that tastes like yours\nStrawberries and something more...",
        description: "\"Shivers\" is a song by English singer-songwriter Ed Sheeran from his fifth studio album =. It's an upbeat, guitar-driven pop song about the excitement of a new relationship.",
        color: "#a64c9f", 
        icon: <Star color="#fff" size={26} /> 
      },
      { 
        id: 3, 
        title: "Industry Baby", 
        artist: "Lil Nas X", 
        album: "Montero",
        year: "2021",
        duration: "3:32",
        genre: "Hip hop",
        lyrics: "Baby back, ayy, couple racks, ayy\nCouple Grammys on him, couple plaques, ayy\nThat's a fact, ayy, throw it back, ayy...",
        description: "\"Industry Baby\" is a song by American rapper and singer Lil Nas X featuring Jack Harlow. The triumphant hip-hop track celebrates success and features brass instrumentation.",
        color: "#3cbf5e", 
        icon: <Star color="#fff" size={26} /> 
      }
    ],
    forYou: [
      { 
        id: 1, 
        title: "METAMORPHOSIS", 
        artist: "INTERWORLD", 
        album: "METAMORPHOSIS",
        year: "2021",
        duration: "2:25",
        genre: "Phonk",
        lyrics: "Instrumental with vocal samples",
        description: "\"METAMORPHOSIS\" is a phonk track by INTERWORLD that gained popularity through TikTok and gaming videos. It features heavy bass and aggressive beats with a hypnotic quality.",
        color: "#3b4880", 
        icon: <Skull color="#fff" size={26} /> 
      },
      { 
        id: 2, 
        title: "Murder In My Mind", 
        artist: "Kordhell", 
        album: "Single",
        year: "2021",
        duration: "2:21",
        genre: "Phonk",
        lyrics: "Instrumental with minimal vocal samples",
        description: "\"Murder In My Mind\" is a popular phonk track by Kordhell that blends trap beats with dark atmospheric elements. It became widely used in social media videos.",
        color: "#6a4ca6", 
        icon: <Skull color="#fff" size={26} /> 
      },
      { 
        id: 3, 
        title: "GigaChad Theme", 
        artist: "g3ox_em", 
        album: "Single",
        year: "2021",
        duration: "2:58",
        genre: "Electronic",
        lyrics: "Instrumental",
        description: "\"GigaChad Theme\" is an electronic music track by g3ox_em that became popular through meme culture and is often associated with the internet 'GigaChad' meme persona.",
        color: "#3c7ebf", 
        icon: <Skull color="#fff" size={26} /> 
      }
    ]
  };
  

export default function HomeScreen({ navigation }) {
  const [currentlyPlaying, setCurrentlyPlaying] = useState({
    id: 1,
    title: "Inside Out",
    artist: "The Chainsmokers, Charlee",
    album: "Memories...Do Not Open",
    year: "2017",
    duration: "3:30",
    genre: "Electronic",
    lyrics: "You've been running on empty\nYou and me against the world\nLike we're trying to prove something...",
    description: "\"Inside Out\" is a song by American electronic music duo The Chainsmokers featuring vocals from Charlee. It showcases a softer, more melodic side of the duo's production style.",
    isPlaying: false,
    color: "#3c7ebf"
  });
  const [userName, setUserName] = useState("Logan");
  const [greeting, setGreeting] = useState("Evening vibes");
  const [pulseAnim] = useState(new Animated.Value(1));
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideAnim] = useState(new Animated.Value(50));
  
  // Animations
  useEffect(() => {
    // Entry animations
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
    
    // Pulse animation for "For You" banner
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.05,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  // Set greeting based on time of day
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) {
      setGreeting("Morning vibes");
    } else if (hour < 18) {
      setGreeting("Afternoon grooves");
    } else {
      setGreeting("Evening vibes");
    }
  }, []);
  
  const navigateToForYou = () => {
    navigation.navigate('ForYouPlaylist', { songs: MUSIC_DATA.forYou });
  };
  
  const navigateToUserPreferences = () => {
    navigation.navigate('UserPreferences');
  };

  const togglePlayback = () => {
    setCurrentlyPlaying(prev => ({
      ...prev,
      isPlaying: !prev.isPlaying
    }));
  };

  const navigateToMusicPlayer = (song) => {
    const updatedSong = {
      ...song,
      isPlaying: true
    };
    setCurrentlyPlaying(updatedSong);
    // Navigate to detailed song screen
    navigation.navigate('SongDetailScreen', { song: updatedSong });
  };

  const navigateToDetailedSongScreen = () => {
    navigation.navigate('SongDetailScreen', { song: currentlyPlaying });
  };

  const renderHorizontalScroll = (title, items, IconComponent) => (
    <Animated.View 
      style={[
        styles.card,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }]
        }
      ]}
    >
      <LinearGradient
        colors={['rgba(13, 72, 117, 0.7)', 'rgba(13, 72, 117, 0.47)']}
        style={styles.cardGradient}
      >
        <Text style={styles.sectionTitle}>{title}</Text>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.musicRow}
        >
          {items.map((item) => (
            <TouchableOpacity 
              key={item.id} 
              style={styles.musicItem}
              onPress={() => navigateToMusicPlayer(item)}
              activeOpacity={0.7}
            >
              <LinearGradient
                colors={['rgba(42, 157, 244, 0.1)', 'rgba(58, 119, 222, 0.2)']}
                style={[styles.iconBox, { backgroundColor: item.color }]}
              >
                {item.icon ? item.icon : <IconComponent color="#fff" size={26} />}
              </LinearGradient>
              <Text style={styles.musicItemTitle} numberOfLines={1}>{item.title}</Text>
              <Text style={styles.musicItemArtist} numberOfLines={1}>{item.artist}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </LinearGradient>
    </Animated.View>
  );

  // Improved share functionality
  const handleShare = async (songInfo = null) => {
    try {
      let message = "Check out this awesome music on SoundScout!";
      
      // If a specific song is being shared
      if (songInfo) {
        message = `I'm listening to "${songInfo.title}" by ${songInfo.artist} on SoundScout. Check it out!`;
      }
      
      const result = await RNShare.share({
        message,
        title: "SoundScout Music",
      });

      if (result.action === RNShare.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
          console.log(`Shared via ${result.activityType}`);
        } else {
          // shared
          console.log('Shared successfully');
        }
      } else if (result.action === RNShare.dismissedAction) {
        // dismissed
        console.log('Share dismissed');
      }
    } catch (error) {
      Alert.alert("Error", "Could not share at this time. Please try again later.");
    }
  };

  // Share the current song
  const shareCurrentSong = () => {
    handleShare(currentlyPlaying);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
      <View style={styles.container}>
        <LinearGradient
          colors={["#0A0A0A", "#101020", "#18182a"]}
          style={styles.backgroundGradient}
        />
        
        {/* Background Elements */}
        <View style={styles.backgroundElements}>
          <View style={[styles.circleBg, { top: '5%', left: '-10%', opacity: 0.2 }]} />
          <View style={[styles.circleBg, { bottom: '20%', right: '-15%', opacity: 0.15 }]} />
          <View style={[styles.circleBg, { top: '35%', right: '25%', opacity: 0.1 }]} />
        </View>

        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButtonContainer}
            onPress={navigateToUserPreferences}
          >
            <LinearGradient
              colors={['#2a9df4', '#3a77de']}
              style={styles.backButton}
            >
              <ChevronLeft size={24} color="#fff" />
            </LinearGradient>
          </TouchableOpacity>
          
          <Animated.Text 
            style={[
              styles.logo,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }]
              }
            ]}
          >
            SoundScout
          </Animated.Text>
          
          <TouchableOpacity 
            style={styles.profileButton}
            onPress={() => navigation.navigate('Profile')}
          >
            <View style={styles.profileAvatar}>
              <User size={20} color="#fff" />
            </View>
          </TouchableOpacity>
        </View>

        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }}
        >
          <Text style={styles.tagline}>{greeting}, {userName}</Text>
          <Text style={styles.subtext}>Curated picks just for your soul</Text>
        </Animated.View>

        <ScrollView 
          style={styles.scrollView} 
          showsVerticalScrollIndicator={false}
        >
          {/* For You Banner with Animation */}
          <Animated.View
            style={[
              styles.forYouWrapper,
              { 
                transform: [{ scale: pulseAnim }],
                opacity: fadeAnim
              }
            ]}
          >
            <TouchableOpacity 
              style={styles.forYouBanner}
              onPress={navigateToForYou}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={["rgba(42, 157, 244, 0.2)", "rgba(42, 157, 244, 0.3)"]}
                style={styles.forYouGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              />
              <View style={styles.forYouIconContainer}>
                <Animated.View
                  style={{
                    transform: [{ scale: pulseAnim }]
                  }}
                >
                  <Skull size={40} color="#2a9df4" style={styles.skullIcon} />
                </Animated.View>
              </View>
              <Text style={styles.forYouText}>For You</Text>
              <Text style={styles.forYouSubtext}>Tap to discover your personalized playlist</Text>
              
              <TouchableOpacity 
                style={styles.shareButtonSmall} 
                onPress={() => handleShare()}
                activeOpacity={0.7}
              >
                <Share2 size={16} color="#fff" />
              </TouchableOpacity>
            </TouchableOpacity>
          </Animated.View>

          {renderHorizontalScroll("Admin Picks", MUSIC_DATA.adminPicks, Star)}
          {renderHorizontalScroll("Most Liked", MUSIC_DATA.mostLiked, Heart)}
          {renderHorizontalScroll("Liked Songs", MUSIC_DATA.likedSongs, Music)}

          {/* Currently Playing */}
          <Animated.View
            style={[
              styles.nowPlayingCard,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }]
              }
            ]}
          >
            <LinearGradient
              colors={['rgba(13, 72, 117, 0.6)', 'rgba(13, 72, 117, 0.4)']}
              style={styles.nowPlayingGradient}
            >
              <TouchableOpacity 
                style={styles.nowPlayingTouchable}
                onPress={navigateToDetailedSongScreen}
                activeOpacity={0.9}
              >
                <LinearGradient
                  colors={['rgba(42, 157, 244, 0.1)', 'rgba(58, 119, 222, 0.2)']}
                  style={[styles.songIcon, { backgroundColor: currentlyPlaying.color || "#3c7ebf" }]}
                >
                  <Music color="#fff" size={22} />
                </LinearGradient>
                
                <View style={styles.nowPlayingDetails}>
                  <Text style={styles.songTitle}>{currentlyPlaying.title}</Text>
                  <Text style={styles.artistName}>{currentlyPlaying.artist}</Text>
                </View>
                
                <View style={styles.playerControls}>
                  <TouchableOpacity 
                    style={styles.controlButton}
                    activeOpacity={0.7}
                  >
                    <SkipBack size={18} color="#fff" />
                  </TouchableOpacity>
                  
                  <TouchableOpacity 
                    style={styles.playButton}
                    onPress={togglePlayback}
                    activeOpacity={0.7}
                  >
                    <LinearGradient
                      colors={['#2a9df4', '#3a77de']}
                      style={styles.playButtonGradient}
                    >
                      {currentlyPlaying.isPlaying ? (
                        <Pause size={18} color="#fff" />
                      ) : (
                        <Play size={18} color="#fff" />
                      )}
                    </LinearGradient>
                  </TouchableOpacity>
                  
                  <TouchableOpacity 
                    style={styles.controlButton}
                    activeOpacity={0.7}
                  >
                    <SkipForward size={18} color="#fff" />
                  </TouchableOpacity>
                </View>

                {/* Added Share button for currently playing */}
                <TouchableOpacity 
                  style={styles.shareCurrentButton}
                  onPress={shareCurrentSong}
                  activeOpacity={0.7}
                >
                  <Share2 size={16} color="#fff" />
                </TouchableOpacity>
              </TouchableOpacity>
            </LinearGradient>
          </Animated.View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "black",
  },
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
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
    zIndex: -1,
  },
  circleBg: {
    position: "absolute",
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: "#2a9df4",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  backButtonContainer: {
    shadowColor: '#2a9df4',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 8,
    elevation: 5,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#2a9df4',
  },
  logo: {
    fontSize: 28, // Reduced from 32
    fontWeight: "bold",
    color: "#fff",
    textShadowColor: "#2a9df4",
    textShadowRadius: 10,
    textShadowOffset: { width: 4, height: 2 },
  },
  profileButton: {
    padding: 6,
  },
  profileAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#444",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#2a9df4",
  },
  tagline: {
    fontSize: 16, // Reduced from 18
    fontWeight: "bold",
    color: "#aaa",
    marginTop: 4,
  },
  subtext: {
    color: "#aaa",
    textAlign: "left",
    marginTop: 6, // Reduced from 8
    fontSize: 13, // Reduced from 14
    fontStyle: "italic",
  },
  scrollView: {
    marginTop: 18, // Reduced from 20
    paddingBottom: 20,
  },
  forYouWrapper: {
    marginBottom: 22, // Reduced from 24
  },
  forYouBanner: {
    height: 130, // Reduced from 140
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#2a9df4",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 5,
    overflow: "hidden",
    position: "relative",
  },
  forYouGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  forYouIconContainer: {
    position: "absolute",
    top: 16,
    left: 16,
  },
  skullIcon: {
    opacity: 0.8,
    shadowColor: '#2a9df4',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 20,
  },
  forYouText: {
    color: "white",
    fontSize: 24, // Reduced from 28
    fontWeight: "bold",
    textShadowColor: "#000",
    textShadowRadius: 4,
    textShadowOffset: { width: 2, height: 2 },
  },
  forYouSubtext: {
    color: "#ddd",
    fontSize: 13, // Reduced from 14
    marginTop: 5,
  },
  shareButtonSmall: {
    position: "absolute",
    top: 16,
    right: 16,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(42, 157, 244, 0.3)",
    justifyContent: "center",
    alignItems: "center",
    // Add subtle feedback for press
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  card: {
    marginBottom: 22, // Reduced from 24
    borderRadius: 20,
    overflow: "hidden",
    shadowColor: "#2a9df4",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  cardGradient: {
    borderRadius: 20,
    padding: 14, // Reduced from 16
    borderWidth: 2,
    borderColor: "#2a9df4",
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 16, // Reduced from 18
    fontWeight: "bold",
    marginBottom: 10, // Reduced from 12
    textAlign: "center",
    textShadowColor: "rgba(42, 157, 244, 0.4)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  musicRow: {
    paddingVertical: 10,
  },
  musicItem: {
    width: 120,
    marginRight: 16,
    alignItems: "center",
  },
  iconBox: {
    width: 80,
    height: 80,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
    shadowColor: "#2a9df4",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 4,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  musicItemTitle: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
  },
  musicItemArtist: {
    color: "#aaa",
    fontSize: 11,
    textAlign: "center",
    marginTop: 2,
  },
  nowPlayingCard: {
    marginBottom: 20,
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#2a9df4",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  nowPlayingGradient: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(42, 157, 244, 0.4)",
  },
  nowPlayingTouchable: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    position: "relative",
  },
  songIcon: {
    width: 44,
    height: 44,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  nowPlayingDetails: {
    flex: 1,
  },
  songTitle: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  artistName: {
    color: "#aaa",
    fontSize: 12,
  },
  playerControls: {
    flexDirection: "row",
    alignItems: "center",
  },
  controlButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 4,
    backgroundColor: "rgba(42, 157, 244, 0.2)",
  },
  playButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginHorizontal: 6,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#2a9df4",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 8,
    elevation: 5,
  },
  playButtonGradient: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
  shareCurrentButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(42, 157, 244, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  }
});
