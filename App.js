import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from './components/HomeScreen';
import DetailsScreen from './components/DetailsScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ProfileScreen from './components/ProfileScreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused
                ? 'ios-information-circle'
                : 'ios-information-circle-outline';
            } else if (route.name === 'Profile') {
              iconName = focused ? 'settings' : 'settings';
            } else if (route.name === 'Details') {
              iconName = focused ? 'heart' : 'heart';
            }
            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
        <Tab.Screen name="Details" component={DetailsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;
