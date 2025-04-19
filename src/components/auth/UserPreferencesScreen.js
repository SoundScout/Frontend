import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  StatusBar,
  Dimensions,
  Animated,
  SafeAreaView
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft, Music, Headphones, Heart, Zap, Clock, Disc, MoreHorizontal } from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function UserPreferencesScreen({ route }) {
  const navigation = useNavigation();
  const { username = 'Logan' } = route.params || {};

  const [selectedPreferences, setSelectedPreferences] = useState([]);
  const fadeAnim = useState(new Animated.Value(0))[0];
  const slideAnim = useState(new Animated.Value(50))[0];
  const pulseAnim = useState(new Animated.Value(1))[0];

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 1000, useNativeDriver: true })
    ]).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1.05, duration: 1500, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 1, duration: 1500, useNativeDriver: true })
      ])
    ).start();
  }, []);

  const categories = [
    {
      title: "Genres",
      icon: <Music size={20} color="#2a9df4" />,
      items: [
        { name: "Rock", icon: <Zap size={16} color="#2a9df4" /> },
        { name: "Pop", icon: <Disc size={16} color="#2a9df4" /> },
        { name: "Hip Hop", icon: <Music size={16} color="#2a9df4" /> },
        { name: "Jazz", icon: <Music size={16} color="#2a9df4" /> },
        { name: "Classical", icon: <Music size={16} color="#2a9df4" /> },
        { name: "Electronic", icon: <Zap size={16} color="#2a9df4" /> },
        { name: "R&B", icon: <Music size={16} color="#2a9df4" /> },
        { name: "Country", icon: <Music size={16} color="#2a9df4" /> }
      ]
    },
    {
      title: "Moods",
      icon: <Headphones size={20} color="#2a9df4" />,
      items: [
        { name: "Energetic", icon: <Zap size={16} color="#2a9df4" /> },
        { name: "Relaxed", icon: <Heart size={16} color="#2a9df4" /> },
        { name: "Focus", icon: <Clock size={16} color="#2a9df4" /> },
        { name: "Happy", icon: <Heart size={16} color="#2a9df4" /> },
        { name: "Chill", icon: <Headphones size={16} color="#2a9df4" /> },
        { name: "Workout", icon: <Zap size={16} color="#2a9df4" /> },
        { name: "Party", icon: <Music size={16} color="#2a9df4" /> }
      ]
    }
  ];

  const togglePreference = (pref) => {
    setSelectedPreferences(prev =>
      prev.includes(pref)
        ? prev.filter(p => p !== pref)
        : [...prev, pref]
    );
  };

  const handleSubmit = () => {
    navigation.navigate('MainApp');
  };

  const goBack = () => navigation.goBack();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />

      <LinearGradient colors={['#0A0A0A', '#101020', '#18182a']} style={styles.backgroundGradient} />

      <View style={styles.backgroundElements}>
        <View style={[styles.circleBg, { top: '10%', left: '15%', opacity: 0.2 }]} />
        <View style={[styles.circleBg, { top: '40%', right: '-5%', opacity: 0.15 }]} />
        <View style={[styles.circleBg, { bottom: '15%', left: '5%', opacity: 0.1 }]} />
      </View>

      <TouchableOpacity style={styles.backButtonContainer} onPress={goBack}>
        <LinearGradient colors={['#2a9df4', '#3a77de']} style={styles.backButton}>
          <ArrowLeft size={24} color="#fff" />
        </LinearGradient>
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Animated.View style={[styles.headerContainer, { opacity: fadeAnim, transform: [{ translateY: slideAnim }, { scale: pulseAnim }] }]}>
          <Text style={styles.logo}>SoundScout</Text>
          <View style={styles.greetingContainer}>
            <Text style={styles.greeting}>👋 Hi {username},</Text>
            <Text style={styles.subgreeting}>{getGreeting()}</Text>
          </View>
        </Animated.View>

        <Animated.View style={[styles.preferencesHeader, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
          <LinearGradient colors={['rgba(42, 157, 244, 0.1)', 'rgba(58, 119, 222, 0.2)']} style={styles.preferencesHeaderGradient}>
            <Text style={styles.preferencesTitle}>Pick Your Music Preferences</Text>
            <Text style={styles.preferencesSubtitle}>Select by genre or mood to personalize your experience</Text>
          </LinearGradient>
        </Animated.View>

        <Animated.View style={[styles.preferencesContainer, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
          {categories.map((cat, i) => (
            <View key={i} style={styles.categoryContainer}>
              <View style={styles.categoryHeader}>
                <View style={styles.categoryTitleContainer}>
                  {cat.icon}
                  <Text style={styles.categoryTitle}>{cat.title}</Text>
                </View>
                <Text style={styles.selectedCount}>
                  {selectedPreferences.filter(p => cat.items.some(item => item.name === p)).length} selected
                </Text>
              </View>

              <View style={styles.preferencesRow}>
                {cat.items.map(item => (
                  <TouchableOpacity
                    key={item.name}
                    style={[styles.preferenceButton, selectedPreferences.includes(item.name) && styles.selectedPreference]}
                    onPress={() => togglePreference(item.name)}
                    activeOpacity={0.7}
                  >
                    <LinearGradient
                      colors={selectedPreferences.includes(item.name) ? ['#2a9df4', '#3a77de'] : ['rgba(42, 157, 244, 0.1)', 'rgba(58, 119, 222, 0.2)']}
                      style={styles.preferenceGradient}
                    >
                      <View style={styles.preferenceContent}>
                        <View style={styles.preferenceIconContainer}>{item.icon}</View>
                        <Text style={[styles.preferenceText, selectedPreferences.includes(item.name) && styles.selectedPreferenceText]}>
                          {item.name}
                        </Text>
                      </View>
                    </LinearGradient>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          ))}

          <TouchableOpacity style={styles.moreButton}>
            <View style={styles.moreButtonContainer}>
              <MoreHorizontal size={24} color="#2a9df4" />
            </View>
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>

      <View style={styles.submitContainer}>
        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleSubmit}
          disabled={selectedPreferences.length === 0}
        >
          <LinearGradient
            colors={selectedPreferences.length ? ['#2a9df4', '#3a77de'] : ['#333', '#444']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.submitGradient}
          >
            <Text style={styles.submitText}>
              {selectedPreferences.length ? 'Continue' : 'Select Preferences'}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  backgroundGradient: { position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 },
  backgroundElements: { position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 },
  circleBg: { position: 'absolute', width: 300, height: 300, borderRadius: 150, backgroundColor: '#2a9df4' },
  backButtonContainer: { position: 'absolute', top: 50, left: 24, zIndex: 10 },
  backButton: {
    width: 42, height: 42, borderRadius: 21, justifyContent: 'center',
    alignItems: 'center', borderWidth: 1, borderColor: '#2a9df4',
    shadowColor: '#2a9df4', shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6, shadowRadius: 8, elevation: 5
  },
  scrollContent: { paddingTop: 60, paddingBottom: 30, paddingHorizontal: 24 },
  headerContainer: { alignItems: 'center', marginTop: 30, marginBottom: 25 },
  logo: {
    fontSize: 32, fontWeight: 'bold', color: '#fff',
    textShadowColor: '#2a9df4', textShadowRadius: 15, textShadowOffset: { width: 2, height: 2 },
    marginBottom: 15
  },
  greetingContainer: { alignItems: 'center' },
  greeting: { fontSize: 18, color: '#fff', fontWeight: '500' },
  subgreeting: { fontSize: 24, color: '#fff', fontWeight: 'bold', marginTop: 4 },
  preferencesHeader: { width: '100%', marginBottom: 25 },
  preferencesHeaderGradient: {
    borderRadius: 15, padding: 16,
    borderWidth: 1, borderColor: 'rgba(42, 157, 244, 0.3)'
  },
  preferencesTitle: { color: '#fff', fontSize: 18, fontWeight: '600', textAlign: 'center' },
  preferencesSubtitle: { color: '#aaa', fontSize: 14, textAlign: 'center', marginTop: 4 },
  preferencesContainer: { width: '100%', marginBottom: 20 },
  categoryContainer: { marginBottom: 25 },
  categoryHeader: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    marginBottom: 16, paddingHorizontal: 5
  },
  categoryTitleContainer: { flexDirection: 'row', alignItems: 'center' },
  categoryTitle: { color: '#2a9df4', fontSize: 18, fontWeight: '600', marginLeft: 10 },
  selectedCount: { color: '#aaa', fontSize: 14 },
  preferencesRow: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start' },
  preferenceButton: {
    width: '48%', marginBottom: 12, marginHorizontal: '1%',
    borderRadius: 12, overflow: 'hidden'
  },
  preferenceGradient: {
    borderWidth: 1, borderColor: 'rgba(42, 157, 244, 0.3)', borderRadius: 12
  },
  preferenceContent: { flexDirection: 'row', alignItems: 'center', padding: 12 },
  preferenceIconContainer: {
    width: 32, height: 32, borderRadius: 16, justifyContent: 'center', alignItems: 'center',
    backgroundColor: 'rgba(42, 157, 244, 0.1)', borderWidth: 1, borderColor: 'rgba(42, 157, 244, 0.3)',
    marginRight: 10
  },
  preferenceText: { color: '#aaa', fontSize: 14, fontWeight: '500' },
  selectedPreference: {
    shadowColor: '#2a9df4', shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6, shadowRadius: 8, elevation: 5
  },
  selectedPreferenceText: { color: '#fff', fontWeight: '600' },
  moreButton: { alignSelf: 'center', marginTop: 10, marginBottom: 20 },
  moreButtonContainer: {
    width: 42, height: 42, borderRadius: 21,
    backgroundColor: 'rgba(42, 157, 244, 0.1)',
    justifyContent: 'center', alignItems: 'center',
    borderWidth: 1, borderColor: 'rgba(42, 157, 244, 0.3)'
  },
  submitContainer: { paddingHorizontal: 24, paddingBottom: 30 },
  submitButton: {
    width: '100%', borderRadius: 25, overflow: 'hidden',
    shadowColor: '#2a9df4', shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5, shadowRadius: 10, elevation: 5
  },
  submitGradient: { height: 54, justifyContent: 'center', alignItems: 'center' },
  submitText: { color: '#fff', fontSize: 16, fontWeight: '600' }
});