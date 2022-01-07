import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Camera } from "expo-camera";

class CameraScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
        hasCameraPermissions: null,
        type: Camera.Constants.Type.back
    };
    this.camera = React.createRef();
  }

  async ComponentDidMount(){
      let { status } = await Camera.requestCameraPermissionsAsync();
      this.setState({ hasCameraPermissions: status == "granted" })
  }

  render() {
    const { hasCameraPermissions } = this.state;
    if( hasCameraPermissions == null )
    {
        return <View />;
    }
    else if( hasCameraPermissions === false )
    {
        return <Text>Brak dostępu do kamery</Text>
    }
    else
    {
        return(
            <View style={{flex: 1}}>
                <Camera
                    ref={ ref => {this.camera = ref; }}
                    style={{flex: 1}}
                    type={this.state.type}>

                    <View style={{flex: 1}}></View>
                </Camera>
            </View>
        )
    }
  }
}

export default CameraScreen;
