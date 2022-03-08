import * as React from 'react';
import {
  ScrollView,
  View,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {RecipeDetailsImage} from '../images';
import Ionicons from 'react-native-vector-icons/Ionicons';
import StarRating from 'react-native-star-rating';
import Steps from './Steps';

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
});

// const steps = [
//   {description: 'Heat the oil in a skillet over medium heat'},
//   {description: 'Add the garlic and 3 spring onions and cook for 2-3 mins'},
//   {description: 'Add the garlic and 3 spring onions and cook for 2-3 mins'},
//   {description: 'Add the garlic and 3 spring onions and cook for 2-3 mins'},
//   {description: 'Add the carrots and other ingredients'},
// ];
// let cookingSteps = instructions.map((step, index) => {
//   return (
//     <Steps currentStep={index + 1} key={index} description={step.step} />
//   );
// });

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
        {instructions.map((step, index) => {
          return (
            <Steps
              currentStep={index + 1}
              key={index}
              description={step.step}
            />
          );
        })}
      </ScrollView>
    </View>
  );
}

export default CookingSteps;
