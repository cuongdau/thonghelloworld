import {normalize360, rgba} from "../../utilities";
import {colors, fonts} from "../../config";

styles = {
    watchListItem: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#f4f4f4',
        borderBottomWidth: 1,
        borderBottomColor: rgba('#707070', 30)
    },
    thumbnail: {
        width: normalize360(120),
        height: normalize360(120),
    },
    itemTitle: {
        fontFamily: fonts.robotoMedium,
        fontSize: normalize360(17),
        color: colors.darkGrey,
        width: '80%'
    },
    trashIcon: {
        margin: normalize360(9),
        color: colors.icon,
        fontSize: 25
    },
    description: {
        flex: 2,
        padding: normalize360(10),
        justifyContent: 'space-between',
    },
    descriptionTop: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    descriptionBottom: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    priceWrapper: {
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    oldPrice: {
        color: '#707070',
        fontSize: normalize360(12),
        textDecorationLine: 'line-through',
        marginRight: normalize360(8),
        fontFamily: fonts.robotoRegular
    },
    newPrice: {
        color: colors.icon,
        fontSize: normalize360(16),
        fontFamily: fonts.robotoMedium
    },
    newPriceArrow: {
        fontFamily: fonts.robotoMedium
    },
    button: {
        fontSize: normalize360(14),
        color: colors.primary,
        opacity: 0.8,
        marginTop: normalize360(5)
    }
};

export default styles;