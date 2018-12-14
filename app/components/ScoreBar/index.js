import React, {Component} from "react";
import {Image, Text, StyleSheet, View} from "react-native";
import {Assets} from "../../../config/index"
import Turn from "../GameBoard/Turn";

class ScoreBar extends Component {

    _isXVisible() { 
        return this.props.turn == Turn.x;
    }

    _isOVisible() {
        return this.props.turn == Turn.o;
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={[styles.score, styles.scoreX]}>{this.props.scoreX}</Text>
                <Image 
                    source={Assets.images.xSmall} 
                    style={[
                        styles.icon, styles.iconXSmall,
                        this._isXVisible() ? styles.iconVisible : styles.iconDimmed
                    ]}
                />
                <Image 
                    source={Assets.images.oSmall} 
                    style={[
                        styles.icon, styles.iconOSmall,
                        this._isOVisible() ? styles.iconVisible : styles.iconDimmed
                    ]}
                />
                <Text style={[styles.score, styles.scoreO]}>{this.props.scoreO}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: 100+'%',
        height: 100,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },

    icon: {
        height: 23,
        marginTop: 1,
    },

    iconXSmall: {
        width: 21,
        marginRight: 5,
    },

    iconOSmall: {
        width: 24,
        marginLeft: 5,
    },

    score: {
        fontFamily: "Marker Felt",
        fontWeight: "800",
        fontSize: 24,
        color: "#6C767D",
    },

    scoreX: {
        marginRight: 20,
        textAlign: "right",
    },

    scoreO: {
        marginLeft: 20,
        textAlign: "left",
    },

    iconVisible: {
        opacity: 1.0,
    },

    iconDimmed: {
        opacity: 0.2,
    },
})

export default ScoreBar;