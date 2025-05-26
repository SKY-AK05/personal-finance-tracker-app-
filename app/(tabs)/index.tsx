import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from '@/hooks/useTranslation';
import { Link } from 'expo-router';
import {
  Plus,
  CreditCard,
  Gift,
  ChartBar as BarChart2,
} from 'lucide-react-native';
import ExpensesSummary from '@/components/ExpensesSummary';

export default function HomeScreen() {
  const { t } = useTranslation();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>{t('financeTracker')}</Text>
          <Text style={styles.subtitle}>{t('welcomeMessage')}</Text>
        </View>

        <ExpensesSummary />

        <View style={styles.actionContainer}>
          <Text style={styles.sectionTitle}>{t('expenseCategories')}</Text>

          <Link href="/expenses/daily" asChild>
            <TouchableOpacity style={styles.actionButton}>
              <View style={styles.iconContainer}>
                <Plus size={24} color="#000000" />
              </View>
              <Text style={styles.actionText}>{t('dailyExpenses')}</Text>
            </TouchableOpacity>
          </Link>

          <Link href="/expenses/credit" asChild>
            <TouchableOpacity style={styles.actionButton}>
              <View style={styles.iconContainer}>
                <CreditCard size={24} color="#000000" />
              </View>
              <Text style={styles.actionText}>{t('creditExpenses')}</Text>
            </TouchableOpacity>
          </Link>

          <Link href="/expenses/special" asChild>
            <TouchableOpacity style={styles.actionButton}>
              <View style={styles.iconContainer}>
                <Gift size={24} color="#000000" />
              </View>
              <Text style={styles.actionText}>{t('specialExpenses')}</Text>
            </TouchableOpacity>
          </Link>

          <Link href="/(tabs)/dashboard" asChild>
            <TouchableOpacity style={styles.actionButton}>
              <View style={styles.iconContainer}>
                <BarChart2 size={24} color="#000000" />
              </View>
              <Text style={styles.actionText}>{t('viewMonthlyReport')}</Text>
            </TouchableOpacity>
          </Link>
        </View>

        <View style={styles.tipContainer}>
          <Text style={styles.tipTitle}>{t('quickTip')}</Text>
          <Text style={styles.tipText}>{t('tipContent')}</Text>
        </View>
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
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#555555',
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 16,
    color: '#000000',
  },
  actionContainer: {
    marginTop: 24,
    marginBottom: 24,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#EEEEEE',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    borderWidth: 1,
    borderColor: '#EEEEEE',
  },
  actionText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#000000',
    flex: 1,
  },
  tipContainer: {
    backgroundColor: '#F0F0F0',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  tipTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    color: '#000000',
  },
  tipText: {
    fontSize: 16,
    color: '#333333',
    lineHeight: 24,
  },
});
