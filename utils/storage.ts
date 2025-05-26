
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Expense {
  id: string;
  type: 'daily' | 'credit' | 'special';
  amount: number;
  purpose: string;
  notes?: string;
  date: string;
  paymentMethod: 'cash' | 'upi' | 'card';
  reminderEnabled: boolean;
}

const EXPENSES_KEY = 'expenses';

export const saveExpense = async (expense: Expense): Promise<void> => {
  try {
    const existingExpenses = await getExpenses();
    const updatedExpenses = [...existingExpenses, expense];
    await AsyncStorage.setItem(EXPENSES_KEY, JSON.stringify(updatedExpenses));
  } catch (error) {
    console.error('Error saving expense:', error);
    throw error;
  }
};

export const getExpenses = async (): Promise<Expense[]> => {
  try {
    const expensesJson = await AsyncStorage.getItem(EXPENSES_KEY);
    return expensesJson ? JSON.parse(expensesJson) : [];
  } catch (error) {
    console.error('Error getting expenses:', error);
    return [];
  }
};

export const getExpensesByType = async (type: 'daily' | 'credit' | 'special'): Promise<Expense[]> => {
  try {
    const expenses = await getExpenses();
    return expenses.filter(expense => expense.type === type);
  } catch (error) {
    console.error('Error getting expenses by type:', error);
    return [];
  }
};

export const deleteExpense = async (id: string): Promise<void> => {
  try {
    const expenses = await getExpenses();
    const updatedExpenses = expenses.filter(expense => expense.id !== id);
    await AsyncStorage.setItem(EXPENSES_KEY, JSON.stringify(updatedExpenses));
  } catch (error) {
    console.error('Error deleting expense:', error);
    throw error;
  }
};

export const getExpensesSummary = async () => {
  try {
    const expenses = await getExpenses();
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    
    const monthlyExpenses = expenses.filter(expense => {
      const expenseDate = new Date(expense.date);
      return expenseDate.getMonth() === currentMonth && expenseDate.getFullYear() === currentYear;
    });

    const daily = monthlyExpenses
      .filter(expense => expense.type === 'daily')
      .reduce((sum, expense) => sum + expense.amount, 0);
    
    const credit = monthlyExpenses
      .filter(expense => expense.type === 'credit')
      .reduce((sum, expense) => sum + expense.amount, 0);
    
    const special = monthlyExpenses
      .filter(expense => expense.type === 'special')
      .reduce((sum, expense) => sum + expense.amount, 0);

    return { daily, credit, special };
  } catch (error) {
    console.error('Error getting expenses summary:', error);
    return { daily: 0, credit: 0, special: 0 };
  }
};
