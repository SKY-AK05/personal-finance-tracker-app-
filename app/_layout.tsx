import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { TranslationProvider } from '@/hooks/useTranslation';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RootLayout() {
  useFrameworkReady();

  return (
    <TranslationProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="+not-found" />
        <Stack.Screen name="add-expense/[type]" options={{ presentation: 'modal' }} />
      </Stack>
      <StatusBar style="auto" />
    </TranslationProvider>
  );
}