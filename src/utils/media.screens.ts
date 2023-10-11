import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

type ScaleFn = (size: number, factor?: number) => number;

const horizontalScale: ScaleFn = (size) => (width / guidelineBaseWidth) * size;
const verticalScale: ScaleFn = (size) => (height / guidelineBaseHeight) * size;
const moderateScale: ScaleFn = (size, factor = 0.5) => size + (horizontalScale(size) - size) * factor;


export {
    horizontalScale,
    verticalScale,
    moderateScale,
    width as screenWidth,
    height as screenHeight
};