import * as React from 'react';
import {View, Text, Image, StyleSheet, Dimensions} from 'react-native';
import {Card} from 'react-native-paper';
const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;

const styles = StyleSheet.create({
  image: {
    marginTop: -15,
    width: screenWidth * 0.25,
    height: screenHeight * 0.12,
    zIndex: 10,
    alignSelf: 'stretch',
    borderRadius: 5,
  },
  description: {
    marginHorizontal: 10,
    flexShrink: 1,
    marginTop: screenHeight * 0.01,
  },
  stepFont: {
    marginRight: 20,
    marginTop: 20,
    fontWeight: '500',
  },
  card: {
    width: screenWidth * 0.7,
    height: screenHeight * 0.1,
    borderRadius: 5,
  },
});

function Steps({currentStep, uri, description}) {
  const imageLink = uri ? uri : 'https://picsum.photos/700';
  return (
    <View
      style={{
        flexDirection: 'row',
        marginHorizontal: 30,
        marginTop: 30,
      }}>
      <Text style={styles.stepFont}>Step {currentStep}</Text>
      <Card style={styles.card}>
        <View style={{flexDirection: 'row'}}>
          <Image source={{imageLink}} style={styles.image} />
          <Text style={styles.description}>{description}</Text>
        </View>
      </Card>
    </View>
  );
}

export default Steps;
