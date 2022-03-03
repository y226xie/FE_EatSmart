import React, {useState} from 'react';
import {Dimensions, Text, Image} from 'react-native';
import {Card, Title, Paragraph} from 'react-native-paper';

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;

function RecipeRecommendation({onPress, foodName, difficulity, foodImageUrl}) {
  return (
    <Card
      onPress={onPress}
      style={{
        width: screenWidth * 0.82,
        height: screenHeight * 0.2,
        marginLeft: screenWidth * 0.05,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
      }}>
      <Text
        style={{
          marginTop: 10,
          marginBottom: 10,
          fontSize: 14,
          fontWeight: 'bold',
        }}>
        {foodName}
      </Text>
      <Image
        style={{
          width: screenWidth * 0.2,
          height: screenHeight * 0.1,
          marginLeft: 15,
        }}
        source={{uri: foodImageUrl}}></Image>
      <Text style={{marginLeft: 10, marginTop: 10, fontWeight: 'bold'}}>
        Level: Hard
      </Text>
    </Card>
  );
}

export default RecipeRecommendation;
