import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignInScreen from './SignInScreen';
import SignupScreen from './SignupScreen';

const Stack = createNativeStackNavigator();

export default function LoginScreen({navigation}) {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="SignIn"
                component={SignInScreen}
            />
            <Stack.Screen
                name="Signup"
                component={SignupScreen}
            />
        </Stack.Navigator>
    )
}