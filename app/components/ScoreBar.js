import React from 'react';
import { 
    Image, 
    Text, 
    StyleSheet,
    TouchableOpacity, 
    View 
} from 'react-native';
import PropTypes from 'prop-types';

import Assets from '../config/Assets';
import Turn from '../utils/Turn';

ScoreBar.propTypes = {
    turn: PropTypes.any.isRequired,
    scoreX: PropTypes.number.isRequired,
    scoreO: PropTypes.number.isRequired,
    onPress: PropTypes.func.isRequired,
    isGameStarted: PropTypes.bool.isRequired,
};

export default function ScoreBar({turn, scoreX, scoreO, isGameStarted, onPress}) {
    const isXVisible = turn == Turn.X;
    const isOVisible = !isXVisible;
    const imageX = Assets.images.small.x;
    const imageO = Assets.images.small.o;

    return (
        <View style={styles.container}>
            <Text style={[styles.score, styles.scoreX]}>{scoreX}</Text>
            <TouchableOpacity onPress={onPress} style={styles.iconsContainer} disabled={isGameStarted}>
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

const styles = StyleSheet.create({
    container: {
        height: 100,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        height: 23,
        marginTop: 1,
        opacity: 1.0
    },
    iconX: {
        width: 21,
        marginRight: 5
    },
    iconO: {
        width: 24,
        marginLeft: 5,
    },
    score: {
        fontFamily: 'Marker Felt',
        fontWeight: '800',
        fontSize: 24,
        color: '#6C767D',
    },
    scoreX: {
        textAlign: 'right',
    },
    scoreO: {
        textAlign: 'left',
    },
    iconDimmed: {
        opacity: 0.2,
    },
    iconsContainer: {
        flexDirection: 'row',
        marginLeft: 20,
        marginRight: 20,
    },
});