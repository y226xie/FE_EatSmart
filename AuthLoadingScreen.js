import React from 'react';
import {
  ActivityIndicator,
  StatusBar,
  View,
  Dimensions,
} from 'react-native';
import * as Keychain from 'react-native-keychain';

const screenHeight = Dimensions.get('screen').height;
const screenWidth = Dimensions.get('screen').width;

class AuthLoadingScreen extends React.Component {
  componentDidMount() {
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const credentials = await Keychain.getGenericPassword();

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    this.props.navigation.navigate(credentials ? 'App' : 'Auth');
  };

  // Render any loading content that you like here
  render() {
    return (
      <View
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: screenHeight * 0.5,
          bottom: 0,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}
