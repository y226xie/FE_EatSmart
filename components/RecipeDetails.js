import * as React from 'react';
import {
  View,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {DataTable, Card} from 'react-native-paper';
import {RecipeDetailsImage} from '../images';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import StarRating from 'react-native-star-rating';

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    backgroundColor: 'rgb(242, 243, 237)',
  },
  backgroudImage: {
    width: screenWidth,
    height: 200,
  },
  backButton: {
    marginTop: -120,
    zIndex: 10,
    marginLeft: 30,
    width: 50,
    height: 50,
    padding: 10,
    borderRadius: 100,
    backgroundColor: 'rgb(143, 126,110)',
  },
  foodInfo: {
    marginTop: 20,
    zIndex: 10,
    alignSelf: 'stretch',
    height: 100,
    marginHorizontal: 30,
    alignItems: 'center',
    backgroundColor: 'rgb(255, 255, 255)',
    borderRadius: 15,
  },
  foodName: {
    fontSize: 18,
    fontWeight: '400',
    marginTop: 20,
  },
  rating: {
    marginTop: 20,
  },
  collect: {
    alignItems: 'center',
    backgroundColor: 'rgb(255, 255, 255)',
    borderRadius: 15,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginLeft: 30,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOpacity: 0.8,
    shadowRadius: 15,
    shadowOffset: {width: 1, height: 13},
  },
  toolsInfo: {
    marginTop: 20,
    zIndex: 10,
    alignSelf: 'stretch',
    height: screenHeight * 0.26,
    marginHorizontal: 30,
    backgroundColor: 'rgb(255, 255, 255)',
    borderRadius: 15,
  },
  ingredients: {
    marginLeft: 30,
    marginTop: 20,
  },
  ingredientList: {
    width: screenWidth * 0.85,
    marginVertical: 10,
  },
  cookingBtn: {
    justifyContent: 'center',
    backgroundColor: 'rgb(255, 231, 175)',
    borderRadius: 15,
    marginLeft: 30,
    borderWidth: 1,
    paddingHorizontal: 65,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOpacity: 0.8,
    shadowRadius: 15,
    shadowOffset: {width: 1, height: 13},
  },
});
const stock_items = [
  {name: 'Yogurt', weight: '500g', expiry: '1 week'},
  {name: 'Beef', weight: '1 box', expiry: '1 week'},
];

function RecipeDetails({navigation}) {
  return (
    <View style={styles.container}>
      <View>
        <Image style={styles.backgroudImage} source={RecipeDetailsImage} />
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={30} color="white" />
        </TouchableOpacity>
      </View>

      <View style={styles.foodInfo}>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.foodName}>Noodles</Text>
          <View style={{marginTop: 25, marginLeft: 20, flexDirection: 'row'}}>
            <StarRating
              disabled={true}
              starSize={18}
              rating={4.5}
              fullStarColor={'rgb(240, 203, 94)'}
            />
            <Text style={{marginLeft: 10}}>4.5</Text>
          </View>
        </View>
        <View style={{flexDirection: 'row', marginTop: 20}}>
          <Text> Difficulity: Easy </Text>
          <Text> Time: 20 mins</Text>
        </View>
      </View>

      <View style={styles.toolsInfo}>
        <View style={{marginLeft: 30}}>
          <View style={{flexDirection: 'row', marginTop: 20}}>
            <FontAwesome5Icon name="utensils" size={20} />
            <Text style={{fontSize: 18, fontWeight: '400', marginLeft: 20}}>
              Utentils
            </Text>
          </View>
          <Text style={{marginTop: 20, marginHorizontal: 10}}>
            Cutting Board, Knife, 2 bowls, Cooking spoon, Towels
          </Text>
          <View style={{flexDirection: 'row', marginTop: 20}}>
            <Ionicons name="fast-food" size={20} />
            <Text style={{fontSize: 18, fontWeight: '400', marginLeft: 20}}>
              Nutrition Per Serving
            </Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <View style={{marginTop: 20, marginHorizontal: 20}}>
              <Text>Cal</Text>
              <Text style={{marginTop: 10}}>433</Text>
            </View>
            <View style={{marginTop: 20, marginHorizontal: 20}}>
              <Text>Fat</Text>
              <Text style={{marginTop: 10}}>10g</Text>
            </View>
            <View style={{marginTop: 20, marginHorizontal: 20}}>
              <Text>Carb</Text>
              <Text style={{marginTop: 10}}>20g</Text>
            </View>
            <View style={{marginTop: 20, marginHorizontal: 20}}>
              <Text>Protein</Text>
              <Text style={{marginTop: 10}}>30g</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.ingredients}>
        <Text style={{fontSize: 18, fontWeight: '500'}}>
          Required Ingredients
        </Text>

        <Card style={styles.ingredientList}>
          <DataTable color="black">
            <DataTable.Header>
              <DataTable.Title>Ingredient Name</DataTable.Title>
              <DataTable.Title numeric>Amount</DataTable.Title>
              <DataTable.Title numeric>Current</DataTable.Title>
            </DataTable.Header>
            <DataTable.Row>
              <DataTable.Cell>Frozen yogurt</DataTable.Cell>
              <DataTable.Cell numeric>159</DataTable.Cell>
              <DataTable.Cell numeric>6.0</DataTable.Cell>
            </DataTable.Row>

            <DataTable.Row>
              <DataTable.Cell>Ice cream sandwich</DataTable.Cell>
              <DataTable.Cell numeric>237</DataTable.Cell>
              <DataTable.Cell numeric>8.0</DataTable.Cell>
            </DataTable.Row>
          </DataTable>
        </Card>
      </View>

      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity style={styles.collect}>
          <Ionicons name="heart-outline" size={30} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.cookingBtn}>
          <Text style={{fontSize: 15}}>Start Cooking</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default RecipeDetails;
