import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';

import Tile from './Tile';

buildTile = ({ tileId, tileState, tileWidth, tileImage, onPress }) => {
    return (
        <Tile 
            tileId={tileId}
            key={tileId}
            width={tileWidth}
            tileState={tileState}
            image={tileImage}
            onPress={onPress}
        />
    );
};

buildRow = ({ tile0, tile1, tile2, tileWidth }) => {
    return (
        <View style={[{height: tileWidth}, styles.row]}>
            {tile0}{tile1}{tile2}
        </View>
    );
};

buildGrid = ({ tileStates, onPress }) => {
    const windowWidth = Dimensions.get('window').width;
    const sideMargins = 30;
    const boardWidth = windowWidth - (2 * sideMargins);
    const tileWidth = boardWidth / 3;

    let tiles = [];
    let tileId = 0;

    for (let i = 0; i < 9; i++) {
        const tile = buildTile({
            tileId, 
            tileState: tileStates[i].state, 
            tileWidth, 
            tileImage: tileStates[i].image, 
            onPress
        });

        tiles.push(tile);
        tileId += 1;
    }

    return (
        <View 
            style={[{width: boardWidth, height: boardWidth}, styles.container]}>
            {buildRow({tile0: tiles[0], tile1: tiles[1], tile2: tiles[2], tileWidth})}
            {buildRow({tile0: tiles[3], tile1: tiles[4], tile2: tiles[5], tileWidth})}
            {buildRow({tile0: tiles[6], tile1: tiles[7], tile2: tiles[8], tileWidth})}
        </View>
    );
};

GameBoard.propTypes = {
    tileStates: PropTypes.any.isRequired,
    onTileTap: PropTypes.func.isRequired,
};

export default function GameBoard({ tileStates, onTileTap }) {
    return buildGrid({tileStates, onPress: onTileTap});
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
    },
    row: {
        flexDirection: 'row',
    },
});