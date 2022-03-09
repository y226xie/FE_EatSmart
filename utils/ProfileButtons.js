import * as React from 'react';
import {
  TouchableOpacity,
  View,
  StyleSheet,
  Dimensions,
  Text,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

const screenHeight = Dimensions.get('screen').height;
const screenWidth = Dimensions.get('screen').width;

const styles = StyleSheet.create({
  mycollection: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 8,
    marginHorizontal: screenWidth * 0.02,
    marginVertical: 10,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOpacity: 0.8,
    shadowRadius: 15,
    shadowOffset: {width: 1, height: 13},
  },
  btnText: {
    marginTop: 7,
    marginLeft: 10,
    fontSize: 14,
  },
});

function ProfileButton({buttonText, buttonImage}) {
  return (
    <TouchableOpacity style={styles.mycollection}>
      <View
        style={{
          borderRadius: 100,
          backgroundColor: '#FDE7B6',
          width: 30,
          height: 30,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <AntDesign name={buttonImage} size={20} color="gray" />
      </View>

      <Text style={styles.btnText}>{buttonText}</Text>
    </TouchableOpacity>
  );
}

export default ProfileButton;
