import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { useTranslation } from '@/hooks/useTranslation';
import { ArrowLeft, Calendar, CircleAlert as AlertCircle } from 'lucide-react-native';
import DateTimePicker from '@/components/DateTimePicker';

export default function AddExpenseScreen() {
  const { type } = useLocalSearchParams();
  const { t } = useTranslation();
  const router = useRouter();
  
  const [amount, setAmount] = useState('');
  const [purpose, setPurpose] = useState('');
  const [notes, setNotes] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [date, setDate] = useState(new Date());
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [reminderEnabled, setReminderEnabled] = useState(false);
  
  const getExpenseTypeTitle = () => {
    switch (type) {
      case 'daily':
        return t('addDailyExpense');
      case 'credit':
        return t('addCreditExpense');
      case 'special':
        return t('addSpecialExpense');
      default:
        return t('addExpense');
    }
  };

  const handleSave = () => {
    // In a real app, we would save the expense data to storage here
    console.log({
      type,
      amount,
      purpose,
      notes,
      date,
      paymentMethod,
      reminderEnabled
    });

    // Navigate back
    router.back();
  };

  const paymentOptions = [
    { id: 'cash', label: t('cash') },
    { id: 'upi', label: t('upi') },
    { id: 'card', label: t('card') },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: getExpenseTypeTitle(),
          headerTitleStyle: styles.headerTitle,
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
              <ArrowLeft size={24} color="#000000" />
            </TouchableOpacity>
          ),
        }}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.formContainer}>
            <View style={styles.datePickerContainer}>
              <Text style={styles.sectionTitle}>{t('dateAndTime')}</Text>
              <TouchableOpacity
                style={styles.dateSelector}
                onPress={() => setShowDatePicker(true)}
              >
                <Calendar size={20} color="#000000" />
                <Text style={styles.dateText}>
                  {date.toLocaleDateString()} - {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </Text>
              </TouchableOpacity>
              
              {showDatePicker && (
                <DateTimePicker
                  currentDate={date}
                  onDateChange={setDate}
                  onClose={() => setShowDatePicker(false)}
                />
              )}
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>{t('amount')}</Text>
              <View style={styles.amountInputContainer}>
                <Text style={styles.currencySymbol}>₹</Text>
                <TextInput
                  style={styles.amountInput}
                  value={amount}
                  onChangeText={setAmount}
                  keyboardType="numeric"
                  placeholder="0.00"
                  placeholderTextColor="#AAAAAA"
                  maxLength={10}
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>{t('purpose')}</Text>
              <TextInput
                style={styles.textInput}
                value={purpose}
                onChangeText={setPurpose}
                placeholder={t('enterPurpose')}
                placeholderTextColor="#AAAAAA"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>{t('paymentMethod')}</Text>
              <View style={styles.optionsContainer}>
                {paymentOptions.map((option) => (
                  <TouchableOpacity
                    key={option.id}
                    style={[
                      styles.optionButton,
                      paymentMethod === option.id && styles.selectedOption,
                    ]}
                    onPress={() => setPaymentMethod(option.id)}
                  >
                    <Text
                      style={[
                        styles.optionText,
                        paymentMethod === option.id && styles.selectedOptionText,
                      ]}
                    >
                      {option.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>{t('notes')}</Text>
              <TextInput
                style={[styles.textInput, styles.notesInput]}
                value={notes}
                onChangeText={setNotes}
                placeholder={t('enterNotes')}
                placeholderTextColor="#AAAAAA"
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />
            </View>

            <View style={styles.reminderContainer}>
              <View style={styles.reminderTextContainer}>
                <AlertCircle size={20} color="#000000" />
                <Text style={styles.reminderText}>{t('remindMeLater')}</Text>
              </View>
              <TouchableOpacity
                style={[
                  styles.toggleButton,
                  reminderEnabled && styles.toggleButtonActive,
                ]}
                onPress={() => setReminderEnabled(!reminderEnabled)}
              >
                <View
                  style={[
                    styles.toggleKnob,
                    reminderEnabled && styles.toggleKnobActive,
                  ]}
                />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.saveButton}
            onPress={handleSave}
          >
            <Text style={styles.saveButtonText}>{t('saveExpense')}</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
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
  scrollContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 100,
  },
  formContainer: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
    color: '#000000',
  },
  datePickerContainer: {
    marginBottom: 24,
  },
  dateSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  dateText: {
    fontSize: 18,
    marginLeft: 12,
    color: '#000000',
  },
  inputGroup: {
    marginBottom: 24,
  },
  label: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 8,
    color: '#000000',
  },
  amountInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    paddingHorizontal: 16,
  },
  currencySymbol: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    marginRight: 8,
  },
  amountInput: {
    flex: 1,
    fontSize: 24,
    fontWeight: '500',
    paddingVertical: 12,
    color: '#000000',
  },
  textInput: {
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 18,
    color: '#000000',
  },
  notesInput: {
    height: 120,
    paddingTop: 12,
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  optionButton: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    paddingVertical: 12,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  selectedOption: {
    backgroundColor: '#000000',
    borderColor: '#000000',
  },
  optionText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
  },
  selectedOptionText: {
    color: '#FFFFFF',
  },
  reminderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 16,
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  reminderTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reminderText: {
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 8,
    color: '#000000',
  },
  toggleButton: {
    width: 50,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#DDDDDD',
    justifyContent: 'center',
    padding: 2,
  },
  toggleButtonActive: {
    backgroundColor: '#000000',
  },
  toggleKnob: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#FFFFFF',
  },
  toggleKnobActive: {
    alignSelf: 'flex-end',
  },
  buttonContainer: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
  },
  saveButton: {
    backgroundColor: '#000000',
    borderRadius: 30,
    paddingVertical: 16,
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});