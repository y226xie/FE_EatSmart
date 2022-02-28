import React from 'react';
import { Text, Image, SafeAreaView, View, StyleSheet } from "react-native";

export default function RecipeDisplayView({route, navigaation}) {
    const recipes = route.params.recipes;
    console.log(recipes[0]);

    const styles = StyleSheet.create({
        container: {
          paddingTop: 50,
        },
        tinyLogo: {
          width: 50,
          height: 50,
        },
        logo: {
          width: 66,
          height: 58,
        },
      });

    return (
        <SafeAreaView>
            {recipes.map((recipe, i) => {
                return (
                    <View key={i}>
                    <Text>
                        {recipe.title}
                    </Text>
                    <Image style={styles.tinyLogo} source={{uri: recipe.image}}/>
                    </View>
                )
            })}
        </SafeAreaView>
    )
}