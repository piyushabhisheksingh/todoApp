import { Dimensions } from 'react-native'
import normalize from '../utls/normalize'

export default {
    SCREEN_WIDTH: Dimensions.get('screen').width,
    SCREEN_HEIGHT: Dimensions.get('screen').height,
    TODO_NAVIGATION_FLATLIST: "TODO_NAVIGATION_FLATLIST",
    ITEM_WIDTH: normalize(114),
    TODO_FLATLIST: "TODO_FLATLIST",
    TODO_ITEM_HEIGHT: normalize(40),
    TODO_LIST: "TODO_LIST"
}