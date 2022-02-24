import * as React from 'react';
import {View, Image, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {RecipeDetailsImage} from '../images';
import Ionicons from 'react-native-vector-icons/Ionicons';
import StarRating from 'react-native-star-rating';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    backgroundColor: 'rgb(242, 243, 237)',
  },
  backgroudImage: {
    width: 400,
    height: 300,
  },
  backButton: {
    marginTop: -250,
    zIndex: 10,
    marginLeft: 30,
    width: 50,
    height: 50,
    padding: 10,
    borderRadius: 100,
    backgroundColor: 'rgb(143, 126,110)',
  },
  foodInfo: {
    marginTop: 150,
    zIndex: 10,
    alignSelf: 'stretch',
    height: 100,
    marginHorizontal: 30,
    alignItems: 'center',
    backgroundColor: 'rgb(250, 250, 250)',
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
    backgroundColor: 'rgb(250, 250, 250)',
    borderRadius: 15,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginLeft: 30,
  },
});

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

      <View></View>

      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity style={styles.collect}>
          <Ionicons name="heart-outline" size={30} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            backgroundColor: 'rgb(255, 231, 175)',
            borderRadius: 15,
            marginLeft: 30,
            borderWidth: 1,
            paddingHorizontal: 65,
          }}>
          <Text style={{fontSize: 15}}>Start Cooking</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default RecipeDetails;
