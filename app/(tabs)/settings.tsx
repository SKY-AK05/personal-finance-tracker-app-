import { View, Text, StyleSheet, TouchableOpacity, Switch, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Languages as Language, Share, Moon, Download, CircleHelp as HelpCircle, Trash2 } from 'lucide-react-native';

export default function SettingsScreen() {
  const { t, language, setLanguage } = useTranslation();
  const [darkMode, setDarkMode] = useState(false);
  
  const handleLanguageChange = async () => {
    const newLanguage = language === 'english' ? 'tamil' : 'english';
    await AsyncStorage.setItem('language', newLanguage);
    setLanguage(newLanguage);
  };

  const handleExportData = () => {
    // In a real app, this would trigger data export
    Alert.alert(
      t('exportData'),
      t('exportDataDescription'),
      [
        { text: t('cancel'), style: 'cancel' },
        { text: 'Excel', onPress: () => console.log('Export as Excel') },
        { text: 'PDF', onPress: () => console.log('Export as PDF') },
      ]
    );
  };

  const handleClearData = () => {
    Alert.alert(
      t('clearAllData'),
      t('clearDataWarning'),
      [
        { text: t('cancel'), style: 'cancel' },
        { 
          text: t('clearData'), 
          onPress: () => console.log('Clear all data'), 
          style: 'destructive' 
        },
      ]
    );
  };

  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
    // In a real app, this would toggle dark mode
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>{t('settings')}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('preferences')}</Text>
          
          <TouchableOpacity
            style={styles.settingItem}
            onPress={handleLanguageChange}
          >
            <View style={styles.settingIconLabel}>
              <View style={styles.iconContainer}>
                <Language size={22} color="#000000" />
              </View>
              <Text style={styles.settingLabel}>{t('language')}</Text>
            </View>
            <Text style={styles.settingValue}>
              {language === 'english' ? 'English' : 'தமிழ்'}
            </Text>
          </TouchableOpacity>
          
          <View style={styles.settingItem}>
            <View style={styles.settingIconLabel}>
              <View style={styles.iconContainer}>
                <Moon size={22} color="#000000" />
              </View>
              <Text style={styles.settingLabel}>{t('darkMode')}</Text>
            </View>
            <Switch
              value={darkMode}
              onValueChange={handleDarkModeToggle}
              trackColor={{ false: '#DDDDDD', true: '#000000' }}
              thumbColor="#FFFFFF"
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('dataManagement')}</Text>
          
          <TouchableOpacity
            style={styles.settingItem}
            onPress={handleExportData}
          >
            <View style={styles.settingIconLabel}>
              <View style={styles.iconContainer}>
                <Download size={22} color="#000000" />
              </View>
              <Text style={styles.settingLabel}>{t('exportData')}</Text>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.settingItem}
            onPress={() => console.log('Share app')}
          >
            <View style={styles.settingIconLabel}>
              <View style={styles.iconContainer}>
                <Share size={22} color="#000000" />
              </View>
              <Text style={styles.settingLabel}>{t('shareApp')}</Text>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.settingItem, styles.dangerItem]}
            onPress={handleClearData}
          >
            <View style={styles.settingIconLabel}>
              <View style={[styles.iconContainer, styles.dangerIcon]}>
                <Trash2 size={22} color="#FF3B30" />
              </View>
              <Text style={styles.dangerText}>{t('clearAllData')}</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('support')}</Text>
          
          <TouchableOpacity
            style={styles.settingItem}
            onPress={() => console.log('Help & Support')}
          >
            <View style={styles.settingIconLabel}>
              <View style={styles.iconContainer}>
                <HelpCircle size={22} color="#000000" />
              </View>
              <Text style={styles.settingLabel}>{t('helpAndSupport')}</Text>
            </View>
          </TouchableOpacity>
        </View>

        <Text style={styles.versionText}>Version 1.0.0</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000000',
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
    color: '#000000',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  settingIconLabel: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  settingLabel: {
    fontSize: 18,
    color: '#000000',
  },
  settingValue: {
    fontSize: 16,
    color: '#555555',
  },
  dangerItem: {
    borderBottomWidth: 0,
  },
  dangerIcon: {
    backgroundColor: '#FFEBEB',
  },
  dangerText: {
    fontSize: 18,
    color: '#FF3B30',
  },
  versionText: {
    textAlign: 'center',
    color: '#999999',
    marginTop: 32,
    fontSize: 14,
  },
});