import { View, Text, StyleSheet } from 'react-native';
import { useTranslation } from '@/hooks/useTranslation';

type ExpenseData = {
  daily: number;
  credit: number;
  special: number;
};

type Props = {
  data: ExpenseData;
};

export default function ExpenseChart({ data }: Props) {
  const { t } = useTranslation();
  
  const total = data.daily + data.credit + data.special;
  
  // Calculate percentages
  const dailyPercent = total > 0 ? (data.daily / total) * 100 : 0;
  const creditPercent = total > 0 ? (data.credit / total) * 100 : 0;
  const specialPercent = total > 0 ? (data.special / total) * 100 : 0;
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('expenseBreakdown')}</Text>
      
      <View style={styles.barContainer}>
        <View style={styles.barLabels}>
          <Text style={styles.barLabel}>{t('dailyExpenses')}</Text>
          <Text style={styles.barLabel}>{t('creditExpenses')}</Text>
          <Text style={styles.barLabel}>{t('specialExpenses')}</Text>
        </View>
        
        <View style={styles.barsWrapper}>
          <View style={styles.barWrapper}>
            <View style={[styles.bar, { width: `${dailyPercent}%` }]} />
            <Text style={styles.barPercent}>{Math.round(dailyPercent)}%</Text>
          </View>
          
          <View style={styles.barWrapper}>
            <View style={[styles.bar, styles.creditBar, { width: `${creditPercent}%` }]} />
            <Text style={styles.barPercent}>{Math.round(creditPercent)}%</Text>
          </View>
          
          <View style={styles.barWrapper}>
            <View style={[styles.bar, styles.specialBar, { width: `${specialPercent}%` }]} />
            <Text style={styles.barPercent}>{Math.round(specialPercent)}%</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.legendContainer}>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, styles.dailyColor]} />
          <Text style={styles.legendText}>{t('dailyExpenses')}</Text>
        </View>
        
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, styles.creditColor]} />
          <Text style={styles.legendText}>{t('creditExpenses')}</Text>
        </View>
        
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, styles.specialColor]} />
          <Text style={styles.legendText}>{t('specialExpenses')}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 20,
    color: '#000000',
  },
  barContainer: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  barLabels: {
    width: '30%',
    justifyContent: 'space-between',
    paddingRight: 12,
  },
  barLabel: {
    fontSize: 14,
    color: '#555555',
    marginBottom: 24,
  },
  barsWrapper: {
    flex: 1,
  },
  barWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 24,
    marginBottom: 24,
  },
  bar: {
    height: 24,
    backgroundColor: '#000000',
    borderRadius: 4,
    marginRight: 8,
  },
  creditBar: {
    backgroundColor: '#555555',
  },
  specialBar: {
    backgroundColor: '#999999',
  },
  barPercent: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000000',
  },
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
    marginBottom: 8,
  },
  legendColor: {
    width: 16,
    height: 16,
    borderRadius: 4,
    marginRight: 8,
  },
  dailyColor: {
    backgroundColor: '#000000',
  },
  creditColor: {
    backgroundColor: '#555555',
  },
  specialColor: {
    backgroundColor: '#999999',
  },
  legendText: {
    fontSize: 14,
    color: '#000000',
  },
});