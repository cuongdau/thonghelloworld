import {normalize360, rgba} from "../../utilities";
import {colors, fonts} from "../../config";

const styles = {
    wrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "flex-end",
        marginBottom: normalize360(20),
        marginTop: normalize360(15)
    },
    gray: {
        color: colors.black,
        opacity: 0.3,
        fontSize: normalize360(14),
        fontFamily: fonts.robotoMedium
    },
    small: {
        marginLeft: 5,
        fontSize: 12,
        color: "#444",
    },
    inputText: {
        width: '100%'
    },
    select: {
        fontSize: 10,
        color: "#444",
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