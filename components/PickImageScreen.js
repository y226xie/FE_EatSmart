import React, { Fragment, Component } from 'react';
// import * as ImagePicker from 'react-native-image-picker';
import ImagePicker, {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import {API_root} from '@env';

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  Button,
  Dimensions,
  TouchableOpacity
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const options = {
  title: 'Select Avatar',
  customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

export default class PickImageScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      filepath: {
        data: '',
        uri: ''
      },
      fileData: '',
      fileUri: ''
    }
  }

  createFormData = (photo, body = {}) => {
    const data = new FormData();

    data.append('photo', {
      name: photo.fileName,
      type: photo.type,
      uri: Platform.OS === 'ios' ? photo.uri.replace('file://', '') : photo.uri,
    });
  
    Object.keys(body).forEach((key) => {
      data.append(key, body[key]);
    });
  
    return data;
  }

  handleUploadPhoto = (photo) => {
    const imageData = this.createFormData(photo, {userId: '123'});

    fetch(`${API_root}/storage/image`, {
      method: 'POST',
      body: imageData,
    })
    .then((response) => response.json())
    .then((data) => console.log('response', data))
    .catch((error) => console.log('error', error));
  }

  openCamera = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    launchCamera(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        const source = { uri: response.uri };
        console.log('response', JSON.stringify(response));
        // this.setState({
        //   filePath: response,
        //   fileData: response.data,
        //   fileUri: response.uri
        // });
        this.handleUploadPhoto(response.assets[0])
      }
    });

  }

  openImageLibrary = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    launchImageLibrary(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        const source = { uri: response.uri };
        console.log('response', JSON.stringify(response));
        // this.setState({
        //   filePath: response,
        //   fileData: response.data,
        //   fileUri: response.uri
        // });
        this.handleUploadPhoto(response.assets[0])
      }
    });

  }

  renderFileData() {
    if (this.state.fileData) {
      return <Image source={{ uri: 'data:image/jpeg;base64,' + this.state.filePath }}
        style={styles.images}
      />
    } else {
      return <Image source={require('./assets/dummy.png')}
        style={styles.images}
      />
    }
  }

  renderFileUri() {
    if (this.state.fileUri) {
      return <Image
        source={{ uri: this.state.filePath }}
        style={styles.images}
      />
    } else {
      return <Image
        source={require('./assets/galeryImages.jpg')}
        style={styles.images}
      />
    }
  }
  render() {
    return (
      <Fragment>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <View style={styles.body}>
            <Text style={{textAlign:'center',fontSize:20,paddingBottom:10}} >Pick Images from Camera & Gallery</Text>
            <View style={styles.ImageSections}>
              <View>
                {this.renderFileData()}
                <Text  style={{textAlign:'center'}}>Base 64 String</Text>
              </View>
              <View>
                {this.renderFileUri()}
                <Text style={{textAlign:'center'}}>File Uri</Text>
              </View>
            </View>

            <View style={styles.btnParentSection}>

              <TouchableOpacity onPress={this.openCamera} style={styles.btnSection}  >
                <Text style={styles.btnText}>Directly Launch Camera</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={this.openImageLibrary} style={styles.btnSection}  >
                <Text style={styles.btnText}>Directly Launch Image Library</Text>
              </TouchableOpacity>
            </View>

          </View>
        </SafeAreaView>
      </Fragment>
    );
  }
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },

  body: {
    backgroundColor: Colors.white,
    justifyContent: 'center',
    borderColor: 'black',
    borderWidth: 1,
    height: Dimensions.get('screen').height - 20,
    width: Dimensions.get('screen').width
  },
  ImageSections: {
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingVertical: 8,
    justifyContent: 'center'
  },
  images: {
    width: 150,
    height: 150,
    borderColor: 'black',
    borderWidth: 1,
    marginHorizontal: 3
  },
  btnParentSection: {
    alignItems: 'center',
    marginTop:10
  },
  btnSection: {
    width: 225,
    height: 50,
    backgroundColor: '#DCDCDC',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
    marginBottom:10
  },
  btnText: {
    textAlign: 'center',
    color: 'gray',
    fontSize: 14,
    fontWeight:'bold'
  }
});
