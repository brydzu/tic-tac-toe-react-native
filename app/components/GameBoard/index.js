import React, {Component} from "react";
import {Dimensions, StyleSheet, View} from "react-native";
import Tile from "./Tile";
import Turn from "./Turn";

class GameBoard extends Component {

    _onTileTap(tile) {
        this.props.onTurnChanged(tile);
    }

    render() {
        const windowWidth = Dimensions.get("window").width;
        const sideMargins = 30;
        const boardWidth = windowWidth - (2 * sideMargins);
        var tileWidth = boardWidth / 3;
        
        createRow = (row) => {
            var content = [];
            for (var column = 0; column <= 2; column++) {
                content.push(<Tile 
                    column={column} 
                    row={row} 
                    width={tileWidth} 
                    key={row + "-" + column}
                    tileState={this.props.tileStates[column][row]}
                    onPress={(tile) => this._onTileTap(tile)}/>);
            }

            return <View style={[{height: tileWidth}, styles.row]}>{content}</View>
        };

        return (
            <View style={[{width: boardWidth, height: boardWidth}, styles.container]}>
                {createRow(0)}
                {createRow(1)}
                {createRow(2)}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
    },

    row: {
        flexDirection: "row",
    },
});

export default GameBoard;