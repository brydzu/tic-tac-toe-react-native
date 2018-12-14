import React, {Component} from "react";
import {Alert, Image, SafeAreaView, StyleSheet, TouchableOpacity, View} from "react-native";
import ScoreBar from "../../components/ScoreBar";
import GameBoard from "../../components/GameBoard";
import Turn from "../../components/GameBoard/Turn";
import {Assets} from "../../../config";
import TileState from "../../components/GameBoard/TileState";

const WinSequence = {
    s00e20: 0,
    s01e21: 1,
    s02e22: 2,
    s00e02: 3,
    s10e12: 4,
    s20e22: 5,
    s00e22: 6,
    s20e02: 7
}

class GameScreen extends Component {

    constructor() {
        super();

        this.state = {
            turn: Turn.x,
            tileStates: this._createEmptyTileStateArray(),
            gameEnded: false,
            scoreX: 0,
            scoreO: 0,
        };
    }

    _createEmptyTileStateArray() {
        var tileStates = Array();
        for (let i = 0; i <= 2; i++) {
            tileStates[i] = Array();
            for (let j = 0; j <= 2; j++) {
                tileStates[i].push(TileState.empty);
            }
        }
        return tileStates;
    }

    _allTilesMarked() {
        for (let i = 0; i <= 2; i++) {
            for (let j = 0; j <= 2; j++) {
                if (this.state.tileStates[i][j] == 0) {
                    return false;
                }
            }
        }

        return true;
    }

    _findWinningSequenceForState(state) {
        var s = this.state.tileStates;
        s = s.map((row) => {
            return row.map((value) => { return value == state ? 1 : 0 });
        })

        if (s[0][0] + s[0][1] + s[0][2] == 3) {
            return WinSequence.s00e02;
        } else if (s[1][0] + s[1][1] + s[1][2] == 3) {
            return WinSequence.s10e12;
        } else if (s[2][0] + s[2][1] + s[2][2] == 3) {
            return WinSequence.s20e22;
        } else if (s[0][0] + s[1][0] + s[2][0] == 3) {
            return WinSequence.s00e20;
        } else if (s[0][1] + s[1][1] + s[2][1] == 3) {
            return WinSequence.s01e21;
        } else if (s[0][2] + s[1][2] + s[2][2] == 3) {
            return WinSequence.s02e22;
        } else if (s[0][0] + s[1][1] + s[2][2] == 3) {
            return WinSequence.s00e22;
        } else if (s[2][0] + s[1][1] + s[0][2] == 3) {
            return WinSequence.s20e02;
        }

        return null;
    }

    _onTurnChanged(tile) {
        let tileStates = this.state.tileStates;
        let currentState = this.state.turn == Turn.x ? TileState.x : TileState.o;
        tileStates[tile.props.column][tile.props.row] = currentState;

        let winningSequence = this._findWinningSequenceForState(currentState);
        let gameEnded = winningSequence || this._allTilesMarked();

        let scoreX = this.state.scoreX;
        let scoreO = this.state.scoreO;

        if (winningSequence != null) {
            if (this.state.turn == Turn.x) {
                scoreX += 1;
            } else {
                scoreO += 1;
            }
        }

        if (gameEnded) {
            let message = null;
            if (winningSequence != null) {
                message = this.state.turn == Turn.x ? "Wygrał krzyżyk" : "Wygrało kółko";
            } else {
                message = "Remis!";
            }

            Alert.alert("Gra skończona", message=message, buttons=[
                {text: "Jeszcze raz!", onPress: () => this._onResetCurrentGamePressed()},
                {text: "Zeruj wyniki", onPress: () => this._onResetScorePressed()},
            ], {cancelable: false})
        }

        this.setState(previous => ({
            turn: (previous.turn == Turn.x) ? Turn.o : Turn.x,
            tileStates: tileStates,
            gameEnded: gameEnded,
            scoreX: scoreX,
            scoreO: scoreO,
        }));
    }

    _onResetCurrentGamePressed() {
        this.setState({
            turn: Turn.x,
            tileStates: this._createEmptyTileStateArray(),
            gameEnded: false,
        });
    }

    _onResetScorePressed() {
        this.setState({
            turn: Turn.x,
            tileStates: this._createEmptyTileStateArray(),
            gameEnded: false,
            scoreX: 0,
            scoreO: 0,
        })
    }

    render() {
        return (
            <SafeAreaView>
                <View style={styles.container}>
                    <ScoreBar 
                        turn={this.state.turn} 
                        scoreX={this.state.scoreX} 
                        scoreO={this.state.scoreO}
                    />
                    <View style={styles.gameBoardContainer}>
                        <GameBoard 
                            turn={this.state.turn}
                            tileStates={this.state.tileStates}
                            onTurnChanged={(tile) => this._onTurnChanged(tile)}
                        />
                    </View>
                    <View style={styles.bottomBar}>
                        <TouchableOpacity 
                            style={styles.resetButton}
                            onPress={() => this._onResetCurrentGamePressed()}>
                            <Image source={Assets.images.reset}/>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: 100+"%",
        height: 100+"%",
    },

    gameBoardContainer: {
        width: 100+"%",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },

    bottomBar: {
        width: 100+"%",
        height: 100,
        alignItems: "center",
        justifyContent: "center",
    },

    resetButton: {
        width: 40,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
    },

    gameEnd: {
        position: "absolute",
        backgroundColor: "#D6D6D6",
    }
}) 

export default GameScreen;