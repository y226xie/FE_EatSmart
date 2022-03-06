import React from 'react';
import {
  Text,
  Image,
  SafeAreaView,
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {Card} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';

const screenHeight = Dimensions.get('screen').height;
const screenWidth = Dimensions.get('screen').width;

export default function RecipeDisplayView({route, navigation}) {
  const recipes = route.params.recipes;
  console.log(recipes[0]);

  const styles = StyleSheet.create({
    container: {
      backgroundColor: 'rgb(242, 243, 237)',
      // alignContent: 'center',
      // justifyContent: 'center',
    },
    tinyLogo: {
      marginTop: screenHeight * 0.015,
      width: screenWidth * 0.2,
      height: screenHeight * 0.1,
      marginLeft: screenWidth * 0.04,
    },
    logo: {
      width: 66,
      height: 58,
    },
    card: {
      BackgroundColor: '#FAFAF8',
      marginHorizontal: 18,
      borderRadius: 15,
      marginVertical: 5,
      height: screenHeight * 0.13,
      justifyContent: 'center',
      alignContent: 'center',
      borderWidth: 1,
    },
    backButton: {
      marginTop: 15,
      width: 40,
      height: 40,
      padding: 5,
      borderRadius: 100,
      backgroundColor: 'rgb(143, 126,110)',
    },
  });

  return (
    // <SafeAreaView style={styles.container}>
    <ScrollView style={{backgroundColor: 'rgb(242, 243, 237)'}}>
      <View style={{flexDirection: 'row', marginTop: 30, marginLeft: 18}}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={30} color="white" />
        </TouchableOpacity>
        <Text
          style={{
            fontWeight: 'bold',
            marginTop: 20,
            marginBottom: 20,
            marginLeft: 20,
            fontSize: 24,
          }}>
          Recipes Library
        </Text>
      </View>

      {recipes.map((recipe, i) => {
        return (
          <Card 
            key={i} 
            style={styles.card}
            onPress={() => {
              navigation.navigate({
                name: 'RecipeDetails',
                params: {recipeID: recipe.id},
              })
            }}>
            <View style={{flexDirection: 'row'}}>
              <Image style={styles.tinyLogo} source={{uri: recipe.image}} />
              <Text
                style={{
                  marginLeft: 10,
                  marginTop: screenHeight * 0.045,
                  flexShrink: 1,
                  fontWeight: 'bold',
                }}>
                {recipe.title}
              </Text>
            </View>
          </Card>
        );
      })}
    </ScrollView>
    // </SafeAreaView>
  );
}
