import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useState } from 'react';
import { useTranslation } from '@/hooks/useTranslation';

type Props = {
  currentDate: Date;
  onDateChange: (date: Date) => void;
  onClose: () => void;
};

export default function DateTimePicker({ currentDate, onDateChange, onClose }: Props) {
  const { t } = useTranslation();
  
  const [selectedDate, setSelectedDate] = useState(currentDate);
  const [activeTab, setActiveTab] = useState('date');
  
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const years = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - 5 + i);
  const hours = Array.from({ length: 12 }, (_, i) => i + 1);
  const minutes = Array.from({ length: 12 }, (_, i) => i * 5);
  const ampm = ['AM', 'PM'];
  
  const handleDateChange = (day: number, month: number, year: number) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(day);
    newDate.setMonth(month);
    newDate.setFullYear(year);
    setSelectedDate(newDate);
  };
  
  const handleTimeChange = (hour: number, minute: number, isAM: boolean) => {
    const newDate = new Date(selectedDate);
    newDate.setHours(isAM ? hour : hour + 12);
    newDate.setMinutes(minute);
    setSelectedDate(newDate);
  };
  
  const handleSave = () => {
    onDateChange(selectedDate);
    onClose();
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'date' && styles.activeTab]}
          onPress={() => setActiveTab('date')}
        >
          <Text style={[styles.tabText, activeTab === 'date' && styles.activeTabText]}>
            {t('date')}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'time' && styles.activeTab]}
          onPress={() => setActiveTab('time')}
        >
          <Text style={[styles.tabText, activeTab === 'time' && styles.activeTabText]}>
            {t('time')}
          </Text>
        </TouchableOpacity>
      </View>
      
      {activeTab === 'date' ? (
        <View>
          <Text style={styles.sectionTitle}>{t('month')}</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.pickerRow}>
              {months.map((month, index) => (
                <TouchableOpacity
                  key={month}
                  style={[
                    styles.pickerItem,
                    selectedDate.getMonth() === index && styles.selectedPickerItem,
                  ]}
                  onPress={() => handleDateChange(
                    selectedDate.getDate(),
                    index,
                    selectedDate.getFullYear()
                  )}
                >
                  <Text 
                    style={[
                      styles.pickerText,
                      selectedDate.getMonth() === index && styles.selectedPickerText,
                    ]}
                  >
                    {month.substring(0, 3)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
          
          <Text style={styles.sectionTitle}>{t('day')}</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.pickerRow}>
              {days.map(day => (
                <TouchableOpacity
                  key={`day-${day}`}
                  style={[
                    styles.pickerItem,
                    selectedDate.getDate() === day && styles.selectedPickerItem,
                  ]}
                  onPress={() => handleDateChange(
                    day,
                    selectedDate.getMonth(),
                    selectedDate.getFullYear()
                  )}
                >
                  <Text 
                    style={[
                      styles.pickerText,
                      selectedDate.getDate() === day && styles.selectedPickerText,
                    ]}
                  >
                    {day}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
          
          <Text style={styles.sectionTitle}>{t('year')}</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.pickerRow}>
              {years.map(year => (
                <TouchableOpacity
                  key={`year-${year}`}
                  style={[
                    styles.pickerItem,
                    selectedDate.getFullYear() === year && styles.selectedPickerItem,
                  ]}
                  onPress={() => handleDateChange(
                    selectedDate.getDate(),
                    selectedDate.getMonth(),
                    year
                  )}
                >
                  <Text 
                    style={[
                      styles.pickerText,
                      selectedDate.getFullYear() === year && styles.selectedPickerText,
                    ]}
                  >
                    {year}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>
      ) : (
        <View>
          <Text style={styles.sectionTitle}>{t('hour')}</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.pickerRow}>
              {hours.map(hour => (
                <TouchableOpacity
                  key={`hour-${hour}`}
                  style={[
                    styles.pickerItem,
                    (selectedDate.getHours() % 12 || 12) === hour && styles.selectedPickerItem,
                  ]}
                  onPress={() => handleTimeChange(
                    hour,
                    selectedDate.getMinutes(),
                    selectedDate.getHours() < 12
                  )}
                >
                  <Text 
                    style={[
                      styles.pickerText,
                      (selectedDate.getHours() % 12 || 12) === hour && styles.selectedPickerText,
                    ]}
                  >
                    {hour}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
          
          <Text style={styles.sectionTitle}>{t('minute')}</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.pickerRow}>
              {minutes.map(minute => (
                <TouchableOpacity
                  key={`minute-${minute}`}
                  style={[
                    styles.pickerItem,
                    Math.floor(selectedDate.getMinutes() / 5) * 5 === minute && styles.selectedPickerItem,
                  ]}
                  onPress={() => handleTimeChange(
                    selectedDate.getHours() % 12 || 12,
                    minute,
                    selectedDate.getHours() < 12
                  )}
                >
                  <Text 
                    style={[
                      styles.pickerText,
                      Math.floor(selectedDate.getMinutes() / 5) * 5 === minute && styles.selectedPickerText,
                    ]}
                  >
                    {minute.toString().padStart(2, '0')}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
          
          <Text style={styles.sectionTitle}>{t('ampm')}</Text>
          <View style={styles.ampmContainer}>
            {ampm.map(period => (
              <TouchableOpacity
                key={period}
                style={[
                  styles.ampmButton,
                  (selectedDate.getHours() < 12 && period === 'AM') || 
                  (selectedDate.getHours() >= 12 && period === 'PM') 
                    ? styles.selectedAmPm 
                    : {}
                ]}
                onPress={() => handleTimeChange(
                  selectedDate.getHours() % 12 || 12,
                  selectedDate.getMinutes(),
                  period === 'AM'
                )}
              >
                <Text 
                  style={[
                    styles.ampmText,
                    (selectedDate.getHours() < 12 && period === 'AM') || 
                    (selectedDate.getHours() >= 12 && period === 'PM') 
                      ? styles.selectedAmPmText 
                      : {}
                  ]}
                >
                  {period}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={onClose}
        >
          <Text style={styles.cancelButtonText}>{t('cancel')}</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleSave}
        >
          <Text style={styles.saveButtonText}>{t('save')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#EEEEEE',
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 6,
  },
  activeTab: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  tabText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#666666',
  },
  activeTabText: {
    color: '#000000',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginTop: 16,
    marginBottom: 8,
    color: '#555555',
  },
  pickerRow: {
    flexDirection: 'row',
  },
  pickerItem: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 4,
    borderRadius: 25,
    backgroundColor: '#F5F5F5',
  },
  selectedPickerItem: {
    backgroundColor: '#000000',
  },
  pickerText: {
    fontSize: 16,
    color: '#000000',
  },
  selectedPickerText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  ampmContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 8,
  },
  ampmButton: {
    width: 80,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 8,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
  },
  selectedAmPm: {
    backgroundColor: '#000000',
  },
  ampmText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
  },
  selectedAmPmText: {
    color: '#FFFFFF',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 12,
    marginRight: 8,
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: '#F5F5F5',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
  },
  saveButton: {
    flex: 1,
    paddingVertical: 12,
    marginLeft: 8,
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: '#000000',
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF',
  },
});