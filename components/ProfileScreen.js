import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  Modal,
  Button,
  Pressable,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {AuthContext} from '../App';
import {Card, TextInput} from 'react-native-paper';
import Seperator from '../utils/Seperator';
import Icon from 'react-native-vector-icons/FontAwesome';
import RadioGroup from 'react-native-radio-buttons-group';

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
  logoutBtn: {
    paddingHorizontal: 25,
    paddingVertical: 10,
    backgroundColor: '#FDE7B6',
    borderRadius: 25,
    color: 'black',
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
  mycollection: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
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
    width: screenWidth * 0.83,
    height: screenHeight * 0.6,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 50,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  buttonSubmit: {
    borderRadius: 5,
    padding: 10,
    width: screenWidth * 0.2,
    backgroundColor: '#FDE7B6',
    borderWidth: 1,
    marginRight: 40,
  },
  buttonCancel: {
    borderRadius: 5,
    padding: 10,
    width: screenWidth * 0.2,
    backgroundColor: 'gray',
    borderWidth: 1,
  },
  textStyle: {
    color: 'black',
    fontWeight: '500',
    textAlign: 'center',
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

function ProfileScreen({navigation}) {
  const [radioButtons, setRadioButtons] = useState(radioButtonsData);
  const [height, setHeight] = useState(177);
  const [weight, setWeight] = useState(55);
  const [age, setAge] = useState(21);
  const [gender, setGender] = useState('Male');

  //Formula for calcualte daily calories consumption
  const BMR =
    gender == 'Male'
      ? 10 * weight + 6.25 * height - 5 * age + 5
      : 10 * weight + 6.25 * height - 5 * age - 161;

  const {signOut} = React.useContext(AuthContext);
  const [visible, setVisible] = useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  function onPressRadioButton(radioButtonsArray) {
    setRadioButtons(radioButtonsArray);
    if (!radioButtons[0].selected) {
      setGender('Female');
    } else {
      setGender('Male');
    }
  }

  const handleSubmit = () => {};
  const handleCancel = () => {
    setVisible(false);
  };

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
                style={{width: screenWidth * 0.5, marginVertical: 5}}
              />
              <TextInput
                mode="outlined"
                label="Weight"
                value={weight + ''}
                keyboardType="numeric"
                onChangeText={setWeight}
                style={{width: screenWidth * 0.5, marginVertical: 5}}
              />
              <TextInput
                mode="outlined"
                label="Age"
                value={age + ''}
                keyboardType="numeric"
                onChangeText={setAge}
                style={{width: screenWidth * 0.5, marginVertical: 5}}
              />
              <TextInput
                mode="outlined"
                label="Basal Metabolic Rate"
                value={BMR + ''}
                editable={false}
                style={{width: screenWidth * 0.5, marginVertical: 5}}
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
              Fuhai
            </Text>

            <TouchableOpacity style={styles.editBtn}>
              <Feather name="edit" size={20} color="#423E35" />
              <Text style={{marginLeft: 10, marginTop: 3}}>Edit</Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity style={styles.mycollection}>
          <AntDesign name="staro" size={20} />
          <Text style={{marginTop: 2, marginLeft: 10, fontSize: 14}}>
            My Collection
          </Text>
        </TouchableOpacity>

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
              <Text style={{position: 'absolute', right: 10}}>{gender}</Text>
            </View>
            <Seperator />
            <View style={styles.healthInfoRow}>
              <Text style={{marginLeft: 10}}>Height</Text>
              <Text style={{position: 'absolute', right: 10}}>177cm</Text>
            </View>
            <Seperator />
            <View style={styles.healthInfoRow}>
              <Text style={{marginLeft: 10}}>Weight</Text>
              <Text style={{position: 'absolute', right: 10}}>55kg</Text>
            </View>
            <Seperator />
            <View style={styles.healthInfoRow}>
              <Text style={{marginLeft: 10}}>Age</Text>
              <Text style={{position: 'absolute', right: 10}}>21</Text>
            </View>
            <Seperator />
            <View style={styles.healthInfoRow}>
              <Text style={{marginLeft: 10}}>Basal Metabolic Rate</Text>
              <Text style={{position: 'absolute', right: 10}}>
                {BMR} Calories/Day
              </Text>
            </View>
          </Card>
        </View>

        <Text style={styles.logoutBtn} onPress={() => signOut()}>
          Logout
        </Text>
      </View>
    </ScrollView>
  );
}

export default ProfileScreen;
