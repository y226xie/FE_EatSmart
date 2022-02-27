import React, {Component} from 'react';
import {
  Dimensions,
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {IngredientInformation} from './IngredientInformation';
import * as Keychain from 'react-native-keychain';

const screenHeight = Dimensions.get('screen').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    backgroundColor: 'rgb(242, 243, 237)',
  },
  appArea: {
    marginTop: screenHeight * 0.07,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginLeft: 18,
    marginBottom: 20,
  },
  addBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    height: screenHeight * 0.05,
    marginTop: 10,
    backgroundColor: 'rgb(255, 231, 175)',
    borderRadius: 15,
    marginHorizontal: 18,
    borderWidth: 1,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOpacity: 0.8,
    shadowRadius: 15,
    shadowOffset: {width: 1, height: 13},
  },
});

export default class InventoryScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ingredients: [],
      isLoading: true,
    };
  }

  getIngredients = async () => {
    userToken = await Keychain.getGenericPassword();
    try {
      this.setState({isLoading: true});
      const response = await fetch(
        'http://192.168.2.28:4000/storage/ingredients',
        {
          headers: {
            Authorization: `Bearer ${userToken.password}`,
            page: '1',
          },
        },
      );
      const json = await response.json();
      this.setState({ingredients: json.message});
    } catch (error) {
      console.log(error.message);
    } finally {
      this.setState({isLoading: false});
    }
  };

  componentDidMount() {
    this.getIngredients();
  }

  render() {
    const {ingredients, isLoading} = this.state;

    return (
      <View style={styles.container}>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <ScrollView style={styles.appArea}>
            <Text style={styles.title}>Ingredient Information</Text>
            {ingredients ? (
              <View>
                {ingredients.map((t, i) => {
                  return (
                    <IngredientInformation
                      key={i}
                      ingredient={t}
                      onChange={this.getIngredients}
                    />
                  );
                })}
              </View>
            ) : (
              <>{/* add error handling here */}</>
            )}

            <TouchableOpacity style={styles.addBtn}>
              <Text style={{fontSize: 15}}>Add More Item</Text>
            </TouchableOpacity>
          </ScrollView>
        )}
      </View>
    );
  }
}
