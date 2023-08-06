import React, { useEffect, useState } from 'react'
import {Platform, View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import Ionicons from "@expo/vector-icons/Ionicons"

const MyDatePicker = ({ onConfirm, color, current }) => {
  const [date, setDate] = useState(new Date());
  const [tempDate, setTempDate] = useState(new Date());
  const [show, setShow] = useState(false);

  useEffect(() => {
    setDate(current || new Date());
    setTempDate(current || new Date());
  }, [current]);

  const onChange = (event, selectedDate) => {
    setTempDate(selectedDate || date);
  };

  const confirmDate = () => {
    setDate(tempDate);
    onConfirm(tempDate)
    setShow(false);
  };

  const showDatepicker = () => {
    setShow(true);
  };

  return (
    <View style={{ borderRadius: 10, borderWidth: 2, borderColor: 'black', marginVertical:15, marginRight: 25 }}>
      <TouchableOpacity onPress={showDatepicker}  style={{...styles.container, backgroundColor: color}}>
        <View style={styles.calendarIcon}>
          <Ionicons
            name="calendar-outline"
            size={25}
            color="black"
          />
        </View>
        {show ? (
          <View style={{ marginTop: 45, marginLeft: -47}}>
            <DateTimePicker
              testID="dateTimePicker"
              value={current ? current : tempDate}
              mode='date'
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={onChange}
              style={{backgroundColor: 'white'}}
            />
            <View style={{ display: 'flex', justifyContent: 'center',alignItems: 'center',}}>
              <TouchableOpacity style={{ display: 'flex', justifyContent: 'center',alignItems: 'center', backgroundColor: 'black', height: 35, width: 100, borderRadius: 5, marginVertical: 15 }} onPress={confirmDate}>
                <Text style={{ color: color, fontWeight: 'bold' }}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <Text style={styles.calendarText}>{date.toDateString()}</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    borderRadius: 7.5,
  },
  calendarIcon: {
    marginLeft: 25,
  },
  calendarText: {
    fontSize: 16,
    marginLeft: 50,
    fontWeight: 500,
    marginTop: 5,
  }
})

export default MyDatePicker
