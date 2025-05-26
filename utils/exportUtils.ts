
import * as XLSX from 'xlsx';
import { Platform, Alert } from 'react-native';
import { getExpenses } from './storage';

export const exportToExcel = async () => {
  try {
    const expenses = await getExpenses();
    
    if (expenses.length === 0) {
      Alert.alert('No Data', 'No expenses found to export.');
      return;
    }

    // Prepare data for Excel
    const excelData = expenses.map(expense => ({
      Date: new Date(expense.date).toLocaleDateString(),
      Type: expense.type.charAt(0).toUpperCase() + expense.type.slice(1),
      Purpose: expense.purpose,
      Amount: expense.amount,
      'Payment Method': expense.paymentMethod.toUpperCase(),
      Notes: expense.notes || '',
      'Reminder Enabled': expense.reminderEnabled ? 'Yes' : 'No'
    }));

    // Create workbook and worksheet
    const ws = XLSX.utils.json_to_sheet(excelData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Expenses');

    // Create filename with current date
    const currentDate = new Date().toISOString().split('T')[0];
    const fileName = `expenses_${currentDate}.xlsx`;

    if (Platform.OS === 'web') {
      // Web implementation
      const wbout = XLSX.write(wb, { type: 'array', bookType: 'xlsx' });
      const blob = new Blob([wbout], { type: 'application/octet-stream' });
      
      // Create download link
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      Alert.alert('Export Successful', `Excel file downloaded as ${fileName}`);
    } else {
      // Native implementation (requires react-native-fs)
      const RNFS = require('react-native-fs');
      const wbout = XLSX.write(wb, { type: 'base64', bookType: 'xlsx' });
      const filePath = `${RNFS.DownloadDirectoryPath}/${fileName}`;
      
      await RNFS.writeFile(filePath, wbout, 'base64');
      Alert.alert(
        'Export Successful',
        `Excel file saved to Downloads folder as ${fileName}`
      );
    }
  } catch (error) {
    console.error('Export error:', error);
    Alert.alert(
      'Export Failed',
      'An error occurred while exporting data. Please try again.'
    );
  }
};
