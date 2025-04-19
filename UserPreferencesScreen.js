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
  
  // State to track selected preferences
  const [selectedPreferences, setSelectedPreferences] = useState([]);
  
  // Animated values for entrance and pulse animations
  const fadeAnim = useState(new Animated.Value(0))[0];
  const slideAnim = useState(new Animated.Value(50))[0];
  const pulseAnim = useState(new Animated.Value(1))[0];

  // Determine greeting based on time of day
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  useEffect(() => {
    // Entrance animation
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
    
    // Logo pulse animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.05,
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

  // Music genres with icons
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

  // Toggle selection of a preference
  const togglePreference = (preference) => {
    if (selectedPreferences.includes(preference)) {
      setSelectedPreferences(selectedPreferences.filter(item => item !== preference));
    } else {
      setSelectedPreferences([...selectedPreferences, preference]);
    }
  };

  // Handle submission of preferences
  const handleSubmit = () => {
    // In a real app, you would save these preferences to user profile
    // For now, just navigate to the user dashboard with the preferences
    navigation.navigate('UserDashboard', { selectedPreferences });
  };

  // Go back to previous screen
  const goBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      
      {/* Background gradient */}
      <LinearGradient
        colors={['#0A0A0A', '#101020', '#18182a']}
        style={styles.backgroundGradient}
      />

      {/* Animated background elements */}
      <View style={styles.backgroundElements}>
        <View style={[styles.circleBg, { top: '10%', left: '15%', opacity: 0.2 }]} />
        <View style={[styles.circleBg, { top: '40%', right: '-5%', opacity: 0.15 }]} />
        <View style={[styles.circleBg, { bottom: '15%', left: '5%', opacity: 0.1 }]} />
      </View>
      
      {/* Back button */}
      <TouchableOpacity style={styles.backButtonContainer} onPress={goBack}>
        <LinearGradient
          colors={['#2a9df4', '#3a77de']}
          style={styles.backButton}
        >
          <ArrowLeft size={24} color="#fff" />
        </LinearGradient>
      </TouchableOpacity>

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Animated header with logo */}
        <Animated.View 
          style={[
            styles.headerContainer, 
            { 
              opacity: fadeAnim, 
              transform: [
                { translateY: slideAnim },
                { scale: pulseAnim }
              ] 
            }
          ]}
        >
          <Text style={styles.logo}>SoundScout</Text>
          
          <View style={styles.greetingContainer}>
            <Text style={styles.greeting}>👋 Hi {username},</Text>
            <Text style={styles.subgreeting}>{getGreeting()}</Text>
          </View>
        </Animated.View>

        {/* Preferences Title */}
        <Animated.View 
          style={[
            styles.preferencesHeader,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }]
            }
          ]}
        >
          <LinearGradient
            colors={['rgba(42, 157, 244, 0.1)', 'rgba(58, 119, 222, 0.2)']}
            style={styles.preferencesHeaderGradient}
          >
            <Text style={styles.preferencesTitle}>Pick Your Music Preferences</Text>
            <Text style={styles.preferencesSubtitle}>Select by genre or mood to personalize your experience</Text>
          </LinearGradient>
        </Animated.View>

        {/* Preferences Selection */}
        <Animated.View 
          style={[
            styles.preferencesContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }]
            }
          ]}
        >
          {categories.map((category, index) => (
            <View key={index} style={styles.categoryContainer}>
              <View style={styles.categoryHeader}>
                <View style={styles.categoryTitleContainer}>
                  {category.icon}
                  <Text style={styles.categoryTitle}>{category.title}</Text>
                </View>
                <Text style={styles.selectedCount}>
                  {selectedPreferences.filter(pref => 
                    category.items.some(item => item.name === pref)
                  ).length} selected
                </Text>
              </View>
              
              <View style={styles.preferencesRow}>
                {category.items.map((item) => (
                  <TouchableOpacity 
                    key={item.name}
                    style={[
                      styles.preferenceButton,
                      selectedPreferences.includes(item.name) ? styles.selectedPreference : {}
                    ]}
                    onPress={() => togglePreference(item.name)}
                    activeOpacity={0.7}
                  >
                    <LinearGradient
                      colors={
                        selectedPreferences.includes(item.name) 
                          ? ['#2a9df4', '#3a77de'] 
                          : ['rgba(42, 157, 244, 0.1)', 'rgba(58, 119, 222, 0.2)']
                      }
                      style={styles.preferenceGradient}
                    >
                      <View style={styles.preferenceContent}>
                        <View style={styles.preferenceIconContainer}>
                          {item.icon}
                        </View>
                        <Text 
                          style={[
                            styles.preferenceText,
                            selectedPreferences.includes(item.name) ? styles.selectedPreferenceText : {}
                          ]}
                        >
                          {item.name}
                        </Text>
                      </View>
                    </LinearGradient>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          ))}

          {/* More button */}
          <TouchableOpacity style={styles.moreButton}>
            <View style={styles.moreButtonContainer}>
              <MoreHorizontal size={24} color="#2a9df4" />
            </View>
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>

      {/* Submit Button */}
      <View style={styles.submitContainer}>
        <TouchableOpacity 
          style={styles.submitButton}
          onPress={handleSubmit}
          disabled={selectedPreferences.length === 0}
        >
          <LinearGradient
            colors={selectedPreferences.length > 0 ? ['#2a9df4', '#3a77de'] : ['#333', '#444']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.submitGradient}
          >
            <Text style={styles.submitText}>
              {selectedPreferences.length > 0 ? 'Continue' : 'Select Preferences'}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
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
    backgroundColor: 'rgba(42, 157, 244, 0.2)',
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
  scrollContent: {
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 24,
  },
  headerContainer: {
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 25,
  },
  logo: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    textShadowColor: '#2a9df4',
    textShadowRadius: 15,
    textShadowOffset: { width: 2, height: 2 },
    marginBottom: 15,
  },
  greetingContainer: {
    alignItems: 'center',
  },
  greeting: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '500',
  },
  subgreeting: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    marginTop: 4,
  },
  preferencesHeader: {
    width: '100%',
    marginBottom: 25,
  },
  preferencesHeaderGradient: {
    borderRadius: 15,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(42, 157, 244, 0.3)',
  },
  preferencesTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  preferencesSubtitle: {
    color: '#aaa',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 4,
  },
  preferencesContainer: {
    width: '100%',
    marginBottom: 20,
  },
  categoryContainer: {
    marginBottom: 25,
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 5,
  },
  categoryTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryTitle: {
    color: '#2a9df4',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 10,
  },
  selectedCount: {
    color: '#aaa',
    fontSize: 14,
  },
  preferencesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  preferenceButton: {
    width: '48%',
    marginBottom: 12,
    marginHorizontal: '1%',
    borderRadius: 12,
    overflow: 'hidden',
  },
  preferenceGradient: {
    borderWidth: 1,
    borderColor: 'rgba(42, 157, 244, 0.3)',
    borderRadius: 12,
  },
  preferenceContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  preferenceIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(42, 157, 244, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    borderWidth: 1,
    borderColor: 'rgba(42, 157, 244, 0.3)',
  },
  preferenceText: {
    color: '#aaa',
    fontSize: 14,
    fontWeight: '500',
  },
  selectedPreference: {
    shadowColor: '#2a9df4',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 8,
    elevation: 5,
  },
  selectedPreferenceText: {
    color: '#fff',
    fontWeight: '600',
  },
  moreButton: {
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  moreButtonContainer: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: 'rgba(42, 157, 244, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(42, 157, 244, 0.3)',
  },
  submitContainer: {
    paddingHorizontal: 24,
    paddingBottom: 30,
  },
  submitButton: {
    width: '100%',
    borderRadius: 25,
    overflow: 'hidden',
    shadowColor: '#2a9df4',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
  },
  submitGradient: {
    height: 54,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  }
});