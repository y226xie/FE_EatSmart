import React from 'react';
import {
    ActivityIndicator,
    StatusBar,
    StyleSheet,
    View,
  } from 'react-native';
import * as Keychain from "react-native-keychain";

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
      <View>
          <ActivityIndicator />
          <StatusBar barStyle="default" />
      </View>
      );
  }
}