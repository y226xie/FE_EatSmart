import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Button,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import {SearchBar} from 'react-native-elements';
import RecipeRecommendation from '../utils/RecipeRecommendation';
import {Card} from 'react-native-paper';
import CurrentStock from '../utils/CurrentStock';
import * as Keychain from 'react-native-keychain';
import {API_root} from '@env';

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
    marginVertical: 20,
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
  const [status, setStatus] = useState({pending: true, recommendations: []});
  const [ingredients, setIngredients] = useState({page: 0, items: []});
  const [totalPage, setTotalPage] = useState(0);

  const updateSearch = search => {
    setSearch(search);
  };

  const getIngredientsPageNumber = userToken => {
    fetch(`${API_root}/storage/pageNumber`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${userToken.password}`,
      },
    })
      .then(resp => resp.json())
      .then(data => setTotalPage(data.message));
  };

  const getIngredients = (userToken, currPage) => {
    fetch(`${API_root}/storage/ingredients?page=${currPage}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${userToken.password}`,
      },
    })
      .then(resp => resp.json())
      .then(data => setIngredients({page: currPage, items: data.message}));
  };

  const handlePageChange = async currPage => {
    userToken = await Keychain.getGenericPassword();
    getIngredients(userToken, currPage);
  };

  useEffect(() => {
    setStatus({pending: true, recommendations: []});
    Keychain.getGenericPassword().then(userToken => {
      getIngredientsPageNumber(userToken);
      getIngredients(userToken, 0);

      fetch(`${API_root}/meal/recipeByIngredient`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${userToken.password}`,
        },
      })
        .then(resp => resp.json())
        .then(data =>
          setStatus({pending: false, recommendations: data.message}),
        );
    });
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.appArea}>
        {status.pending ? (
          <ActivityIndicator />
        ) : (
          <>
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
                  onPress={() =>
                    navigation.navigate({
                      name: 'RecipeDetails',
                      params: {recipeID: status.recommendations[0].id},
                    })
                  }
                  foodName={status.recommendations[0].title}
                  // difficulity="Medium"
                  foodImageUrl={status.recommendations[0].image}
                  // foodName="Pasta"
                  // foodImageUrl="https://picsum.photos/700"
                />
              </View>
            </View>
            <View>
              <Text style={styles.headerText}>Current Stock</Text>
              <Card style={{marginHorizontal: 10, borderRadius: 5}}>
                <CurrentStock
                  ingredients={ingredients}
                  totalPage={totalPage}
                  handlePageChange={page => handlePageChange(page)}
                />
              </Card>
            </View>
          </>
        )}
      </View>
    </ScrollView>
  );
}

export default Main;
