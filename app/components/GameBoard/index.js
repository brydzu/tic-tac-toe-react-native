import React from 'react';
import { Dimensions, View } from 'react-native';
import PropTypes from 'prop-types';

import Tile from '../Tile';
import Tiles from '../../utils/Tiles';

import styles from './styles';

export default class GameBoard extends React.Component {

    static propTypes = {
        tiles: PropTypes.objectOf(Tiles),
        onTileTap: PropTypes.func.isRequired,
    };

    _handleTileTap = (column, row, image) => {
        const { onTileTap } = this.props;
        onTileTap(column, row);
    }

    render() {
        const windowWidth = Dimensions.get('window').width;
        const sideMargins = 30;
        const boardWidth = windowWidth - (2 * sideMargins);
        const tileWidth = boardWidth / 3;

        const { tiles } = this.props;
        
        buildRowAtIndex = (row) => {
            let content = [];
            for (let column = 0; column <= 2; column++) {
                const tileState = tiles.stateAt(column, row);
                const tileImage = tiles.imageAt(column, row);

                const tile = (<Tile 
                    key={row + "-" + column}
                    column={column} 
                    row={row} 
                    width={tileWidth} 
                    tileState={tileState}
                    image={tileImage}
                    onPress={this._handleTileTap}/>);

                content.push(tile);
            }

            return (
                <View style={[{height: tileWidth}, styles.row]}>
                    {content}
                </View>
            );
        };

        const viewStyles = [{width: boardWidth, height: boardWidth}, styles.container];

        return (
            <View style={viewStyles}>
                {buildRowAtIndex(0)}
                {buildRowAtIndex(1)}
                {buildRowAtIndex(2)}
            </View>
        );
    }
}
