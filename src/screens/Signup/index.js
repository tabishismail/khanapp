import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Logo from "../../../assets/Logo.png";
import { Input } from "../../components";
import {
  auth,
  createUserWithEmailAndPassword,
  db,
  setDoc,
  doc,
} from "../../config/Firebase";

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
    width:'100%',
    height:'100%',
    textAlign:'center',
    fontWeight: "700",
    textAlignVertical:'center'
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

function SignUp({ navigation }) {
  const [Loading, setLoading] = useState(false);
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [nameError, setNameError] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  function CreateAccount() {
    setLoading(true);
    setEmailError(null);
    setPasswordError(null);
    if(name != "" && name != null){
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
                createUserWithEmailAndPassword(auth, email, password)
                  .then(async (userCredential) => {
                    const user = userCredential.user;
                    const uid = user.uid;
                    await setDoc(doc(db, "users", uid), {
                      name,
                      email,
                      uid,
                      type: "user",
                    });
                    alert("Sign Up Successfully!");
                    setTimeout(() => navigation.navigate("SignIn"), 1000);
                  })
                  .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    alert("Something went wrong! \n" + error.message);
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
    }else{
        setLoading(false);
        setNameError("Please Enter Name!.");
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
            <Text style={Styles.Text1}>Sign Up</Text>
            {/* <Text style={Styles.Text2}>Sign In</Text> */}
            <Input
              onChangeText={(text) => setName(text)}
              textContentType="name"
              placeholder="Name"
            />{nameError?<Text>{nameError}</Text>:null}
            <Input
              onChangeText={(text) => setEmail(text)}
              textContentType="emailAddress"
              placeholder="Email"
            />
            {emailError?<Text>{emailError}</Text>:null}
            <Input
              onChangeText={(text) => setPassword(text)}
              textContentType="password"
              secureTextEntry={true}
              placeholder="Password"
            />
            {passwordError?<Text>{passwordError}</Text>:null}
            <TouchableOpacity
              activeOpacity={0.8}
              style={Styles.Btn1}
              onPress={CreateAccount}
            >
              <Text style={Styles.BtnText1}>{Loading?"Loading...":"Sign Up"}</Text>
            </TouchableOpacity>
            <View style={{ flexDirection: "row" }}>
              <Text>If you already have an account. Please </Text>
              <Text
                onPress={() => navigation.navigate("SignIn")}
                style={{ fontWeight: "700", color: "blue" }}
              >
                Sign In
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaProvider>
  );
}
export default SignUp;
