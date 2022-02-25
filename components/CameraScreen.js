import React, { useState, useEffect } from 'react';
import { StyleSheet ,Text, View, Button, Image} from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { Camera, useCameraDevices } from 'react-native-vision-camera';

export default function CameraScreen() {
    const [hasPermission, setHashPermission] = useState(false);

    useEffect(() => {
        Camera.requestCameraPermission().then(status => {
            if (status === 'authorized') {
                setHashPermission(true);
            }
        });
    }, []);

    const devices = useCameraDevices();
    const device = devices.back;

    if (!hasPermission) {
        return (
            <View style={styles.container}>
                <ActivityIndicator color="while" />
            </View>
        );
    }

    if (device == null) {
        console.log("@@@@@@@@@")
        return (
            <View style={styles.container}>
                <ActivityIndicator color="white"/>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Camera style={StyleSheet.absoluteFill} device={device} isActive={true} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    }
})

// import React, { PureComponent } from 'react';
// import { AppRegistry, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// import { RNCamera } from 'react-native-camera';

// const PendingView = () => (
//   <View
//     style={{
//       flex: 1,
//       backgroundColor: 'lightgreen',
//       justifyContent: 'center',
//       alignItems: 'center',
//     }}
//   >
//     <Text>Waiting</Text>
//   </View>
// );

// export default class CameraScreen extends PureComponent {
//   render() {
//     return (
//       <View style={styles.container}>
//         <RNCamera
//           style={styles.preview}
//           type={RNCamera.Constants.Type.back}
//           flashMode={RNCamera.Constants.FlashMode.on}
//           androidCameraPermissionOptions={{
//             title: 'Permission to use camera',
//             message: 'We need your permission to use your camera',
//             buttonPositive: 'Ok',
//             buttonNegative: 'Cancel',
//           }}
//         >
//           {({ camera, status }) => {
//             if (status !== 'READY') return <PendingView />;
//             return (
//               <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
//                 <TouchableOpacity onPress={() => this.takePicture(camera)} style={styles.capture}>
//                   <Text style={{ fontSize: 14 }}> SNAP </Text>
//                 </TouchableOpacity>
//               </View>
//             );
//           }}
//         </RNCamera>
//       </View>
//     );
//   }

//   takePicture = async function(camera) {
//     const options = { quality: 0.5, base64: true };
//     const data = await camera.takePictureAsync(options);
//     //  eslint-disable-next-line
//     console.log(data.uri);
//   };
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     flexDirection: 'column',
//     backgroundColor: 'black',
//   },
//   preview: {
//     flex: 1,
//     justifyContent: 'flex-end',
//     alignItems: 'center',
//   },
//   capture: {
//     flex: 0,
//     backgroundColor: '#fff',
//     borderRadius: 5,
//     padding: 15,
//     paddingHorizontal: 20,
//     alignSelf: 'center',
//     margin: 20,
//   },
// });
// import React from 'react';

// import { CameraScreen } from 'react-native-camera-kit';
// import { Camera, CameraType } from 'react-native-camera-kit';


// export default function PhotoCameraScreen() {
//     return (
//         <CameraScreen
//   actions={{ rightButtonText: 'Done', leftButtonText: 'Cancel' }}
//   onBottomButtonPressed={(event) => this.onBottomButtonPressed(event)}
// //   flashImages={{
// //     // optional, images for flash state
// //     on: require('componentes'),
// //     off: require('componentes'),
// //     auto: require('componentes'),
// //   }}
// //   cameraFlipImage={require('componentes')} // optional, image for flipping camera button
// //   captureButtonImage={require('componentes')} // optional, image capture button
// //   torchOnImage={require('componentes')} // optional, image for toggling on flash light
// //   torchOffImage={require('componentes')} // optional, image for toggling off flash light
//   hideControls={false} // (default false) optional, hides camera controls
//   showCapturedImageCount={false} // (default false) optional, show count for photos taken during that capture session
// />
//     )
// }