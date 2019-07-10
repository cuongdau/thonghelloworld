import {Platform} from 'react-native';
import {normalize360} from "../../utilities";

const styles = {
    button: {
        position: 'absolute',
        top: Platform.OS === "ios" ? normalize360(30) : normalize360(10),
        left: Platform.OS === "ios" ? normalize360(15) : normalize360(10),
        zIndex: 15,
        padding: normalize360(10)
    },
    image: {
        width: '100%',
        height: '100%',
        padding: 0
    }
};

export default styles;