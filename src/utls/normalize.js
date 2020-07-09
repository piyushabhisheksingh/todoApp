import { Dimensions, PixelRatio } from 'react-native';
const { width: SCREEN_WIDTH } = Dimensions.get('window');
const scale = SCREEN_WIDTH / 360;

export default function normalize(size) {
    /**
    * @param {number} size - size could be padding, width, height, etc..
    */
    const newSize = size * scale
    return Math.round(PixelRatio.roundToNearestPixel(newSize))
}