import { StyleSheet } from 'react-native';

export default StyleSheet.create({
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
    }
}) 
