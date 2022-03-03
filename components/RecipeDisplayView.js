import React from 'react';
import {
  Text,
  Image,
  SafeAreaView,
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import {Card} from 'react-native-paper';

const screenHeight = Dimensions.get('screen').height;
const screenWidth = Dimensions.get('screen').width;

export default function RecipeDisplayView({route, navigaation}) {
  const recipes = route.params.recipes;
  console.log(recipes[0]);

  const styles = StyleSheet.create({
    container: {
      backgroundColor: 'rgb(242, 243, 237)',
      alignContent: 'center',
      justifyContent: 'center',
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
      marginRight: 20,
      borderRadius: 15,
      marginVertical: 5,
      height: screenHeight * 0.13,
      justifyContent: 'center',
      alignContent: 'center',
      borderWidth: 1,
      // shadowColor: 'rgba(0, 0, 0, 0.1)',
      // shadowOpacity: 0.8,
      // shadowRadius: 15,
      // shadowOffset: {width: 1, height: 13},
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{marginLeft: 20}}>
        <Text
          style={{
            fontWeight: 'bold',
            marginTop: 20,
            marginBottom: 20,
            fontSize: 24,
          }}>
          Recipes Library
        </Text>
        {recipes.map((recipe, i) => {
          return (
            <Card key={i} style={styles.card}>
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
    </SafeAreaView>
  );
}
