import {normalize, normalize360, rgba, width} from "../../utilities";
import {colors, fonts} from "../../config";
import {Image} from "react-native";

const styles = {
    // MyShopScreen
    activeMyShopTabStyle: {
        backgroundColor: '#f7f7f7'
    },
    tabMyShopStyle: {
        backgroundColor: '#f7f7f7',
        borderBottomWidth: 0
    },
    myShopTabsWrapper: {
        marginTop: normalize360(5)
    },
    activeMyShopTabTextStyle: {
        color: colors.darkGrey,
        fontSize: normalize360(14),
        fontFamily: fonts.robotoMedium
    },
    tabTextStyle: {
        color: rgba('#353535', 60),
        fontSize: normalize360(14),
        fontFamily: fonts.robotoMedium
    },
    messageItemWrapper: {
        flexDirection: 'row',
        backgroundColor: '#f7f7f7',
        paddingTop: normalize360(5),
        paddingBottom: 0,
        marginLeft: 0,
        paddingRight: 0
    },
    thumbnail: {
        width: normalize360(120),
        height: normalize360(120),
    },
    infoMessageItem: {
        width: normalize360(230),
        flexDirection: 'column',
        paddingVertical: normalize360(8),
        marginLeft: normalize360(13)
    },
    titleItemWrapper: {
        paddingRight: normalize360(25),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    itemPoint: {
        color: colors.primary,
        fontSize: normalize360(25)
    },
    itemShopName: {
        marginLeft: normalize360(18),
        fontSize: normalize360(17),
        fontFamily: fonts.robotoRegular,
        color: colors.darkGrey
    },
    itemBackTime: {
        fontSize: normalize360(12),
        fontFamily: fonts.robotoRegular,
        color: colors.black,
        letterSpacing: 0.4
    },
    itemMessage: {
        marginLeft: normalize360(25),
        fontSize: normalize360(14),
        fontFamily: fonts.robotoRegular,
        color: "#464d53",
        letterSpacing: 0.25
    },
    underlineStyle: {
        borderBottomColor: colors.icon,
        borderBottomWidth: 3,
        borderColor: colors.white
    },


    // ChatScreen
    chatHeaderContainer: {
        height: normalize360(60),
        backgroundColor: '#f7f7f7',
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#e6e6e6'
    },
    chatHeaderImage: {
        width: normalize360(60),
        height: normalize360(60),
        marginRight: normalize360(9)
    },
    chatProductName: {
        fontSize: normalize360(17),
        fontFamily: fonts.robotoRegular,
        color: colors.icon
    },
    chatShippingPrice: {
        fontSize: normalize360(13),
        fontFamily: fonts.robotoRegular,
        color: colors.icon
    },
    chatButtonsWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: normalize(27),
        paddingBottom: normalize(20),
        alignItems: 'center',
        flex: 1
    },
    chatMessageTextWrapper: {
        padding: normalize(18),
        borderRadius: normalize(18),
        alignItems: 'center',
        marginHorizontal: normalize(36)
    },
    chatDateMessage: {
        fontSize: normalize(18),
        alignSelf: 'center'
    },
    chatDateMessageWrapper: {
        width,
        alignItems: 'center',
        marginBottom: normalize360(21)
    },
    footer: {
        height: normalize360(88),
        backgroundColor: colors.white,
        flexDirection: 'column'
    },
    message: {
        fontSize: normalize360(16),
        fontFamily: fonts.robotoRegular
    },
    image: {
        width: normalize360(100),
        height: normalize360(100),
        marginHorizontal: normalize360(25),
        borderRadius: normalize360(8)
    }
};

export default styles;