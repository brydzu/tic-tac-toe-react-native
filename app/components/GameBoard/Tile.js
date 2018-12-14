import React, {Component} from "react";
import {Image, StyleSheet, TouchableWithoutFeedback, View} from "react-native";
import TileState from "./TileState";
import {Assets} from "../../../config";

class Tile extends Component {

    _onPress() {
        if (this.props.tileState == TileState.empty) {
            this.props.onPress(this);
        }
    }

    render() {
        var imageComp = null;
        var image = null;
        if (this.props.tileState == TileState.x) {
            image = Assets.images.x1;
        } else if (this.props.tileState == TileState.o) {
            image = Assets.images.o1;
        }

        if (image != null) {
            imageComp = <Image source={image}/>
        }

        return (
            <TouchableWithoutFeedback onPress={() => this._onPress()}>
                <View style={[{width: this.props.width, height: this.props.height}, styles.tile]}>{imageComp}</View>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = StyleSheet.create({
    tile: {
        borderColor: "#ECECEC",
        borderWidth: StyleSheet.hairlineWidth * 4,
        alignItems: "center",
        justifyContent: "center",
    },
})

export default Tile;