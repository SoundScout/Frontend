import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import {
  Play,
  Music,
  Star,
  Heart,
  User,
} from "lucide-react-native";

export default function HomeScreen() {
  const navigation = useNavigation();

  const forYouItems = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];
  const adminPicks = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];
  const mostLiked = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];
  const likedSongs = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];

  const renderHorizontalScroll = (title, items, IconComponent) => (
    <View style={styles.card}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.musicRow}>
        {items.map((item) => (
          <TouchableOpacity key={item.id} style={styles.musicItem}>
            <View style={styles.iconBox}>
              <IconComponent color="#fff" size={26} />
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#0A0A0A", "#101020", "#18182a"]}
        style={styles.backgroundGradient}
      />

      {/* Background Elements */}
      <View style={styles.backgroundElements}>
        <View style={[styles.circleBg, { top: '10%', left: '-10%', opacity: 0.2 }]} />
        <View style={[styles.circleBg, { bottom: '20%', right: '-15%', opacity: 0.15 }]} />
      </View>

      <View style={styles.header}>
        <Text style={styles.logo}>SoundScout</Text>
        <TouchableOpacity style={styles.profileButton}>
          <View style={styles.profileAvatar}>
            <User size={20} color="#fff" />
          </View>
        </TouchableOpacity>
      </View>

      <Text style={styles.tagline}>Evening vibes, Logan </Text>
      <Text style={styles.subtext}>Curated picks just for your soul</Text>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* For You Banner */}
        <TouchableOpacity style={styles.forYouBanner}>
          <Text style={styles.forYouText}> For You </Text>
        </TouchableOpacity>

        {renderHorizontalScroll("Admin Picks", adminPicks, Star)}
        {renderHorizontalScroll("Most Liked", mostLiked, Heart)}
        {renderHorizontalScroll("Liked Songs", likedSongs, Music)}

        {/* Currently Playing */}
        <TouchableOpacity style={styles.nowPlayingCard}>
          <View style={styles.songIcon}>
            <Music color="#fff" size={22} />
          </View>
          <View style={styles.nowPlayingDetails}>
            <Text style={styles.songTitle}>Inside Out</Text>
            <Text style={styles.artistName}>The Chainsmokers, Charlee</Text>
          </View>
          <TouchableOpacity style={styles.playButton}>
            <Play size={18} color="#fff" />
          </TouchableOpacity>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  backgroundGradient: {
    ...StyleSheet.absoluteFillObject,
  },
  backgroundElements: {
    ...StyleSheet.absoluteFillObject,
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
  logo: {
    fontSize: 32,
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
  },
  tagline: {
    fontSize: 16,
    fontStyle: "italic",
    color: "#aaa",
    marginTop: 4,
  },
  subtext: {
    color: "#aaa",
    textAlign: "left",
    marginTop: 8,
    fontSize: 14,
  },
  scrollView: {
    marginTop: 20,
  },
  forYouBanner: {
    height: 100,
    borderRadius: 20,
    backgroundColor: 'rgba(42, 157, 244, 0.1)',
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
    shadowColor: "#2a9df4",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 5,
  },
  forYouText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    textShadowColor: "#000",
    textShadowRadius: 4,
    textShadowOffset: { width: 2, height: 2 },
  },
  card: {
    backgroundColor: "rgba(13, 72, 117, 0.47)",
    borderRadius: 20,
    padding: 16,
    marginBottom: 24,
    borderWidth: 2,
    borderColor: "#2a9df4",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
  },
  musicRow: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  musicItem: {
    alignItems: "center",
  },
  iconBox: {
    width: 60,
    height: 60,
    backgroundColor: "#555",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#2a9df4",
  },
  nowPlayingCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#222",
    borderRadius: 20,
    padding: 12,
    marginBottom: 30,
    borderWidth: 2,
    borderColor: "#2a9df4",
  },
  songIcon: {
    width: 50,
    height: 50,
    backgroundColor: "#444",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  nowPlayingDetails: {
    flex: 1,
    marginLeft: 12,
  },
  songTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  artistName: {
    color: "#bbb",
    fontSize: 14,
  },
  playButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#2a9df4",
    justifyContent: "center",
    alignItems: "center",
  },
});
