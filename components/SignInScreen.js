import React from "react";
import {StyleSheet, View, TextInput, Text, Dimensions} from "react-native";
import { AuthContext } from "../App";

const screenWidth = Dimensions.get("screen").width;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#1f1f1f",
        alignItems: "center",
        // justifyContent: 'center',
        paddingTop: 250,
    },
    helloText: {
        color: "white",
        marginBottom: 20,
        fontSize: 30,
    },
    textInput: {
        padding: 5,
        paddingStart: 15,
        backgroundColor: "#3b3b3b",
        width: screenWidth * 0.8,
        borderRadius: 25,
        marginBottom: 15,
        color: "white",
        fontWeight: "600",
    },
    loginBtn: {
        paddingHorizontal: 25,
        paddingVertical: 10,
        backgroundColor: "#ff1178",
        borderRadius: 25,
        color: "white",
        textAlign: "center",
    },
});

export default function SignInScreen() {

    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
  
    const { signIn } = React.useContext(AuthContext);    

    return (
        <View style={styles.container}>
            <View>
            <Text style={styles.helloText}>Hello There!</Text>
            <TextInput 
                placeholder="email" 
                style={styles.textInput} 
                onChangeText={setUsername}
                value={username}
                autoCapitalize='none'
                autoCorrect={false}
            />
            <TextInput
                placeholder="password"
                secureTextEntry
                style={styles.textInput}
                onChangeText={setPassword}
                value={password}
            />
    
            <Text style={styles.loginBtn} onPress={() => signIn({username, password})}>
                Login
            </Text>
            </View>
        </View>
    );
}
  
