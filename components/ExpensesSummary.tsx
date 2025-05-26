
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
      
      <View style={styles.summaryRow}>
        <Text style={styles.categoryText}>{t('dailyExpenses')}</Text>
        <Text style={styles.amountText}>{formatCurrency(summary.daily)}</Text>
      </View>
      
      <View style={styles.summaryRow}>
        <Text style={styles.categoryText}>{t('creditExpenses')}</Text>
        <Text style={styles.amountText}>{formatCurrency(summary.credit)}</Text>
      </View>
      
      <View style={styles.summaryRow}>
        <Text style={styles.categoryText}>{t('specialExpenses')}</Text>
        <Text style={styles.amountText}>{formatCurrency(summary.special)}</Text>
      </View>
      
      <View style={[styles.summaryRow, styles.totalRow]}>
        <Text style={styles.totalText}>{t('totalExpenses')}</Text>
        <Text style={styles.totalAmountText}>{formatCurrency(totalExpenses)}</Text>
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
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  categoryText: {
    fontSize: 16,
    color: '#333333',
  },
  amountText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
  },
  totalRow: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#DDDDDD',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
  },
  totalAmountText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
  },
  loadingText: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
  },
});
