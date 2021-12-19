import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
  Dimensions,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Logo from "../../../assets/Logo.png";
import { Input } from "../../components";
import {
  auth,
  signInWithEmailAndPassword,
  db,
  doc,
  getDoc,
} from "../../config/Firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Styles = StyleSheet.create({
  Div: {
    flex: 1,
    backgroundColor: "#ECF1FA",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  LogoDiv: {
    flex: 0.3,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  Logo: {
    width: 146,
    height: 99,
  },
  ContentDiv: {
    flex: 0.7,
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 40,
  },
  Text1: {
    fontSize: 20,
    fontWeight: "700",
    color: "#000",
    margin: 10,
    textAlign: "center",
  },
  Text2: {
    fontSize: 14,
    fontWeight: "500",
    color: "#000",
    marginBottom: 20,
  },
  Btn1: {
    width: "90%",
    height: 40,
    margin: 10,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2A2AC0",
  },
  BtnText1: {
    color: "#fff",
    fontSize: 16,
    width: "100%",
    height: "100%",
    textAlign: "center",
    fontWeight: "700",
    textAlignVertical: "center",
  },
  Btn2: {
    width: "90%",
    height: 40,
    margin: 10,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#3A559F",
  },
  BtnText2: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "900",
  },
  BtnText4: {
    color: "#fff",
    fontWeight: "900",
  },
  BottomDiv: {
    flexDirection: "row",
    alignSelf: "center",
    marginBottom: 40,
  },
  Text3: {
    color: "#000",
    fontSize: 14,
  },
  Btn3: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-end",
  },
  BtnText3: {
    color: "#000",
    fontSize: 14,
    textAlign: "center",
    textAlignVertical: "bottom",
    color: "#2A2AC0",
  },
});

function SignIn({ navigation }) {
  const [Loading, setLoading] = useState(false);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("user", jsonValue);
    } catch (e) {
      console.log(e);
    }
  };
  function Login() {
    setLoading(true);
    setEmailError(null);
    setPasswordError(null);
    if (email != "" && email != null) {
      const validateEmail = email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
      if (validateEmail) {
        if (password != "" && password != null) {
          const validatePassword = password.match(
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/
          );
          if (validatePassword) {
            setEmailError(null);
            setPasswordError(null);
            signInWithEmailAndPassword(auth, email, password)
              .then(async (userCredential) => {
                const user = userCredential.user;
                const uid = user.uid;
                setLoading(false);
                storeData(user);
                const docRef = doc(db, "users", uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                  let { type } = docSnap.data();
                  alert("Sign In Successfully!");
                  if (type == "user") {
                    setTimeout(() => navigation.navigate("Map"), 1000);
                  } 
                  // else {
                  //   setTimeout(() => navigation.navigate("Verification"), 1000);
                  // }
                }
              })
              .catch((error) => {
                setLoading(false);
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(
                  `error code => ${errorCode} error message => ${errorMessage}`
                );
              });
          } else {
            setLoading(false);
            setPasswordError(
              "Password must be 8 characters long and atleast contains one numeric digit, one capital letter, one small letter and one symbol."
            );
          }
        } else {
          setLoading(false);
          setPasswordError("Please Enter New Password!.");
        }
      } else {
        setLoading(false);
        setEmailError("Email Address is invalid.");
      }
    } else {
      setLoading(false);
      setEmailError("Please Enter your Email Address!.");
    }
  }
  return (
    <SafeAreaProvider style={Styles.Div}>
      <ScrollView>
        <View style={{ flex: 1, height: Dimensions.get("screen").height }}>
          <View style={Styles.LogoDiv}>
            <Image source={Logo} style={Styles.Logo} />
          </View>
          <View style={Styles.ContentDiv}>
            <Text style={Styles.Text1}>
              Welcome to Saylani Khana Sab ke leyen
            </Text>
            <Input
              onChangeText={(text) => setEmail(text)}
              textContentType="emailAddress"
              placeholder="Email"
            />
            {emailError ? <Text>{emailError}</Text> : null}
            <Input
              onChangeText={(text) => setPassword(text)}
              secureTextEntry={true}
              textContentType="password"
              placeholder="Password"
            />
            {passwordError ? <Text>{passwordError}</Text> : null}
            <TouchableOpacity
              activeOpacity={0.8}
              style={Styles.Btn1}
              onPress={Login}
            >
              <Text style={Styles.BtnText1}>
                {Loading ? "Loading..." : "Sign In"}
              </Text>
            </TouchableOpacity>
            <Text
              onPress={() => navigation.navigate("Forget")}
              style={{ fontWeight: "700", color: "blue" }}
            >
              Forget Password
            </Text>
            <View style={{ flexDirection: "row", marginTop: 10 }}>
              <Text>If you don't have an account. Please </Text>
              <Text
                onPress={() => navigation.navigate("SignUp")}
                style={{ fontWeight: "700", color: "blue" }}
              >
                Sign Up
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaProvider>
  );
}
export default SignIn;
