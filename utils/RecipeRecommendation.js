import React, {useState} from 'react';
import {Dimensions, Text, Image, View} from 'react-native';
import {Card, Title, Paragraph} from 'react-native-paper';

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;

function RecipeRecommendation({onPress, foodName, difficulity, foodImageUrl}) {
  return (
    <Card
      onPress={onPress}
      style={{
        width: screenWidth * 0.82,
        height: screenHeight * 0.22,
        marginLeft: screenWidth * 0.05,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
      }}>
      <Text
        style={{
          marginTop: 15,
          marginBottom: 10,
          marginHorizontal: 50,
          fontSize: 14,
          fontWeight: '500',
        }}>
        {foodName}
      </Text>
      <View style={{marginLeft: 100}}>
        <Image
          style={{
            width: screenWidth * 0.2,
            height: screenHeight * 0.1,
          }}
          source={{uri: foodImageUrl}}></Image>
        <Text style={{marginTop: 10, marginLeft: -10, fontWeight: '500'}}>
          Difficulity: Hard
        </Text>
      </View>
    </Card>
  );
}

export default RecipeRecommendation;
