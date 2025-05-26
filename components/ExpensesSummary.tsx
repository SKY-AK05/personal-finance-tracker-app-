
import { View, Text, StyleSheet } from 'react-native';
import { useTranslation } from '@/hooks/useTranslation';
import { formatCurrency } from '@/utils/format';
import { useState, useEffect } from 'react';
import { getExpensesSummary } from '@/utils/storage';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';

export default function ExpensesSummary() {
  const { t } = useTranslation();
  const [summary, setSummary] = useState({ daily: 0, credit: 0, special: 0 });
  const [loading, setLoading] = useState(true);

  const loadSummary = useCallback(async () => {
    try {
      setLoading(true);
      const summaryData = await getExpensesSummary();
      setSummary(summaryData);
    } catch (error) {
      console.error('Error loading summary:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(loadSummary);

  const totalExpenses = summary.daily + summary.credit + summary.special;

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{t('thisMonthExpenses')}</Text>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('thisMonthExpenses')}</Text>
      
      <View style={styles.gridContainer}>
        <View style={styles.gridItem}>
          <Text style={styles.categoryText}>{t('dailyExpenses')}</Text>
          <Text style={styles.amountText}>{formatCurrency(summary.daily)}</Text>
        </View>
        
        <View style={styles.gridItem}>
          <Text style={styles.categoryText}>Credit Card{'\n'}Expenses</Text>
          <Text style={styles.amountText}>{formatCurrency(summary.credit)}</Text>
        </View>
        
        <View style={styles.gridItem}>
          <Text style={styles.categoryText}>Special{'\n'}Expenses</Text>
          <Text style={styles.amountText}>{formatCurrency(summary.special)}</Text>
        </View>
        
        <View style={styles.gridItem}>
          <Text style={styles.categoryText}>Grand Total</Text>
          <Text style={styles.totalAmountText}>{formatCurrency(totalExpenses)}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5F5F5',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
    color: '#000000',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gridItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    width: '48%',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  categoryText: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 8,
    fontWeight: '500',
  },
  amountText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
  },
  totalAmountText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
  },
  loadingText: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
  },
});
