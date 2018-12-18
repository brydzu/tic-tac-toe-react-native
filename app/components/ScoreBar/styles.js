import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        height: 100,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },

    icon: {
        height: 23,
        marginTop: 1,
        opacity: 1.0
    },

    iconX: {
        width: 21,
        marginLeft: 20,
        marginRight: 5
    },

    iconO: {
        width: 24,
        marginLeft: 5,
        marginRight: 20
    },

    score: {
        fontFamily: 'Marker Felt',
        fontWeight: '800',
        fontSize: 24,
        color: '#6C767D',
    },

    scoreX: {
        textAlign: 'right',
    },

    scoreO: {
        textAlign: 'left',
    },

    iconDimmed: {
        opacity: 0.2,
    },
})