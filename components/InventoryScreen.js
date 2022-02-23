import React, {Component} from 'react';
import {Button, View, Text, ActivityIndicator, StyleSheet} from 'react-native';
import { IngredientInformation } from './IngredientInformation';
import styled from 'styled-components/native';
const TEST = [{}, {}, {}];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    backgroundColor: 'rgb(242, 243, 237)',
  },
  appArea: {
    marginTop: 80,
    marginHorizontal: 18,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginLeft: 18,
  },
})

export default class InventoryScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      isLoading: true
    };
  }


  async getIngredients() {
    try {
      const response = await fetch('http:localhost:4000/storage/ingredients', {
        headers: {
          'Authorization': `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTY0NTU1NzkyNSwianRpIjoiYjk3NjI0YWUtYjQ3Ni00YjVhLTk2OTUtYTA5ODdiZDQyMmMwIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6eyJfaWQiOiI2MWQyZjViODY0MWJmNTk1YzI0MjA5MjkiLCJmaXJzdE5hbWUiOiJGdWhhaSIsImxhc3ROYW1lIjoiR2FvIiwiZW1haWwiOiJmaGFpLmdhb0BnbWFpbC5jb20iLCJwYXNzd29yZCI6InRlc3QifSwibmJmIjoxNjQ1NTU3OTI1LCJleHAiOjE2NDU2NDQzMjV9.Pl5nUbT4aGKbyqsTkQS8JSgpcKqBKatUVM-ZTEVY7fQ`,
          'page': '1'
        }
      });
      const json = await response.json();
      this.setState({data: json.message})
    } catch (error) {
      console.log(error.message)
    } finally {
      this.setState({ isLoading: false});
    }
  }

  componentDidMount() {
    this.getIngredients();
  }


  render() {
    const {data, isLoading} = this.state;


    return (
      <View style={styles.container}>
        {isLoading ? <ActivityIndicator/> : (
            <View style={styles.appArea}>
              <Text style={styles.title}>Ingredient Information</Text>
              <View>
                {data.map((t, i) => {
                    return <IngredientInformation 
                    key={i} data={t}
                    />
                })}
              </View>
            </View>

        )}
      </View>
    )
  }
}

// function MenuScreen({navigation}) {
//   return (
    
//     // <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
//     //   <Text>Profile Screen</Text>
//     //   <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
//     // </View>
//     <>
//     <View>
//       <Text 
//       // style={styles.title}
//       >Ingredient Information</Text>
      
//       </View>
//       <Container>
//           {TEST.map((t, i) => {
//               return <IngredientInformation key={i} />
//           })}
//       </Container>
//     </>
//   );
// }

// const Container = styled.View`

// `
// export default MenuScreen;
