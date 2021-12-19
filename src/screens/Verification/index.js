import React from "react";
import { StyleSheet,View,Text, TouchableOpacity, TextInput, Image } from "react-native";
import Logo from '../../../assets/Logo.png';

const Styles = StyleSheet.create({
    Div:{
        flex:1,
        backgroundColor:'#ECF1FA',
        flexDirection:'column',
        justifyContent:'space-between',
    },
    ContentDiv:{
        flex:0.7,
        justifyContent:'flex-start',
        alignItems:'center',
    },
    LogoDiv:{
        flex:0.3,
        justifyContent:'flex-end',
        alignItems:'center',
    },
    Logo:{
        width:146,
        marginBottom:40,
    },
    Text1:{
        fontSize:20,
        fontWeight:'700',
        color:'#000',
        margin:10
    },
});

function Verification({navigation}){
    return (
        <SafeAreaProvider style={Styles.Div}>
            <View style={Styles.LogoDiv}>
                <Image source={Logo} style={Styles.Logo} />
            </View>
            <View style={Styles.ContentDiv}>
                <Text style={Styles.Text1}>Verification</Text>
                
            </View>
        </SafeAreaProvider>
    );
}
export default Verification;