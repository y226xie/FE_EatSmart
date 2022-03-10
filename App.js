import * as Keychain from 'react-native-keychain';
import * as React from 'react';
import SignInScreen from './components/SignInScreen';
import TabNavigator from './components/TabNavigator';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {API_root} from '@env';
import LoginScreen from './components/LoginScreen';

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
    },
  );

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await Keychain.getGenericPassword();
        if (userToken === false) {
          userToken = null;
        }
        if (userToken != null) {
          response = await fetch(`${API_root}/auth/user`, {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${userToken.password}`,
            },
          });

          json = await response.json();
          if (json.msg === 'Token has expired') {
            userToken = null;
          }
        }
        dispatch({type: 'RESTORE_TOKEN', token: userToken});
      } catch (e) {
        console.log(e);
        // Restoring token failed
      }
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async data => {
        try {
          const response = await fetch(`${API_root}/auth/login`, {
            method: 'POST',
            headers: {
              'Content-Type': `application/json`,
              Accept: `application/json`,
            },
            body: JSON.stringify({
              email: data.username,
              password: data.password,
            }),
          });
          json = await response.json();
          if (json.ok === false) {
            console.log(json.message);
          } else {
            creds = json.data;
            await Keychain.setGenericPassword(creds.email, creds.token);
          }
        } catch (error) {
          console.log(error.message);
        }

        dispatch({type: 'SIGN_IN', token: creds});
      },
      signOut: async () => {
        const logout = await Keychain.resetGenericPassword();
        dispatch({type: 'SIGN_OUT'});
      },
      signUp: async data => {
        try {
          const response = await fetch(`${API_root}/auth/signup`, {
            method: 'POST',
            headers: {
              'Content-Type': `application/json`,
              Accept: `application/json`,
            },
            body: JSON.stringify({
              email: data.username,
              password: data.password,
              height: data.height,
              weight: data.weight,
              firstName: data.firstName,
              lastName: data.lastName,
            })
          })
          json = await response.json();
          if (json.ok === false) {
            console.log(json.message);
          } else {
            creds = json.data;
            await Keychain.setGenericPassword(creds.email, creds.token);
          }
        } catch (error) {
          console.log(error.message)
        }
        dispatch({ type: 'SIGN_IN', token: creds});
      },
    }),
    [],
  );

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator>
          {state.userToken == null ? (
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{headerShown: false}}
            />
          ) : (
            <Stack.Screen
              name="Content"
              component={TabNavigator}
              options={{headerShown: false}}
            />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
