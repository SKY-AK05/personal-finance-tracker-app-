import { View, Text, StyleSheet } from 'react-native';
import { useTranslation } from '@/hooks/useTranslation';
import { formatCurrency } from '@/utils/format';

// Mock data for demonstration
const mockData = {
  today: 350,
  thisMonth: 5260,
  remaining: 4740,
};

export default function ExpensesSummary() {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('expensesSummary')}</Text>
      
      <View style={styles.row}>
        <View style={styles.summaryItem}>
          <Text style={styles.itemLabel}>{t('today')}</Text>
          <Text style={styles.itemValue}>{formatCurrency(mockData.today)}</Text>
        </View>
        
        <View style={styles.summaryItem}>
          <Text style={styles.itemLabel}>{t('thisMonth')}</Text>
          <Text style={styles.itemValue}>{formatCurrency(mockData.thisMonth)}</Text>
        </View>
      </View>
      
      <View style={styles.progressContainer}>
        <View style={styles.progressBarContainer}>
          <View 
            style={[
              styles.progressBar, 
              { width: `${(mockData.thisMonth / 10000) * 100}%` }
            ]} 
          />
        </View>
        <View style={styles.progressLabels}>
          <Text style={styles.progressLabel}>{t('spent')}</Text>
          <Text style={styles.progressLabel}>{t('remaining')}</Text>
        </View>
        <View style={styles.progressValues}>
          <Text style={styles.progressValue}>{formatCurrency(mockData.thisMonth)}</Text>
          <Text style={styles.progressValue}>{formatCurrency(mockData.remaining)}</Text>
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
    marginVertical: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
    color: '#000000',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  summaryItem: {
    flex: 1,
  },
  itemLabel: {
    fontSize: 16,
    color: '#555555',
    marginBottom: 4,
  },
  itemValue: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000000',
  },
  progressContainer: {
    marginTop: 8,
  },
  progressBarContainer: {
    height: 12,
    backgroundColor: '#E0E0E0',
    borderRadius: 6,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#000000',
    borderRadius: 6,
  },
  progressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  progressLabel: {
    fontSize: 14,
    color: '#555555',
  },
  progressValues: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressValue: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
  },
});