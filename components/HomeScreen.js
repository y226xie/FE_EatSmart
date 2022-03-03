import React, {useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Main from './Main';
import RecipeDetails from './RecipeDetails';
import CookingSteps from './CookingSteps';

const Stack = createNativeStackNavigator();

function HomeScreen({navigation}) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Main"
        component={Main}
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
          instructions: []
        }}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

export default HomeScreen;
