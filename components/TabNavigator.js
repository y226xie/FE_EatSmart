import React from "react";
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from './HomeScreen';
import DetailsScreen from './DetailsScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ProfileScreen from './ProfileScreen';
import MenuScreen from './MenuScreen';
import InventoryScreen from './InventoryScreen';

const Tab = createBottomTabNavigator();

function TabNavigator() {
    return (
        <Tab.Navigator
            // initialRouteName="Home"
            screenOptions={({route}) => ({
            tabBarIcon: ({focused, color, size}) => {
                let iconName;
                if (route.name === 'Home') {
                iconName = 'home';
                } else if (route.name === 'Profile') {
                iconName = 'settings';
                } else if (route.name === 'Details') {
                iconName = 'heart';
                } else if (route.name === 'Inventory') {
                iconName = 'menu';
                }
                // You can return any component that you like here!
                return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: 'rgb(255, 207, 97)',
            tabBarInactiveTintColor: 'gray',
            headerShown: false,
            tabBarShowLabel: false,
            })}>
            <Tab.Screen name="Home" component={HomeScreen} />
            {/* <Tab.Screen name="Menu" component={MenuScreen} /> */}
            <Tab.Screen name="Inventory" component={InventoryScreen}/>
            <Tab.Screen name="Details" component={DetailsScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
    )
}

export default TabNavigator;