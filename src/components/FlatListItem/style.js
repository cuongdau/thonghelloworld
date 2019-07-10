import {normalize, normalize360, rgba} from "../../utilities";
import {colors, fonts} from "../../config";

const styles = {
    imageHomeHead: {
        height: normalize360(124),
        width: normalize360(124),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: normalize360(4),
        overflow: 'hidden',
        backgroundColor: 'transparent',
        marginBottom: normalize360(1),
        opacity: 1
    },
    brandHomeButton: {
        backgroundColor: '#ebebeb',
        marginHorizontal: normalize360(2),
        marginTop: normalize360(5),
        marginBottom: normalize360(6),
        marginRight: normalize360(6)
    },
    degreeHomeButton: {
        marginLeft: normalize360(16),
        elevation: 0
    },
    imageProduct: {
        height: normalize360(168),
        width: normalize360(170),
        borderRadius: normalize360(4),
        overflow: 'hidden',
        padding: normalize360(10)
    },
    imageHomeBody: {
        height: normalize360(151),
        width: normalize360(151),
        borderRadius: normalize360(4),
        overflow: 'hidden',
        padding: normalize360(10)
    },
    plashka: {
        width: normalize360(65),
        height: normalize360(24),
        borderRadius: normalize360(4),
        backgroundColor: colors.primary,
        justifyContent: 'center',
        alignItems: 'center'
    },
    drop: {
        fontSize: normalize360(12),
        fontFamily: fonts.robotoMedium,
        color: colors.white
    },
    buttonHomeFoot: {
        height: normalize360(106),
        width: normalize360(168),
        marginRight: normalize360(8),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: normalize360(4),
        backgroundColor: '#fdfdfd'
    },
    imageHomeFoot: {
        height: normalize360(106),
        width: normalize360(168),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: normalize360(4),
        overflow: 'hidden'
    },
    textHomeHead: {
        fontWeight: "bold",
        fontSize: normalize(40),
        color: colors.white
    },
    textHomeFoot: {
        color: colors.white,
        fontFamily: fonts.robotoMedium,
        fontSize: normalize360(26),
        marginLeft: normalize360(8),
        marginBottom: normalize360(8)
    },
    priceWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginBottom: normalize(15),
        paddingHorizontal: normalize360(10)
    },
    oldPrice: {
        fontSize: normalize360(12),
        textDecorationLine: 'line-through',
        fontFamily: fonts.robotoRegular
    },
    newPrice: {
        fontSize: normalize360(18),
        color: colors.icon,
        fontFamily: fonts.robotoMedium
    },
    title: {
        marginTop: normalize360(15),
        marginBottom: normalize360(20),
        marginLeft: normalize(10),
        width: normalize360(124),
        height: normalize360(40)
    },
    titleText: {
        fontSize: normalize360(16),
        fontFamily: fonts.robotoMedium
    },
    productCard: {
        backgroundColor: '#f7f7f7',
        marginRight: normalize360(4),
        borderColor: rgba(colors.black, 12),
        borderRadius: normalize360(4),
        borderWidth: 1
    }
};

export default styles;