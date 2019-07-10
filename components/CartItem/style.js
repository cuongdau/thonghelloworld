import {normalize360} from "../../utilities";
import {colors, fonts} from "../../config";

export default styles = {
    card: {
        backgroundColor: '#f7f7f7',
        borderRadius: normalize360(4),
    },
    wrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 0,
    },
    image: {
        width: normalize360(110),
        minHeight: normalize360(111),
        borderRadius: normalize360(2),
        overflow: 'hidden',
        height: '100%'
    },
    infoWrapper: {
        flex: 1,
        flexDirection: 'column',
        paddingVertical: normalize360(10),
        paddingLeft: normalize360(10),
        paddingRight: normalize360(16),
    },
    quantity: {
        fontFamily: fonts.robotoRegular,
        fontSize: normalize360(12),
        color: colors.shippingPrice
    },
    title: {
        fontFamily: fonts.robotoRegular,
        fontSize: normalize360(16)
    },
    shopName: {
        textDecorationLine: 'underline',
        color: colors.primary,
        fontSize: normalize360(13),
        fontFamily: fonts.robotoRegular,
        marginVertical: normalize360(5)
    },
    priceWrapper: {
        flexDirection: 'row',
        marginBottom: normalize360(10)
    },
    price: {
        color: colors.primary,
        fontFamily: fonts.robotoMedium,
        fontSize: normalize360(14)
    },
    shippingPrice: {
        color: colors.shippingPrice,
        fontFamily: fonts.robotoRegular,
        fontSize: normalize360(13)
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
}