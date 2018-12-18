import React from 'react';
import { 
    Alert, 
    Image, 
    SafeAreaView, 
    TouchableOpacity, 
    View 
} from 'react-native';

import ScoreBar from '../../components/ScoreBar';
import GameBoard from '../../components/GameBoard';
import { Assets } from '../../config';
import { TileState, Tiles, Turn } from '../../utils';

import styles from './styles';

export default class GameScreen extends React.Component {

    constructor() {
        super();

        this.state = {
            turn: Turn.X,
            ended: false,
            scoreX: 0,
            scoreO: 0,    
            tiles: new Tiles(),
        };
    }

    _handleTileTap = (column, row) => {
        let { tiles, turn } = this.state;
        const tileState = turn == Turn.X ? TileState.TileX : TileState.TileO;
        
        let image = null;
        switch (tileState) {
            case TileState.TileX: {
                const images = Assets.images.big.x;
                const index = Math.floor(Math.random() * images.length);
                image = Assets.images.big.x[index];
                break;
            }

            case TileState.TileO: {
                const images = Assets.images.big.x;
                const index = Math.floor(Math.random() * images.length);
                image = Assets.images.big.o[index];
                break;
            }
                
            default:
                break;
        }
        
        tiles.setTile(column, row, tileState, image);

        const didWin = tiles.isWinAt(column, row);
        const ended = didWin || tiles.isOutOfMoves();

        let { scoreX, scoreO } = this.state;
        let message = "Remis";
        
        if (didWin) {
            switch (turn) {
                case Turn.X:
                    scoreX += 1;
                    message = "Wygrał krzyżyk!";
                    break;

                case Turn.O:
                    scoreO += 1;
                    message = "Wygrało kółko!";
                    break;
            }
        }

        if (ended) {
            this._presentAlert(message);
        }

        this.setState({
            turn: (turn == Turn.X) ? Turn.O : Turn.X,
            tiles: tiles,
            ended: ended,
            scoreX: scoreX,
            scoreO: scoreO,
        });
    }

    _presentAlert(message) {
        Alert.alert("Gra skończona", message=message, buttons=[
            {text: "Jeszcze raz!", onPress: this._handleRestartCurrentGame},
            {text: "Zeruj wyniki", onPress: this._handleResetScoreAndRestartGame},
        ], {cancellable: false});
    }

    _handleRestartCurrentGame = () => {
        this.setState({
            turn: Turn.X,
            tiles: new Tiles(),
            ended: false,
        });
    }

    _handleResetScoreAndRestartGame = () => {
        this.setState({
            turn: Turn.X,
            tiles: new Tiles(),
            ended: false,
            scoreX: 0,
            scoreO: 0,
        })
    }

    render() {
        const {tiles, turn, scoreX, scoreO} = this.state;

        return (
            <SafeAreaView>
                <View style={styles.container}>
                    <ScoreBar turn={turn} scoreX={scoreX} scoreO={scoreO} />
                    <View style={styles.gameBoardContainer}>
                        <GameBoard tiles={tiles} onTileTap={this._handleTileTap} />
                    </View>
                    <View style={styles.bottomBar}>
                        <TouchableOpacity 
                            style={styles.resetButton}
                            onPress={this._handleRestartCurrentGame}>
                            <Image source={Assets.images.reset}/>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        );
    }
}
