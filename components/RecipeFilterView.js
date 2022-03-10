import React, {Component, useEffect, useState} from 'react';
import DropDownFilterView from './DropdownFilterView';
import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import * as Keychain from 'react-native-keychain';
import {API_root} from '@env';

const screenHeight = Dimensions.get('screen').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(242, 243, 237)',
  },
  appArea: {
    marginTop: screenHeight * 0.06,
    marginHorizontal: 18,
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
});

const cuisines = [
  {label: 'African', value: 'african'},
  {label: 'American', value: 'american'},
  {label: 'British', value: 'british'},
  {label: 'Caribbean', value: 'caribbean'},
  {label: 'Chinese', value: 'chinese'},
  {label: 'European', value: 'european'},
  {label: 'French', value: 'french'},
  {label: 'German', value: 'german'},
  {label: 'Greek', value: 'greek'},
  {label: 'Indian', value: 'indian'},
  {label: 'Irish', value: 'irish'},
  {label: 'Italian', value: 'italian'},
  {label: 'Japanese', value: 'japanese'},
  {label: 'Jewish', value: 'jewish'},
  {label: 'Korean', value: 'korean'},
  {label: 'Mediterranean', value: 'mediterranean'},
  {label: 'Mexican', value: 'mexican'},
  {label: 'Nordic', value: 'nordic'},
  {label: 'Spanish', value: 'spanish'},
  {label: 'Thai', value: 'thai'},
  {label: 'Vietnamese', value: 'vietnamese'},
];
const diets = [
  {label: 'Gluten Free', value: 'Gluten Free'},
  {label: 'Ketogenic', value: 'Ketogenic'},
  {label: 'Vegetarian', value: 'Vegetarian'},
  {label: 'Lacto-Vegetarian', value: 'Lacto-Vegetarian'},
  {label: 'Ovo-Vegetarian', value: 'Ovo-Vegetarian'},
  {label: 'Vegan', value: 'Vegan'},
  {label: 'Pescetarian', value: 'Pescetarian'},
  {label: 'Paleo', value: 'Paleo'},
];
const intolerances = [
  {label: 'Dairy', value: 'Dairy'},
  {label: 'Egg', value: 'Egg'},
  {label: 'Gluten', value: 'Gluten'},
  {label: 'Grain', value: 'Grain'},
  {label: 'Peanut', value: 'Peanut'},
  {label: 'Seafood', value: 'Seafood'},
  {label: 'Sesame', value: 'Sesame'},
  {label: 'Shellfish', value: 'Shellfish'},
  {label: 'Soy', value: 'Soy'},
  {label: 'Sulfite', value: 'Sulfite'},
  {label: 'Tree Nut', value: 'Tree Nut'},
  {label: 'Wheat', value: 'Wheat'},
];
const mealTypes = [
  {label: 'Main course', value: 'main course'},
  {label: 'Side dish', value: 'side dish'},
  {label: 'Dessert', value: 'dessert'},
  {label: 'Appetizer', value: 'appetizer'},
  {label: 'Salad', value: 'salad'},
  {label: 'Bread', value: 'bread'},
  {label: 'Breakfast', value: 'breakfast'},
  {label: 'Soup', value: 'soup'},
  {label: 'Beverage', value: 'beverage'},
  {label: 'Sauce', value: 'sauce'},
  {label: 'Marinade', value: 'marinade'},
  {label: 'Fingerfood', value: 'fingerfood'},
  {label: 'Snack', value: 'snack'},
  {label: 'Drink', value: 'drink'},
];

export default function RecipeFilterView(props) {
  const [selectedCuisines, setSelectedCuisines] = useState([]);
  const [selectedDiets, setSelectedDiets] = useState([]);
  const [selectedIntolerances, setSelectedIntolerances] = useState([]);
  const [selectedMealTypes, setSelectedMealTypes] = useState([]);
  // const [isOpened, setIsOpened] = useState(0);

  // useEffect(() => {
  //     setO
  // }, [isOpened])

  const handleSumbit = async () => {
    const userToken = await Keychain.getGenericPassword();
    const cuisines = selectedCuisines.map(item => item).join(',');
    const diets = selectedDiets.map(item => item).join(',');
    const intolerances = selectedIntolerances.map(item => item).join(',');
    const mealTypes = selectedMealTypes.map(item => item).join(',');

    const response = await fetch(
      `${API_root}/meal/recipeComplex?cuisine=${cuisines}&diet=${diets}&intolerances=${intolerances}&type=${mealTypes}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': `application/json`,
          Accept: `application/json`,
          Authorization: `Bearer ${userToken.password}`,
        },
      },
    );
    json = await response.json();
    console.log(json.message);
    props.navigation.navigate({
      name: 'RecipeDisplay',
      params: {recipes: json.message.results},
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.appArea}>
        <Text style={styles.title}>Recipe Library</Text>
        <DropDownFilterView
          items={cuisines}
          value={selectedCuisines}
          setValue={setSelectedCuisines}
          zIndexInverse={1000}
          placeholder={'Select a Cuisine'}
          customStyle={{marginHorizontal: 15, zIndex: 4000}}
          // setIsOpened={setIsOpened}
          // key={1}
        />

        <DropDownFilterView
          items={diets}
          value={selectedDiets}
          setValue={setSelectedDiets}
          zIndexInverse={2000}
          placeholder={'Select a Diet'}
          customStyle={{marginHorizontal: 15, zIndex: 3000}}
          // setIsOpened={setIsOpened}
          // key={2}
        />

        <DropDownFilterView
          items={intolerances}
          value={selectedIntolerances}
          setValue={setSelectedIntolerances}
          zIndexInverse={3000}
          placeholder={'Select an Intolerance'}
          customStyle={{marginHorizontal: 15, zIndex: 2000}}
          // setIsOpened={setIsOpened}
          // key={3}
        />

        <DropDownFilterView
          items={mealTypes}
          value={selectedMealTypes}
          setValue={setSelectedMealTypes}
          zIndexInverse={4000}
          placeholder={'Select a Meal Type'}
          customStyle={{marginHorizontal: 15, zIndex: 1000}}
          // setIsOpened={setIsOpened}
          // key={4}
        />

        <TouchableOpacity style={styles.addBtn} onPress={() => handleSumbit()}>
          <Text style={{fontSize: 15}}>Explore Recipes</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
