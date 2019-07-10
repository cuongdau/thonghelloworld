import {colors, fonts} from "../../config";
import {normalize360} from "../../utilities";

const styles = {
    small: {
        fontSize: normalize360(14),
        color: colors.darkGrey,
        marginBottom: normalize360(10)
    },
    inputText: {
        width: "100%"
    },
    select: {
        fontSize: normalize360(12),
        fontFamily: fonts.robotoRegular,
        color: colors.black,
        opacity: 0.3,
        marginLeft: normalize360(30)
    }

};


export default styles;