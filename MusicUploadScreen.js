import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert, ScrollView, SafeAreaView, Animated, Dimensions, Modal, StatusBar } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from "expo-document-picker";
import { ArrowLeft, Music, Upload, X, Volume2, ChevronDown, Image as ImageIcon } from "lucide-react-native";
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

export default function MusicUploadScreen() {
  // State variables for form data
  const [trackName, setTrackName] = useState("");
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [isGenreDropdownVisible, setIsGenreDropdownVisible] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [isLanguageDropdownVisible, setIsLanguageDropdownVisible] = useState(false);
  const [coverArt, setCoverArt] = useState(null);
  const [audioFile, setAudioFile] = useState(null);
  const [customGenre, setCustomGenre] = useState("");
  const [showCustomGenre, setShowCustomGenre] = useState(false);
  const [errors, setErrors] = useState({});
  const [isUploading, setIsUploading] = useState(false);
  // Add the previewStartTime state variable
  const [previewStartTime, setPreviewStartTime] = useState("0");
  
  // Improved Preview Start Time Component for MusicUploadScreen.js
  const PreviewStartTimeComponent = () => {
    // Initialize state with values from previewStartTime if available
    const initialSeconds = parseInt(previewStartTime) || 0;
    const initialMinutes = Math.floor(initialSeconds / 60);
    const initialRemainingSeconds = initialSeconds % 60;

    const [minutes, setMinutes] = useState(initialMinutes.toString());
    const [seconds, setSeconds] = useState(initialRemainingSeconds.toString());

    // Update previewStartTime in parent component when either value changes
    useEffect(() => {
      const mins = parseInt(minutes) || 0;
      const secs = parseInt(seconds) || 0;
      const totalSeconds = mins * 60 + secs;
      setPreviewStartTime(totalSeconds.toString());
    }, [minutes, seconds]);

    // Handle minutes input change with validation
    const handleMinutesChange = (text) => {
      // Allow only numbers
      if (/^\d*$/.test(text)) {
        setMinutes(text);
        
        if (errors.previewStartTime) {
          setErrors(prev => ({ ...prev, previewStartTime: null }));
        }
      }
    };

    // Handle seconds input change with validation
    const handleSecondsChange = (text) => {
      // Allow only numbers and limit to valid seconds (0-59)
      if (/^\d*$/.test(text)) {
        // If input is empty, allow it
        if (text === '') {
          setSeconds(text);
        } else {
          const sec = parseInt(text);
          // Ensure seconds are between 0-59
          if (sec <= 59) {
            setSeconds(text);
          }
        }
        
        if (errors.previewStartTime) {
          setErrors(prev => ({ ...prev, previewStartTime: null }));
        }
      }
    };

    // Format the values when user finishes editing
    const handleBlur = () => {
      // Format minutes (no leading zeros)
      const formattedMinutes = minutes === '' ? '0' : String(parseInt(minutes) || 0);
      
      // Format seconds (add leading zero if needed)
      let formattedSeconds;
      if (seconds === '') {
        formattedSeconds = '00';
      } else {
        const secs = parseInt(seconds) || 0;
        formattedSeconds = secs < 10 ? `0${secs}` : String(secs);
      }
      
      setMinutes(formattedMinutes);
      setSeconds(formattedSeconds);
    };
    
    return (
      <>
        <Text style={styles.sectionTitle}>Preview Start Time</Text>
        <View style={styles.timeInputsContainer}>
          <View style={styles.timeInputWrapper}>
            <TextInput
              style={styles.timeInput}
              value={minutes}
              onChangeText={handleMinutesChange}
              onBlur={handleBlur}
              keyboardType="numeric"
              placeholder="0"
              placeholderTextColor="#888"
              maxLength={3}
            />
            <Text style={styles.timeLabel}>Minutes</Text>
          </View>
          
          <Text style={styles.timeColon}>:</Text>
          
          <View style={styles.timeInputWrapper}>
            <TextInput
              style={styles.timeInput}
              value={seconds}
              onChangeText={handleSecondsChange}
              onBlur={handleBlur}
              keyboardType="numeric"
              placeholder="00"
              placeholderTextColor="#888"
              maxLength={2}
            />
            <Text style={styles.timeLabel}>Seconds</Text>
          </View>
        </View>
        
        {errors.previewStartTime && (
          <Text style={styles.errorText}>{errors.previewStartTime}</Text>
        )}
        
        <Text style={styles.helpText}>
          Set where the preview of your track should begin
        </Text>
      </>
    );
  };
  
  // Animated values for entrance animations
  const fadeAnim = useState(new Animated.Value(0))[0];
  const slideAnim = useState(new Animated.Value(50))[0];
  
  // Animation for the logo pulse effect
  const pulseAnim = useState(new Animated.Value(1))[0];
  
  // Navigation hook
  const navigation = useNavigation();


  // Define genre and language options
  const genres = [
    { name: "Pop", value: "pop" },
    { name: "Rock", value: "rock" },
    { name: "Hip-hop", value: "hiphop" },
    { name: "R&B", value: "rnb" },
    { name: "Jazz", value: "jazz" },
    { name: "Electronic", value: "electronic" },
    { name: "Classical", value: "classical" },
    { name: "Country", value: "country" },
    { name: "Folk", value: "folk" },
    { name: "Reggae", value: "reggae" },
    { name: "Metal", value: "metal" },
    { name: "Blues", value: "blues" },
    { name: "Latin", value: "latin" },
    { name: "Alternative", value: "alternative" },
    { name: "Other", value: "other" },
  ];

  const languages = [
    { name: "English", value: "english" },
    { name: "Spanish", value: "spanish" },
    { name: "French", value: "french" },
    { name: "German", value: "german" },
    { name: "Portuguese", value: "portuguese" },
    { name: "Mandarin", value: "mandarin" },
    { name: "Japanese", value: "japanese" },
    { name: "Korean", value: "korean" },
    { name: "Arabic", value: "arabic" },
    { name: "Russian", value: "russian" },
    { name: "Hindi", value: "hindi" },
    { name: "Instrumental", value: "instrumental" },
    { name: "Multiple Languages", value: "multiple" },
  ];

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

  // Monitor genre selection for "Other" option
  useEffect(() => {
    if (selectedGenre && selectedGenre.value === "other") {
      setShowCustomGenre(true);
    } else {
      setShowCustomGenre(false);
      setCustomGenre("");
    }
  }, [selectedGenre]);

  // Function to navigate back to the previous screen
  const goBack = () => {
    navigation.goBack();
  };

  // Function to handle genre selection
  const handleGenreSelect = (genre) => {
    setSelectedGenre(genre);
    setIsGenreDropdownVisible(false);
    
    // Clear any existing error
    if (errors.genre) {
      setErrors(prev => ({ ...prev, genre: null }));
    }
  };

  // Function to handle language selection
  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language);
    setIsLanguageDropdownVisible(false);
    
    // Clear any existing error
    if (errors.language) {
      setErrors(prev => ({ ...prev, language: null }));
    }
  };

  // Function to handle cover art upload
  const handleCoverArtUpload = async () => {
    try {
      const { status } = await ImagePicker.getMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permissionResult.status !== 'granted') {
          Alert.alert(
            "Permission Required",
            "This app needs access to your media library to upload cover art."
          );
          return;
        }
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const selectedImageUri = result.assets[0].uri;
        setCoverArt(selectedImageUri);
        
        // Clear any existing error
        if (errors.coverArt) {
          setErrors(prev => ({ ...prev, coverArt: null }));
        }
      }
    } catch (error) {
      console.error("Error picking image:", error);
      Alert.alert("Error", `Failed to pick image: ${error.message}`);
    }
  };

  // Function to remove cover art
  const removeCoverArt = () => {
    setCoverArt(null);
  };

  // Function to handle audio file upload
  const handleAudioUpload = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "audio/*",
        copyToCacheDirectory: true,
      });

      if (result.type === "success") {
        // Check file size (limit to 50MB)
        const fileSize = result.size / (1024 * 1024); // Convert to MB
        if (fileSize > 50) {
          Alert.alert("File Too Large", "Audio file must be under 50MB");
          return;
        }
        
        setAudioFile(result);
        
        // Clear any existing error
        if (errors.audioFile) {
          setErrors(prev => ({ ...prev, audioFile: null }));
        }
      }
    } catch (err) {
      console.error("Error selecting audio:", err);
      Alert.alert("Error", "Failed to select audio file");
    }
  };

  // Function to remove audio file
  const removeAudioFile = () => {
    setAudioFile(null);
  };

  // Function to validate the form before submission
  const validateForm = () => {
    const newErrors = {};
    
    if (!trackName.trim()) {
      newErrors.trackName = "Track name is required";
    }
    
    if (!selectedGenre) {
      newErrors.genre = "Genre is required";
    }
    
    if (selectedGenre && selectedGenre.value === "other" && !customGenre.trim()) {
      newErrors.customGenre = "Please specify a genre";
    }
    
    if (!selectedLanguage) {
      newErrors.language = "Language is required";
    }
    
    if (!coverArt) {
      newErrors.coverArt = "Cover art is required";
    }
    
    if (!audioFile) {
      newErrors.audioFile = "Audio file is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Modified function to handle the upload form submission and navigate to ContentLabelingScreen
  const handleUpload = async () => {
    if (validateForm()) {
      setIsUploading(true);
      
      // Simulate API call/processing delay
      setTimeout(() => {
        setIsUploading(false);
        // Navigate to ContentLabelingScreen instead of showing an alert
        navigation.navigate('ContentLabeling');
      }, 1500);
    }
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
          <Text style={styles.tagline}>Upload Your Music · Share Your Sound</Text>
        </Animated.View>

        {/* Form Container */}
        <Animated.View 
          style={[
            styles.formContainer, 
            { 
              opacity: fadeAnim, 
              transform: [{ translateY: slideAnim }] 
            }
          ]}
        >
          {/* Cover Art Upload */}
          <View style={styles.coverArtContainer}>
            <Text style={styles.sectionTitle}>Cover Art</Text>
            <TouchableOpacity 
              style={[styles.coverArtUpload, errors.coverArt && styles.inputError]} 
              onPress={handleCoverArtUpload}
            >
              {coverArt ? (
                <>
                  <Image
                    source={{ uri: coverArt }}
                    style={styles.coverArtImage}
                    resizeMode="cover"
                  />
                  <TouchableOpacity 
                    style={styles.removeButton} 
                    onPress={removeCoverArt}
                  >
                    <X size={20} color="#fff" />
                  </TouchableOpacity>
                </>
              ) : (
                <View style={styles.coverArtPlaceholder}>
                  <ImageIcon size={40} color="#2a9df4" />
                  <Text style={styles.uploadText}>Upload Cover Art</Text>
                </View>
              )}
            </TouchableOpacity>
            {errors.coverArt && <Text style={styles.errorText}>{errors.coverArt}</Text>}
          </View>

          {/* Track Name */}
          <View style={styles.inputContainer}>
            <Text style={styles.sectionTitle}>Track Name</Text>
            <View style={styles.inputWrapper}>
              <Music size={20} color="#2a9df4" style={styles.inputIcon} />
              <TextInput
                style={[styles.input, errors.trackName && styles.inputError]}
                placeholder="Enter track name"
                placeholderTextColor="#888"
                value={trackName}
                onChangeText={(text) => {
                  setTrackName(text);
                  if (errors.trackName) setErrors({...errors, trackName: null});
                }}
              />
            </View>
            {errors.trackName && <Text style={styles.errorText}>{errors.trackName}</Text>}
          </View>

          {/* Genre Selector */}
          <View style={styles.inputContainer}>
            <Text style={styles.sectionTitle}>Genre</Text>
            <TouchableOpacity
              style={[styles.selector, errors.genre && styles.inputError]}
              onPress={() => setIsGenreDropdownVisible(true)}
            >
              <Text style={selectedGenre ? styles.selectorText : styles.placeholderText}>
                {selectedGenre ? selectedGenre.name : "Select Genre"}
              </Text>
              <ChevronDown size={18} color={selectedGenre ? "#2a9df4" : "#888"} />
            </TouchableOpacity>
            {errors.genre && <Text style={styles.errorText}>{errors.genre}</Text>}
          </View>

          {/* Custom Genre Input */}
          {showCustomGenre && (
            <View style={styles.inputContainer}>
              <Text style={styles.sectionTitle}>Custom Genre</Text>
              <View style={styles.inputWrapper}>
                <Music size={20} color="#2a9df4" style={styles.inputIcon} />
                <TextInput
                  style={[styles.input, errors.customGenre && styles.inputError]}
                  placeholder="Specify genre"
                  placeholderTextColor="#888"
                  value={customGenre}
                  onChangeText={(text) => {
                    setCustomGenre(text);
                    if (errors.customGenre) setErrors({...errors, customGenre: null});
                  }}
                />
              </View>
            {errors.customGenre && <Text style={styles.errorText}>{errors.customGenre}</Text>}
            </View>
          )}

          {/* Language Selector */}
          <View style={styles.inputContainer}>
            <Text style={styles.sectionTitle}>Language</Text>
            <TouchableOpacity
              style={[styles.selector, errors.language && styles.inputError]}
              onPress={() => setIsLanguageDropdownVisible(true)}
            >
              <Text style={selectedLanguage ? styles.selectorText : styles.placeholderText}>
                {selectedLanguage ? selectedLanguage.name : "Select Language"}
              </Text>
              <ChevronDown size={18} color={selectedLanguage ? "#2a9df4" : "#888"} />
            </TouchableOpacity>
            {errors.language && <Text style={styles.errorText}>{errors.language}</Text>}
          </View>

          {/* Preview Start Time Component */}
          <View style={styles.inputContainer}>
            <PreviewStartTimeComponent />
          </View>

         {/* Audio File */}
         <View style={styles.inputContainer}>
            <Text style={styles.sectionTitle}>Audio File</Text>
            <TouchableOpacity
              style={[styles.audioUpload, errors.audioFile && styles.inputError]}
              onPress={handleAudioUpload}
            >
              {audioFile ? (
                <View style={styles.audioFileInfo}>
                  <Volume2 size={20} color="#2a9df4" />
                  <Text style={styles.audioFileName} numberOfLines={1} ellipsizeMode="middle">
                    {audioFile.name}
                  </Text>
                  <TouchableOpacity 
                    style={styles.removeAudioButton} 
                    onPress={removeAudioFile}
                  >
                    <X size={18} color="#fff" />
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={styles.audioUploadPlaceholder}>
                  <Upload size={24} color="#2a9df4" />
                  <Text style={styles.audioUploadText}>Upload Audio File</Text>
                </View>
              )}
            </TouchableOpacity>
            {errors.audioFile && <Text style={styles.errorText}>{errors.audioFile}</Text>}
            <Text style={styles.helpText}>
              Supported formats: MP3, WAV, AAC (max 50MB)
            </Text>
          </View>
          
           
          {/* Continue Button - Changed text from "Upload Track" to "Continue" */}
          <TouchableOpacity 
            style={styles.uploadButtonContainer} 
            onPress={handleUpload}
            disabled={isUploading}
          >
            <LinearGradient
              colors={['#2a9df4', '#3a77de']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.uploadButton}
            >
              {isUploading ? (
                <View style={styles.loadingContainer}>
                  <Text style={styles.buttonText}>Processing</Text>
                  <View style={styles.loadingDots}>
                    <Text style={styles.loadingDot}>.</Text>
                    <Text style={styles.loadingDot}>.</Text>
                    <Text style={styles.loadingDot}>.</Text>
                  </View>
                </View>
              ) : (
                <Text style={styles.buttonText}>Continue</Text>
              )}
            </LinearGradient>
          </TouchableOpacity>
          
          <View style={styles.termsContainer}>
            <Text style={styles.termsText}>
              By uploading, you confirm this is your original content and agree to our{" "}
              <Text style={styles.termsLink}>Content Policy</Text>
            </Text>
          </View>
        </Animated.View>
      </ScrollView>

      {/* Genre Dropdown Modal */}
      <Modal visible={isGenreDropdownVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Genre</Text>
            
            <ScrollView style={styles.dropdownList}>
              {genres.map((genre) => (
                <TouchableOpacity 
                  key={genre.value}
                  style={styles.dropdownItem} 
                  onPress={() => handleGenreSelect(genre)}
                >
                  <Text style={styles.dropdownItemText}>{genre.name}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setIsGenreDropdownVisible(false)}
            >
              <Text style={styles.closeButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Language Dropdown Modal */}
      <Modal visible={isLanguageDropdownVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Language</Text>
            
            <ScrollView style={styles.dropdownList}>
              {languages.map((language) => (
                <TouchableOpacity 
                  key={language.value}
                  style={styles.dropdownItem} 
                  onPress={() => handleLanguageSelect(language)}
                >
                  <Text style={styles.dropdownItemText}>{language.name}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setIsLanguageDropdownVisible(false)}
            >
              <Text style={styles.closeButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}


//-------------------styles----------------------------------------------------------------------------------
//-------------------styles----------------------------------------------------------------------------------
//-------------------styles----------------------------------------------------------------------------------


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
  formContainer: {
    width: '100%',
  },
  coverArtContainer: {
    width: '100%',
    marginBottom: 20,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  coverArtUpload: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.07)',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(42, 157, 244, 0.3)',
  },
  coverArtPlaceholder: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  coverArtImage: {
    width: '100%',
    height: '100%',
  },
  uploadText: {
    color: '#aaa',
    marginTop: 10,
    fontSize: 14,
  },
  removeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.07)',
    borderRadius: 12,
    paddingHorizontal: 15,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    color: '#fff',
    fontSize: 16,
  },
  inputError: {
    borderWidth: 1,
    borderColor: '#ff3b3b',
  },
  errorText: {
    color: '#ff3b3b',
    fontSize: 12,
    marginTop: 5,
  },
  selector: {
    height: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.07)',
    borderRadius: 12,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  selectorText: {
    color: '#fff',
    fontSize: 16,
  },
  placeholderText: {
    color: '#888',
    fontSize: 16,
  },
  audioUpload: {
    width: '100%',
    height: 60,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.07)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: 'rgba(42, 157, 244, 0.3)',
    borderStyle: 'dashed',
  },
  audioUploadPlaceholder: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  audioUploadText: {
    color: '#aaa',
    fontSize: 14,
    marginLeft: 10,
  },
  audioFileInfo: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  audioFileName: {
    color: '#fff',
    fontSize: 14,
    marginLeft: 10,
    flex: 1,
  },
  removeAudioButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 59, 59, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  helpText: {
    color: '#888',
    fontSize: 12,
    marginTop: 5,
  },
  uploadButtonContainer: {
    width: '100%',
    marginTop: 20,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#2a9df4',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
  },
  uploadButton: {
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  loadingDots: {
    flexDirection: 'row',
    marginLeft: 10,
  },
  loadingDot: {
    color: '#fff',
    fontSize: 24,
    marginLeft: 2,
    fontWeight: 'bold',
    opacity: 0.8,
  },
  termsContainer: {
    marginTop: 20,
    paddingHorizontal: 10,
  },
  termsText: {
    color: '#888',
    fontSize: 12,
    textAlign: 'center',
  },
  termsLink: {
    color: '#2a9df4',
    textDecorationLine: 'underline',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContent: {
    backgroundColor: '#121222',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 20,
    paddingBottom: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  },
  modalTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  dropdownList: {
    maxHeight: 300,
  },
  dropdownItem: {
    paddingVertical: 15,
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  dropdownItemText: {
    color: '#fff',
    fontSize: 16,
  },
  closeButton: {
    marginTop: 20,
    paddingVertical: 15,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  closeButtonText: {
    color: '#2a9df4',
    fontSize: 16,
    fontWeight: '600',
  },
  timeInputsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timeInputWrapper: {
    width: '48%',
    alignItems: 'center',
  },
  timeInput: {
    width: '100%',
    height: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.07)',
    borderRadius: 12,
    paddingHorizontal: 15,
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    borderWidth: 1,
    borderColor: 'rgba(42, 157, 244, 0.3)',
  },
  timeLabel: {
    color: '#888',
    fontSize: 12,
    marginTop: 5,
  }
});