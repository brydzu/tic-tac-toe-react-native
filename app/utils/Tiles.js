import TileState from './TileState';

class TileNode {

    constructor(tileState, image) {
        this.tileState = tileState;
        this.image = image;
    }
}

export default class Tiles {

    constructor() {
        this._tiles = this._buildEmptyArray();
    }

    _buildEmptyArray() {
        let tileStates = Array();
        for (let i = 0; i <= 2; i++) {
            tileStates[i] = Array();
            for (let j = 0; j <= 2; j++) {
                tileStates[i].push(new TileNode(TileState.Empty, null));
            }
        }
        return tileStates;
    }

    setTile(column, row, tileState, image) {
        this._tiles[column][row].tileState = tileState;
        this._tiles[column][row].image = image;
    }

    stateAt(column, row) {
        return this._tiles[column][row].tileState;
    }

    imageAt(column, row) {
        return this._tiles[column][row].image;
    }

    clearTiles() {
        this._tiles = this._buildEmptyArray();
    }

    isOutOfMoves() {
        for (let i = 0; i <= 2; i++) {
            for (let j = 0; j <= 2; j++) {
                if (this._tiles[j][i].tileState == TileState.Empty) {
                    return false;
                }
            }
        }

        return true;
    }

    isWinAt(column, row) {
        const tileState = this._tiles[column][row].tileState;
        console.log(`tiles = ${JSON.stringify(this._tiles)}`);
        
        if (this._isWinAtColumn(column, tileState)) {
            console.log('is win at column');
            return true;
        }

        if (this._isWinAtRow(row, tileState)) {
            console.log('is win at row');
            return true;
        }

        if (this._isWinAtDiagonal1to9(tileState)) {
            console.log('is win at 1-9 diagonal');
            return true;
        }

        if (this._isWinAtDiagonal3to7(tileState)) {
            console.log('is win at 3-7 diagonal');
            return true;
        }

        return false;
    }

    _isWinAtColumn(column, tileState) {
        for (let i = 0; i <= 2; i++) {
            if (this._tiles[column][i].tileState !== tileState) {
                return false;
            }
        }
        return true;
    }

    _isWinAtRow(row, tileState) {
        for (let i = 0; i <= 2; i++) {
            if (this._tiles[i][row].tileState !== tileState) {
                return false;
            }
        }
        return true;
    }

    _isWinAtDiagonal1to9(tileState) {
        if (this._tiles[0][0].tileState !== tileState) { return false; }
        if (this._tiles[1][1].tileState !== tileState) { return false; }
        if (this._tiles[2][2].tileState !== tileState) { return false; }
        return true;
    }

    _isWinAtDiagonal3to7(tileState) {
        if (this._tiles[2][0].tileState !== tileState) { return false; }
        if (this._tiles[1][1].tileState !== tileState) { return false; }
        if (this._tiles[0][2].tileState !== tileState) { return false; }
        return true;
    }
}
