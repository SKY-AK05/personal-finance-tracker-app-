
import { Tabs } from 'expo-router';
import { StyleSheet } from 'react-native';
import { useColorScheme } from 'react-native';
import { Chrome as Home, CreditCard, Gift, ChartBar as BarChart2, Settings } from 'lucide-react-native';
import { useTranslation } from '@/hooks/useTranslation';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { t } = useTranslation();

  const isDark = colorScheme === 'dark';

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#000000',
        tabBarInactiveTintColor: '#777777',
        tabBarLabelStyle: styles.tabBarLabel,
        tabBarStyle: styles.tabBar,
        tabBarLabelPosition: 'below-icon',
        tabBarIconStyle: styles.tabBarIcon,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: t('home'),
          tabBarIcon: ({ color, size }) => <Home size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="dashboard"
        options={{
          title: t('summary'),
          tabBarIcon: ({ color, size }) => <BarChart2 size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: t('settings'),
          tabBarIcon: ({ color, size }) => <Settings size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="expenses"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="credit"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="special"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    height: 70,
    paddingTop: 8,
    paddingBottom: 10,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
  },
  tabBarLabel: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: 2,
  },
  tabBarIcon: {
    marginTop: 4,
  },
});
