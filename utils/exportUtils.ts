import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { Alert } from 'react-native';
import { getAllExpenses } from './storage';

export const exportToExcel = async () => {
  try {
    const expenses = await getAllExpenses();

    if (expenses.length === 0) {
      Alert.alert('No Data', 'No expense data available to export.');
      return;
    }

    // Create CSV content (Excel-compatible)
    const headers = 'Date,Type,Amount,Description,Category\n';
    const csvContent = expenses.map(expense => 
      `${expense.date},${expense.type},${expense.amount},"${expense.description}","${expense.category || ''}"`
    ).join('\n');

    const fullContent = headers + csvContent;

    // Create file path
    const fileName = `expenses_${new Date().toISOString().split('T')[0]}.csv`;
    const fileUri = FileSystem.documentDirectory + fileName;

    // Write file
    await FileSystem.writeAsStringAsync(fileUri, fullContent);

    // Share file
    if (await Sharing.isAvailableAsync()) {
      await Sharing.shareAsync(fileUri, {
        mimeType: 'text/csv',
        dialogTitle: 'Export Expense Data',
        UTI: 'public.comma-separated-values-text'
      });
    } else {
      Alert.alert('Success', `Data exported to: ${fileName}`);
    }

  } catch (error) {
    console.error('Export error:', error);
    Alert.alert('Error', 'Failed to export data. Please try again.');
  }
};