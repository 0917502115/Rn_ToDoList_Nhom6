import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, TextInput, TouchableOpacity, Text } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import DateTimePickerModal from "react-native-modal-datetime-picker";

LocaleConfig.locales['vi'] = {
  monthNames: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
  monthNamesShort: ['Th.1', 'Th.2', 'Th.3', 'Th.4', 'Th.5', 'Th.6', 'Th.7', 'Th.8', 'Th.9', 'Th.10', 'Th.11', 'Th.12'],
  dayNames: ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'],
  dayNamesShort: ['CN', 'Th2', 'Th3', 'Th4', 'Th5', 'Th6', 'Th7'],
};

LocaleConfig.defaultLocale = 'vi';

const sortNotesByDate = (notes) => {
  return Object.entries(notes)
    .sort(([dateA], [dateB]) => new Date(dateA) - new Date(dateB))
    .reduce((sortedNotes, [date, note]) => {
      sortedNotes[date] = note;
      return sortedNotes;
    }, {});
};

const NoteList = ({ dayInfo, onClose }) => {
  const sortedDayInfo = sortNotesByDate(dayInfo);

  return (
    <View style={styles.noteListContainer}>
      <TouchableOpacity onPress={onClose} style={styles.closeNoteListButton}>
        <Text style={styles.closeNoteListButtonText}>Đóng</Text>
      </TouchableOpacity>
      <ScrollView>
        <Text style={styles.noteListTitle}>Danh sách Ghi chú:</Text>
        {Object.entries(sortedDayInfo).map(([date, note]) => (
          <TouchableOpacity key={date} style={styles.noteListItem}>
            <Text>{`Ngày ${date}. Ghi chú ${note.note}`}</Text>
            {note.time && <Text>{`Thời gian: ${note.time}`}</Text>}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};


const App = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [dayInfo, setDayInfo] = useState({});
  const [markedDates, setMarkedDates] = useState({});
  const [note, setNote] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [showNoteList, setShowNoteList] = useState(false);
  const [selectedTime, setSelectedTime] = useState(null);
  const [isTimePickerVisible, setTimePickerVisible] = useState(false);

  useEffect(() => {
    if (selectedDate && dayInfo[selectedDate]) {
      setNote(dayInfo[selectedDate].note);
      setSelectedTime(dayInfo[selectedDate].time);
      setShowResult(true);
    } else {
      setNote('');
      setSelectedTime(null);
      setShowResult(false);
    }
  }, [selectedDate, dayInfo]);

  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);
    setShowResult(false);

    if (dayInfo[day.dateString]) {
      setNote(dayInfo[day.dateString].note);
      setSelectedTime(dayInfo[day.dateString].time);
      setShowResult(true);
    } else {
      setNote('');
      setSelectedTime(null);
    }
  };

  const saveNote = () => {
    if (selectedDate) {
      setDayInfo((prevDayInfo) => ({ ...prevDayInfo, [selectedDate]: { note, time: selectedTime } }));
      setMarkedDates((prevMarkedDates) => ({
        ...prevMarkedDates,
        [selectedDate]: { selected: true, marked: true, dotColor: 'red' },
      }));
      setShowResult(true);
      setIsInputFocused(false);
    }
  };

  const editNote = () => {
    setShowResult(false);
    setIsInputFocused(true);
  };

  const deleteNote = () => {
    if (selectedDate) {
      setDayInfo((prevDayInfo) => {
        const { [selectedDate]: deletedNote, ...rest } = prevDayInfo;
        return rest;
      });
      setMarkedDates((prevMarkedDates) => ({
        ...prevMarkedDates,
        [selectedDate]: { selected: false },
      }));
      setSelectedDate(null);
      setShowResult(false);
      setIsInputFocused(false);
    }
  };

  const toggleNoteList = () => {
    setShowNoteList(!showNoteList);
  };

  const showTimePicker = () => {
    setTimePickerVisible(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisible(false);
  };

  const handleConfirm = (date) => {
    setSelectedTime(date.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }));
    hideTimePicker();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {!showNoteList && (
          <TouchableOpacity onPress={toggleNoteList} style={styles.noteListButton}>
            <Text style={styles.noteListButtonText}>Danh sách Ghi chú</Text>
          </TouchableOpacity>
        )}
      </View>
      <ScrollView>
        <Calendar
          style={[styles.calendar, { display: isInputFocused || showNoteList ? 'none' : 'flex' }]}
          current={new Date()}
          markedDates={{ ...markedDates, [selectedDate]: { selected: true } }}
          onDayPress={handleDayPress}
        />
        <View style={styles.noteContainer}>
          {selectedDate && (
            <View>
              {showResult ? (
                <View>
                  <Text style={styles.noteTitle}>{`Ghi chú cho ngày ${selectedDate} và thời gian ${selectedTime}:`}</Text>
                  <Text style={styles.noteResult}>{dayInfo[selectedDate].note}</Text>
                  {dayInfo[selectedDate].time && <Text style={styles.noteResult}>{`Thời gian: ${dayInfo[selectedDate].time}`}</Text>}
                  <TouchableOpacity onPress={editNote} style={styles.editButton}>
                    <Text style={styles.buttonText}>Chỉnh sửa</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={deleteNote} style={styles.deleteButton}>
                    <Text style={styles.buttonText}>Xóa</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <View>
                  <Text style={styles.noteTitle}>{`Ghi chú cho ngày ${selectedDate}:`}</Text>
                  <TextInput
                    style={styles.noteInput}
                    multiline
                    value={note}
                    onChangeText={(text) => setNote(text)}
                    onFocus={() => setIsInputFocused(true)}
                    onBlur={() => setIsInputFocused(false)}
                  />
                  <View style={styles.timePickerContainer}>

                    <TouchableOpacity onPress={showTimePicker}>
                      <Text>{selectedTime ? selectedTime : 'Chọn thời gian'}</Text>
                    </TouchableOpacity>
                    <DateTimePickerModal
                      isVisible={isTimePickerVisible}
                      mode="time"
                      onConfirm={handleConfirm}
                      onCancel={hideTimePicker}
                      locale="vi_VN"
                    />
                  </View>
                  <TouchableOpacity onPress={saveNote} style={styles.saveButton}>
                    <Text style={styles.saveButtonText}>Lưu ghi chú</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          )}
        </View>
      </ScrollView>
      {showNoteList && (
          <NoteList dayInfo={dayInfo} onClose={() => setShowNoteList(false)} />
        )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: '#fff',
    marginTop:40,
  },
  calendar: {
    marginBottom: -10,
  },
  noteContainer: {
    padding: 20,
  },
  header: {
    position: 'absolute',
    top: -15,
    right: 0,
    padding: 20,
  },
  noteListButton: {
    backgroundColor: 'lightgreen',
    padding: 10,
    borderRadius: 5,
  },
  noteListButtonText: {
    textAlign: 'center',
    color: 'black',
    marginTop: 0,
  },
  noteTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  noteInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    height: 100,
  },
  saveButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  saveButtonText: {
    textAlign: 'center',
    color: 'white',
  },
  noteResult: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    height: 100,
  },
  editButton: {
    backgroundColor: 'lightgreen',
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
  },
  deleteButton: {
    backgroundColor: 'lightcoral',
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
  },
  noteListContainer: {

    height: 1000,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'lightblue',
    padding: 15,
  },
  noteListTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  noteListItem: {
    marginBottom: 10,
  },
  closeNoteListButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    width: 70,
    bottom: 10,
    left: 320,
    transform: [{ translateX: -50 }],
  },
  closeNoteListButtonText: {
    textAlign: 'center',
    color: 'white',
  },
  timePickerContainer: {
    marginTop: 10,
    borderRadius:5,
    borderWidth:2,
    textAlign:'center',
    width:98,
    marginBottom:10,
    left: 110,
  },
});

export default App;
