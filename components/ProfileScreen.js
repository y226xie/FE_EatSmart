import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  Button,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {AuthContext} from '../App';
// import {Button} from 'react-native-paper';

const screenHeight = Dimensions.get('screen').height;
const screenWidth = Dimensions.get('screen').width;

function ProfileScreen({navigation}) {
  const styles = StyleSheet.create({
    container: {
      backgroundColor: '#F2F3EE',
    },
    appArea: {
      marginTop: screenHeight * 0.08,
      marginHorizontal: 18,
    },
    welcomeText: {
      color: 'white',
      marginBottom: 20,
      fontSize: 30,
    },
    logoutBtn: {
      paddingHorizontal: 25,
      paddingVertical: 10,
      backgroundColor: '#FDE7B6',
      borderRadius: 25,
      color: 'white',
      textAlign: 'center',
    },
    profileImage: {
      width: 80,
      height: 80,
      marginLeft: 20,
      marginRight: 20,
      borderRadius: 50,
      borderColor: 'white',
      borderWidth: 3,
    },
  });

  const {signOut} = React.useContext(AuthContext);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.appArea}>
        <View style={{flexDirection: 'row'}}>
          <Image
            source={{uri: 'https://picsum.photos/700'}}
            style={styles.profileImage}
          />
          <View>
            <Text
              style={{
                fontWeight: '500',
                fontSize: 28,
                marginLeft: 5,
                marginTop: 15,
              }}>
              Fuhai
            </Text>
            <TouchableOpacity
              style={{
                backgroundColor: '#FDE7B6',
                borderRadius: 10,
                padding: 5,
                width: screenWidth * 0.25,
                borderWidth: 1,
                borderColor: '#423E35',
                flexDirection: 'row',
                alignContent: 'center',
              }}>
              <Feather name="edit" size={20} color="#423E35" />
              <Text style={{marginLeft: 10, marginTop: 3}}>Edit</Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            backgroundColor: 'white',
            borderRadius: 10,
            padding: 10,
            borderWidth: 1,
            marginVertical: 10,
            shadowColor: 'rgba(0, 0, 0, 0.1)',
            shadowOpacity: 0.8,
            shadowRadius: 15,
            shadowOffset: {width: 1, height: 13},
          }}>
          <AntDesign name="staro" size={20} />
          <Text style={{marginTop: 2, marginLeft: 10, fontSize: 14}}>
            My Collection
          </Text>
        </TouchableOpacity>
        
        <Text style={styles.logoutBtn} onPress={() => signOut()}>
          Logout
        </Text>
      </View>
    </ScrollView>
  );
}

export default ProfileScreen;
