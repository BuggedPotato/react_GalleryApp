import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, FlatList } from 'react-native';
import * as MediaLibrary from "expo-media-library";

import FotoItem from './FotoItem';

class GalleryScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
        photos: [],
        columnNumber: 4,
        isGrid: true,
        screenW: Dimensions.get("screen").width,
        screenH: Dimensions.get("screen").height,
    };
    this._idk = null;

    this.gridOrList = this.gridOrList.bind(this);
    this.getPhotoComponent = this.getPhotoComponent.bind(this);
    this.showBigPhoto = this.showBigPhoto.bind(this);
    this.setPhotos = this.setPhotos.bind(this);
    
  }

  async componentDidMount()
  {
    this._idk = this.props.navigation.addListener('focus', async () => {
      await this.setPhotos();
    });
    await this.setPhotos();
  }

  componentWillUnmount() {
    this._idk();
  }

  async setPhotos()
  {
    let album = await MediaLibrary.getAlbumAsync("DCIM");
    let obj = await MediaLibrary.getAssetsAsync({
        album: album,
        first: 100,
        mediaType: ["photo"],
    });
    this.setState({
            photos: [...obj.assets],
        });
    // console.log( obj );
  }

  gridOrList()
  {
    this.setState({
        isGrid: !this.state.isGrid,
        columnNumber: !this.state.isGrid ? 4 : 1
    });
    // console.log(  );
  }

  getPhotoComponent( item )
  {
    if( !item )
        return;

    item = item.item;
    const w = this.state.screenW / ( this.state.isGrid ? 4 : 1 );
    const h = this.state.screenH / ( this.state.isGrid ? 10 : 4 );
    return ( 
        <FotoItem src={ item.uri } showBigPhoto={ this.showBigPhoto } width={ w } height={ h } id={ item.id } />
     );
  }

  showBigPhoto( photoId )
  {
      const photoObj = this.state.photos.find( ( el ) => { return el.id == photoId } );
      this.props.navigation.navigate( "bigPhoto", { photo: photoObj } );
  }

  render() {
    return (
      <View style={ss.main}>
        <TouchableOpacity style={ss.button} onPress={ this.gridOrList } >
            <Text style={{textAlign: "center", 
                fontSize: Dimensions.get( "screen" ).height / 40,
                color: "whitesmoke", fontWeight: "bold", fontFamily: "monospace" }}>GRID / LIST</Text>
        </TouchableOpacity>

        <FlatList
            numColumns={this.state.columnNumber}
            key={this.state.columnNumber}

            data={this.state.photos}
            renderItem={ (item)=> this.getPhotoComponent(item) }
        />
      </View>
    );
  }
}



const ss = StyleSheet.create({
    main: {
        flex: 1,
        justifyContent: 'center',
        alignItems: "center",
    },
    button: {
        // flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0)",
        // backgroundColor: "red",
        width: "100%",
        padding: 10
        
    }
  });
  

export default GalleryScreen;
