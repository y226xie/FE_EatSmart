import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {SearchBar} from 'react-native-elements';
import RecipeRecommendation from '../utils/RecipeRecommendation';
import {DataTable, Card} from 'react-native-paper';

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
  userName: {
    marginVertical: 10,
    fontSize: 20,
    marginLeft: 18,
  },
  headerText: {
    fontSize: 20,
    marginVertical: 10,
    marginLeft: 18,
    fontWeight: 'bold',
  },
  recipe: {
    marginBottom: 20,
  },
  horizontal: {
    flexDirection: 'row',
  },
});

const optionsPerPage = [2, 3, 4];

function HomeScreen({navigation}) {
  const [search, setSearch] = useState('');

  const updateSearch = search => {
    setSearch(search);
  };

  const [page, setPage] = React.useState(0);
  const [itemsPerPage, setItemsPerPage] = React.useState(optionsPerPage[0]);

  React.useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  return (
    <View style={styles.container}>
      <View style={styles.appArea}>
        <View>
          <Text style={styles.title}>Welcome Back!</Text>
          <Text style={styles.userName}>Fuhai!</Text>
        </View>
        <View style={{marginHorizontal: 18}}>
          <SearchBar
            inputStyle={{backgroundColor: 'white'}}
            containerStyle={{
              backgroundColor: 'white',
              borderTopWidth: 0,
              borderBottomWidth: 0,
              borderRadius: 15,
              width: 320,
            }}
            inputContainerStyle={{
              backgroundColor: 'white',
              borderWidth: 0,
              fontSize: 5,
              height: 30,
            }}
            onChangeText={updateSearch}
            value={search}
            placeholder="search"
          />
        </View>
        <Text style={styles.headerText}>Today's recipe recommendation</Text>
        <View style={styles.recipe}>
          <View style={styles.horizontal}>
            <RecipeRecommendation
              foodName="Pasta"
              difficulity="Medium"
              foodImageUrl="https://picsum.photos/700"
            />
            <RecipeRecommendation
              foodName="Noodle"
              difficulity="Hard"
              foodImageUrl="https://picsum.photos/700"
            />
          </View>
        </View>
        <View styles={styles.elementMargin}>
          <Text style={styles.headerText}>Current Stock</Text>
          <Card style={{marginHorizontal: 10, borderRadius: 5}}>
            <DataTable>
              <DataTable.Row>
                <DataTable.Cell>Frozen yogurt</DataTable.Cell>
                <DataTable.Cell numeric>500g</DataTable.Cell>
                <DataTable.Cell numeric>1 week</DataTable.Cell>
              </DataTable.Row>

              <DataTable.Row>
                <DataTable.Cell>Ice cream sandwich</DataTable.Cell>
                <DataTable.Cell numeric>237g</DataTable.Cell>
                <DataTable.Cell numeric>2 week</DataTable.Cell>
              </DataTable.Row>
              <DataTable.Row>
                <DataTable.Cell>Ice cream sandwich</DataTable.Cell>
                <DataTable.Cell numeric>237g</DataTable.Cell>
                <DataTable.Cell numeric>2 week</DataTable.Cell>
              </DataTable.Row>

              <DataTable.Pagination
                page={page}
                numberOfPages={3}
                onPageChange={page => setPage(page)}
                label="1-2 of 6"
                optionsPerPage={optionsPerPage}
                itemsPerPage={itemsPerPage}
                setItemsPerPage={setItemsPerPage}
                showFastPagination
                optionsLabel={'Rows per page'}
              />
            </DataTable>
          </Card>
        </View>
      </View>
      {/* <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      /> */}
    </View>
  );
}

export default HomeScreen;
