import { Dimensions } from 'react-native';

const uiHeightPx = 640;
export default class System {
    /**获取本地图片资源,后续可以做成分包模式 */
    static getImage(filename, bundlename) {
        const bundle = bundlename || 'common';
        if (__DEV__) {
            if (bundle === 'common') {
                return { uri: `http://localhost:8081/res/images/${filename}` }
            }
            return { uri: `http://localhost:8081/js/views/${bundle}/res/${filename}` };
        }
    }

    static px2dp(uiElementPx) {
        const deviceHeigt = Dimensions.get('window').height;
        // const deviceWidth = Dimensions.get('window').width;
        return uiElementPx * deviceHeigt / uiHeightPx;
    }

}