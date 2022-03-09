import React, {useEffect, useState} from 'react';
import {
  View,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import {DataTable, Card} from 'react-native-paper';
import {RecipeDetailsImage} from '../images';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import StarRating from 'react-native-star-rating';
import * as Keychain from 'react-native-keychain';
import {API_root} from '@env';

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
    justifyContent: 'space-between',
    marginTop: 20,
    zIndex: 10,
    alignSelf: 'stretch',
    height: screenHeight * 0.2,
    marginHorizontal: 30,
    alignItems: 'center',
    backgroundColor: '#FAFAF8',
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
  collect: {
    alignItems: 'center',
    backgroundColor: '#FAFAF8',
    borderRadius: 15,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginLeft: 30,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOpacity: 0.8,
    shadowRadius: 15,
    shadowOffset: {width: 1, height: 13},
  },
  toolsInfo: {
    marginTop: 20,
    zIndex: 10,
    alignSelf: 'stretch',
    height: screenHeight * 0.3,
    marginHorizontal: 30,
    backgroundColor: '#FAFAF8',
    borderRadius: 15,
  },
  ingredients: {
    marginLeft: 30,
    marginTop: 20,
  },
  ingredientList: {
    width: screenWidth * 0.85,
    marginVertical: 10,
  },
  cookingBtn: {
    justifyContent: 'center',
    backgroundColor: 'rgb(255, 231, 175)',
    borderRadius: 15,
    marginLeft: 30,
    borderWidth: 1,
    paddingHorizontal: 65,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOpacity: 0.8,
    shadowRadius: 15,
    shadowOffset: {width: 1, height: 13},
  },
  activityIndicatorContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: screenHeight * 0.5,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

function RecipeDetails({route, navigation}) {
  const [recipeData, setrecipeData] = useState({
    pending: true,
    information: {
      title: '',
      ingredients: [],
      readyInMinutes: 0,
      score: 0,
      difficulty: 'Easy',
      instructions: [],
    },
  });
  const [nutrition, setNutrition] = useState({});

  const getIngredientAmount = async (userToken, ingredient) => {
    const response = await fetch(
      `${API_root}/storage/ingredient/${ingredient}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${userToken.password}`,
        },
      },
    );
    const data = await response.json();
    const amountWithUnit = {
      amount: data.message.reduce((partialSum, a) => partialSum + a.amount, 0),
      unit: '',
    };
    if (data.message.length > 0) {
      amountWithUnit.unit = data.message[0].unit;
    }
    return amountWithUnit;
  };

  const getRecipeInformation = async (userToken, recipeID) => {
    const response = await fetch(`${API_root}/meal/recipe/${recipeID}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${userToken.password}`,
      },
    });
    const data = await response.json();
    const instructions =
      data.message.analyzedInstructions.length == 0
        ? []
        : data.message.analyzedInstructions[0].steps;
    let information = {
      title: data.message.title,
      ingredients: [],
      readyInMinutes: data.message.readyInMinutes,
      score: parseFloat((data.message.spoonacularScore / 20).toFixed(1)),
      instructions: instructions,
      difficulty: 'Easy',
    };
    if (information.readyInMinutes < 60) {
      information.difficulty = 'Easy';
    } else if (information.readyInMinutes < 120) {
      information.difficulty = 'Medium';
    } else {
      information.difficulty = 'Hard';
    }
    // for (var i=0; i<data.message.extendedIngredients.length; i++) {
    // await data.message.extendedIngredients.forEach( (item) => {
    for (const item of data.message.extendedIngredients) {
      const amountWithUnit = await getIngredientAmount(userToken, item.name);

      let ingredient = {
        name: item.name,
        targetAmount: item.amount,
        unit: item.unit,
        currentAmount: amountWithUnit.amount,
        currentUnit: amountWithUnit.unit,
      };

      information.ingredients.push(ingredient);
    }
    setrecipeData({
      pending: false,
      information: information,
    });
  };

  const parseNutrition = data => {
    const parsedNutrition = {
      cal: data.bad[0].amount,
      fat: data.bad[1].amount,
      carb: data.bad[2].amount,
      sugar: data.bad[3].amount,
      protein: data.good[0].amount,
    };

    return parsedNutrition;
  };

  const getRecipeNutrition = (userToken, recipeID) => {
    fetch(`${API_root}/meal/recipe/${recipeID}/nutrition`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${userToken.password}`,
      },
    })
      .then(resp => resp.json())
      .then(data => setNutrition(parseNutrition(data.message)));
  };

  useEffect(() => {
    const recipeID = route.params.recipeID;
    setrecipeData({pending: true});
    Keychain.getGenericPassword().then(userToken => {
      getRecipeNutrition(userToken, recipeID);
      getRecipeInformation(userToken, recipeID).catch(console.error);
    });
  }, []);

  return (
    <ScrollView>
      {recipeData.pending ? (
        <View style={styles.activityIndicatorContainer}>
          <ActivityIndicator size="large" color="black" />
        </View>
      ) : (
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
            <Text style={styles.foodName}>{recipeData.information.title}</Text>
            <View style={{marginTop: 25, marginLeft: 20, flexDirection: 'row'}}>
              <Text>Rating: </Text>
              <StarRating
                disabled={true}
                starSize={18}
                rating={recipeData.information.score}
                fullStarColor={'rgb(240, 203, 94)'}
              />
              <Text style={{marginLeft: 10}}>
                {recipeData.information.score}
              </Text>
            </View>
            <View style={{flexDirection: 'row', marginBottom: 20}}>
              <Text> Difficulity: {recipeData.information.difficulty} </Text>
              <Text> Time: {recipeData.information.readyInMinutes} mins</Text>
            </View>
          </View>

          <View style={styles.toolsInfo}>
            <View style={{marginLeft: 30}}>
              <View style={{flexDirection: 'row', marginTop: 20}}>
                <FontAwesome5Icon name="utensils" size={20} />
                <Text style={{fontSize: 18, fontWeight: '400', marginLeft: 20}}>
                  Utentils
                </Text>
              </View>
              <Text style={{marginTop: 20, marginHorizontal: 10}}>
                Cutting Board, Knife, 2 bowls, Cooking spoon, Towels
              </Text>
              <View style={{flexDirection: 'row', marginTop: 20}}>
                <Ionicons name="fast-food" size={20} />
                <Text style={{fontSize: 18, fontWeight: '400', marginLeft: 20}}>
                  Nutrition Per Serving
                </Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <View style={{marginTop: 20, marginHorizontal: 20}}>
                  <Text>Cal</Text>
                  <Text style={{marginTop: 10}}>{nutrition.cal}</Text>
                </View>
                <View style={{marginTop: 20, marginHorizontal: 20}}>
                  <Text>Fat</Text>
                  <Text style={{marginTop: 10}}>{nutrition.fat}</Text>
                </View>
                <View style={{marginTop: 20, marginHorizontal: 20}}>
                  <Text>Carb</Text>
                  <Text style={{marginTop: 10}}>{nutrition.carb}</Text>
                </View>
                <View style={{marginTop: 20, marginHorizontal: 20}}>
                  <Text>Protein</Text>
                  <Text style={{marginTop: 10}}>{nutrition.protein}</Text>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.ingredients}>
            <Text style={{fontSize: 18, fontWeight: '500'}}>
              Required Ingredients
            </Text>

            <Card style={styles.ingredientList}>
              <DataTable color="black">
                <DataTable.Header>
                  <DataTable.Title style={{flex: 2}}>
                    Ingredient Name
                  </DataTable.Title>
                  <DataTable.Title numeric>Amount</DataTable.Title>
                  <DataTable.Title numeric>Current</DataTable.Title>
                </DataTable.Header>
                {recipeData.information.ingredients.map(item => {
                  return (
                    <View key={item.name}>
                      <DataTable.Row>
                        <DataTable.Cell style={{flex: 2}}>
                          {item.name}
                        </DataTable.Cell>
                        <DataTable.Cell
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'flex-end',
                            textAlign: 'right',
                          }}>
                          {item.targetAmount} {item.unit}
                        </DataTable.Cell>
                        <DataTable.Cell numeric>
                          {item.currentAmount} {item.currentUnit}
                        </DataTable.Cell>
                      </DataTable.Row>
                    </View>
                  );
                })}
              </DataTable>
            </Card>
          </View>

          <View style={{flexDirection: 'row', marginBottom: 20}}>
            <TouchableOpacity style={styles.collect}>
              <Ionicons name="heart-outline" size={30} color="black" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate({
                  name: 'CookingSteps',
                  params: {
                    title: recipeData.information.title,
                    instructions: recipeData.information.instructions,
                    score: recipeData.information.score,
                    readyInMinutes: recipeData.information.readyInMinutes,
                  },
                })
              }
              style={styles.cookingBtn}>
              <Text style={{fontSize: 15}}>Start Cooking</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </ScrollView>
  );
}

export default RecipeDetails;
