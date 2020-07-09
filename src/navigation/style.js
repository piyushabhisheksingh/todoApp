import { StyleSheet } from 'react-native';
import { colors } from '../assets'

const rootStyles = StyleSheet.create({
    root: {
        flex: 1
    },
    statusBarStyle: {
        flex: 0,
        backgroundColor: colors.white
    },
    navigationBarStyle: {
        flex: 0,
        backgroundColor: colors.white
    }
})
export default rootStyles