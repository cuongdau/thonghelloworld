import {normalize360} from "../../utilities";
import {colors} from "../../config";

const styles = {
    dropWrapper: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        zIndex: 15,
        top: 0,
        left: 0,
        backgroundColor: 'transparent'
    },
    dropdown: {
        marginTop: normalize360(80),
        marginLeft: normalize360(5),
        backgroundColor: colors.white,
        width: normalize360(150)
    }
};

export default styles;