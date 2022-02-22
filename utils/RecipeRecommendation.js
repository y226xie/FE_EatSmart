import React, {useState} from 'react';
import {Card, Title, Paragraph} from 'react-native-paper';

function RecipeRecommendation({onPress, foodName, difficulity, foodImageUrl}) {
  return (
    <Card
      onPress={onPress}
      style={{
        width: 150,
        height: 200,
        marginLeft: 18,
        alignItems: 'center',
      }}>
      <Card.Content>
        <Title style={{marginLeft: 20, marginBottom: 10}}>{foodName}</Title>
        <Card.Cover
          style={{width: 100, height: 100}}
          source={{uri: foodImageUrl}}
        />
        <Paragraph style={{marginTop: 10}}>Level: {difficulity}</Paragraph>
      </Card.Content>
    </Card>
  );
}

export default RecipeRecommendation;
