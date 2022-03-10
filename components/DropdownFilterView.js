import React, {useEffect, useState} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import {View, Dimensions} from 'react-native';

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;

export default function DropDownFilterView({
  items,
  value,
  setValue,
  zIndexInverse,
  placeholder,
  customStyle,
}) {
  const [open, setOpen] = useState(false);

  return (
    <View style={customStyle}>
      <DropDownPicker
        style={{marginVertical: 10}}
        placeholderStyle={{fontWeight: '500'}}
        badgeColors="#FDE7B6"
        badgeDotColors="black"
        searchable={true}
        multiple={true}
        itemSeparator={true}
        closeAfterSelecting={true}
        mode="BADGE"
        min={0}
        max={5}
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        // setItems={setItems}
        //zIndex={zIndex}
        zIndexInverse={zIndexInverse}
        placeholder={placeholder}
      />
    </View>
  );
}
