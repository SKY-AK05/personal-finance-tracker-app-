
import * as XLSX from 'xlsx';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { Expense } from './storage';

export const exportToExcel = async (expenses: Expense[]) => {
  try {
    // Create workbook and worksheet
    const wb = XLSX.utils.book_new();
    
    // Prepare data for Excel
    const excelData = expenses.map(expense => ({
      Date: expense.date,
      Type: expense.type,
      Category: expense.category,
      Amount: expense.amount,
      Description: expense.description
    }));
    
    // Create worksheet
    const ws = XLSX.utils.json_to_sheet(excelData);
    
    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(wb, ws, 'Expenses');
    
    // Generate Excel file
    const wbout = XLSX.write(wb, { type: 'base64', bookType: 'xlsx' });
    
    // Create file path
    const fileName = `expenses_${new Date().toISOString().split('T')[0]}.xlsx`;
    const fileUri = FileSystem.documentDirectory + fileName;
    
    // Write file
    await FileSystem.writeAsStringAsync(fileUri, wbout, {
      encoding: FileSystem.EncodingType.Base64,
    });
    
    // Share file
    if (await Sharing.isAvailableAsync()) {
      await Sharing.shareAsync(fileUri);
    } else {
      console.log('Sharing is not available on this platform');
    }
    
    return true;
  } catch (error) {
    console.error('Error exporting to Excel:', error);
    throw error;
  }
};
