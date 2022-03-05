import React, {Component} from 'react';
import {
  Button,
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import SearchFilterView from './searchFilterView';
import * as Keychain from 'react-native-keychain';
import {API_root} from '@env';

const test = [
  {
    id: 1,
    title: 'apple',
  },
  {
    id: 2,
    title: 'banana',
  },
  {
    id: 3,
    title: 'chicken legs',
  },
  {
    id: 4,
    title: 'chicken breasts',
  },
  {
    id: 5,
    title: 'chicken wings',
  },
];

const cuisines = [
  'african',
  'american',
  'british',
  'cajun',
  'caribbean',
  'chinese',
  'eastern european',
  'european',
  'french',
  'german',
  'greek',
  'indian',
  'irish',
  'italian',
  'japanese',
  'jewish',
  'korean',
  'mediterranean',
  'mexican',
  'nordic',
  'spanish',
  'thai',
  'vietnamese',
];
const diets = [
  'Gluten Free',
  'Ketogenic',
  'Vegetarian',
  'Lacto-Vegetarian',
  'Ovo-Vegetarian',
  'Vegan',
  'Pescetarian',
  'Paleo',
];
const intolerances = [
  'Dairy',
  'Egg',
  'Gluten',
  'Grain',
  'Peanut',
  'Seafood',
  'Sesame',
  'Shellfish',
  'Soy',
  'Sulfite',
  'Tree Nut',
  'Wheat',
];
const mealTypes = [
  'main course',
  'side dish',
  'dessert',
  'appetizer',
  'salad',
  'bread',
  'breakfast',
  'soup',
  'beverage',
  'sauce',
  'marinade',
  'fingerfood',
  'snack',
  'drink',
];

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

export default class RecipeSearchView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      cuisinesFilter: new Set(),
      dietsFilter: new Set(),
      intolerancesFilter: new Set(),
      mealTylesFilter: new Set(),
      includeIngredients: '',
      maxColories: '',
      recipes: [],
    };
  }

  addCuisines = async item => {
    selectedItems = this.state.cuisinesFilter;
    selectedItems.add(item);
    this.setState({
      cuisinesFilter: selectedItems,
    });
  };

  removeCuisines = async item => {
    selectedItems = this.state.cuisinesFilter;
    selectedItems.delete(item);
    this.setState({
      cuisinesFilter: selectedItems,
    });
  };

  addDiets = async item => {
    selectedItems = this.state.dietsFilter;
    selectedItems.add(item);
    this.setState({
      dietsFilter: selectedItems,
    });
  };

  removeDiets = async item => {
    selectedItems = this.state.dietsFilter;
    selectedItems.delete(item);
    this.setState({
      dietsFilter: selectedItems,
    });
  };

  addIntolerance = async item => {
    selectedItems = this.state.intolerancesFilter;
    selectedItems.add(item);
    this.setState({
      intolerancesFilter: selectedItems,
    });
  };

  removeIntolerance = async item => {
    selectedItems = this.state.intolerancesFilter;
    selectedItems.delete(item);
    this.setState({
      intolerancesFilter: selectedItems,
    });
  };

  addMealType = async item => {
    selectedItems = this.state.mealTylesFilter;
    selectedItems.add(item);
    this.setState({
      mealTylesFilter: selectedItems,
    });
  };

  removeMealType = async item => {
    selectedItems = this.state.mealTylesFilter;
    selectedItems.delete(item);
    this.setState({
      mealTylesFilter: selectedItems,
    });
  };

  handleSumbit = async () => {
    const userToken = await Keychain.getGenericPassword();
    const cuisines = [...this.state.cuisinesFilter].map(item => item).join(',');
    const diets = [...this.state.dietsFilter].map(item => item).join(',');
    const response = await fetch(
      `${API_root}/meal/recipeComplex?cuisine=${cuisines}&diet=${diets}`,
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
    this.props.navigation.navigate({
      name: 'RecipeDisplay',
      params: {recipes: json.message.results},
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.appArea}>
          <Text style={styles.title}>Recipe Library</Text>
          <SearchFilterView
            data={cuisines}
            selectedItems={this.state.cuisinesFilter}
            pushItem={this.addCuisines}
            popItem={this.removeCuisines}
            name="Cuisines"
          />
          <SearchFilterView
            data={diets}
            selectedItems={this.state.dietsFilter}
            pushItem={this.addDiets}
            popItem={this.removeDiets}
            name="Diets"
          />
          <SearchFilterView
            data={intolerances}
            selectedItems={this.state.intolerancesFilter}
            pushItem={this.addIntolerance}
            popItem={this.removeIntolerance}
            name="Intolerances"
          />
          <SearchFilterView
            data={mealTypes}
            selectedItems={this.state.mealTylesFilter}
            pushItem={this.addMealType}
            popItem={this.removeMealType}
            name="Meal Types"
          />

          <TouchableOpacity style={styles.addBtn} onPress={this.handleSumbit}>
            <Text style={{fontSize: 15}}>Explore Recipes</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

// export default function DetailsScreen({navigation}) {
//   return (
//     <SearchFilterView data={test}/>
//   );
// }
