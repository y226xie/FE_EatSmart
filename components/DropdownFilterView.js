import React, {useEffect, useState} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import {View} from 'react-native';

export default function DropDownFilterView({
  items,
  value,
  setValue,
  zIndex,
  zIndexInverse,
  placeholder,
}) {
  const [open, setOpen] = useState(false);

  return (
    <View style={{marginHorizontal: 15, zIndex: zIndex}}>
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
        zIndex={zIndex}
        zIndexInverse={zIndexInverse}
        placeholder={placeholder}
      />
    </View>
  );
}
