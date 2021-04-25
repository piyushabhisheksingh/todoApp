import { StyleSheet } from 'react-native';
import { globalStyles, colors, opacity } from '../../assets'
import normalize from '../../utls/normalize';
const { screenHeaderText, } = globalStyles;
const { darkGrey, maroon, white } = colors;
const { sixtyPercent } = opacity;

const todoStyles = StyleSheet.create({
    root:
    {
        flex: 1,
        justifyContent: 'flex-start'
    },

    todoHeader: {
        ...screenHeaderText,
        marginTop: normalize(64),
        marginBottom: normalize(24),
        alignSelf: 'center'
    },
    textInputWrapper: {
        padding: normalize(9),
        width: normalize(342),
        height: normalize(40),
        flexDirection: 'row',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: darkGrey + sixtyPercent,
        borderWidth: normalize(1),
        borderRadius: normalize(4),
    },
    textInput: {
        flex: 1,
        marginRight: normalize(4),
    },
    tablistStyle: {
        height: normalize(41),
        width: normalize(360),
        marginTop: normalize(16),
        marginBottom: normalize(16),
    },
    tabList: {
        height: normalize(40),
        borderColor: darkGrey + sixtyPercent,
        borderWidth: normalize(1),
        borderRadius: normalize(4),
        marginHorizontal: normalize(8),
    },
    filter: {
        height: normalize(40),
        width: normalize(114),
        borderColor: darkGrey + sixtyPercent,
        borderWidth: normalize(1),
        justifyContent: 'center',
        alignItems: 'center',
    },
    filterSelected: {
        height: normalize(40),
        width: normalize(114),
        borderColor: darkGrey + sixtyPercent,
        borderWidth: normalize(1),
        backgroundColor: maroon,
        justifyContent: 'center',
        alignItems: 'center',
    },
    todoListStyle: {
        marginHorizontal: normalize(9)
    },
    todoItemWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'center',
        width: normalize(344),
        height: normalize(40),
        maxHeight: normalize(120),
        borderColor: darkGrey + sixtyPercent,
        borderWidth: normalize(1),
        borderRadius: normalize(4),
        paddingHorizontal: normalize(9),
        marginBottom: normalize(4),
    },
    iconWrapper: {
        width: normalize(48),
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    menuWrapper: {
        zIndex: 10,
        elevation: 10,
        position: 'absolute',
        width: normalize(120),
        alignSelf: 'flex-end',
        borderColor: darkGrey + sixtyPercent,
        borderWidth: normalize(1),
        borderRadius: normalize(4),
        backgroundColor: white,
    },
    menuListItem: {
        width: normalize(120),
        height: normalize(30),
        justifyContent: 'center',
        marginLeft: normalize(4),
    },
    divider: {
        width: normalize(120),
        height: normalize(1),
        backgroundColor: darkGrey + sixtyPercent,
    }
})
export default todoStyles