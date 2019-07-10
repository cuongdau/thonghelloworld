import { normalize360 } from "../../utilities";
import {colors} from "../../config";

const styles = {
    container: {
        backgroundColor: colors.tabs
    },
    content: {
        margin: normalize360(17)
    },
    button: {
        marginVertical: normalize360(7)
    },
    view: {
        flexDirection: 'row'
    },
    image: {
        width: normalize360(17),
        height: normalize360(17)
    },
    text: {
        color: colors.white,
        marginLeft: normalize360(17)
    }
};

export default styles;