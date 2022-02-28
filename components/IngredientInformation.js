import {
  Button,
  View,
  Text,
  Image,
  Modal,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import DatePicker from 'react-native-date-picker';
import * as Keychain from 'react-native-keychain';
import {Card} from 'react-native-paper';
import {TextInput} from 'react-native-paper';

const screenHeight = Dimensions.get('screen').height;
const screenWidth = Dimensions.get('screen').width;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  modalView: {
    width: screenWidth * 0.9,
    height: screenHeight * 0.6,
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
  textStyle: {
    color: 'black',
    fontWeight: '500',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
  },
  input: {
    height: screenHeight * 0.04,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: 100,
  },
  card: {
    BackgroundColor: '#FAFAF8',
    marginHorizontal: 20,
    borderRadius: 15,
    marginVertical: 5,
    height: screenHeight * 0.13,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOpacity: 0.8,
    shadowRadius: 15,
    shadowOffset: {width: 1, height: 13},
  },
  expiryDate: {
    backgroundColor: '#FDE7B6',
    marginLeft: 10,
    borderWidth: 1,
    borderRadius: 5,
  },
  foodImage: {
    width: 70,
    height: 70,
    marginLeft: 20,
    marginRight: 20,
  },
  tag: {
    backgroundColor: '#FDE7B6',
    marginLeft: 10,
    borderWidth: 1,
    borderRadius: 5,
    fontWeight: '600',
  },
});

export function IngredientInformation({onChange, ingredient}) {
  const foodName = ingredient.name.toUpperCase();
  const unit = ingredient.unit;
  const category = ingredient.aisle;

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [quantity, setQuantity] = React.useState(ingredient.amount);
  const [date, setDate] = useState(new Date(ingredient.best_before));
  const [open, setOpen] = useState(false);

  const handleDelete = async () => {
    try {
      const userToken = await Keychain.getGenericPassword();
      const response = await fetch(
        'http://localhost:4000/storage/ingredient/' + ingredient._id,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': `application/json`,
            Accept: `application/json`,
            Authorization: `Bearer ${userToken.password}`,
          },
        },
      );
      onChange();
      setIsModalOpen(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleCancel = () => {
    setDate(new Date(ingredient.best_before));
    setQuantity(ingredient.amount);
    setIsModalOpen(false);
  };

  const handleSubmit = async () => {
    try {
      const userToken = await Keychain.getGenericPassword();
      put_body = JSON.stringify({
        best_before: date,
        amount: quantity,
      });
      const response = await fetch(
        'http://localhost:4000/storage/ingredient/' + ingredient._id,
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

  return (
    <View style={{width: screenWidth}}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalOpen}
        onRequestClose={() => {
          setIsModalOpen(false);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Ingredient Modification</Text>

            <TextInput
              mode="outlined"
              label="FoodName"
              value={foodName}
              editable={false}
              style={{width: screenWidth * 0.725}}
            />
            <TextInput
              mode="outlined"
              label="Category"
              value={category}
              editable={false}
              style={{width: screenWidth * 0.725, marginVertical: 5}}
            />
            <TextInput
              mode="outlined"
              label="Quantity"
              value={quantity + ''}
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
              <Pressable style={styles.buttonSubmit} onPress={handleSubmit}>
                <Text style={styles.textStyle}>Submit</Text>
              </Pressable>
              <Pressable style={styles.buttonCancel} onPress={handleCancel}>
                <Text style={styles.textStyle}>Cancel</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      <Card style={styles.card}>
        <View style={{flexDirection: 'row', marginTop: 20}}>
          <Image
            source={{uri: 'https://picsum.photos/700'}}
            style={styles.foodImage}
          />

          <View>
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>{foodName}</Text>
            <Text style={{color: 'gray', fontWeight: '600', marginTop: 5}}>
              {category}
            </Text>
            <View style={{flexDirection: 'row', marginTop: 5}}>
              <Text>
                {quantity} {unit.toUpperCase()}
              </Text>
              <Text style={styles.expiryDate}>{date.toLocaleDateString()}</Text>
            </View>
          </View>
          <TouchableOpacity
            style={{position: 'absolute', right: 40}}
            onPress={() => setIsModalOpen(true)}>
            <Icon name={'pencil'} size={20} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleDelete}
            style={{position: 'absolute', right: 10}}>
            <Icon name="remove" size={20} color="black" />
          </TouchableOpacity>
        </View>
      </Card>
    </View>
  );
}
