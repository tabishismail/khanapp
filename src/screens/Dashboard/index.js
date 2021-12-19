import { Input } from "../../components";
import { SafeAreaProvider } from "react-native-safe-area-context";
import React, { useState } from "react";
import Logo from "../../../assets/Logo.png";
import { MyDatePicker } from "../../components";
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import ImagePickerExample from "../../components/ImagePicker";
function Dashboard() {
  return (
    <SafeAreaProvider style={styles.Div}>
      <ScrollView style={styles.container}>
      </ScrollView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  Div: {
    flex: 1,
    backgroundColor: "#ECF1FA",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  container: {
    flex: 1,
    // alignContent: 'center',
    // justifyContent: 'center',
    backgroundColor: "#ECF1FA",
  },
  logoView: {
    flex: 0.2,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 100,
    height: 85,
  },
  main: {
    flex: 0.9,
    alignItems: "center",
  },
  h1: {
    textAlign: "center",
    fontSize: 30,
    fontWeight: "700",
    color: "#181461",
  },
  heading: {
    justifyContent: "flex-start",
    marginBottom: 20,
  },
  text: {
    textAlign: "center",
    textAlignVertical: "center",
    marginTop: 10,
    fontSize: 14,
    color: "black",
  },
  textBtn: {
    textAlign: "center",
    fontSize: 14,
    color: "grey",
  },
  cnicBtn: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  Btns: {
    flexDirection: "row",
    justifyContent: "space-around",
  },

  link: {
    color: "#2A2AC0",
  },
  btn: {
    width: "90%",
    height: 50,
    backgroundColor: "lightgrey",
    borderRadius: 20,
    paddingHorizontal: 15,
    margin: 10,
  },
  btn2: {
    height: 35,
    width: "40%",
    backgroundColor: "#519259",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 30,
    marginVertical: 10,
  },
  btn1: {
    height: 35,
    width: "100%",
    backgroundColor: "#519259",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 20,
    marginVertical: 10,
  },
});

export default Dashboard;
