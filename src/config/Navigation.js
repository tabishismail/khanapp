import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Forget, SignIn, SignUp, Request, Dashboard, Map } from "../screens";
import { auth, onAuthStateChanged } from "../config/Firebase";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function Navigation() {
  const [login, setLogin] = React.useState(false);
  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLogin(true);
        const uid = user.uid;
      } else {
        setLogin(false);
      }
    });
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {auth.currentUser ? (
          <>
            <Stack.Screen
              name="Map"
              component={Map}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Request"
              component={Request}
              options={{ headerShown: false }}
            />
            {/* <Stack.Screen name="Dashboard" component={Dashboard} options={{headerShown:false}} /> */}
          </>
        ) : (
          <>
            <Stack.Screen
              name="SignIn"
              component={SignIn}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="SignUp"
              component={SignUp}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Forget"
              component={Forget}
              options={{ headerShown: false }}
            />
            {/* <Stack.Screen name="Login" component={SignIn} options={{headerShown:false}} /> */}
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}
