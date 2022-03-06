import React, {useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import RecipeSearchView from './RecipeSearchView';
import RecipeDisplayView from './RecipeDisplayView';
import RecipeDetails from './RecipeDetails';
import CookingSteps from './CookingSteps';

const Stack = createNativeStackNavigator();

export default function RecipeNavigation({navigation}) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="RecipeSearch"
        component={RecipeSearchView}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="RecipeDisplay"
        component={RecipeDisplayView}
        initialParams={{
          recipes: []
        }}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="RecipeDetails"
        component={RecipeDetails}
        initialParams={{
          recipeID:""
        }}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CookingSteps"
        component={CookingSteps}
        initialParams= {{
          title: "",
          instructions: [],
          score: 0,
          readyInMinutes: 0,
        }}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}