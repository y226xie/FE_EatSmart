import React, {useState, useEffect} from 'react';

// import all the components we are going to use
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  FlatList,
  TextInput,
  Keyboard,
  TouchableOpacity,
  ScrollView,
  Pressable,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function SearchFilterView(props) {
  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState(props.data);
  const [isFocused, setFocus] = useState(false);

  const searchFilterFunction = text => {
    if (text) {
      const newData = props.data.filter(function (item) {
        const itemData = item ? item.toLowerCase() : ''.toLowerCase();
        const textData = text.toLowerCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      setFilteredDataSource(props.data);
      setSearch(text);
    }
  };

  const ItemView = ({item}) => {
    return (
      // Flat List Item
      <Text style={styles.itemStyle} onPress={() => props.pushItem(item)}>
        {item.toLowerCase()}
      </Text>
    );
  };

  const ItemSeparatorView = () => {
    return (
      // Flat List Item Separator
      <View
        style={{
          height: 0.5,
          width: '100%',
          backgroundColor: '#C8C8C8',
        }}
      />
    );
  };

  // const addItem = (item) => {
  //   setSelectedItems(selectedItems =>[...selectedItems, item]);
  // };

  // const handleRemove = (item) => {
  //   console.log("remove");
  //   setSelectedItems(selectedItems.filter(x => x !== item));
  // }

  const displaySelectedItems = () => {
    return [...props.selectedItems].map((item, i) => {
      return (
        <View
          key={item}
          style={[
            styles.selectedItems,
            {
              width: item.length * 8 + 60,
              justifyContent: 'center',
              height: 40,
              borderColor: '#00A5FF',
            },
          ]}>
          <Text
            style={[
              {
                flex: 1,
                color: '#00A5FF',
                fontSize: 15,
              },
            ]}
            numberOfLines={1}>
            {item}
          </Text>
          <TouchableOpacity onPress={() => props.popItem(item)}>
            <Icon
              name="close-circle"
              style={{
                color: '#C62828',
                fontSize: 22,
                marginLeft: 10,
              }}
            />
          </TouchableOpacity>
        </View>
      );
    });
  };

  return (
    <View style={styles.container}>
      <Text>{props.name}</Text>
      <TextInput
        style={styles.textInputStyle}
        onChangeText={text => searchFilterFunction(text)}
        value={search}
        // underlineColorAndroid="transparent"
        placeholder="Search"
        autoCapitalize="none"
        autoCorrect={false}
        onFocus={() => setFocus(true)}
        onBlur={() => {
          setTimeout(() => {
            setFocus(false);
          }, 800);
        }}
      />

      <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
        {/* {selectedItems.map((item, i) => {
            {displaySelectedItem(item)}
          })} */}
        {displaySelectedItems()}
      </View>
      {isFocused && (
        <FlatList
          nestedScrollEnabled
          data={filteredDataSource}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={ItemSeparatorView}
          renderItem={ItemView}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    // height: 300,
  },
  itemStyle: {
    padding: 10,
  },
  textInputStyle: {
    height: 40,
    borderWidth: 1,
    paddingLeft: 20,
    margin: 5,
    borderColor: '#009688',
    backgroundColor: '#FFFFFF',
  },
  selectedItems: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 15,
    paddingTop: 3,
    paddingRight: 3,
    paddingBottom: 3,
    margin: 3,
    borderRadius: 20,
    borderWidth: 2,
  },
});
