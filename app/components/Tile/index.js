import React from 'react';
import { Image, TouchableWithoutFeedback, View } from 'react-native';
import PropTypes from 'prop-types';

import { Assets } from '../../config';
import TileState from '../../utils/TileState';

import styles from './styles';

export default class Tile extends React.Component {

    static propTypes = {
        tileState: PropTypes.any,
        width: PropTypes.number.isRequired,
        column: PropTypes.number.isRequired,
        row: PropTypes.number.isRequired,
        onPress: PropTypes.func.isRequired,
    };

    static defaultProps = {
        tileState: TileState.Empty,
    }

    _handleOnPress = () => {
        const { tileState } = this.props;
        if (tileState != TileState.Empty) { return; }
        const { onPress, column, row } = this.props;
        onPress(column, row);
    }

    render() {
        const { image, width } = this.props;
    
        return (
            <TouchableWithoutFeedback onPress={this._handleOnPress}>
                <View style={[{width: width, height: width}, styles.tile]}>
                    <Image source={image} />
                </View>
            </TouchableWithoutFeedback>
        );
    }
}