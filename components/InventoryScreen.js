import React, {Component} from 'react';
import {Button, View, Text, ActivityIndicator, StyleSheet} from 'react-native';
import { IngredientInformation } from './IngredientInformation';
import * as Keychain from "react-native-keychain"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    backgroundColor: 'rgb(242, 243, 237)',
  },
  appArea: {
    marginTop: 80,
    marginHorizontal: 18,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginLeft: 18,
  },
})

export default class InventoryScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      isLoading: true
    };
  }


  getIngredients = async () => {
    userToken = await Keychain.getGenericPassword()
    try {
      this.setState({ isLoading: true});
      const response = await fetch('http:localhost:4000/storage/ingredients', {
        headers: {
          'Authorization': `Bearer ${userToken.password}`,
          'page': '1'
        }
      });
      const json = await response.json();
      this.setState({data: json.message})
    } catch (error) {
      console.log(error.message)
    } finally {
      this.setState({ isLoading: false});
    }
  }

  componentDidMount() {
    this.getIngredients();
  }


  render() {
    const {data, isLoading} = this.state;


    return (
      <View style={styles.container}>
        {isLoading ? <ActivityIndicator/> : (
            <View style={styles.appArea}>
              <Text style={styles.title}>Ingredient Information</Text>
              <View>
                {data.map((t, i) => {
                    return <IngredientInformation 
                    key={i} data={t}
                    onChange={this.getIngredients}
                    />
                })}
              </View>
            </View>

        )}
      </View>
    )
  }
}
