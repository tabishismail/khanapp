import React, { useState } from "react";
import { Picker } from "@react-native-picker/picker";

function MyDropdown({ data, label ,style,selectedType, setSelectedType}) {
  return (
    <Picker
      style={style}
      selectedValue={selectedType}
      onValueChange={(itemValue, itemIndex) => setSelectedType(itemValue)}
    >
      <Picker.Item label="Monthly" value="monthly" />
      <Picker.Item label="Daily 1" value="daily1" />
      <Picker.Item label="Daily 2" value="daily2" />
      <Picker.Item label="Daily 3" value="daily3" />
    </Picker>
  );
}
export default MyDropdown;
