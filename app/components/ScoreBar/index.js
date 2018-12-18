import React from 'react';
import { 
    Image, 
    Text, 
    TouchableOpacity, 
    View 
} from 'react-native';
import PropTypes from 'prop-types';

import { Assets } from '../../config';
import Turn from '../../utils/Turn';

import styles from './styles';

export default class ScoreBar extends React.Component {

    static propTypes = {
        turn: PropTypes.any.isRequired,
        scoreX: PropTypes.number.isRequired,
        scoreO: PropTypes.number.isRequired,
        onPress: PropTypes.func.isRequired,
        gameStarted: PropTypes.bool.isRequired,
    };

    render() {
        const { turn, scoreX, scoreO, gameStarted, onPress } = this.props;
        const isXVisible = turn == Turn.X;
        const isOVisible = !isXVisible;

        const imageX = Assets.images.small.x;
        const imageO = Assets.images.small.o;
        
        return (
            <View style={styles.container}>
                <Text style={[styles.score, styles.scoreX]}>{scoreX}</Text>
                <TouchableOpacity onPress={onPress} style={styles.iconsContainer} disabled={gameStarted}>
                <Image 
                    source={imageX} 
                    style={[styles.icon, styles.iconX, isXVisible ? {} : styles.iconDimmed]} />
                <Image 
                    source={imageO} 
                    style={[styles.icon, styles.iconO, isOVisible ? {} : styles.iconDimmed]} />
                </TouchableOpacity>
                <Text style={[styles.score, styles.scoreO]}>{scoreO}</Text>
            </View>
        );
    }
}
