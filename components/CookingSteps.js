import React, {useState} from 'react';
import {
  ScrollView,
  View,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
  Modal,
} from 'react-native';
import {RecipeDetailsImage} from '../images';
import Ionicons from 'react-native-vector-icons/Ionicons';
import StarRating from 'react-native-star-rating';
import Steps from './Steps';
import Icon from 'react-native-vector-icons/FontAwesome';
import {DefaultStepImage} from '../images';

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    backgroundColor: 'rgb(242, 243, 237)',
  },
  backgroudImage: {
    width: screenWidth,
    height: 200,
  },
  backButton: {
    marginTop: -120,
    zIndex: 10,
    marginLeft: 30,
    width: 50,
    height: 50,
    padding: 10,
    borderRadius: 100,
    backgroundColor: 'rgb(143, 126,110)',
  },
  foodInfo: {
    marginTop: 20,
    zIndex: 10,
    alignSelf: 'stretch',
    height: screenHeight * 0.2,
    marginHorizontal: 30,
    alignItems: 'center',
    backgroundColor: 'rgb(255, 255, 255)',
    borderRadius: 15,
  },
  foodName: {
    fontSize: 18,
    fontWeight: '400',
    marginTop: 20,
    marginHorizontal: 10,
  },
  rating: {
    marginTop: 20,
  },
  cookingStepsText: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: '500',
    marginLeft: 30,
    marginBottom: 20,
  },
  centerView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  modalView: {
    width: screenWidth * 0.83,
    height: screenHeight * 0.3,
    backgroundColor: 'white',
    borderWidth: 1,
    padding: 40,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

function CookingSteps({route, navigation}) {
  const instructions = route.params.instructions;
  const score = route.params.score;
  const readyInMinutes = route.params.readyInMinutes;
  const title = route.params.title;
  let difficulty = '';
  if (readyInMinutes < 60) {
    difficulty = 'Easy';
  } else if (readyInMinutes < 120) {
    difficulty = 'Medium';
  } else {
    difficulty = 'Hard';
  }

  const [visible, setVisible] = useState(false);
  const [modalText, setModalText] = useState('');
  const showModal = stepDescription => {
    setVisible(true);
    setModalText(stepDescription);
  };
  const hideModal = () => setVisible(false);

  return (
    <View style={styles.container}>
      <View>
        <Image style={styles.backgroudImage} source={RecipeDetailsImage} />
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={30} color="white" />
        </TouchableOpacity>
      </View>

      <View style={styles.foodInfo}>
        <Text style={styles.foodName}>{title}</Text>
        <View style={{marginTop: 25, marginLeft: 20, flexDirection: 'row'}}>
          <Text>Rating: </Text>
          <StarRating
            disabled={true}
            starSize={18}
            rating={score}
            fullStarColor={'rgb(240, 203, 94)'}
          />
          <Text style={{marginLeft: 10}}>{score}</Text>
        </View>

        <View style={{flexDirection: 'row', marginTop: 20}}>
          <Text> Difficulty: {difficulty} </Text>
          <Text> Time: {readyInMinutes} mins</Text>
        </View>
      </View>

      <ScrollView>
        <Text style={styles.cookingStepsText}>Cooking Steps</Text>
        <Modal animationType="slide" visible={visible} transparent={true}>
          <View style={styles.centerView}>
            <View style={styles.modalView}>
              <TouchableOpacity
                onPress={hideModal}
                style={{position: 'absolute', right: 20, top: 20}}>
                <Icon name="remove" size={20} color="black" />
              </TouchableOpacity>
              <ScrollView>
                <Text
                  style={{
                    fontSize: 15,
                    marginBottom: 10,
                    marginHorizontal: 20,
                  }}>
                  {modalText}
                </Text>
              </ScrollView>
            </View>
          </View>
        </Modal>
        {instructions.map((step, index) => {
          return (
            <TouchableOpacity key={index} onPress={() => showModal(step.step)}>
              <Steps
                currentStep={index + 1}
                key={index}
                description={step.step}
                uri={DefaultStepImage}
              />
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

export default CookingSteps;
