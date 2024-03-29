import React from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  Dimensions,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {AuthContext} from '../App';
import {BackgroundImage} from '../images';

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(250, 250,250)',
    alignItems: 'center',
    paddingTop: 250,
  },
  helloText: {
    fontSize: 30,
  },
  textInput: {
    padding: 10,
    paddingStart: 15,
    backgroundColor: 'rgb(250, 250,250)',
    width: screenWidth * 0.8,
    borderRadius: 25,
    borderWidth: 1,
    marginBottom: 15,
    color: 'black',
    fontWeight: '600',
  },
  logInButton: {
    alignContent: 'center',
    backgroundColor: 'rgb(255, 231, 175)',
    borderRadius: 15,
    borderWidth: 1,
    paddingHorizontal: screenWidth * 0.35,
    paddingVertical: 10,
    marginTop: 20,
  },
  backgroudImage: {
    width: screenWidth,
    height: screenHeight * 0.3,
    marginTop: -300,
  },
  foodInfo: {
    marginTop: 30,
    zIndex: 10,
    alignSelf: 'stretch',
    height: 100,
    marginHorizontal: 30,
    alignItems: 'center',
    backgroundColor: 'rgb(250, 250, 250)',
    borderRadius: 15,
  },
});

export default function SignInScreen({navigation}) {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const {signIn} = React.useContext(AuthContext);

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View>
          <Image source={BackgroundImage} style={styles.backgroudImage} />

          <View style={styles.foodInfo}>
            <Text style={styles.helloText}>Welcome to</Text>
            <Text style={styles.helloText}>EatSmart!</Text>
            <View style={{marginTop: 50}}>
              <TextInput
                placeholder="Email"
                placeholderTextColor="black"
                style={styles.textInput}
                onChangeText={setUsername}
                value={username}
                autoCapitalize="none"
                autoCorrect={false}
              />
              <TextInput
                placeholder="Password"
                placeholderTextColor="black"
                secureTextEntry
                style={styles.textInput}
                onChangeText={setPassword}
                value={password}
              />
            </View>

            <TouchableOpacity
              onPress={() => signIn({username, password})}
              style={styles.logInButton}>
              <Text style={{fontSize: 15, textAlign: 'center'}}>Log In</Text>
            </TouchableOpacity>
            <View style={{flexDirection: 'row', marginTop: 20}}>
              <Text>Forget Password?</Text>
              <TouchableOpacity
                style={{marginHorizontal: 40}}
                onPress={() => {
                  navigation.navigate('Signup');
                }}>
                <Text style={{fontSize: 15, textAlign: 'center'}}>
                  Registration
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}
