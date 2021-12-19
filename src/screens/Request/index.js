import { Input, MyDropdown } from "../../components";
import { SafeAreaProvider } from "react-native-safe-area-context";
import React, { useEffect, useState } from "react";
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
import {
  storage,
  ref,
  uploadBytes,
  getDownloadURL,
  setDoc,
  doc,
  db,
  auth,
} from "../../config/Firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";

function Request({ navigation }) {
  const [selectedType, setSelectedType] = useState();
  const [name, setName] = useState();
  const [fatherName, setFatherName] = useState();
  const [cnic, setCnic] = useState();
  const [members, setMembers] = useState();
  const [dob, setDob] = useState();
  const [userImage, setUserImage] = useState();
  const [cnicFrontImage, setCnicFrontImage] = useState();
  const [cnicBackImage, setCnicBackImage] = useState();
  const [salary, setSalary] = useState();
  let uid;
  useEffect(async () => {
    uid = await auth.currentUser.uid;
  })
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('user')
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      alert(e);
    }
  }
  function SendRequest() {
    let userImageUrl, cnicFrontUrl, cnicBackUrl;
    const userRef = ref(storage, `images/${uid}-userImage`);
    const CnicFrontRef = ref(storage, `images/${uid}-cnicFrontImage`);
    const cnicBackRef = ref(storage, `images/${uid}-cnicBackImage`);
    uploadBytes(userRef, userImage).then((snapshot) => {
      getDownloadURL(userRef)
        .then((url) => {
          const xhr = new XMLHttpRequest();
          xhr.responseType = "blob";
          xhr.onload = (event) => {
            const blob = xhr.response;
          };
          xhr.open("GET", url);
          xhr.send();
          userImageUrl = url;
        })
        .catch((error) => {
          console.log(error);
        });
    });
    uploadBytes(CnicFrontRef, cnicFrontImage).then((snapshot) => {
      getDownloadURL(CnicFrontRef)
        .then((url) => {
          const xhr = new XMLHttpRequest();
          xhr.responseType = "blob";
          xhr.onload = (event) => {
            const blob = xhr.response;
          };
          xhr.open("GET", url);
          xhr.send();
          cnicFrontUrl = url;
        })
        .catch((error) => {
          console.log(error);
        });
    });
    uploadBytes(cnicBackRef, cnicBackImage).then((snapshot) => {
      getDownloadURL(cnicBackRef)
        .then((url) => {
          const xhr = new XMLHttpRequest();
          xhr.responseType = "blob";
          xhr.onload = (event) => {
            const blob = xhr.response;
          };
          xhr.open("GET", url);
          xhr.send();
          cnicBackUrl = url;
        })
        .catch((error) => {
          console.log(error);
        });
    });
    // uid.then((res)=>alert("res => "+res))
    // .catch((err)=>alert("err => "+err))
    // alert(uid)
    setDoc(doc(db, "requests", uid), {
      name,
      fatherName,
      uid,
      cnic,
      members,
      dob,
      requestType: selectedType,
      userImageUrl,
      cnicFrontUrl,
      cnicBackUrl,
      salary,
      status: "pending",
    })
      .then((res) => {
        alert("Request Send Successfully!");
      })
      .catch((err) => {
        alert("Error! ", err);
      });
  }
  return (
    <SafeAreaProvider style={styles.Div}>
      <ScrollView style={styles.container}>
        <View style={styles.logoView}>
          <Image source={Logo} style={styles.logo} />
        </View>
        <View style={styles.main}>
          <View style={styles.heading}>
            <Text style={styles.h1}>New Request</Text>
            <Text style={styles.text}>
              Please enter Detail Below for New Request
            </Text>
          </View>
          <Input
            textContentType={"username"}
            placeholder={"Enter Your Name"}
            onChangeText={(text) => setName(text)}
          />
          <Input
            textContentType={"username"}
            placeholder={"Enter Your Father Name"}
            onChangeText={(text) => setFatherName(text)}
          />
          <Input
            textContentType={"username"}
            placeholder={"Enter Your CNIC Number"}
            onChangeText={(text) => setCnic(text)}
          />
          <Input
            textContentType={"username"}
            placeholder={"Enter Quantity of Family Members"}
            onChangeText={(text) => setMembers(text)}
          />
          <View
            style={{
              width: "90%",
              height: 50,
              backgroundColor: "lightgrey",
              borderRadius: 20,
              paddingHorizontal: 15,
              margin: 10,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 16 }}>Requested Food Type:</Text>
            <MyDropdown
              style={{
                width: "45%",
                borderRadius: 15,
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 1,
                },
                shadowOpacity: 0.18,
                shadowRadius: 1.0,
                elevation: 1,
              }}
              selectedType={selectedType}
              setSelectedType={setSelectedType}
            />
          </View>
          <MyDatePicker style={{ width: "100%" }} setDob={setDob}>
            Select Date of Birth
          </MyDatePicker>
          <ImagePickerExample
            title="Select Applicate Image"
            setUri={setUserImage}
          />
          <ImagePickerExample
            title="Select CNIC Front Image"
            setUri={setCnicFrontImage}
          />
          <ImagePickerExample
            title="Select CNIC Back Image"
            setUri={setCnicBackImage}
          />
          <Input
            textContentType={"username"}
            onChangeText={(text) => setSalary(text)}
            placeholder={"Enter Monthly Income"}
          />
          <TouchableOpacity
            style={{
              width: "90%",
              height: 50,
              backgroundColor: "lightgreen",
              borderRadius: 20,
              paddingHorizontal: 15,
              margin: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={SendRequest}
          >
            <Text
              style={{
                textAlign: "center",
                textAlignVertical: "center",
                fontSize: 14,
                color: "black",
              }}
            >
              Next
            </Text>
          </TouchableOpacity>
        </View>
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

export default Request;
