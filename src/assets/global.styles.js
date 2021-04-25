import { StyleSheet } from 'react-native';
import { colors } from '.'
import normalize from '../utls/normalize'

const { maroon, darkGrey, white } = colors;

const rootStyles = StyleSheet.create({
    screenHeaderText: {
        fontSize: normalize(36),
        lineHeight: normalize(40),
        fontWeight: '300',
        color: maroon,
        textAlign: 'center'
    },
    tabHeaderText: {
        fontSize: normalize(16),
        lineHeight: normalize(18),
        color: maroon,
        textAlign: 'center'
    },
    listText: {
        fontSize: normalize(12),
        lineHeight: normalize(13),
        color: 'black',
        textAlign: 'left'
    },
    linkText: {
        fontSize: normalize(12),
        lineHeight: normalize(13),
        color: maroon,
        textAlign: 'right'
    },
    linkTextWhite: {
        fontSize: normalize(12),
        lineHeight: normalize(13),
        color: white,
        textAlign: 'right'
    }

})
export default rootStyles