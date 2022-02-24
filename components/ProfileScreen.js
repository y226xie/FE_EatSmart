import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { AuthContext } from "../App";

function ProfileScreen({navigation}) {
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#1f1f1f",
      alignItems: "center",
      // justifyContent: 'center',
      paddingTop: 250,
    },
    welcomeText: {
      color: "white",
      marginBottom: 20,
      fontSize: 30,
    },
    logoutBtn: {
      paddingHorizontal: 25,
      paddingVertical: 10,
      backgroundColor: "#ff1178",
      borderRadius: 25,
      color: "white",
      textAlign: "center",
    },
  });


  const {signOut} = React.useContext(AuthContext)

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>
        Welcome back!
      </Text>
      <Text style={styles.logoutBtn} onPress={() => signOut()} >Logout</Text>
    </View>
  )
  
}

export default ProfileScreen;
