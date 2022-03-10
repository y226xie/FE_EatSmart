import React, {Fragment, Component} from 'react';
import ImagePicker, {
  launchImageLibrary,
  launchCamera,
} from 'react-native-image-picker';
import {API_root} from '@env';
import * as Keychain from 'react-native-keychain';

import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {ScreenWidth, ScreenHeight} from 'react-native-elements/dist/helpers';

export default class PickImageScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filepath: {
        data: '',
        uri: '',
      },
      fileData: '',
      fileUri: '',
      pending: false,
    };

    this.props.showAlert = this.props.showAlert.bind(this);
  }

  createFormData = (photo, body = {}) => {
    const data = new FormData();

    data.append('photo', {
      name: photo.fileName,
      type: photo.type,
      uri: Platform.OS === 'ios' ? photo.uri.replace('file://', '') : photo.uri,
    });
    data.append('filename', photo.fileName);

    Object.keys(body).forEach(key => {
      data.append(key, body[key]);
    });

    return data;
  };

  handleUploadPhoto = async photo => {
    this.setState({pending: true});
    const imageData = this.createFormData(photo, {userId: '123'});
    const userToken = await Keychain.getGenericPassword();

    try {
      const response = await fetch(`${API_root}/storage/image`, {
        method: 'POST',
        body: imageData,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${userToken.password}`,
        },
      });

      const json = await response.json();
      this.setState({pending: false});
      this.props.closeImageScreen();
      this.props.showAlert(true);
      console.log('response', json);
    } catch (error) {
      this.setState({pending: false});
      this.props.closeImageScreen();
      this.props.showAlert(false);
      console.log('response', error);
    } finally {
    }
  };

  openCamera = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    launchCamera(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        const source = {uri: response.uri};
        // console.log('response', JSON.stringify(response));
        this.handleUploadPhoto(response.assets[0]);
      }
    });
  };

  openImageLibrary = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    launchImageLibrary(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        const source = {uri: response.uri};
        // console.log('response', JSON.stringify(response));
        this.handleUploadPhoto(response.assets[0]);
      }
    });
  };

  renderFileData() {
    if (this.state.fileData) {
      return (
        <Image
          source={{uri: 'data:image/jpeg;base64,' + this.state.filePath}}
          style={styles.images}
        />
      );
    } else {
      return (
        <Image source={require('./assets/dummy.png')} style={styles.images} />
      );
    }
  }

  renderFileUri() {
    if (this.state.fileUri) {
      return (
        <Image source={{uri: this.state.filePath}} style={styles.images} />
      );
    } else {
      return (
        <Image
          source={require('./assets/galeryImages.jpg')}
          style={styles.images}
        />
      );
    }
  }
  render() {
    return (
      <Fragment>
        {this.state.pending ? (
          <ActivityIndicator size={'large'} color={'black'} />
        ) : (
          <View style={styles.btnParentSection}>
            <TouchableOpacity
              onPress={this.openCamera}
              style={styles.btnSection}>
              <Text style={styles.btnText}>Directly Launch Camera</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={this.openImageLibrary}
              style={styles.btnSection}>
              <Text style={styles.btnText}>Directly Launch Image Library</Text>
            </TouchableOpacity>
          </View>
        )}
      </Fragment>
    );
  }
}

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
    width: Dimensions.get('screen').width,
  },
  ImageSections: {
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingVertical: 8,
    justifyContent: 'center',
  },
  images: {
    width: 150,
    height: 150,
    borderColor: 'black',
    borderWidth: 1,
    marginHorizontal: 3,
  },
  btnParentSection: {
    alignItems: 'center',
    marginTop: 10,
  },
  btnSection: {
    width: ScreenWidth * 0.55,
    height: ScreenHeight * 0.05,
    backgroundColor: 'rgb(255, 206,97)',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
    marginBottom: 10,
    borderWidth: 1,
  },
  btnText: {
    textAlign: 'center',
    color: 'black',
    fontSize: 14,
    fontWeight: '500',
  },
});
