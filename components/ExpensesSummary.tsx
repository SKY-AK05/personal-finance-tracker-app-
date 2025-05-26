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

  const loadSummary = useCallback(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const summaryData = await getExpensesSummary();
        setSummary(summaryData);
      } catch (error) {
        console.error('Error loading summary:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadSummary();
    }, [loadSummary])
  );

  const totalExpenses = summary.daily + summary.credit + summary.special;

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.gridContainer}>
        <View style={styles.gridItem}>
          <Text style={styles.categoryTitle}>{t('dailyExpenses')}</Text>
          <Text style={styles.categoryAmount}>{formatCurrency(summary.daily)}</Text>
        </View>

        <View style={styles.gridItem}>
          <Text style={styles.categoryTitle}>{t('creditExpenses')}</Text>
          <Text style={styles.categoryAmount}>{formatCurrency(summary.credit)}</Text>
        </View>

        <View style={styles.gridItem}>
          <Text style={styles.categoryTitle}>{t('specialExpenses')}</Text>
          <Text style={styles.categoryAmount}>{formatCurrency(summary.special)}</Text>
        </View>

        <View style={[styles.gridItem, styles.totalItem]}>
          <Text style={styles.totalTitle}>Grand Total</Text>
          <Text style={styles.totalAmount}>{formatCurrency(totalExpenses)}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  gridItem: {
    flex: 0.48,
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 16,
    minHeight: 80,
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#E9ECEF',
  },
  totalItem: {
    backgroundColor: '#F1F3F4',
    borderColor: '#DEE2E6',
  },
  categoryTitle: {
    fontSize: 14,
    color: '#6C757D',
    fontWeight: '500',
    marginBottom: 8,
  },
  categoryAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
  },
  totalTitle: {
    fontSize: 14,
    color: '#6C757D',
    fontWeight: '500',
    marginBottom: 8,
  },
  totalAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
  },
  loadingText: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    padding: 20,
  },
});