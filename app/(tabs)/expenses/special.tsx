import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from '@/hooks/useTranslation';
import { Link, Stack, useRouter } from 'expo-router';
import { ArrowLeft, Plus } from 'lucide-react-native';
import { formatCurrency } from '@/utils/format';

// Mock data for demonstration
const mockExpenses = [
  { id: '1', date: '2024-02-20', amount: 5000, purpose: 'Wedding Gift' },
  { id: '2', date: '2024-02-10', amount: 2000, purpose: 'Festival Shopping' },
  { id: '3', date: '2024-02-05', amount: 3000, purpose: 'Temple Donation' },
];

export default function SpecialExpensesScreen() {
  const { t } = useTranslation();
  const router = useRouter();

  const renderExpenseItem = ({ item }: { item: typeof mockExpenses[0] }) => (
    <TouchableOpacity style={styles.expenseItem}>
      <View style={styles.expenseDetails}>
        <Text style={styles.expensePurpose}>{item.purpose}</Text>
        <Text style={styles.expenseDate}>
          {new Date(item.date).toLocaleDateString()}
        </Text>
      </View>
      <Text style={styles.expenseAmount}>{formatCurrency(item.amount)}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: t('specialExpenses'),
          headerTitleStyle: styles.headerTitle,
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
              <ArrowLeft size={24} color="#000000" />
            </TouchableOpacity>
          ),
        }}
      />

      <FlatList
        data={mockExpenses}
        renderItem={renderExpenseItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>{t('noExpenses')}</Text>
          </View>
        )}
      />

      <Link href="/add-expense/special" asChild>
        <TouchableOpacity style={styles.addButton}>
          <Plus size={24} color="#FFFFFF" />
          <Text style={styles.addButtonText}>{t('addNewExpense')}</Text>
        </TouchableOpacity>
      </Link>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
  },
  backButton: {
    padding: 8,
  },
  listContainer: {
    padding: 20,
  },
  expenseItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#EEEEEE',
  },
  expenseDetails: {
    flex: 1,
  },
  expensePurpose: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
    marginBottom: 4,
  },
  expenseDate: {
    fontSize: 14,
    color: '#666666',
  },
  expenseAmount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    left: 20,
    backgroundColor: '#000000',
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 8,
  },
});