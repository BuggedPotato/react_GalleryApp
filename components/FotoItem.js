import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions, Touchable } from 'react-native';
import PropTypes from "prop-types";

class FotoItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
    <TouchableOpacity onPress={ ()=> this.props.showBigPhoto( this.props.id ) } >
        <Image 
            style={{
                ...ss.image,
                width: this.props.width * 0.95,
                height: this.props.height * 0.95,
                margin: this.props.width * 0.025,
            }}
            source={{ uri: this.props.src }}
            
        />
        <View style={{...ss.textView, right: this.props.width * 0.08, bottom: this.props.height * 0.1}}>
            <Text style={ss.text}>{ this.props.id }</Text>
        </View>
    </TouchableOpacity>
    );
  }
}


FotoItem.propTypes = {
    src: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired,
}

const ss = StyleSheet.create({
    main: {
        flex: 1,
        justifyContent: 'center',
        alignItems: "center",
    },
    image: {
        // flex: 1,
        borderRadius: 6,
    },
    textView: {
        position: 'absolute',
    },
    text: {
        fontSize: Dimensions.get("screen").height / 60,
        color: "whitesmoke",
        fontWeight: 'bold'
    }
  });

export default FotoItem;
