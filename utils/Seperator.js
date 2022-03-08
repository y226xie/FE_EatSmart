import React from 'react';
import {View} from 'react-native';

function Seperator() {
  return (
    <View
      style={{
        borderStyle: 'dotted',
        borderWidth: 1,
        borderRadius: 1,
        marginHorizontal: 10,
        borderColor: 'gray',
      }}></View>
  );
}

export default Seperator;
