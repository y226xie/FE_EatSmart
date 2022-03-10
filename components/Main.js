import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
  Modal,
  RefreshControl,
} from 'react-native';
import {SearchBar} from 'react-native-elements';
import RecipeRecommendation from '../utils/RecipeRecommendation';
import {Card} from 'react-native-paper';
import CurrentStock from '../utils/CurrentStock';
import * as Keychain from 'react-native-keychain';
import {API_root} from '@env';
import Icon from 'react-native-vector-icons/FontAwesome';
import PickImageScreen from './PickImageScreen';
import AwesomeAlert from 'react-native-awesome-alerts';

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(242, 243, 237)',
  },
  appArea: {
    marginTop: screenHeight * 0.1,
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
  photoBtn: {
    position: 'absolute',
    right: 10,
    zIndex: 10,
    width: 45,
    height: 45,
    padding: 12,
    borderRadius: 100,
    backgroundColor: 'rgb(255, 206, 97)',
  },
  centerView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  modalView: {
    width: screenWidth * 0.83,
    height: screenHeight * 0.3,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 50,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

function Main({navigation}) {
  const [search, setSearch] = useState('');
  const updateSearch = search => {
    setSearch(search);
  };

  const [recommendation, setRecommendation] = useState({
    firstName: '',
    id: '',
    title: '',
    image: '',
  });
  const [ingredients, setIngredients] = useState({page: 0, items: []});
  const [totalPage, setTotalPage] = useState(0);
  const [visible, setVisible] = useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMsg, setAlertMsg] = useState({
    title: 'Sorry!',
    msg: 'There is an issue with your receipt, please try again later!',
    btnText: 'Try Again Later',
  });

  const showAlert = isSuccess => {
    if (isSuccess) {
      setAlertMsg({
        title: 'Congraluations!',
        msg: 'Your receipt has been uploaded successfully!',
        btnText: 'Tap to dismiss',
      });
    }
    setAlertVisible(true);
  };
  const hideAlert = () => setAlertVisible(false);

  const [refreshing, setRefreshing] = useState(true);

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

  const refreshHandler = async () => {
    userToken = await Keychain.getGenericPassword();
    getIngredientsPageNumber(userToken);
    getIngredients(userToken, 0);
    try {
      const response = await fetch(`${API_root}/meal/smartRecipe`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${userToken.password}`,
        },
      });
      const json = await response.json();
      console.log(json.message);
      setRecommendation(json.message);
    } catch (error) {
      console.log(error.message);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    refreshHandler();
  }, []);

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={refreshHandler} />
      }>
      {refreshing ? null : (
        <View style={styles.appArea}>
          <>
            <View>
              <AwesomeAlert
                show={alertVisible}
                showProgress={false}
                title={alertMsg.title}
                message={alertMsg.msg}
                closeOnTouchOutside={true}
                closeOnHardwareBackPress={false}
                showConfirmButton={true}
                confirmText={alertMsg.btnText}
                confirmButtonColor="#DD6B55"
                onCancelPressed={hideAlert}
                onConfirmPressed={hideAlert}
              />
              <Modal animationType="slide" visible={visible} transparent={true}>
                <View style={styles.centerView}>
                  <View style={styles.modalView}>
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: 'bold',
                        marginBottom: 10,
                        marginHorizontal: 20,
                      }}>
                      Upload Shopping Receipe for Scaning
                    </Text>
                    <TouchableOpacity
                      onPress={hideModal}
                      style={{position: 'absolute', right: 20, top: 20}}>
                      <Icon name="remove" size={20} color="black" />
                    </TouchableOpacity>

                    <PickImageScreen
                      closeImageScreen={hideModal}
                      showAlert={showAlert}
                    />
                  </View>
                </View>
              </Modal>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.title}>Welcome Back!</Text>
                <TouchableOpacity style={styles.photoBtn} onPress={showModal}>
                  <Icon name={'camera'} size={20} color="white" />
                </TouchableOpacity>
              </View>
              <Text style={styles.userName}>{recommendation.firstName}</Text>
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
                      params: {recipeID: recommendation.id},
                    })
                  }
                  foodName={recommendation.title}
                  foodImageUrl={recommendation.image}
                />
              </View>
            </View>
            <View>
              <Text style={styles.headerText}>Current Stock</Text>
              <Card
                style={{
                  marginHorizontal: 10,
                  borderRadius: 5,
                  marginBottom: 20,
                }}>
                <CurrentStock
                  ingredients={ingredients}
                  totalPage={totalPage}
                  handlePageChange={page => handlePageChange(page)}
                />
              </Card>
            </View>
          </>
        </View>
      )}
    </ScrollView>
  );
}

export default Main;
