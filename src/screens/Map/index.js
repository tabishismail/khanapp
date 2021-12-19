// import React, { useState, useEffect } from "react";
// import MapView, { Marker } from "react-native-maps";
// import {
//   Image,
//   Text,
//   StyleSheet,
//   TextInput,
//   View,
//   Dimensions,
//   TouchableOpacity,
// } from "react-native";
// import * as Location from "expo-location";
// import Icon from "../../../assets/Group56.png";
// import { useFonts } from "expo-font";
// const foodBankData = require("../../../assets/Data/food_bank.json");

// function Map({ navigation }) {
//   const [location, setLocation] = useState(null);
//   const [nearestLocation, setNearestLocation] = useState(null);
//   const [loaded] = useFonts({
//     Lobster: require("../../fonts/Lobster.ttf"),
//     Praise: require("../../fonts/Praise.ttf"),
//   });
//   function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
//     var R = 6371; // Radius of the earth in km
//     var dLat = deg2rad(lat2 - lat1); // deg2rad below
//     var dLon = deg2rad(lon2 - lon1);
//     var a =
//       Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//       Math.cos(deg2rad(lat1)) *
//         Math.cos(deg2rad(lat2)) *
//         Math.sin(dLon / 2) *
//         Math.sin(dLon / 2);
//     var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//     var d = R * c; // Distance in km
//     return d;
//   }

//   useEffect(() => {
//     (async () => {
//       let { status } = await Location.requestForegroundPermissionsAsync();
//       if (status !== "granted") {
//         setErrorMsg("Permission to access location was denied");
//         return;
//       }

//       Location.getCurrentPositionAsync({})
//         .then((res) => {
//           let arr = [];
//           for (let n = 0; n < foodBankData.length; n++) {
//             let distance = getDistanceFromLatLonInKm(
//               res.coords.latitude,
//               res.coords.longitude,
//               foodBankData[n].latitude,
//               foodBankData[n].longitude
//             );
//             arr.push({
//               branch_name: n.branch_name,
//               distance,
//               latitude: n.latitude,
//               longitude: n.longitude,
//             });
//           }
//           let near;
//           for (let l = 1; l < arr.length; l++) {
//             if (arr[l - 1].distance < arr[l].distance) {
//               near = l - 1;
//             } else {
//               near = l;
//             }
//           }
//           setLocation(res);
//           setNearestLocation(near);
//         })
//         .catch((err) => {
//           alert(err);
//         });
//     })();
//   }, []);

//   if (!loaded) {
//     return null;
//   }

//   function deg2rad(deg) {
//     return deg * (Math.PI / 180);
//   }
//   return (
//     <View style={styles.container}>
//       {location ? (
//         <>
//           <View style={styles.LocationDiv}>
//             {/* <Image source={Icon} style={styles.TextIcon} /> */}
//             <Text
//               style={{ fontSize: 18, fontWeight: "600", fontFamily: "Lobster" }}
//             >
//               {`Your nearest food bank is ${foodBankData[nearestLocation]?.branch_name}`}
//             </Text>
//           </View>
//           <MapView
//             style={styles.map}
//             region={{
//               latitude: nearestLocation
//                 ? foodBankData[nearestLocation].latitude
//                 : location?.coords.latitude,
//               longitude: nearestLocation
//                 ? foodBankData[nearestLocation].longitude
//                 : location?.coords.longitude,
//               latitudeDelta: 0.005,
//               longitudeDelta: 0.005,
//             }}
//           >
//             <Marker
//               image={Icon}
//               coordinate={{
//                 latitude: location?.coords.latitude,
//                 longitude: location?.coords.longitude,
//               }}
//             ></Marker>
//             {foodBankData.map((v, i) => {
//               return (
//                 <Marker
//                   key={i}
//                   title={v.branch_name}
//                   coordinate={{
//                     latitude: v.latitude,
//                     longitude: v.longitude,
//                   }}
//                 ></Marker>
//               );
//             })}
//           </MapView>
//           <TouchableOpacity
//             activeOpacity={0.8}
//             style={styles.Btn1}
//             onPress={() => navigation.navigate("Request")}
//           >
//             <Text style={styles.BtnText1}>Confirm</Text>
//           </TouchableOpacity>
//         </>
//       ) : (
//         <Text style={styles.Loading}>Loading...</Text>
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   Loading: {
//     fontSize: 40,
//     fontFamily: "Lobster",
//   },
//   map: {
//     width: Dimensions.get("window").width,
//     height: Dimensions.get("window").height,
//   },
//   LocationDiv: {
//     zIndex: 1,
//     position: "absolute",
//     top: 40,
//     flexDirection: "row",
//     width: "90%",
//     // height: 45,
//     backgroundColor: "#fff",
//     borderRadius: 10,
//     justifyContent: "center",
//     alignItems: "center",
//     paddingVertical: 5,
//     paddingHorizontal: 15,
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 1,
//     },
//     shadowOpacity: 0.2,
//     shadowRadius: 1.41,

//     elevation: 2,
//   },
//   Location: {
//     width: "90%",
//     height: 45,
//     fontSize: 16,
//   },
//   TextIcon: {
//     width: 16,
//     height: 32,
//     marginRight: 10,
//   },
//   Btn1: {
//     position: "absolute",
//     bottom: 40,
//     width: "90%",
//     height: 43,
//     borderRadius: 10,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#2A2AC0",
//   },
//   BtnText1: {
//     color: "#fff",
//     fontSize: 25,
//     fontFamily: "Praise",
//   },
// });
// export default Map;
