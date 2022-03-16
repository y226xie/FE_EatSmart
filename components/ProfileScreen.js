import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  Modal,
  Pressable,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {AuthContext} from '../App';
import {Card, TextInput} from 'react-native-paper';
import Seperator from '../utils/Seperator';
import Icon from 'react-native-vector-icons/FontAwesome';
import RadioGroup from 'react-native-radio-buttons-group';
import ProfileButton from '../utils/ProfileButtons';
import DropDownFilterView from './DropdownFilterView';
import * as Keychain from 'react-native-keychain';
import {API_root} from '@env';

const screenHeight = Dimensions.get('screen').height;
const screenWidth = Dimensions.get('screen').width;

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
  profileImage: {
    width: 80,
    height: 80,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 50,
    borderColor: 'white',
    borderWidth: 3,
  },
  logoutBtn: {
    flexDirection: 'row',
    backgroundColor: '#',
    borderRadius: 10,
    padding: 8,
    marginHorizontal: screenWidth * 0.02,
    marginVertical: 10,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOpacity: 0.8,
    shadowRadius: 15,
    shadowOffset: {width: 1, height: 13},
  },
  mycollection: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 8,
    marginHorizontal: screenWidth * 0.02,
    marginVertical: 10,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOpacity: 0.8,
    shadowRadius: 15,
    shadowOffset: {width: 1, height: 13},
  },
  editBtn: {
    backgroundColor: '#FDE7B6',
    borderRadius: 10,
    padding: 5,
    width: screenWidth * 0.25,
    borderWidth: 1,
    borderColor: '#423E35',
    flexDirection: 'row',
    alignContent: 'center',
  },
  healthInfoRow: {flexDirection: 'row', height: 40, alignItems: 'center'},
  centerView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  modalView: {
    width: screenWidth * 0.9,
    height: screenHeight * 0.7,
    backgroundColor: 'white',
    padding: 50,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    borderWidth: 1,
  },
  buttonSubmit: {
    borderRadius: 5,
    padding: 10,
    marginLeft: 10,
    width: screenWidth * 0.25,
    backgroundColor: '#FDE7B6',
    borderWidth: 1,
    marginRight: 40,
  },
  buttonCancel: {
    borderRadius: 5,
    padding: 10,
    width: screenWidth * 0.25,
    backgroundColor: 'gray',
    borderWidth: 1,
  },
  textStyle: {
    color: 'black',
    fontWeight: '500',
    textAlign: 'center',
  },
  btnText: {
    marginTop: 7,
    marginLeft: 10,
    fontSize: 14,
  },
  modalField: {
    width: screenWidth * 0.6,
    height: screenHeight * 0.05,
    marginVertical: 5,
    marginHorizontal: 10,
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

const allergyTypes = [
  {label: 'Eggs', value: 'eggs'},
  {label: 'Seafood', value: 'seafood'},
  {label: 'Milk', value: 'milk'},
  {label: 'Peanuts', value: 'peanuts'},
  {label: 'Shellfish', value: 'shellfish'},
  {label: 'Soy', value: 'soy'},
  {label: 'Wheat', value: 'wheat'},
  {label: 'N/A', value: 'none'},
];

const restrictions = [
  {label: 'Diary', value: 'diary'},
  {label: 'Gluten', value: 'gluten'},
  {label: 'Vegetarian', value: 'vegetarian'},
  {label: 'Low Sugar', value: 'lowSugar'},
  {label: 'Vegan', value: 'vegan'},
  {label: 'Paleo', value: 'paleo'},
  {label: 'Pescatarian', value: 'pescatarian'},
  {label: 'N/A', value: 'none'},
];

function ProfileScreen({navigation}) {
  const [radioButtons, setRadioButtons] = useState(radioButtonsData);
  const [height, setHeight] = useState(0);
  const [weight, setWeight] = useState(0);
  const [age, setAge] = useState(0);
  const [gender, setGender] = useState('Male');
  const [selectedAllergyTypes, setSelectedAllergyTypes] = useState([]);
  const [userAllergy, setUserAllergy] = useState([]);
  const [restriction, setRestriction] = useState([]);
  const [selectedRestriction, setSelectedRestriction] = useState([]);

  const [userInfo, setUserInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    height: 0,
    weight: 0,
    age: 0,
    gender: 'Male',
  });

  //Formula for calcualte daily calories consumption
  const BMR =
    gender == 'Male'
      ? 10 * userInfo.weight + 6.25 * userInfo.height - 5 * userInfo.age + 5
      : 10 * userInfo.weight + 6.25 * userInfo.height - 5 * userInfo.age - 161;

  const {signOut} = React.useContext(AuthContext);
  const [visible, setVisible] = useState(false);
  const showModal = () => {
    if (userInfo.gender === 'Male') {
      setRadioButtons([
        {
          id: '1', // acts as primary key, should be unique and non-empty string
          label: 'Male',
          value: 'Male',
          selected: true,
        },
        {
          id: '2',
          label: 'Female',
          value: 'Female',
        },
      ]);
    } else {
      setRadioButtons([
        {
          id: '1', // acts as primary key, should be unique and non-empty string
          label: 'Male',
          value: 'Male',
        },
        {
          id: '2',
          label: 'Female',
          value: 'Female',
          selected: true,
        },
      ]);
    }

    setHeight(userInfo.height);
    setWeight(userInfo.weight);
    setAge(userInfo.age);
    setGender(userInfo.gender);
    setSelectedAllergyTypes(userAllergy);
    setSelectedRestriction(restriction);

    setVisible(true);
  };
  const hideModal = () => setVisible(false);
  function onPressRadioButton(radioButtonsArray) {
    setRadioButtons(radioButtonsArray);
    if (!radioButtons[0].selected) {
      setGender('Female');
    } else {
      setGender('Male');
    }
  }

  const handleSubmit = async () => {
    try {
      const userToken = await Keychain.getGenericPassword();
      const put_body = JSON.stringify({
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
        email: userInfo.email,
        password: userInfo.password,
        height: height,
        weight: weight,
        age: age,
        gender: gender,
      });
      const response = await fetch(`${API_root}/information/user`, {
        method: 'PUT',
        headers: {
          'Content-Type': `application/json`,
          Accept: `application/json`,
          Authorization: `Bearer ${userToken.password}`,
        },
        body: put_body,
      });
      const json = await response.json();

      const allergiesResponse = await fetch(`${API_root}/information/allergy`, {
        method: 'PUT',
        headers: {
          'Content-Type': `application/json`,
          Accept: `application/json`,
          Authorization: `Bearer ${userToken.password}`,
        },
        body: JSON.stringify(selectedAllergyTypes),
      });
      const allergiesJson = await allergiesResponse.json();
      setUserAllergy(allergiesJson.message);
      setUserInfo(json.message);
    } catch (error) {
      console.log(error.message);
    } finally {
      setRestriction(selectedRestriction);
      setVisible(false);
    }
  };
  const handleCancel = () => {
    setVisible(false);
  };

  const getUserInfo = async userToken => {
    try {
      const response = await fetch(`${API_root}/information/user`, {
        headers: {
          Authorization: `Bearer ${userToken.password}`,
        },
      });
      const json = await response.json();
      // console.log(json);
      setUserInfo(json);
    } catch (error) {
      console.log(error.message);
    }
  };

  const getUserAllergy = async userToken => {
    try {
      const response = await fetch(`${API_root}/information/allergy`, {
        headers: {
          Authorization: `Bearer ${userToken.password}`,
        },
      });
      const json = await response.json();
      setUserAllergy(json.message);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    Keychain.getGenericPassword().then(userToken => {
      getUserInfo(userToken);
      getUserAllergy(userToken);
    });
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.appArea}>
        <Modal animationType="slide" visible={visible} transparent={true}>
          <View style={styles.centerView}>
            <View style={styles.modalView}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 'bold',
                  marginBottom: 10,
                  marginHorizontal: 20,
                }}>
                Health Info
              </Text>
              <View>
                <RadioGroup
                  radioButtons={radioButtons}
                  onPress={onPressRadioButton}
                  layout={'row'}
                />
              </View>
              <TextInput
                mode="outlined"
                label="Height"
                value={height + ''}
                keyboardType="numeric"
                onChangeText={setHeight}
                style={styles.modalField}
              />
              <TextInput
                mode="outlined"
                label="Weight"
                value={weight + ''}
                keyboardType="numeric"
                onChangeText={setWeight}
                style={styles.modalField}
              />
              <TextInput
                mode="outlined"
                label="Age"
                value={age + ''}
                keyboardType="numeric"
                onChangeText={setAge}
                style={styles.modalField}
              />
              <DropDownFilterView
                items={allergyTypes}
                value={selectedAllergyTypes}
                setValue={setSelectedAllergyTypes}
                zIndexInverse={1000}
                placeholder={'Pick your allergies'}
                customStyle={{
                  marginHorizontal: 10,
                  zIndex: 5000,
                  width: screenWidth * 0.6,
                }}
              />
              <DropDownFilterView
                items={restrictions}
                value={selectedRestriction}
                setValue={setSelectedRestriction}
                zIndexInverse={1000}
                placeholder={'Pick your dietary restriction'}
                customStyle={{
                  marginHorizontal: 10,
                  zIndex: 4000,
                  width: screenWidth * 0.6,
                }}
              />
              <View style={{flexDirection: 'row', marginTop: 5}}>
                <Pressable style={styles.buttonSubmit} onPress={handleSubmit}>
                  <Text style={styles.textStyle}>Submit</Text>
                </Pressable>
                <Pressable style={styles.buttonCancel} onPress={handleCancel}>
                  <Text style={styles.textStyle}>Cancel</Text>
                </Pressable>
              </View>
              <TouchableOpacity
                onPress={hideModal}
                style={{position: 'absolute', right: 20, top: 20}}>
                <Icon name="remove" size={20} color="black" />
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
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
              {userInfo.firstName}
            </Text>

            <TouchableOpacity style={styles.editBtn}>
              <Feather name="edit" size={20} color="#423E35" />
              <Text style={{marginLeft: 10, marginTop: 3}}>Edit</Text>
            </TouchableOpacity>
          </View>
        </View>

        <ProfileButton buttonText="My Collection" buttonImage="staro" />
        <ProfileButton buttonText="Account & Safety" buttonImage="user" />
        <ProfileButton
          buttonText="Notification Settings"
          buttonImage="notification"
        />

        <View
          style={{marginVertical: 20, marginHorizontal: screenWidth * 0.02}}>
          <View style={{flexDirection: 'row'}}>
            <Text style={{marginBottom: 10, fontWeight: '500', fontSize: 14}}>
              Health Info
            </Text>
            <TouchableOpacity onPress={showModal}>
              <Icon
                style={{marginLeft: 5}}
                name={'pencil'}
                size={15}
                color="black"
              />
            </TouchableOpacity>
          </View>

          <Card style={{borderWidth: 1}}>
            <View style={styles.healthInfoRow}>
              <Text style={{marginLeft: 10}}>Gender</Text>
              <Text style={{position: 'absolute', right: 10}}>
                {userInfo.gender}
              </Text>
            </View>
            <Seperator />
            <View style={styles.healthInfoRow}>
              <Text style={{marginLeft: 10}}>Height</Text>
              <Text style={{position: 'absolute', right: 10}}>
                {userInfo.height} cm
              </Text>
            </View>
            <Seperator />
            <View style={styles.healthInfoRow}>
              <Text style={{marginLeft: 10}}>Weight</Text>
              <Text style={{position: 'absolute', right: 10}}>
                {userInfo.weight} kg
              </Text>
            </View>
            <Seperator />
            <View style={styles.healthInfoRow}>
              <Text style={{marginLeft: 10}}>Age</Text>
              <Text style={{position: 'absolute', right: 10}}>
                {userInfo.age}
              </Text>
            </View>
            <Seperator />
            <View style={styles.healthInfoRow}>
              <Text style={{marginLeft: 10}}>Basal Metabolic Rate</Text>
              <Text style={{position: 'absolute', right: 10}}>
                {BMR} Calories/Day
              </Text>
            </View>
            <Seperator />
            <View style={styles.healthInfoRow}>
              <Text style={{marginLeft: 10}}>Allergy</Text>
              <Text style={{position: 'absolute', right: 10}}>
                {userAllergy.length === 0 ? 'N/A' : userAllergy.join(',')}
              </Text>
            </View>
            <Seperator />
            <View style={styles.healthInfoRow}>
              <Text style={{marginLeft: 10}}>Dietary Restrictions</Text>
              <Text style={{position: 'absolute', right: 10}}>
                {restriction.length === 0 ? 'N/A' : restriction.join(',')}
              </Text>
            </View>
          </Card>
        </View>

        <TouchableOpacity style={styles.mycollection} onPress={() => signOut()}>
          <View
            style={{
              flexDirection: 'row',
              marginLeft: screenWidth * 0.3,
            }}>
            <View
              style={{
                borderRadius: 100,
                backgroundColor: '#FDE7B6',
                width: 30,
                height: 30,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <AntDesign name="logout" size={20} color="gray" />
            </View>
            <Text style={styles.btnText}>Log out</Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

export default ProfileScreen;
