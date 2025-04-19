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
import { ArrowLeft, Music, X, Shield, User, ListFilter, AlertCircle, Check } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const ModeratorDashboardScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  
  // Animated values for entrance animations
  const fadeAnim = useState(new Animated.Value(0))[0];
  const slideAnim = useState(new Animated.Value(50))[0];
  
  // Animation for the logo pulse effect
  const pulseAnim = useState(new Animated.Value(1))[0];
  
  // Navigation hook (added to match upload screen style)
  const navigation = useNavigation();

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
  
    // Start the pulse animation for the logo
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
    setActiveSection(section);
    setModalVisible(true);
  };

  // Function to navigate back to the previous screen (matching upload screen)
  const goBack = () => {
    navigation.goBack();
  };
  
  // New function for navigating to artist verification screen
  const navigateToArtistVerification = (artistName) => {
    setModalVisible(false); // Close modal first
    navigation.navigate('ArtistVerification', { artistName });
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
        <View style={[styles.circleBg, { top: '5%', left: '10%', opacity: 0.2 }]} />
        <View style={[styles.circleBg, { top: '30%', right: '-5%', opacity: 0.15 }]} />
        <View style={[styles.circleBg, { bottom: '10%', left: '5%', opacity: 0.1 }]} />
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
        {/* Animated logo and tagline */}
        <Animated.View 
          style={[
            styles.logoContainer, 
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
          <Text style={styles.tagline}>Moderator Dashboard</Text>
        </Animated.View>

        {/* Dashboard stats */}
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
            <Text style={styles.statNumber}>1</Text>
            <Text style={styles.statLabel}>Pending Tracks</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>1</Text>
            <Text style={styles.statLabel}>Artist Verifications</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>2</Text>
            <Text style={styles.statLabel}>Reports</Text>
          </View>
        </Animated.View>

        {/* Admin actions */}
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
                <Text style={styles.actionSubtitle}>Review and approve pending music uploads</Text>
              </View>
              <View style={styles.badgeContainer}>
                <Text style={styles.badgeText}>1</Text>
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
                <Text style={styles.actionSubtitle}>Verify new artist registrations</Text>
              </View>
              <View style={styles.badgeContainer}>
                <Text style={styles.badgeText}>1</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.actionButton}
            activeOpacity={0.8}
            onPress={() => handleButtonPress('reports')}
          >
            <LinearGradient
              colors={['rgba(42, 157, 244, 0.1)', 'rgba(58, 119, 222, 0.2)']}
              style={styles.actionGradient}
            >
              <View style={styles.actionIconContainer}>
                <AlertCircle size={24} color="#2a9df4" />
              </View>
              <View style={styles.actionTextContainer}>
                <Text style={styles.actionTitle}>Handle Reports</Text>
                <Text style={styles.actionSubtitle}>Review reported content and users</Text>
              </View>
              <View style={styles.badgeContainer}>
                <Text style={styles.badgeText}>2</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>

      {/* Modal for track review */}
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
              <View style={styles.modalTitleContainer}>
                {activeSection === 'tracks' && <Music size={20} color="#2a9df4" />}
                {activeSection === 'artists' && <User size={20} color="#2a9df4" />}
                {activeSection === 'reports' && <AlertCircle size={20} color="#2a9df4" />}
                <Text style={styles.modalTitle}>
                  {activeSection === 'tracks' ? 'Track Review' : 
                   activeSection === 'artists' ? 'Artist Verification' : 'Reports'}
                </Text>
              </View>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <X size={20} color="#aaa" />
              </TouchableOpacity>
            </View>
            
            <Text style={styles.modalText}>
              {activeSection === 'tracks' 
                ? 'Review and approve new music tracks for content, quality, and metadata accuracy.'
                : activeSection === 'artists'
                ? 'Verify artist identities and approve new artist profiles before they go live.'
                : 'Review reported content and user accounts that violate platform policies.'}
            </Text>
            
            {/* Sample pending items */}
            <View style={styles.pendingItemsContainer}>
              {activeSection === 'tracks' && (
                <>
                  
                  
                  <View style={styles.pendingItem}>
                    <View style={styles.pendingItemIconContainer}>
                      <Music size={18} color="#2a9df4" />
                    </View>
                    <View style={styles.pendingItemInfo}>
                      <Text style={styles.pendingItemTitle}>Neon Streets</Text>
                      <Text style={styles.pendingItemSubtitle}>by Stellar Echo • 4:15</Text>
                    </View>
                    <TouchableOpacity style={[styles.reviewButton, styles.approveButton]}>
                      <Check size={16} color="#fff" />
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.reviewButton, styles.rejectButton]}>
                      <X size={16} color="#fff" />
                    </TouchableOpacity>
                  </View>
                </>
              )}
              
              {activeSection === 'artists' && (
                <>
                  
                  {/* Modified this section to add navigation to ArtistVerificationScreen */}
                  <TouchableOpacity 
                    style={styles.pendingItem}
                    onPress={() => navigateToArtistVerification('Stellar Echo')}
                  >
                    <View style={styles.pendingItemIconContainer}>
                      <User size={18} color="#2a9df4" />
                    </View>
                    <View style={styles.pendingItemInfo}>
                      <Text style={styles.pendingItemTitle}>Atlas Reverie</Text>
                      <Text style={styles.pendingItemSubtitle}>Indie Pop • New artist</Text>
                    </View>
                    <TouchableOpacity 
                      style={[styles.reviewButton, styles.approveButton]}
                      onPress={(e) => {
                        e.stopPropagation(); // Prevent triggering the parent's onPress
                        // You can add approve logic here if needed
                      }}
                    >
                      <Check size={16} color="#fff" />
                    </TouchableOpacity>
                    <TouchableOpacity 
                      style={[styles.reviewButton, styles.rejectButton]}
                      onPress={(e) => {
                        e.stopPropagation(); // Prevent triggering the parent's onPress
                        // You can add reject logic here if needed
                      }}
                    >
                      <X size={16} color="#fff" />
                    </TouchableOpacity>
                  </TouchableOpacity>
                </>
              )}
              
              {activeSection === 'reports' && (
                <>
                  <View style={styles.pendingItem}>
                    <View style={[styles.pendingItemIconContainer, {backgroundColor: 'rgba(244, 67, 54, 0.1)'}]}>
                      <AlertCircle size={18} color="#f44336" />
                    </View>
                    <View style={styles.pendingItemInfo}>
                      <Text style={styles.pendingItemTitle}>Copyright Violation</Text>
                      <Text style={styles.pendingItemSubtitle}>Track: "Deep Blue" by WaveRunner</Text>
                    </View>
                    <TouchableOpacity style={styles.reviewActionButton}>
                      <Text style={styles.reviewActionText}>Review</Text>
                    </TouchableOpacity>
                  </View>
                  
                  <View style={styles.pendingItem}>
                    <View style={[styles.pendingItemIconContainer, {backgroundColor: 'rgba(244, 67, 54, 0.1)'}]}>
                      <AlertCircle size={18} color="#f44336" />
                    </View>
                    <View style={styles.pendingItemInfo}>
                      <Text style={styles.pendingItemTitle}>Inappropriate Content</Text>
                      <Text style={styles.pendingItemSubtitle}>User: SonicProducer</Text>
                    </View>
                    <TouchableOpacity style={styles.reviewActionButton}>
                      <Text style={styles.reviewActionText}>Review</Text>
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </View>
            
            
          </LinearGradient>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

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
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 50,
    paddingHorizontal: 24,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logo: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#fff',
    textShadowColor: '#2a9df4',
    textShadowRadius: 15,
    textShadowOffset: { width: 2, height: 2 },
  },
  tagline: {
    fontSize: 16,
    color: "#aaa",
    textAlign: 'center',
    marginTop: 5,
  },
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
  actionsContainer: {
    width: '100%',
  },
  actionButton: {
    width: '100%',
    marginBottom: 15,
    borderRadius: 12,
    overflow: 'hidden',
  },
  actionGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(42, 157, 244, 0.3)',
    borderRadius: 12,
  },
  actionIconContainer: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: 'rgba(42, 157, 244, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
    borderWidth: 1,
    borderColor: 'rgba(42, 157, 244, 0.3)',
  },
  actionTextContainer: {
    flex: 1,
  },
  actionTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  actionSubtitle: {
    color: '#aaa',
    fontSize: 12,
    marginTop: 4,
  },
  badgeContainer: {
    backgroundColor: '#2a9df4',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContent: {
    width: width * 0.9,
    backgroundColor: '#18182a',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(42, 157, 244, 0.3)',
    shadowColor: '#2a9df4',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  modalTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  modalText: {
    color: '#aaa',
    fontSize: 14,
    marginBottom: 20,
    lineHeight: 20,
  },
  pendingItemsContainer: {
    marginTop: 10,
    marginBottom: 20,
  },
  pendingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
  },
  pendingItemIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(42, 157, 244, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  pendingItemInfo: {
    flex: 1,
  },
  pendingItemTitle: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  pendingItemSubtitle: {
    color: '#aaa',
    fontSize: 12,
    marginTop: 2,
  },
  reviewButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  approveButton: {
    backgroundColor: '#4CAF50',
  },
  rejectButton: {
    backgroundColor: '#f44336',
  },
  reviewActionButton: {
    backgroundColor: '#2a9df4',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  reviewActionText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
  viewAllButton: {
    width: '100%',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#2a9df4',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
  },
  viewAllGradient: {
    height: 46,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewAllText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    height: 40,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  footerText: {
    color: '#555',
    fontSize: 12,
  }
});

export default ModeratorDashboardScreen;