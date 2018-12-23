import React from 'react';
import { 
    Alert, 
    Image, 
    SafeAreaView, 
    StyleSheet,
    TouchableOpacity, 
    View 
} from 'react-native';

import ScoreBar from '../components/ScoreBar';
import GameBoard from '../components/GameBoard';
import Assets from '../config/Assets';
import Turn from '../utils/Turn';
import { 
    emptyTileStates, 
    firstTurn, 
    isOutOfMoves,
    isWin,
    messageForGameEnded,
    randomImage, 
    tileStateForTurn,
    toggleTurn
 } from '../utils/GameplayUtils';

export default class GameScreen extends React.Component {
    state = {
        isGameStarted: false,
        isGameEnded: false,
        turn: firstTurn,
        scoreX: 0,
        scoreO: 0,    
        tileStates: emptyTileStates(),
    };

    handlePlayerChange = () => {
        const { isGameStarted, turn } = this.state;

        if (isGameStarted == true) { return; }

        this.setState({
            turn: toggleTurn(turn),
        });
    };

    handleRestartOngoingGame = () => {
        this.setState({
            isGameStarted: false,
            isGameEnded: false,
            turn: firstTurn,
            tileStates: emptyTileStates(),
        });
    };

    handleRestartGameAndScore = () => {
        this.setState({
            turn: firstTurn,
            tileStates: emptyTileStates(),
            isGameStarted: false,
            isGameEnded: false,
            scoreX: 0,
            scoreO: 0,
        })
    };

    presentGameEnded = (message) => {
        Alert.alert("Gra skończona", message=message, buttons=[
            {text: "Jeszcze raz!", onPress: this.handleRestartOngoingGame},
            {text: "Zeruj wyniki", onPress: this.handleRestartGameAndScore},
        ], {cancellable: false});
    };

    handleTileTap = ({tileId}) => {
        const { turn, tileStates } = this.state;
        const tileState = tileStateForTurn(turn);
        const tileImage = randomImage(turn);

        this.setState({
            isGameStarted: true,
            tileStates: {
                ...tileStates,
                [tileId]: {state: tileState, image: tileImage},
            },
        }, () => {
            const { tileStates, scoreX, scoreO } = this.state;
            const didWin = isWin(tileStates, tileState);
            const isGameEnded = didWin || isOutOfMoves(tileStates);    

            this.setState({
                scoreX: (didWin && turn == Turn.X) ? scoreX + 1 : scoreX,
                scoreO: (didWin && turn == Turn.O) ? scoreO + 1 : scoreO,    
                isGameEnded: isGameEnded,
                turn: toggleTurn(turn),
            }, () => {
                if (isGameEnded) {
                    const message = messageForGameEnded(didWin, turn);
                    this.presentGameEnded(message);
                }    
            });
        });
    };

    render() {
        const { isGameStarted, turn, scoreX, scoreO, tileStates } = this.state;

        return (
            <SafeAreaView>
                <View style={styles.container}>
                    <ScoreBar 
                        turn={turn} 
                        scoreX={scoreX} 
                        scoreO={scoreO} 
                        isGameStarted={isGameStarted}
                        onPress={this.handlePlayerChange} />
                    <View style={styles.gameBoardContainer}>
                        <GameBoard tileStates={tileStates} onTileTap={this.handleTileTap} />
                    </View>
                    <View style={styles.bottomBar}>
                        <TouchableOpacity 
                            style={styles.resetButton}
                            onPress={this.handleRestartOngoingGame}>
                            <Image source={Assets.images.button.reset}/>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: 100+'%',
        height: 100+'%',
    },
    gameBoardContainer: {
        width: 100+'%',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    bottomBar: {
        width: 100+'%',
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    resetButton: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    gameEnd: {
        position: 'absolute',
        backgroundColor: '#D6D6D6',
    },
});