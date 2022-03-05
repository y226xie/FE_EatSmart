import React, {useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import RecipeSearchView from './RecipeSearchView';
import RecipeDisplayView from './RecipeDisplayView';

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
    </Stack.Navigator>
  );
}