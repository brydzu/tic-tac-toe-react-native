import TileState from './TileState';
import Turn from './Turn';

export const firstTurn = Turn.X;

export function emptyTileStates() {
    let result = [];
    for (let i = 0; i < 9; i++) {
        result.push({state: '', image: null});
    }
    return result;
}

export function toggleTurn(turn) {
    return turn === Turn.X ? Turn.O : Turn.X;
}

export function tileStateForTurn(turn) {
    return turn === Turn.X ? TileState.TileX : TileState.TileO;
}

export function randomImage(turn) {
    const images = turn === Turn.X ? Assets.images.big.x : Assets.images.big.o;
    const index = Math.floor(Math.random() * images.length);
    return images[index];
}

export function isOutOfMoves(tileStates) {
    for (let i = 0; i < tileStates.length; i++) {
        if (tileStates[i].state === TileState.Empty) {
            return false;
        }
    }

    return true;
}

export function isWin(tileStates, state) {
    for (let row = 0; row < 3; row++) {
        if (isWinAtRow(row, tileStates, state)) {
            return true;
        }
    }

    for (let column = 0; column < 3; column++) {
        if (isWinAtColumn(column, tileStates, state) == true) {
            return true;
        }
    }

    if (isWinAtDiagonal0to8(tileStates, state) == true) {
        return true;
    }

    if (isWinAtDiagonal2to6(tileStates, state) == true) {
        return true;
    }

    return false;
}

function isWinAtRow(row, tileStates, state) {
    const startIndex = row * 3;
    return (
        tileStates[startIndex + 0].state === state && 
        tileStates[startIndex + 1].state === state &&
        tileStates[startIndex + 2].state === state
    );
}

function isWinAtColumn(column, tileStates, state) {
    const startIndex = column;
    return (
        tileStates[startIndex + 0].state === state &&
        tileStates[startIndex + 3].state === state &&
        tileStates[startIndex + 6].state === state
    );
}

function isWinAtDiagonal0to8(tileStates, state) {
    return (
        tileStates[0].state === state &&
        tileStates[4].state === state &&
        tileStates[8].state === state
    );
}

function isWinAtDiagonal2to6(tileStates, state) {
    return (
        tileStates[2].state === state &&
        tileStates[4].state === state &&
        tileStates[6].state === state
    );
}

export function messageForGameEnded(didWin, turn) {
    if (didWin) {
        return turn == Turn.X ? "Wygrał krzyżyk!" : "Wygrało kółko!";
    } else {
        return "Remis";
    }
}