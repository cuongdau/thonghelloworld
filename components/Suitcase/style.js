import { normalize360 } from "../../utilities";
import { colors } from "../../config";

const styles = {
    button: {
        position: 'absolute',
        zIndex: 20,
        bottom: normalize360(10),
        right: normalize360(20)
    },
    image: {
        width: normalize360(56),
        height: normalize360(56),
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        color: colors.suitcase
    }
};

export default styles;