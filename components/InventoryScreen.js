import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  Pressable,
  RefreshControl,
} from 'react-native';
import {IngredientInformation} from './IngredientInformation';
import * as Keychain from 'react-native-keychain';
import {TextInput} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import DatePicker from 'react-native-date-picker';
import {API_root} from '@env';

const screenHeight = Dimensions.get('screen').height;
const screenWidth = Dimensions.get('screen').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    backgroundColor: 'rgb(242, 243, 237)',
  },
  appArea: {
    marginTop: screenHeight * 0.07,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginLeft: 18,
    marginBottom: 20,
  },
  addBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    height: screenHeight * 0.05,
    marginTop: 10,
    backgroundColor: 'rgb(255, 231, 175)',
    borderRadius: 15,
    marginHorizontal: 18,
    borderWidth: 1,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOpacity: 0.8,
    shadowRadius: 15,
    shadowOffset: {width: 1, height: 13},
    marginBottom: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  modalView: {
    width: screenWidth * 0.9,
    height: screenHeight * 0.8,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
  },
  buttonSubmit: {
    borderRadius: 5,
    padding: 10,
    width: screenWidth * 0.3,
    backgroundColor: '#FDE7B6',
    borderWidth: 1,
    marginRight: 50,
  },
  buttonCancel: {
    borderRadius: 5,
    padding: 10,
    width: screenWidth * 0.3,
    backgroundColor: 'gray',
    borderWidth: 1,
  },
});

export function InventoryScreen({navigation}) {
  const [ingredients, setIngredients] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [foodName, setFoodName] = useState('');
  const [category, setCategory] = useState('');
  const [quantity, setQuantity] = useState('');
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [refreshing, setRefreshing] = useState(true);

  const handleFormSubmit = async () => {
    try {
      const userToken = await Keychain.getGenericPassword();
      put_body = JSON.stringify({
        best_before: date,
        amount: quantity,
      });
      const response = await fetch(
        `${API_root}/storage/ingredient/${ingredient._id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': `application/json`,
            Accept: `application/json`,
            Authorization: `Bearer ${userToken.password}`,
          },
          body: put_body,
        },
      );
    } catch (error) {
      console.log(error.message);
    }
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  getIngredients = async () => {
    userToken = await Keychain.getGenericPassword();
    try {
      // setIsLoading(true);
      const response = await fetch(`${API_root}/storage/ingredients`, {
        headers: {
          Authorization: `Bearer ${userToken.password}`,
          page: '1',
        },
      });
      const json = await response.json();
      setRefreshing(false);
      setIngredients(json.message);
    } catch (error) {
      console.log(error.message);
    } finally {
      // setIsLoading(false);
    }
  };

  useEffect(() => {
    getIngredients();
  }, []);

  return (
    <View style={styles.container}>
      {refreshing ? <ActivityIndicator /> : null}

      <ScrollView
        style={styles.appArea}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={getIngredients} />
        }>
        <Text style={styles.title}>Ingredient Information</Text>
        {ingredients ? (
          <View>
            {ingredients.map((t, i) => {
              return (
                <IngredientInformation
                  key={i}
                  ingredient={t}
                  onChange={this.getIngredients}
                />
              );
            })}
          </View>
        ) : (
          <>{/* add error handling here */}</>
        )}

        <Modal
          animationType="slide"
          transparent={true}
          visible={isModalOpen}
          onRequestClose={() => {
            setIsModalOpen(false);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Add New Ingredient Info</Text>

              <TextInput
                mode="outlined"
                label="FoodName"
                value={foodName}
                onChangeText={setFoodName}
                style={{width: screenWidth * 0.725}}
              />
              <TextInput
                mode="outlined"
                label="Category"
                value={category}
                onChangeText={setCategory}
                style={{width: screenWidth * 0.725, marginVertical: 5}}
              />
              <TextInput
                mode="outlined"
                label="Quantity"
                value={quantity}
                onChangeText={setQuantity}
                keyboardType="numeric"
                style={{width: screenWidth * 0.725, marginVertical: 5}}
              />

              <View style={{flexDirection: 'row'}}>
                <TextInput
                  mode="outlined"
                  label="Best Before"
                  value={date.toLocaleDateString()}
                  editable={false}
                  style={{width: screenWidth * 0.725, marginVertical: 5}}
                />
                <TouchableOpacity
                  style={{position: 'absolute', right: 30, marginTop: 25}}
                  onPress={() => setOpen(true)}>
                  <Icon name={'pencil'} size={20} color="black" />
                </TouchableOpacity>
                <DatePicker
                  modal
                  mode="date"
                  open={open}
                  date={date}
                  locale="en_CA"
                  onConfirm={date => {
                    setOpen(false);
                    setDate(date);
                  }}
                  onCancel={() => {
                    setOpen(false);
                  }}
                />
              </View>

              <View style={{flexDirection: 'row', marginTop: 5}}>
                <Pressable
                  style={styles.buttonSubmit}
                  onPress={handleFormSubmit}>
                  <Text style={styles.textStyle}>Submit</Text>
                </Pressable>
                <Pressable style={styles.buttonCancel} onPress={handleCancel}>
                  <Text style={styles.textStyle}>Cancel</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>

        <TouchableOpacity
          style={styles.addBtn}
          onPress={() => setIsModalOpen(true)}>
          <Text style={{fontSize: 15}}>Add More Item</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
