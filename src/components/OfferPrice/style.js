import {normalize360, rgba} from "../../utilities";
import {colors, fonts} from "../../config";

const styles = {
    small: {
        fontSize: normalize360(14),
        color: colors.darkGrey,
        marginBottom: normalize360(10)
    },
    inputText: {
        width: '100%',
        marginTop: normalize360(15)
    },
    title: {
        fontSize: normalize360(14),
        color: colors.icon,
        fontFamily: fonts.robotoCondensed,
        letterSpacing: normalize360(0.08),
        marginBottom: normalize360(17)
    }
};


export default styles;