import React from 'react';
import { 
    Image, 
    StyleSheet, 
    TouchableWithoutFeedback, 
    View 
} from 'react-native';
import PropTypes from 'prop-types';

import TileState from '../utils/TileState';

Tile.propTypes = {
    tileId: PropTypes.number.isRequired,
    tileState: PropTypes.any.isRequired,
    width: PropTypes.number.isRequired,
    image: PropTypes.any,
    onPress: PropTypes.func.isRequired,
};

export default function Tile({ tileId, tileState, width, image, onPress }) {
    handleOnPress = () => {
        if (tileState != TileState.Empty) { return; }
        onPress({tileId});
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