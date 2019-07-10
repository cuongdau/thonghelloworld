import {Platform} from 'react-native';
import {normalize360} from "../../utilities";

const value = Platform.OS === 'ios' ? .7 : .9;

const styles = {
    container: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    switch: {
        transform: [{ scaleX: normalize360(value) }, { scaleY: normalize360(value) }]
    }
};

export default styles;