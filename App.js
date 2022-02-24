import * as Keychain from "react-native-keychain";
import * as React from 'react';
import SignInScreen from "./components/SignInScreen";
import TabNavigator from "./components/TabNavigator";
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';


const Stack = createNativeStackNavigator();
export const AuthContext = React.createContext();


export default function App() {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await Keychain.getGenericPassword();
        if (userToken === false) {
          userToken = null
        }
      } catch (e) {
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async data => {
          try {
            const response = await fetch('http:localhost:4000/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': `application/json`,
                    'Accept': `application/json`,
                },
                body: JSON.stringify({
                    "email": data.username,
                    "password": data.password,
                })
            });
            json = await response.json();
            if (json.ok === false) {
                console.log(json.message);
            } else {
                creds = json.data
                await Keychain.setGenericPassword(creds.email, creds.token);
            }
        } catch (error) {
            console.log(error.message)
        }

        dispatch({ type: 'SIGN_IN', token: creds });
      },
      signOut: async () => {
        const logout = await Keychain.resetGenericPassword();
        dispatch({ type: 'SIGN_OUT' });
      },
      // signUp: async data => {
      //   dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
      // },
    }),
    []
  );

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
      <Stack.Navigator>
        {state.userToken == null ? (
          <Stack.Screen name="SignIn" component={SignInScreen} />
        ) : (
          <Stack.Screen name="Content" component={TabNavigator} />
        )}
      </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
    
  );
}