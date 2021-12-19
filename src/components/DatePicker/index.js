import React, { useState } from "react";
import {
  View,
  Button,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

export const MyDatePicker = ({ children, style,setDob }) => {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
    setDob(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  return (
    <View
      style={{
        width: "90%",
        height: 50,
        backgroundColor: "lightgrey",
        borderRadius: 20,
        paddingHorizontal: 15,
        margin: 10,
        justifyContent: "center",
      }}
    >
      <View style={{width:'100%'}}>
        <TouchableOpacity style={style} onPress={showDatepicker}>
          <Text style={styles.textBtn}>{children}</Text>
        </TouchableOpacity>
      </View>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 35,
    width: "100%",
    backgroundColor: "#519259",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 10,
    marginVertical: 10,
  },
  textBtn: {
    color: 'grey',
  },
});
