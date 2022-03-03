import React, {Component} from 'react';
import {
  Button,
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import SearchFilterView from './searchFilterView';
import * as Keychain from 'react-native-keychain';

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

const screenHeight = Dimensions.get('screen').height;

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
});

export default class RecipeSearchView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      cuisinesFilter: new Set(),
      dietsFilter: new Set(),
      intolerancesFilter: [],
      mealTylesFilter: [],
      includeIngredients: '',
      maxColories: '',
      recipes: [],
    };
  }

  addCuisines = async item => {
    selectedItem = this.state.cuisinesFilter;
    selectedItem.add(item);
    this.setState({
      cuisinesFilter: selectedItem,
    });
  };

  removeCuisines = async item => {
    selectedItem = this.state.cuisinesFilter;
    selectedItem.delete(item);
    this.setState({
      cuisinesFilter: selectedItem,
    });
  };

  addDiets = async item => {
    selectedItem = this.state.dietsFilter;
    selectedItem.add(item);
    this.setState({
      dietsFilter: selectedItem,
    });
  };

  removeDiets = async item => {
    selectedItem = this.state.dietsFilter;
    selectedItem.delete(item);
    this.setState({
      dietsFilter: selectedItem,
    });
  };

  handleSumbit = async () => {
    const userToken = await Keychain.getGenericPassword();
    const cuisines = [...this.state.cuisinesFilter].map(item => item).join(',');
    const diets = [...this.state.dietsFilter].map(item => item).join(',');
    const response = await fetch(
      `http://192.168.0.101:4000/meal/recipeComplex?cuisine=${cuisines}&diet=${diets}`,
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
    return (
      <SafeAreaView style={{flex: 1}}>
        <Button title="Submit" onPress={this.handleSumbit} />
        <SearchFilterView
          data={cuisines}
          selectedItems={this.state.cuisinesFilter}
          pushItem={this.addCuisines}
          popItem={this.removeCuisines}
        />
        <SearchFilterView
          data={diets}
          selectedItems={this.state.dietsFilter}
          pushItem={this.addDiets}
          popItem={this.removeDiets}
        />
      </SafeAreaView>
    );
  }
}

// export default function DetailsScreen({navigation}) {
//   return (
//     <SearchFilterView data={test}/>
//   );
// }
