import React, { useEffect, useState } from "react";
import DropDownPicker from 'react-native-dropdown-picker';

export default function DropDownFilterView({items, value, setValue, zIndex, zIndexInverse}) {
    const [open, setOpen] = useState(false);
    
    // useEffect(() => {
    //     setIsOpened(key)
    // }, [open])

    return (
        <>
      <DropDownPicker
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
      />
      </>
  );
}