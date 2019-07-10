import { normalize360 } from "../../utilities";
import {fonts} from "../../config";

const styles = {
    iconStars: {
        marginRight: normalize360(5)
    },
    name: {
        fontFamily: fonts.robotoRegular,
        fontSize: normalize360(16)
    },
    date: {
        fontFamily: fonts.robotoRegular,
        fontSize: normalize360(12)
    },
    message: {
        fontFamily: fonts.robotoRegular,
        fontSize: normalize360(14)
    }
};

export default styles;