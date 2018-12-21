import React from 'react';
import { 
    Image, 
    StyleSheet, 
    TouchableWithoutFeedback, 
    View 
} from 'react-native';

import TileState from '../utils/TileState';

export default function Tile({ tileState, width, column, row, image, onPress }) {
    handleOnPress = () => {
        if (tileState != TileState.Empty) { return; }
        onPress(column, row);
    }
    
    return (
        <TouchableWithoutFeedback onPress={this.handleOnPress}>
            <View style={[{width: width, height: width}, styles.tile]}>
                <Image source={image} />
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    tile: {
        borderColor: '#ECECEC',
        borderWidth: StyleSheet.hairlineWidth * 4,
        alignItems: 'center',
        justifyContent: 'center',
    },
});