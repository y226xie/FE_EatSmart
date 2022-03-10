import React from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  Dimensions,
  TouchableOpacity,
  Image,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import {AuthContext} from '../App';
import {BackgroundImage} from '../images';
import RadioGroup from 'react-native-radio-buttons-group';

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    backgroundColor: 'rgb(242, 243, 237)',
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
    marginTop: 10,
  },
  backgroudImage: {
    width: screenWidth,
    height: 170,
  },
  foodInfo: {
    marginTop: 30,
    zIndex: 10,
    alignSelf: 'stretch',
    marginHorizontal: 30,
    alignItems: 'center',
    borderRadius: 15,
  },
});

const radioButtonsData = [
  {
    id: '1', // acts as primary key, should be unique and non-empty string
    label: 'Male',
    value: 'Male',
  },
  {
    id: '2',
    label: 'Female',
    value: 'Female',
  },
];

export default function SignupScreen() {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [height, setHeight] = React.useState('');
  const [weight, setWeight] = React.useState('');
  const [age, setAge] = React.useState('');
  const [gender, setGender] = React.useState('');
  const [radioButtons, setRadioButtons] = React.useState(radioButtonsData);

  const [arePasswordsEqual, setArePasswordsEqual] = React.useState(true);

  const {signUp} = React.useContext(AuthContext);

  function onPressRadioButton(radioButtonsArray) {
    setRadioButtons(radioButtonsArray);
    if (!radioButtons[0].selected) {
      setGender('Female');
    } else {
      setGender('Male');
    }
  }
  return (
    <KeyboardAvoidingView style={{flex: 1}} behavior="padding">
      <View>
        <ScrollView>
          <Image source={BackgroundImage} style={styles.backgroudImage} />

          <View style={styles.foodInfo}>
            <Text style={styles.helloText}>Registration</Text>

            <View style={{marginTop: 30}}>
              <Text style={{marginBottom: 10}}>Personal Information: </Text>
              <View>
                <RadioGroup
                  radioButtons={radioButtons}
                  onPress={onPressRadioButton}
                  layout={'row'}
                />
              </View>
              <TextInput
                placeholder="First Name"
                placeholderTextColor="black"
                style={styles.textInput}
                onChangeText={setFirstName}
                value={firstName}
              />
              <TextInput
                placeholder="Last Name"
                placeholderTextColor="black"
                style={styles.textInput}
                onChangeText={setLastName}
                value={lastName}
              />
              <TextInput
                placeholder="Age"
                placeholderTextColor="black"
                style={styles.textInput}
                onChangeText={setAge}
                value={age}
                keyboardType="numeric"
              />

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
              <TextInput
                placeholder="Re-enter Password"
                placeholderTextColor="black"
                secureTextEntry
                style={styles.textInput}
                onChangeText={setConfirmPassword}
                value={confirmPassword}
              />

              <Text style={{marginVertical: 10}}>Health Information: </Text>
              <TextInput
                placeholder="Height"
                placeholderTextColor="black"
                style={styles.textInput}
                onChangeText={setHeight}
                value={height}
                keyboardType="numeric"
              />
              <TextInput
                placeholder="Weight"
                placeholderTextColor="black"
                style={styles.textInput}
                onChangeText={setWeight}
                value={weight}
                keyboardType="numeric"
              />
            </View>

            {arePasswordsEqual ? (
              <TouchableOpacity
                style={{marginBottom: 20}}
                onPress={() => {
                  if (password != confirmPassword) {
                    setArePasswordsEqual(false);
                  } else {
                    signUp({
                      username,
                      password,
                      firstName,
                      lastName,
                      height,
                      weight,
                      age,
                      gender,
                    });
                  }
                }}
                style={styles.logInButton}>
                <Text style={{fontSize: 15, textAlign: 'center'}}>Sign Up</Text>
              </TouchableOpacity>
            ) : (
              <Text> Please ensure the passwords are matched</Text>
            )}
            {/* <View style={{flexDirection: 'row', marginTop: 20}}>
            <Text>Forget Password?</Text>
            <Text style={{marginLeft: 100}}> Registration</Text>
          </View> */}
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
}
