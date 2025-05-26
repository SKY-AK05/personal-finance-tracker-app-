import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { ChevronLeft, ChevronRight, Download, Filter } from 'lucide-react-native';
import ExpenseChart from '@/components/ExpenseChart';
import { formatCurrency } from '@/utils/format';

// Mock data for demonstration
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const TAMIL_MONTHS = ['ஜனவரி', 'பிப்ரவரி', 'மார்ச்', 'ஏப்ரல்', 'மே', 'ஜூன்', 'ஜூலை', 'ஆகஸ்ட்', 'செப்டம்பர்', 'அக்டோபர்', 'நவம்பர்', 'டிசம்பர்'];

const mockData = {
  daily: 5260,
  credit: 3450,
  special: 2000,
};

export default function DashboardScreen() {
  const { t, language } = useTranslation();
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const handlePreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const totalExpenses = mockData.daily + mockData.credit + mockData.special;

  const months = language === 'tamil' ? TAMIL_MONTHS : MONTHS;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>{t('monthlySummary')}</Text>
        </View>

        <View style={styles.monthSelector}>
          <TouchableOpacity onPress={handlePreviousMonth} style={styles.monthButton}>
            <ChevronLeft size={24} color="#000000" />
          </TouchableOpacity>
          <Text style={styles.monthText}>{months[currentMonth]} {currentYear}</Text>
          <TouchableOpacity onPress={handleNextMonth} style={styles.monthButton}>
            <ChevronRight size={24} color="#000000" />
          </TouchableOpacity>
        </View>

        <View style={styles.summaryContainer}>
          <Text style={styles.summaryTitle}>{t('monthlyOverview')}</Text>
          
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>{t('dailyExpenses')}</Text>
            <Text style={styles.summaryValue}>{formatCurrency(mockData.daily)}</Text>
          </View>
          
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>{t('creditExpenses')}</Text>
            <Text style={styles.summaryValue}>{formatCurrency(mockData.credit)}</Text>
          </View>
          
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>{t('specialExpenses')}</Text>
            <Text style={styles.summaryValue}>{formatCurrency(mockData.special)}</Text>
          </View>
          
          <View style={[styles.summaryRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>{t('totalExpenses')}</Text>
            <Text style={styles.totalValue}>{formatCurrency(totalExpenses)}</Text>
          </View>
        </View>

        <View style={styles.chartContainer}>
          <ExpenseChart data={mockData} />
        </View>

        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.actionButton}>
            <Filter size={20} color="#000000" />
            <Text style={styles.actionButtonText}>{t('filter')}</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton}>
            <Download size={20} color="#000000" />
            <Text style={styles.actionButtonText}>{t('export')}</Text>
          </TouchableOpacity>
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
  },
  monthSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 8,
  },
  monthButton: {
    padding: 8,
  },
  monthText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000000',
  },
  summaryContainer: {
    backgroundColor: '#F5F5F5',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
  },
  summaryTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
    color: '#000000',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  summaryLabel: {
    fontSize: 18,
    color: '#333333',
  },
  summaryValue: {
    fontSize: 18,
    fontWeight: '500',
    color: '#000000',
  },
  totalRow: {
    marginTop: 8,
    paddingTop: 16,
    borderTopWidth: 2,
    borderTopColor: '#D0D0D0',
    borderBottomWidth: 0,
  },
  totalLabel: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
  },
  totalValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000000',
  },
  chartContainer: {
    marginBottom: 24,
    height: 300,
    backgroundColor: '#F5F5F5',
    borderRadius: 16,
    padding: 16,
    justifyContent: 'center',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F0F0F0',
    borderRadius: 30,
    paddingVertical: 14,
    paddingHorizontal: 24,
    flex: 0.48,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 8,
    color: '#000000',
  },
});