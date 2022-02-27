import React, {Component} from 'react';
import {Button, View, Text} from 'react-native';
import SearchFilterView from './searchFilterView';

const test = [{
  "id": 1,
  "title": "apple"
}, 
{
  "id": 2,
  "title": "banana"
},
{
  "id": 3,
  "title": "chicken legs"
},
{
  "id": 4,
  "title": "chicken breasts"
},
{
  "id": 5,
  "title": "chicken wings"
}]

export default class DetailsScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      cuisinesFilter: new Set(),
      dietsFilter: [],
      intolerancesFilter: [],
      mealTylesFilter: [],
      includeIngredients: "",
      maxColories: ""
    };
  }

  addCuisines = async (item) => {
    oldSelectedItem = this.state.cuisinesFilter
    oldSelectedItem.add(item)
    this.setState({
      cuisinesFilter: oldSelectedItem
    });
  }

  removeCuisines = async (item) => {
    oldSelectedItem = this.state.cuisinesFilter
    oldSelectedItem.delete(item)
    this.setState({
      cuisinesFilter: oldSelectedItem
    })
  }
  
  getRecipes = async () => {
  }

  render() {
    const cuisines = ["african", "american", "british", "cajun", "caribbean", "chinese", "eastern european", "european", "french", "german", "greek", "indian", "irish", "italian", "japanese", "jewish", "korean", "mediterranean", "mexican", "nordic", "spanish", "thai", "vietnamese"];
    const diets = ["Gluten Free", "Ketogenic", "Vegetarian", "Lacto-Vegetarian", "Ovo-Vegetarian", "Vegan", "Pescetarian", "Paleo"];
    const intolerances = ["Dairy", "Egg", "Gluten", "Grain", "Peanut", "Seafood", "Sesame", "Shellfish", "Soy", "Sulfite", "Tree Nut", "Wheat"];
    const mealTypes = ["main course", "side dish", "dessert", "appetizer", "salad", "bread", "breakfast", "soup", "beverage", "sauce", "marinade", "fingerfood", "snack", "drink"];    
    console.log(this.state.cuisinesFilter)
    return (
      <SearchFilterView data={cuisines} selectedItems={this.state.cuisinesFilter} addCuisines={this.addCuisines} removeCuisines={this.removeCuisines}/>
    )
  }
}

// export default function DetailsScreen({navigation}) {
//   return (
//     <SearchFilterView data={test}/>
//   );
// }

