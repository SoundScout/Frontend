import React, { useState, useEffect, useRef } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity, 
  Image,
  StatusBar,
  SafeAreaView,
  Animated,
  Dimensions,
  ScrollView,
  Linking,
  Alert,
  TextInput,
  Modal,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft, Check, X, ExternalLink, Send, AlertCircle, Trash2 } from 'lucide-react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const ArtistVerificationScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [loading, setLoading] = useState(false);
  const [rejectionModalVisible, setRejectionModalVisible] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');
  const [selectedRejectionCategory, setSelectedRejectionCategory] = useState(null);
  const [showDeletionAnimation, setShowDeletionAnimation] = useState(false);
  const [deletionComplete, setDeletionComplete] = useState(false);
  // New states for approval animation
  const [showApprovalAnimation, setShowApprovalAnimation] = useState(false);
  const [approvalComplete, setApprovalComplete] = useState(false);
  
  // Animation values
  const fadeAnim = useState(new Animated.Value(0))[0];
  const slideAnim = useState(new Animated.Value(50))[0];
  const modalSlideAnim = useState(new Animated.Value(300))[0];
  const modalFadeAnim = useState(new Animated.Value(0))[0];
  const deleteAnimProgress = useState(new Animated.Value(0))[0];
  
  // Artist data would normally come from route params or API call
  const [artistData, setArtistData] = useState({
    id: '1234',
    name: 'Atlas Reverie',
    email: 'atlas_reverie@examplemail.com',
    phone: '+62 8131378262',
    country: 'Indonesia',
    demoLink: 'http://soundscout.example.com/atlas_reverie_demo',
    profileImage: null, // Would normally be a URI
    submissionDate: '2025-04-15',
    genre: 'Electronic / Ambient',
    trackCount: 3
  });

  // Animated values for deletion/approval effect
  const contentOpacity = useRef(new Animated.Value(1)).current;
  const contentScale = useRef(new Animated.Value(1)).current;
  const contentTranslateY = useRef(new Animated.Value(0)).current;
  const deleteOverlayOpacity = useRef(new Animated.Value(0)).current;
  const deleteProgressWidth = useRef(new Animated.Value(0)).current;
  // New animated values for approval animation
  const approveOverlayOpacity = useRef(new Animated.Value(0)).current;
  const approveProgressWidth = useRef(new Animated.Value(0)).current;
  const checkmarkScale = useRef(new Animated.Value(0)).current;

  // Predefined rejection categories
  const rejectionCategories = [
    { id: 1, label: 'Insufficient quality' },
    { id: 2, label: 'Incomplete profile' },
    { id: 3, label: 'Copyright concerns' },
    { id: 4, label: 'Content policy violation' },
    { id: 5, label: 'Other' }
  ];

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
  }, []);

  const animateModal = (visible) => {
    if (visible) {
      setRejectionModalVisible(true);
      Animated.parallel([
        Animated.timing(modalSlideAnim, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true
        }),
        Animated.timing(modalFadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true
        })
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(modalSlideAnim, {
          toValue: 300,
          duration: 300,
          useNativeDriver: true
        }),
        Animated.timing(modalFadeAnim, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true
        })
      ]).start(() => {
        setRejectionModalVisible(false);
      });
    }
  };

  const animateDelete = () => {
    setShowDeletionAnimation(true);
    
    // Show deletion overlay with progress bar
    Animated.sequence([
      // First fade in the overlay
      Animated.timing(deleteOverlayOpacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true
      }),
      
      // Then animate the progress bar
      Animated.timing(deleteProgressWidth, {
        toValue: width - 48, // Full width minus padding
        duration: 2000,
        useNativeDriver: false
      }),
      
      // Then fade and scale out the content
      Animated.parallel([
        Animated.timing(contentOpacity, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true
        }),
        Animated.timing(contentScale, {
          toValue: 0.8,
          duration: 800,
          useNativeDriver: true
        }),
        Animated.timing(contentTranslateY, {
          toValue: 50,
          duration: 800,
          useNativeDriver: true
        })
      ])
    ]).start(() => {
      // Once animation completes, set deletion complete
      setDeletionComplete(true);
      
      // Navigate back after a short delay
      setTimeout(() => {
        navigation.navigate('ModeratorDashboard');
      }, 500);
    });
  };

  // New function for approval animation
  const animateApprove = () => {
    setShowApprovalAnimation(true);
    
    // Show approval overlay with progress bar and checkmark
    Animated.sequence([
      // First fade in the overlay
      Animated.timing(approveOverlayOpacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true
      }),
      
      // Then animate the progress bar
      Animated.timing(approveProgressWidth, {
        toValue: width - 48, // Full width minus padding
        duration: 1500,
        useNativeDriver: false
      }),
      
      // Then animate the checkmark
      Animated.spring(checkmarkScale, {
        toValue: 1,
        friction: 4,
        tension: 40,
        useNativeDriver: true
      }),
      
      // Then fade and scale out the content
      Animated.parallel([
        Animated.timing(contentOpacity, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true
        }),
        Animated.timing(contentScale, {
          toValue: 0.8,
          duration: 800,
          useNativeDriver: true
        }),
        Animated.timing(contentTranslateY, {
          toValue: 50,
          duration: 800,
          useNativeDriver: true
        })
      ])
    ]).start(() => {
      // Once animation completes, set approval complete
      setApprovalComplete(true);
      
      // Navigate back after a short delay
      setTimeout(() => {
        navigation.navigate('ModeratorDashboard');
      }, 800);
    });
  };

  const goBack = () => {
    navigation.goBack();
  };

  const handleApprove = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      // Start the approval animation
      animateApprove();
    }, 1000);
  };

  const handleReject = () => {
    // Open rejection reason modal instead of immediately rejecting
    animateModal(true);
  };
  
  const handleRejectionCategorySelect = (category) => {
    setSelectedRejectionCategory(category);
  };

  const submitRejection = () => {
    if (!selectedRejectionCategory) {
      Alert.alert("Error", "Please select a rejection category");
      return;
    }
    
    if (rejectionReason.trim().length < 10) {
      Alert.alert("Error", "Please provide a more detailed rejection reason (at least 10 characters)");
      return;
    }
    
    setLoading(true);
    animateModal(false);
    
    // Simulate API call to reject the artist with reason
    setTimeout(() => {
      // Start the delete animation instead of showing alert
      animateDelete();
    }, 1000);
  };

  const cancelRejection = () => {
    animateModal(false);
    setRejectionReason('');
    setSelectedRejectionCategory(null);
  };

  const openLink = (url) => {
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        Alert.alert("Error", "Cannot open this URL");
      }
    });
  };
  
  // Render the approval complete screen
  if (approvalComplete) {
    return (
      <SafeAreaView style={styles.container}>
        <LinearGradient
          colors={['#0A0A0A', '#101020', '#18182a']}
          style={styles.backgroundGradient}
        />
        <View style={styles.approvalCompleteContainer}>
          <View style={styles.approvalIconContainer}>
            <LinearGradient
              colors={['#4CAF50', '#388E3C']}
              style={styles.approvalIconBackground}
            >
              <Check size={80} color="#fff" style={styles.approvalIcon} />
            </LinearGradient>
          </View>
          <Text style={styles.approvalTitle}>Artist Approved</Text>
          <Text style={styles.approvalSubtitle}>
            {artistData.name} has been successfully verified and approved
          </Text>
          <Text style={styles.approvalInfo}>
            Artist has been notified • Redirecting to dashboard...
          </Text>
        </View>
      </SafeAreaView>
    );
  }
  
  if (deletionComplete) {
    return (
      <SafeAreaView style={styles.container}>
        <LinearGradient
          colors={['#0A0A0A', '#101020', '#18182a']}
          style={styles.backgroundGradient}
        />
        <View style={styles.deletionCompleteContainer}>
          <Trash2 size={80} color="#F44336" style={styles.deletionIcon} />
          <Text style={styles.deletionTitle}>Submission Deleted</Text>
          <Text style={styles.deletionSubtitle}>
            Artist profile has been permanently removed from the system
          </Text>
          <Text style={styles.deletionInfo}>
            Redirecting to dashboard...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

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
        <View style={[styles.circleBg, { top: '15%', left: '-5%', opacity: 0.15 }]} />
        <View style={[styles.circleBg, { bottom: '20%', right: '-10%', opacity: 0.1 }]} />
      </View>
      
      {/* Back button */}
      <TouchableOpacity 
        style={styles.backButtonContainer} 
        onPress={goBack}
        disabled={showDeletionAnimation || showApprovalAnimation}
      >
        <LinearGradient
          colors={['#2a9df4', '#3a77de']}
          style={styles.backButton}
        >
          <ArrowLeft size={24} color="#fff" />
        </LinearGradient>
      </TouchableOpacity>
      
      {/* Deletion overlay */}
      {showDeletionAnimation && (
        <View style={styles.deleteOverlayContainer}>
          <Animated.View style={[styles.deleteOverlay, { opacity: deleteOverlayOpacity }]}>
            <View style={styles.deleteHeaderContainer}>
              <Trash2 size={24} color="#F44336" />
              <Text style={styles.deleteHeaderText}>Permanently Deleting Submission</Text>
            </View>
            
            <View style={styles.deleteProgressContainer}>
              <Animated.View 
                style={[
                  styles.deleteProgressBar, 
                  { width: deleteProgressWidth }
                ]} 
              />
            </View>
            
            <Text style={styles.deleteInfoText}>
              Removing all artist data from the system...
            </Text>
          </Animated.View>
        </View>
      )}
      
      {/* Approval overlay */}
      {showApprovalAnimation && (
        <View style={styles.approveOverlayContainer}>
          <Animated.View style={[styles.approveOverlay, { opacity: approveOverlayOpacity }]}>
            <View style={styles.approveHeaderContainer}>
              <Check size={24} color="#4CAF50" />
              <Text style={styles.approveHeaderText}>Verifying Artist Profile</Text>
            </View>
            
            <View style={styles.approveProgressContainer}>
              <Animated.View 
                style={[
                  styles.approveProgressBar, 
                  { width: approveProgressWidth }
                ]} 
              />
            </View>
            
            <View style={styles.approveCheckmarkContainer}>
              <Animated.View 
                style={{ 
                  transform: [{ scale: checkmarkScale }],
                  opacity: checkmarkScale
                }}
              >
                <View style={styles.checkmarkCircle}>
                  <Check size={32} color="#fff" />
                </View>
              </Animated.View>
            </View>
            
            <Text style={styles.approveInfoText}>
              Sending approval notification to {artistData.name}...
            </Text>
          </Animated.View>
        </View>
      )}
      
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View 
          style={[
            styles.headerContainer, 
            { 
              opacity: contentOpacity, 
              transform: [
                { translateY: contentTranslateY },
                { scale: contentScale }
              ] 
            }
          ]}
        >
          <Text style={styles.headerTitle}>Artist Verification</Text>
          <Text style={styles.headerSubtitle}>Review artist profile details</Text>
        </Animated.View>
        
        <Animated.View 
          style={[
            styles.profileContainer,
            {
              opacity: contentOpacity,
              transform: [
                { translateY: contentTranslateY },
                { scale: contentScale }
              ]
            }
          ]}
        >
          <View style={styles.profileImageContainer}>
            {artistData.profileImage ? (
              <Image 
                source={{ uri: artistData.profileImage }}
                style={styles.profileImage}
              />
            ) : (
              <View style={styles.profileImagePlaceholder}>
                <Text style={styles.profileImageInitial}>
                  {artistData.name.charAt(0)}
                </Text>
              </View>
            )}
          </View>
          
          <View style={styles.artistNameContainer}>
            <Text style={styles.artistName}>{artistData.name}</Text>
            <View style={styles.genreContainer}>
              <Text style={styles.genreText}>{artistData.genre}</Text>
            </View>
          </View>
          
          <View style={styles.submissionInfoContainer}>
            <Text style={styles.submissionInfoText}>
              Submitted: {artistData.submissionDate} • {artistData.trackCount} tracks
            </Text>
          </View>
        </Animated.View>
        
        <Animated.View
          style={[
            styles.detailsContainer,
            {
              opacity: contentOpacity,
              transform: [
                { translateY: contentTranslateY },
                { scale: contentScale }
              ]
            }
          ]}
        >
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Email:</Text>
            <Text style={styles.detailValue}>{artistData.email}</Text>
          </View>
          
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Phone Number:</Text>
            <Text style={styles.detailValue}>{artistData.phone}</Text>
          </View>
          
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Country:</Text>
            <Text style={styles.detailValue}>{artistData.country}</Text>
          </View>
          
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Link to Review Work:</Text>
            <TouchableOpacity 
              onPress={() => openLink(artistData.demoLink)}
              style={styles.linkButton}
              disabled={showDeletionAnimation || showApprovalAnimation}
            >
              <Text style={styles.linkText} numberOfLines={1}>
                {artistData.demoLink}
              </Text>
              <ExternalLink size={16} color="#2a9df4" />
            </TouchableOpacity>
          </View>
        </Animated.View>
        
        <Animated.View
          style={[
            styles.actionsContainer,
            {
              opacity: contentOpacity,
              transform: [
                { translateY: contentTranslateY },
                { scale: contentScale }
              ]
            }
          ]}
        >
          <TouchableOpacity 
            style={[styles.actionButton, styles.approveButton]} 
            onPress={handleApprove}
            disabled={loading || showDeletionAnimation || showApprovalAnimation}
          >
            <LinearGradient
              colors={['#4CAF50', '#388E3C']}
              style={styles.actionButtonGradient}
            >
              {loading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <>
                  <Check size={20} color="#fff" style={styles.actionIcon} />
                  <Text style={styles.actionButtonText}>Approved</Text>
                </>
              )}
            </LinearGradient>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.actionButton, styles.rejectButton]} 
            onPress={handleReject}
            disabled={loading || showDeletionAnimation || showApprovalAnimation}
          >
            <LinearGradient
              colors={['#F44336', '#D32F2F']}
              style={styles.actionButtonGradient}
            >
              <X size={20} color="#fff" style={styles.actionIcon} />
              <Text style={styles.actionButtonText}>Rejected</Text>
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>
      
      {/* Rejection Reason Modal */}
      <Modal
        visible={rejectionModalVisible}
        transparent={true}
        animationType="none"
        onRequestClose={cancelRejection}
      >
        <KeyboardAvoidingView 
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.modalOverlay}
        >
          <Animated.View 
            style={[
              styles.modalContainer,
              {
                opacity: modalFadeAnim,
                transform: [{ translateY: modalSlideAnim }]
              }
            ]}
          >
            <View style={styles.modalHeader}>
              <AlertCircle size={22} color="#F44336" style={styles.modalIcon} />
              <Text style={styles.modalTitle}>Rejection Feedback</Text>
              <TouchableOpacity onPress={cancelRejection}>
                <X size={22} color="#aaa" />
              </TouchableOpacity>
            </View>
            
            <View style={styles.modalBody}>
              <Text style={styles.modalSubtitle}>
                Please provide feedback for "{artistData.name}" on why their profile is being rejected.
                This information will be included in the rejection email.
              </Text>
              
              <Text style={styles.categoryLabel}>Select Rejection Category:</Text>
              <View style={styles.categoriesContainer}>
                {rejectionCategories.map((category) => (
                  <TouchableOpacity
                    key={category.id}
                    style={[
                      styles.categoryButton,
                      selectedRejectionCategory?.id === category.id && styles.categoryButtonSelected
                    ]}
                    onPress={() => handleRejectionCategorySelect(category)}
                  >
                    <Text 
                      style={[
                        styles.categoryButtonText,
                        selectedRejectionCategory?.id === category.id && styles.categoryButtonTextSelected
                      ]}
                    >
                      {category.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              
              <Text style={styles.reasonLabel}>Detailed Feedback:</Text>
              <TextInput
                style={styles.reasonTextInput}
                placeholder="Please explain why this artist is being rejected..."
                placeholderTextColor="rgba(255,255,255,0.4)"
                multiline={true}
                numberOfLines={5}
                textAlignVertical="top"
                value={rejectionReason}
                onChangeText={setRejectionReason}
              />
              
              <View style={styles.modalActions}>
                <TouchableOpacity 
                  style={styles.cancelButton} 
                  onPress={cancelRejection}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={styles.submitButton} 
                  onPress={submitRejection}
                  disabled={loading}
                >
                  <LinearGradient
                    colors={['#F44336', '#D32F2F']}
                    style={styles.submitButtonGradient}
                  >
                    {loading ? (
                      <ActivityIndicator size="small" color="#fff" />
                    ) : (
                      <>
                        <Trash2 size={18} color="#fff" style={styles.submitIcon} />
                        <Text style={styles.submitButtonText}>Delete Submission</Text>
                      </>
                    )}
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          </Animated.View>
        </KeyboardAvoidingView>
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
    flexGrow: 1,
    paddingTop: 100,
    paddingBottom: 50,
    paddingHorizontal: 24,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#aaa',
    textAlign: 'center',
    marginTop: 5,
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  profileImageContainer: {
    marginBottom: 15,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#2a9df4',
  },
  profileImagePlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(42, 157, 244, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#2a9df4',
  },
  profileImageInitial: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#2a9df4',
  },
  artistNameContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  artistName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  genreContainer: {
    backgroundColor: 'rgba(42, 157, 244, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'rgba(42, 157, 244, 0.4)',
  },
  genreText: {
    color: '#2a9df4',
    fontSize: 14,
  },
  submissionInfoContainer: {
    marginTop: 5,
  },
  submissionInfoText: {
    color: '#aaa',
    fontSize: 14,
  },
  detailsContainer: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  detailItem: {
    marginBottom: 16,
  },
  detailLabel: {
    color: '#aaa',
    fontSize: 14,
    marginBottom: 4,
  },
  detailValue: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  linkButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  linkText: {
    color: '#2a9df4',
    fontSize: 16,
    fontWeight: '500',
    marginRight: 5,
    flex: 1,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  actionButton: {
    width: '48%',
    height: 56,
    borderRadius: 28,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 3,
  },
  approveButton: {
    shadowColor: '#388E3C',
    shadowOpacity: 0.4,
  },
  rejectButton: {
    shadowColor: '#D32F2F',
    shadowOpacity: 0.4,
  },
  actionButtonGradient: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionIcon: {
    marginRight: 8,
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#101020',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    paddingBottom: Platform.OS === 'ios' ? 40 : 24,
    maxHeight: height * 0.9,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  modalIcon: {
    marginRight: 10,
  },
  modalTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  modalBody: {
    padding: 20,
  },
  modalSubtitle: {
    fontSize: 14,
    color: '#ddd',
    marginBottom: 20,
    lineHeight: 20,
  },
  
  // Continuing the styles object from before
  categoryLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 10,
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  categoryButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  categoryButtonSelected: {
    backgroundColor: 'rgba(244, 67, 54, 0.2)',
    borderColor: 'rgba(244, 67, 54, 0.6)',
  },
  categoryButtonText: {
    color: '#ddd',
    fontSize: 14,
  },
  categoryButtonTextSelected: {
    color: '#F44336',
    fontWeight: '600',
  },
  reasonLabel: {
    fontSize: 16, 
    fontWeight: '600',
    color: '#fff',
    marginBottom: 10,
  },
  reasonTextInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 12,
    color: '#fff',
    fontSize: 16,
    minHeight: 120,
    marginBottom: 20,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    width: '30%',
  },
  cancelButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  submitButton: {
    width: '65%',
    height: 50,
    borderRadius: 25,
    overflow: 'hidden',
    shadowColor: '#D32F2F',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 3,
  },
  submitButtonGradient: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitIcon: {
    marginRight: 8,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  
  // Deletion Animation Styles
  deleteOverlayContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 15,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  deleteOverlay: {
    width: '100%',
    backgroundColor: 'rgba(20, 20, 35, 0.95)',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(244, 67, 54, 0.3)',
    shadowColor: '#F44336',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  deleteHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  deleteHeaderText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  deleteProgressContainer: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 16,
  },
  deleteProgressBar: {
    height: '100%',
    backgroundColor: '#F44336',
  },
  deleteInfoText: {
    color: '#ddd',
    fontSize: 14,
    textAlign: 'center',
  },
  
  // Approval Animation Styles
  approveOverlayContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 15,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  approveOverlay: {
    width: '100%',
    backgroundColor: 'rgba(20, 20, 35, 0.95)',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(76, 175, 80, 0.3)',
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  approveHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  approveHeaderText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  approveProgressContainer: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 20,
  },
  approveProgressBar: {
    height: '100%',
    backgroundColor: '#4CAF50',
  },
  approveCheckmarkContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  checkmarkCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 8,
  },
  approveInfoText: {
    color: '#ddd',
    fontSize: 14,
    textAlign: 'center',
  },
  
  // Deletion Complete Screen
  deletionCompleteContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  deletionIcon: {
    marginBottom: 20,
    opacity: 0.8,
  },
  deletionTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12,
    textAlign: 'center',
  },
  deletionSubtitle: {
    fontSize: 16,
    color: '#ddd',
    marginBottom: 20,
    textAlign: 'center',
    lineHeight: 22,
  },
  deletionInfo: {
    fontSize: 14,
    color: '#aaa',
    textAlign: 'center',
  },
  
  // Approval Complete Screen
  approvalCompleteContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  approvalIconContainer: {
    marginBottom: 20,
  },
  approvalIconBackground: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 16,
  },
  approvalIcon: {
    opacity: 0.9,
  },
  approvalTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12,
    textAlign: 'center',
  },
  approvalSubtitle: {
    fontSize: 16,
    color: '#ddd',
    marginBottom: 20,
    textAlign: 'center',
    lineHeight: 22,
  },
  approvalInfo: {
    fontSize: 14,
    color: '#aaa',
    textAlign: 'center',
  }
});

export default ArtistVerificationScreen;