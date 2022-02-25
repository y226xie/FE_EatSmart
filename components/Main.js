import React, {useState} from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Button,
  Dimensions,
} from 'react-native';
import {SearchBar} from 'react-native-elements';
import RecipeRecommendation from '../utils/RecipeRecommendation';
import {Card} from 'react-native-paper';
import CurrentStock from '../utils/CurrentStock';

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(242, 243, 237)',
  },
  appArea: {
    marginTop: screenHeight * 0.05,
    marginHorizontal: 18,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginLeft: 18,
  },
  userName: {
    marginVertical: 10,
    fontSize: 20,
    marginLeft: 18,
  },
  headerText: {
    fontSize: 20,
    marginVertical: 10,
    marginLeft: 18,
    fontWeight: 'bold',
  },
  recipe: {
    marginBottom: 20,
  },
  horizontal: {
    flexDirection: 'row',
  },
});
const stock_items = [
  {name: 'Yogurt', weight: '500g', expiry: '1 week'},
  {name: 'Beef', weight: '1 box', expiry: '1 week'},
  {name: 'Potato', weight: '4 boxes', expiry: '2 weeks'},
];
function Main({navigation}) {
  const [search, setSearch] = useState('');

  const updateSearch = search => {
    setSearch(search);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.appArea}>
        <View>
          <Text style={styles.title}>Welcome Back!</Text>
          <Text style={styles.userName}>Fuhai!</Text>
        </View>
        <View style={{marginHorizontal: 18}}>
          <SearchBar
            inputStyle={{backgroundColor: 'white'}}
            containerStyle={{
              backgroundColor: 'white',
              borderTopWidth: 0,
              borderBottomWidth: 0,
              borderRadius: 15,
              width: 320,
            }}
            inputContainerStyle={{
              backgroundColor: 'white',
              borderWidth: 0,
              fontSize: 5,
              height: 30,
            }}
            onChangeText={updateSearch}
            value={search}
            placeholder="search"
          />
        </View>
        <Text style={styles.headerText}>Today's recipe recommendation</Text>
        <View style={styles.recipe}>
          <View style={styles.horizontal}>
            <RecipeRecommendation
              onPress={() => navigation.navigate('RecipeDetails')}
              foodName="Pasta"
              difficulity="Medium"
              foodImageUrl="https://picsum.photos/700"
            />
            <RecipeRecommendation
              onPress={() => navigation.navigate('RecipeDetails')}
              foodName="Noodle"
              difficulity="Hard"
              foodImageUrl="https://picsum.photos/700"
            />
          </View>
        </View>
        <View styles={styles.elementMargin}>
          <Text style={styles.headerText}>Current Stock</Text>
          <Card style={{marginHorizontal: 10, borderRadius: 5}}>
            <CurrentStock items={stock_items} />
          </Card>
        </View>
      </View>
    </ScrollView>
  );
}

export default Main;
