import {colors, fonts} from "../../config";
import {normalize360, rgba} from "../../utilities";

export default styles = {
    inputText: {
        width: '100%'
    },
    small: {
        fontSize: normalize360(14),
        color: colors.darkGrey,
        marginTop: normalize360(10),
        marginHorizontal: normalize360(8),
        marginBottom: normalize360(15)
    },
    title: {
        fontSize: normalize360(16),
        color: colors.primary,
        fontFamily: fonts.robotoCondensed
    },
    title2: {
        fontSize: normalize360(16),
        color: colors.darkGrey,
        fontFamily: fonts.robotoCondensed
    },
    priceWrapper: {
        flexDirection: 'row',
        marginVertical: normalize360(10),
        marginLeft: normalize360(8)
    }
}
