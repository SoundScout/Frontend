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
  Alert,
  Modal,
  Image
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
  Skull,
  X,
  Clock,
  Award,
  Disc
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
        description: "\"Blinding Lights\" is a song by Canadian singer The Weeknd, released as the second single from his fourth studio album After Hours. It features 1980s-inspired synth-pop production with retro vibes.",
        color: "#3b4880", 
        icon: <Music color="#fff" size={26} />,
        artistInfo: {
          name: "The Weeknd",
          realName: "Abel Makkonen Tesfaye",
          verified: true,
          followers: "28.7M",
          genres: ["R&B", "Pop", "Alternative R&B"],
          bio: "The Weeknd is a Canadian singer, songwriter, and record producer. Known for his sonic versatility and dark lyricism, his music explores escapism, romance, and melancholia, and is often inspired by personal experiences.",
          topTracks: ["Blinding Lights", "Save Your Tears", "Starboy", "The Hills", "Can't Feel My Face"]
        }
      },
      { 
        id: 2, 
        title: "Save Your Tears", 
        artist: "The Weeknd", 
        album: "After Hours",
        year: "2020",
        duration: "3:35",
        genre: "Synth-pop",
        description: "\"Save Your Tears\" is a song by Canadian singer The Weeknd from his fourth studio album After Hours. It features retro-inspired synth-pop production and became a global hit.",
        color: "#6a4ca6", 
        icon: <Music color="#fff" size={26} />,
        artistInfo: {
          name: "The Weeknd",
          realName: "Abel Makkonen Tesfaye",
          verified: true,
          followers: "28.7M",
          genres: ["R&B", "Pop", "Alternative R&B"],
          bio: "The Weeknd is a Canadian singer, songwriter, and record producer. Known for his sonic versatility and dark lyricism, his music explores escapism, romance, and melancholia, and is often inspired by personal experiences.",
          topTracks: ["Blinding Lights", "Save Your Tears", "Starboy", "The Hills", "Can't Feel My Face"]
        }
      },
      { 
        id: 3, 
        title: "Levitating", 
        artist: "Dua Lipa", 
        album: "Future Nostalgia",
        year: "2020",
        duration: "3:23",
        genre: "Dance-pop",
        description: "\"Levitating\" is a song by English singer Dua Lipa from her second studio album Future Nostalgia. It's a retro-futuristic dance-pop track that became one of her biggest hits.",
        color: "#3c7ebf", 
        icon: <Music color="#fff" size={26} />,
        artistInfo: {
          name: "Dua Lipa",
          realName: "Dua Lipa",
          verified: true,
          followers: "21.2M",
          genres: ["Pop", "Dance", "Disco"],
          bio: "Dua Lipa is an English singer and songwriter. After working as a model, she signed with Warner Bros. Records in 2014 and released her self-titled debut album in 2017. The album peaked at number three on the UK Albums Chart and yielded eight singles.",
          topTracks: ["Levitating", "Don't Start Now", "New Rules", "Physical", "Break My Heart"]
        }
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
        description: "\"Bad Habits\" is a song by English singer-songwriter Ed Sheeran. It marked his return to music after a hiatus and features an upbeat dance sound with themes of destructive behaviors.",
        color: "#bf3c5e", 
        icon: <Heart color="#fff" size={26} />,
        artistInfo: {
          name: "Ed Sheeran",
          realName: "Edward Christopher Sheeran",
          verified: true,
          followers: "32.1M",
          genres: ["Pop", "Folk-Pop", "Acoustic"],
          bio: "Ed Sheeran is an English singer-songwriter. Born in Halifax, West Yorkshire and raised in Framlingham, Suffolk, he began writing songs around the age of eleven. He is known for his acoustic pop sound and thoughtful lyrics.",
          topTracks: ["Shape of You", "Perfect", "Thinking Out Loud", "Bad Habits", "Photograph"]
        }
      },
      { 
        id: 2, 
        title: "Easy On Me", 
        artist: "Adele", 
        album: "30",
        year: "2021",
        duration: "3:44",
        genre: "Pop Ballad",
        description: "\"Easy On Me\" is a song by English singer-songwriter Adele from her fourth studio album 30. It's a piano ballad that explores themes of divorce, change, and personal growth.",
        color: "#3cbf5e", 
        icon: <Heart color="#fff" size={26} />,
        artistInfo: {
          name: "Adele",
          realName: "Adele Laurie Blue Adkins",
          verified: true,
          followers: "26.5M",
          genres: ["Pop", "Soul", "Blues"],
          bio: "Adele is an English singer-songwriter. She is known for her powerful, soulful voice and emotionally charged songwriting. Her albums are typically named after her age at the time of writing and explore themes of heartbreak, nostalgia, and self-reflection.",
          topTracks: ["Hello", "Rolling in the Deep", "Someone Like You", "Easy On Me", "Set Fire to the Rain"]
        }
      },
      { 
        id: 3, 
        title: "Heat Waves", 
        artist: "Glass Animals", 
        album: "Dreamland",
        year: "2020",
        duration: "3:58",
        genre: "Indie pop",
        description: "\"Heat Waves\" is a song by English indie rock band Glass Animals from their third studio album Dreamland. The song slowly gained popularity and became a sleeper hit.",
        color: "#bf793c", 
        icon: <Heart color="#fff" size={26} />,
        artistInfo: {
          name: "Glass Animals",
          realName: "Dave Bayley, Drew MacFarlane, Edmund Irwin-Singer, Joe Seaward",
          verified: true,
          followers: "8.7M",
          genres: ["Indie Pop", "Psychedelic Pop", "Alternative"],
          bio: "Glass Animals are an English indie rock band formed in Oxford in 2010. Led by vocalist and songwriter Dave Bayley, the band creates a unique blend of psychedelic pop and indie with strong electronic elements.",
          topTracks: ["Heat Waves", "Gooey", "Youth", "Toes", "The Other Side of Paradise"]
        }
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
        description: "\"Inside Out\" is a song by American electronic music duo The Chainsmokers featuring vocals from Charlee. It showcases a softer, more melodic side of the duo's production style.",
        color: "#3c7ebf", 
        icon: <Star color="#fff" size={26} />,
        artistInfo: {
          name: "The Chainsmokers",
          realName: "Alexander Pall and Andrew Taggart",
          verified: true,
          followers: "17.3M",
          genres: ["EDM", "Pop", "Future Bass"],
          bio: "The Chainsmokers are an American electronic DJ and production duo consisting of Alexander Pall and Andrew Taggart. The duo achieved breakthrough with their 2014 song \"#Selfie\" and have since become known for blending elements of dance music with pop and indie.",
          topTracks: ["Closer", "Something Just Like This", "Don't Let Me Down", "Paris", "Inside Out"]
        }
      },
      { 
        id: 2, 
        title: "Shivers", 
        artist: "Ed Sheeran", 
        album: "=",
        year: "2021",
        duration: "3:27",
        genre: "Pop",
        description: "\"Shivers\" is a song by English singer-songwriter Ed Sheeran from his fifth studio album =. It's an upbeat, guitar-driven pop song about the excitement of a new relationship.",
        color: "#a64c9f", 
        icon: <Star color="#fff" size={26} />,
        artistInfo: {
          name: "Ed Sheeran",
          realName: "Edward Christopher Sheeran",
          verified: true,
          followers: "32.1M",
          genres: ["Pop", "Folk-Pop", "Acoustic"],
          bio: "Ed Sheeran is an English singer-songwriter. Born in Halifax, West Yorkshire and raised in Framlingham, Suffolk, he began writing songs around the age of eleven. He is known for his acoustic pop sound and thoughtful lyrics.",
          topTracks: ["Shape of You", "Perfect", "Thinking Out Loud", "Bad Habits", "Photograph"]
        }
      },
      { 
        id: 3, 
        title: "Industry Baby", 
        artist: "Lil Nas X", 
        album: "Montero",
        year: "2021",
        duration: "3:32",
        genre: "Hip hop",
        description: "\"Industry Baby\" is a song by American rapper and singer Lil Nas X featuring Jack Harlow. The triumphant hip-hop track celebrates success and features brass instrumentation.",
        color: "#3cbf5e", 
        icon: <Star color="#fff" size={26} />,
        artistInfo: {
          name: "Lil Nas X",
          realName: "Montero Lamar Hill",
          verified: true,
          followers: "13.6M",
          genres: ["Hip-Hop", "Pop Rap", "Country Rap"],
          bio: "Lil Nas X is an American rapper, singer, and songwriter. He rose to prominence with the release of his country rap single \"Old Town Road\", which achieved viral popularity and became diamond certified. Known for his boundary-pushing music and public persona.",
          topTracks: ["Old Town Road", "MONTERO (Call Me By Your Name)", "Industry Baby", "HOLIDAY", "THAT'S WHAT I WANT"]
        }
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
        description: "\"METAMORPHOSIS\" is a phonk track by INTERWORLD that gained popularity through TikTok and gaming videos. It features heavy bass and aggressive beats with a hypnotic quality.",
        color: "#3b4880", 
        icon: <Skull color="#fff" size={26} />,
        artistInfo: {
          name: "INTERWORLD",
          realName: "Unknown",
          verified: false,
          followers: "1.2M",
          genres: ["Phonk", "Electronic", "Trap"],
          bio: "INTERWORLD is an electronic music producer known for creating dark, bass-heavy phonk tracks that blend elements of trap and electronic music. Their music has gained significant traction through social media platforms.",
          topTracks: ["METAMORPHOSIS", "RAPTURE", "MISA MISA", "PHONKY TOWN", "FEEL NOTHING"]
        }
      },
      { 
        id: 2, 
        title: "Murder In My Mind", 
        artist: "Kordhell", 
        album: "Single",
        year: "2021",
        duration: "2:21",
        genre: "Phonk",
        description: "\"Murder In My Mind\" is a popular phonk track by Kordhell that blends trap beats with dark atmospheric elements. It became widely used in social media videos.",
        color: "#6a4ca6", 
        icon: <Skull color="#fff" size={26} />,
        artistInfo: {
          name: "Kordhell",
          realName: "Unknown",
          verified: false,
          followers: "897K",
          genres: ["Phonk", "Drift Phonk", "Electronic"],
          bio: "Kordhell is a phonk producer known for creating heavy, atmospheric tracks that blend elements of trap, Memphis rap, and electronic music. Their music often features distorted 808s and samples.",
          topTracks: ["Murder In My Mind", "Live Another Day", "Killin On The Outskirts", "Blood On The Leaves", "To The Hellfire"]
        }
      },
      { 
        id: 3, 
        title: "GigaChad Theme", 
        artist: "g3ox_em", 
        album: "Single",
        year: "2021",
        duration: "2:58",
        genre: "Electronic",
        description: "\"GigaChad Theme\" is an electronic music track by g3ox_em that became popular through meme culture and is often associated with the internet 'GigaChad' meme persona.",
        color: "#3c7ebf", 
        icon: <Skull color="#fff" size={26} />,
        artistInfo: {
          name: "g3ox_em",
          realName: "Unknown",
          verified: false,
          followers: "356K",
          genres: ["Electronic", "Meme Music", "Phonk"],
          bio: "g3ox_em is an electronic music producer who gained popularity through internet meme culture. Their music often features energetic beats and is frequently used in short-form video content.",
          topTracks: ["GigaChad Theme", "SIGMA", "HARDSTYLE", "NEON BLADE", "RAGE"]
        }
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
    description: "\"Inside Out\" is a song by American electronic music duo The Chainsmokers featuring vocals from Charlee. It showcases a softer, more melodic side of the duo's production style.",
    isPlaying: false,
    color: "#3c7ebf",
    artistInfo: {
      name: "The Chainsmokers",
      realName: "Alexander Pall and Andrew Taggart",
      verified: true,
      followers: "17.3M",
      genres: ["EDM", "Pop", "Future Bass"],
      bio: "The Chainsmokers are an American electronic DJ and production duo consisting of Alexander Pall and Andrew Taggart. The duo achieved breakthrough with their 2014 song \"#Selfie\" and have since become known for blending elements of dance music with pop and indie.",
      topTracks: ["Closer", "Something Just Like This", "Don't Let Me Down", "Paris", "Inside Out"]
    }
  });
  
  const [userName, setUserName] = useState("Logan");
  const [greeting, setGreeting] = useState("Evening vibes");
  const [pulseAnim] = useState(new Animated.Value(1));
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideAnim] = useState(new Animated.Value(50));
  
  // Artist info modal state
  const [artistInfoVisible, setArtistInfoVisible] = useState(false);
  const [selectedArtist, setSelectedArtist] = useState(null);
  
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
  
  // Show artist info modal
  const showArtistInfo = (artist) => {
    setSelectedArtist(artist);
    setArtistInfoVisible(true);
  };

  // Hide artist info modal
  const hideArtistInfo = () => {
    setArtistInfoVisible(false);
  };

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
              <Text 
                style={styles.musicItemArtist} 
                numberOfLines={1}
                onPress={(e) => {
                  e.stopPropagation();
                  showArtistInfo(item.artistInfo);
                }}
              >
                {item.artist} {item.artistInfo?.verified && <Check size={10} color="#2a9df4" />}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </LinearGradient>
    </Animated.View>
  );

  // Artist Info Modal Component
  const ArtistInfoModal = () => (
    <Modal
      visible={artistInfoVisible}
      transparent={true}
      animationType="slide"
      onRequestClose={hideArtistInfo}
    >
      <SafeAreaView style={styles.modalSafeArea}>
        <View style={styles.modalContainer}>
          <LinearGradient
            colors={["#0A0A0A", "#101020", "#18182a"]}
            style={styles.modalGradient}
          >
            <View style={styles.modalHeader}>
              <TouchableOpacity style={styles.closeButton} onPress={hideArtistInfo}>
                <X size={20} color="#fff" />
              </TouchableOpacity>
              <Text style={styles.modalTitle}>Artist Info</Text>
              <TouchableOpacity 
                style={styles.shareButton} 
                onPress={() => handleShare({ title: selectedArtist?.name, artist: "Artist" })}
              >
                <Share2 size={18} color="#fff" />
              </TouchableOpacity>
            </View>
            
            {selectedArtist && (
              <ScrollView style={styles.artistInfoScroll} showsVerticalScrollIndicator={false}>
                <View style={styles.artistHeaderSection}>
                  <View style={styles.artistAvatar}>
                    <User size={40} color="#fff" />
                  </View>
                  <View style={styles.artistHeaderInfo}>
                    <View style={styles.artistNameRow}>
                      <Text style={styles.artistName}>{selectedArtist.name}</Text>
                      {selectedArtist.verified && (
                        <View style={styles.verifiedBadge}>
                          <Check size={12} color="#fff" />
                        </View>
                      )}
                    </View>
                    <Text style={styles.artistRealName}>{selectedArtist.realName}</Text>
                    <View style={styles.statsRow}>
                      <View style={styles.statItem}>
                        <User size={14} color="#2a9df4" />
                        <Text style={styles.statText}>{selectedArtist.followers}</Text>
                      </View>
                      <View style={styles.statDivider} />
                      <View style={styles.statItem}>
                        <Music size={14} color="#2a9df4" />
                        <Text style={styles.statText}>{selectedArtist.genres.length} genres</Text>
                      </View>
                    </View>
                  </View>
                </View>
                
                <View style={styles.bioSection}>
                  <Text style={styles.sectionHeader}>Bio</Text>
                  <Text style={styles.bioText}>{selectedArtist.bio}</Text>
                </View>
                
                <View style={styles.genresSection}>
                  <Text style={styles.sectionHeader}>Genres</Text>
                  <View style={styles.genreTagsContainer}>
                    {selectedArtist.genres.map((genre, index) => (
                      <View key={index} style={styles.genreTag}>
                        <Text style={styles.genreTagText}>{genre}</Text>
                      </View>
                    ))}
                  </View>
                </View>
                
                <View style={styles.topTracksSection}>
                  <Text style={styles.sectionHeader}>Top Tracks</Text>
                  {selectedArtist.topTracks.map((track, index) => (
                    <View key={index} style={styles.trackItem}>
                      <View style={styles.trackNumberContainer}>
                        <Text style={styles.trackNumber}>{index + 1}</Text>
                      </View>
                      <View style={styles.trackIconContainer}>
                        <Disc size={16} color="#2a9df4" />
                      </View>
                      <Text style={styles.trackName}>{track}</Text>
                      <TouchableOpacity style={styles.trackPlayButton}>
                        <Play size={16} color="#fff" />
                      </TouchableOpacity>
                    </View>
                  ))}
                </View>
                
                <TouchableOpacity style={styles.fullProfileButton}>
                  <Text style={styles.fullProfileText}>View Full Profile</Text>
                </TouchableOpacity>
              </ScrollView>
            )}
          </LinearGradient>
        </View>
      </SafeAreaView>
    </Modal>
  );

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
          {renderHorizontalScroll("Liked Songs", MUSIC_DATA.likedSongs, Star)}
          
          {/* Spacer to ensure bottom content isn't hidden behind player */}
          <View style={styles.bottomSpacer} />
        </ScrollView>
        
       {/* Now Playing Bar */}
       {currentlyPlaying && (
          <Animated.View
            style={[
              styles.nowPlayingContainer,
              {
                opacity: fadeAnim,
                transform: [{ translateY: Animated.multiply(slideAnim, -1) }]
              }
            ]}
          >
            <LinearGradient
              colors={[currentlyPlaying.color || "#3c7ebf", "#101020"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.nowPlayingGradient}
            >
              <TouchableOpacity 
                style={styles.nowPlayingContent}
                onPress={navigateToDetailedSongScreen}
                activeOpacity={0.8}
              >
                <View style={[styles.nowPlayingIcon, { backgroundColor: currentlyPlaying.color }]}>
                  <Music color="#fff" size={20} />
                </View>
                <View style={styles.nowPlayingInfo}>
                  <Text style={styles.nowPlayingTitle} numberOfLines={1}>
                    {currentlyPlaying.title}
                  </Text>
                  <Text style={styles.nowPlayingArtist} numberOfLines={1}>
                    {currentlyPlaying.artist}
                  </Text>
                </View>
                <View style={styles.playbackControls}>
                  <TouchableOpacity style={styles.controlButton}>
                    <SkipBack size={20} color="#ffffff" />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.playButton} onPress={togglePlayback}>
                    {currentlyPlaying.isPlaying ? (
                      <Pause size={20} color="#ffffff" />
                    ) : (
                      <Play size={20} color="#ffffff" />
                    )}
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.controlButton}>
                    <SkipForward size={20} color="#ffffff" />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            </LinearGradient>
          </Animated.View>
        )}
        
        {/* Artist Info Modal */}
        <ArtistInfoModal />
      </View>
    </SafeAreaView>
  );
}
const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#080810"
  },
  container: {
    flex: 1,
    position: 'relative'
  },
  backgroundGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  backgroundElements: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 0
  },
  circleBg: {
    position: 'absolute',
    width: 300,
    height: 300,
    borderRadius: 300,
    backgroundColor: '#2a9df4',
    opacity: 0.1
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginTop: StatusBar.currentHeight || 0
  },
  backButtonContainer: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    overflow: 'hidden'
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20
  },
  logo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ffffff',
    letterSpacing: 0.5
  },
  profileButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center'
  },
  profileAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(42, 157, 244, 0.2)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  tagline: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginHorizontal: 16,
    marginTop: 10
  },
  subtext: {
    fontSize: 14,
    color: '#9DA5B4',
    marginHorizontal: 16,
    marginTop: 4,
    marginBottom: 20
  },
  scrollView: {
    flex: 1
  },
  forYouWrapper: {
    paddingHorizontal: 16,
    marginBottom: 24
  },
  forYouBanner: {
    position: 'relative',
    backgroundColor: 'rgba(13, 72, 117, 0.15)',
    borderRadius: 16,
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
    height: 100,
    overflow: 'hidden'
  },
  forYouGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 16
  },
  forYouIconContainer: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12
  },
  skullIcon: {
    opacity: 0.9
  },
  forYouText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ffffff',
    flex: 1
  },
  forYouSubtext: {
    fontSize: 12,
    color: '#9DA5B4',
    position: 'absolute',
    bottom: 16,
    left: 90
  },
  shareButtonSmall: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 30,
    height: 30,
    backgroundColor: 'rgba(42, 157, 244, 0.2)',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  card: {
    marginBottom: 24,
    borderRadius: 16,
    overflow: 'hidden'
  },
  cardGradient: {
    padding: 16,
    paddingBottom: 8
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 16
  },
  musicRow: {
    paddingBottom: 8
  },
  musicItem: {
    width: 120,
    marginRight: 12
  },
  iconBox: {
    width: 120,
    height: 120,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8
  },
  musicItemTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
    marginTop: 6
  },
  musicItemArtist: {
    fontSize: 12,
    color: '#9DA5B4',
    marginTop: 2,
    flexDirection: 'row',
    alignItems: 'center'
  },
  nowPlayingContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    overflow: 'hidden'
  },
  nowPlayingGradient: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 12
  },
  nowPlayingContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  nowPlayingIcon: {
    width: 46,
    height: 46,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12
  },
  nowPlayingInfo: {
    flex: 1
  },
  nowPlayingTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff'
  },
  nowPlayingArtist: {
    fontSize: 12,
    color: '#9DA5B4',
    marginTop: 2
  },
  playbackControls: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  controlButton: {
    width: 34,
    height: 34,
    justifyContent: 'center',
    alignItems: 'center'
  },
  playButton: {
    width: 34,
    height: 34,
    backgroundColor: 'rgba(42, 157, 244, 0.4)',
    borderRadius: 17,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8
  },
  bottomSpacer: {
    height: 80
  },
  modalSafeArea: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)'
  },
  modalContainer: {
    flex: 1,
    marginTop: height * 0.15
  },
  modalGradient: {
    flex: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden'
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)'
  },
  closeButton: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 15
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff'
  },
  shareButton: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(42, 157, 244, 0.2)',
    borderRadius: 15
  },
  artistInfoScroll: {
    flex: 1,
    padding: 16
  },
  artistHeaderSection: {
    flexDirection: 'row',
    marginBottom: 24
  },
  artistAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(42, 157, 244, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16
  },
  artistHeaderInfo: {
    flex: 1,
    justifyContent: 'center'
  },
  artistNameRow: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  artistName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginRight: 8
  },
  verifiedBadge: {
    backgroundColor: '#2a9df4',
    width: 16,
    height: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  artistRealName: {
    fontSize: 14,
    color: '#9DA5B4',
    marginTop: 4
  },
  statsRow: {
    flexDirection: 'row',
    marginTop: 8,
    alignItems: 'center'
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  statText: {
    fontSize: 12,
    color: '#9DA5B4',
    marginLeft: 4
  },
  statDivider: {
    width: 1,
    height: 12,
    backgroundColor: 'rgba(255,255,255,0.1)',
    marginHorizontal: 8
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 12
  },
  bioSection: {
    marginBottom: 24
  },
  bioText: {
    fontSize: 14,
    color: '#9DA5B4',
    lineHeight: 20
  },
  genresSection: {
    marginBottom: 24
  },
  genreTagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  genreTag: {
    backgroundColor: 'rgba(42, 157, 244, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8
  },
  genreTagText: {
    fontSize: 12,
    color: '#2a9df4'
  },
  topTracksSection: {
    marginBottom: 24
  },
  trackItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)'
  },
  trackNumberContainer: {
    width: 24,
    alignItems: 'center'
  },
  trackNumber: {
    fontSize: 14,
    color: '#9DA5B4'
  },
  trackIconContainer: {
    marginHorizontal: 8
  },
  trackName: {
    flex: 1,
    fontSize: 14,
    color: '#ffffff',
    marginLeft: 4
  },
  trackPlayButton: {
    width: 30,
    height: 30,
    backgroundColor: 'rgba(42, 157, 244, 0.2)',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  fullProfileButton: {
    backgroundColor: 'rgba(42, 157, 244, 0.2)',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 24
  },
  fullProfileText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2a9df4'
  }
});
