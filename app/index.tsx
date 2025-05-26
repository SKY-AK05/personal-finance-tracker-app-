import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Link } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LanguageSelect() {
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if language has been selected before
    const checkLanguagePreference = async () => {
      try {
        const language = await AsyncStorage.getItem('language');
        setSelectedLanguage(language);
        setIsLoading(false);
      } catch (error) {
        console.error('Error reading language preference:', error);
        setIsLoading(false);
      }
    };

    checkLanguagePreference();
  }, []);

  const saveLanguagePreference = async (language: string) => {
    try {
      await AsyncStorage.setItem('language', language);
      setSelectedLanguage(language);
    } catch (error) {
      console.error('Error saving language preference:', error);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  // If language is already selected, redirect to home
  if (selectedLanguage) {
    return (
      <Link href="/(tabs)" asChild>
        <TouchableOpacity style={styles.continueButton}>
          <Text style={styles.continueButtonText}>
            {selectedLanguage === 'tamil' ? 'தொடரவும்' : 'Continue'}
          </Text>
        </TouchableOpacity>
      </Link>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Choose Your Language</Text>
        <Text style={styles.subtitle}>மொழியைத் தேர்ந்தெடுக்கவும்</Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.languageButton}
            onPress={() => saveLanguagePreference('english')}
          >
            <Text style={styles.buttonText}>English 🇬🇧</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.languageButton}
            onPress={() => saveLanguagePreference('tamil')}
          >
            <Text style={styles.buttonText}>தமிழ் 🇮🇳</Text>
          </TouchableOpacity>
        </View>

        <Image
          source={{ uri: 'https://images.pexels.com/photos/6289065/pexels-photo-6289065.jpeg' }}
          style={styles.image}
          resizeMode="contain"
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
    color: '#000000',
  },
  subtitle: {
    fontSize: 24,
    marginBottom: 48,
    textAlign: 'center',
    color: '#444444',
  },
  buttonContainer: {
    width: '100%',
    marginBottom: 48,
  },
  languageButton: {
    backgroundColor: '#F5F5F5',
    borderRadius: 30,
    paddingVertical: 18,
    paddingHorizontal: 24,
    marginVertical: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  buttonText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000000',
  },
  image: {
    width: '80%',
    height: 200,
    marginTop: 24,
    borderRadius: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  loadingText: {
    fontSize: 18,
    color: '#000000',
  },
  continueButton: {
    position: 'absolute',
    bottom: 40,
    left: 24,
    right: 24,
    backgroundColor: '#000000',
    borderRadius: 30,
    paddingVertical: 18,
    alignItems: 'center',
  },
  continueButtonText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});