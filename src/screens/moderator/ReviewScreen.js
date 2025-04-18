import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity, 
  StatusBar,
  Modal,
  SafeAreaView,
  Animated,
  Dimensions,
  ScrollView
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Music, User, X } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

export default function ReviewScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  const fadeAnim = useState(new Animated.Value(0))[0];
  const slideAnim = useState(new Animated.Value(50))[0];
  const pulseAnim = useState(new Animated.Value(1))[0];

  const navigation = useNavigation();

  useEffect(() => {
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

  const handleButtonPress = (section) => {
    if (section === 'tracks') {
      navigation.navigate('PendingTracks'); // Navigate directly to pending tracks
    } else {
      setActiveSection(section);
      setModalVisible(true); // Only open modal for artist verification
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />

      <LinearGradient
        colors={['#0A0A0A', '#101020', '#18182a']}
        style={styles.backgroundGradient}
      />

      <View style={styles.backgroundElements}>
        <View style={[styles.circleBg, { top: '5%', left: '10%', opacity: 0.2 }]} />
        <View style={[styles.circleBg, { top: '30%', right: '-5%', opacity: 0.15 }]} />
        <View style={[styles.circleBg, { bottom: '10%', left: '5%', opacity: 0.1 }]} />
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.logoContainer}>
          <Text style={styles.logo}>SoundScout</Text>
          <Text style={styles.tagline}>Moderator Actions</Text>
        </View>

        <Animated.View
          style={[
            styles.statsContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }]
            }
          ]}
        >
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>24</Text>
            <Text style={styles.statLabel}>Pending Tracks</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Artist Verifications</Text>
          </View>
        </Animated.View>

        <Animated.View
          style={[
            styles.actionsContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }]
            }
          ]}
        >
          <TouchableOpacity
            style={styles.actionButton}
            activeOpacity={0.8}
            onPress={() => handleButtonPress('tracks')}
          >
            <LinearGradient
              colors={['rgba(42, 157, 244, 0.1)', 'rgba(58, 119, 222, 0.2)']}
              style={styles.actionGradient}
            >
              <View style={styles.actionIconContainer}>
                <Music size={24} color="#2a9df4" />
              </View>
              <View style={styles.actionTextContainer}>
                <Text style={styles.actionTitle}>Review Tracks</Text>
                <Text style={styles.actionSubtitle}>Review pending music uploads</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            activeOpacity={0.8}
            onPress={() => handleButtonPress('artists')}
          >
            <LinearGradient
              colors={['rgba(42, 157, 244, 0.1)', 'rgba(58, 119, 222, 0.2)']}
              style={styles.actionGradient}
            >
              <View style={styles.actionIconContainer}>
                <User size={24} color="#2a9df4" />
              </View>
              <View style={styles.actionTextContainer}>
                <Text style={styles.actionTitle}>Artist Verification</Text>
                <Text style={styles.actionSubtitle}>Verify new artist profiles</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <LinearGradient 
            colors={['#101020', '#18182a']}
            style={styles.modalContent}
          >
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <X size={20} color="#aaa" />
              </TouchableOpacity>
            </View>
            
            <Text style={styles.modalText}>
              {activeSection === 'tracks' 
                ? 'Review and approve music tracks for quality and content.'
                : 'Verify the identity of new artists before approval.'}
            </Text>
          </LinearGradient>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  backgroundGradient: { ...StyleSheet.absoluteFillObject },
  backgroundElements: { ...StyleSheet.absoluteFillObject },
  circleBg: {
    position: 'absolute',
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: '#2a9df4',
    opacity: 0.1,
  },
  scrollContent: { alignItems: 'center', paddingTop: 60, paddingBottom: 50, paddingHorizontal: 24 },
  logoContainer: { alignItems: 'center', marginBottom: 30 },
  logo: { fontSize: 40, fontWeight: 'bold', color: '#fff', textShadowColor: '#2a9df4', textShadowRadius: 15, textShadowOffset: { width: 2, height: 2 } },
  tagline: { fontSize: 16, color: "#aaa", marginTop: 5 },
  statsContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  statBox: {
    flex: 1,
    backgroundColor: 'rgba(42, 157, 244, 0.1)',
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: 'rgba(42, 157, 244, 0.3)',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2a9df4',
  },
  statLabel: {
    color: '#aaa',
    fontSize: 12,
    marginTop: 5,
  },
  actionsContainer: { width: '100%' },
  actionButton: { width: '100%', marginBottom: 15, borderRadius: 12, overflow: 'hidden' },
  actionGradient: { flexDirection: 'row', alignItems: 'center', padding: 16, borderWidth: 1, borderColor: 'rgba(42, 157, 244, 0.3)', borderRadius: 12 },
  actionIconContainer: { width: 46, height: 46, borderRadius: 23, backgroundColor: 'rgba(42, 157, 244, 0.1)', justifyContent: 'center', alignItems: 'center', marginRight: 15, borderWidth: 1, borderColor: 'rgba(42, 157, 244, 0.3)' },
  actionTextContainer: { flex: 1 },
  actionTitle: { color: '#fff', fontSize: 16, fontWeight: '600' },
  actionSubtitle: { color: '#aaa', fontSize: 12, marginTop: 4 },
  modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.7)' },
  modalContent: { width: width * 0.9, backgroundColor: '#18182a', borderRadius: 20, padding: 20, borderWidth: 1, borderColor: 'rgba(42, 157, 244, 0.3)', shadowColor: '#2a9df4', shadowOpacity: 0.3, shadowRadius: 10, elevation: 10 },
  modalHeader: { alignItems: 'flex-end', marginBottom: 15 },
  modalText: { color: '#aaa', fontSize: 14, textAlign: 'center', lineHeight: 20 },
});