import React from "react";
import { TextInput } from "react-native";

function Input({ textContentType, placeholder, onChangeText,secureTextEntry, ...props }) {
  return (
    <TextInput
      {...props}
      onChangeText={onChangeText}
      textContentType={textContentType}
      secureTextEntry={secureTextEntry}
      style={{
        width: "90%",
        height: 50,
        backgroundColor: "lightgrey",
        borderRadius: 20,
        paddingHorizontal: 15,
        margin: 10,
      }}
      placeholder={placeholder}
    />
  );
}
export default Input;
