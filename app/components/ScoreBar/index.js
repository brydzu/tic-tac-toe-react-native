import React from 'react';
import { Image, Text, View } from 'react-native';
import PropTypes from 'prop-types';

import { Assets } from '../../config';
import Turn from '../../utils/Turn';

import styles from './styles';

export default class ScoreBar extends React.Component {

    static propTypes = {
        turn: PropTypes.any.isRequired,
        scoreX: PropTypes.number.isRequired,
        scoreO: PropTypes.number.isRequired,
    };

    render() {
        const { turn } = this.props;
        const isXVisible = turn == Turn.X;
        const isOVisible = !isXVisible;

        const { scoreX, scoreO } = this.props;

        const imageX = Assets.images.small.x;
        const imageO = Assets.images.small.o;
        
        return (
            <View style={styles.container}>
                <Text style={[styles.score, styles.scoreX]}>{scoreX}</Text>
                <Image 
                    source={imageX} 
                    style={[styles.icon, styles.iconX, isXVisible ? {} : styles.iconDimmed]} />
                <Image 
                    source={imageO} 
                    style={[styles.icon, styles.iconO, isOVisible ? {} : styles.iconDimmed]} />
                <Text style={[styles.score, styles.scoreO]}>{scoreO}</Text>
            </View>
        );
    }
}
