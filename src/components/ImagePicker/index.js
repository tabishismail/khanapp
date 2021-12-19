import React, { useState, useEffect } from "react";
import {
  Button,
  Image,
  View,
  Text,
  Platform,
  TouchableOpacity,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

export default function ImagePickerExample({ title,setUri}) {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      setImage(result.uri);
      setUri(result.uri);
    }
  };

  return (
    <View style={{ width:'90%',justifyContent:'center',alignItems:"center"}}>
      <TouchableOpacity
        style={{
          width: "100%",
          height: 50,
          backgroundColor: "lightgrey",
          borderRadius: 20,
          paddingHorizontal: 15,
          margin: 10,
          justifyContent:'center',
          alignItems:'center'
        }}
        onPress={pickImage}
      >
        <Text
          style={{
              textAlign: "center",
              fontSize: 14,
              color: "grey",
          }}
        >
          {image? "Image selected successfully!" :title}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
