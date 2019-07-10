import {height, normalize, normalize360, width} from "../../utilities";
import { colors, fonts } from "../../config";

const styles = {
    // CartScreen
    cartContent: {
        flexGrow: 1,
        justifyContent: 'space-between'
    },
    cartListWrapper: {
        marginTop: normalize(18),
        margin: normalize360(6),
    },
    cartListItemWrapper: {
        flexDirection: 'row',
        margin: normalize(9),
        backgroundColor: colors.white,
        padding: 0,
        borderBottomRightRadius: normalize360(4),
        borderTopRightRadius: normalize360(4)
    },
    cartBottomWrapper: {
        paddingVertical: normalize360(16)
    },

    // ShippingScreen
    cartButtonWrapper: {
        width: 0.9 * width,
        alignItems: 'center',
        marginVertical: normalize(36)
    },
    cartButton: {
        width: normalize(310),
        paddingVertical: normalize(27),
        alignItems: 'center',
        borderRadius: normalize(18),
        backgroundColor: colors.tabs
    },
    inputText: {
        width: '100%'
    },
    shippingRadioWrapper: {
        width: '96%',
        marginLeft: '2%',
        marginBottom: normalize(45)
    },
    shippingRadioLabel: {
        color: colors.primary,
        marginLeft: normalize(27),
        marginBottom: normalize(18)
    },
    shippingFormLabel: {
        marginLeft: normalize360(25),
        marginTop: normalize360(13),
        color: colors.primary
    },
    shippingCheckWrapper: {
        flexDirection: 'row',
        paddingLeft: normalize(18)
    },
    shippingCheckLabel: {
        marginLeft: normalize(36)
    },
    shippingFormWrapper: {
        width: '96%',
        marginLeft: '2%',
        marginBottom: normalize(45),
        marginTop: normalize(27)
    },
    shippingPromotionWrapper: {
        marginVertical: normalize(81)
    },
    shippingTotalWrapper: {
        marginBottom: normalize(72)
    },

    //PayScreen
    payIconCardWrapper: {
        width: 0.85 * width,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    payRadioWrapper: {
        flexDirection: 'row',
        width: normalize360(250)
    },
    payCodeDataWrapper: {
        flex: 1,
        marginVertical: normalize360(8),
        flexDirection: 'column',
        justifyContent: 'space-between'
    },

    //PayMethodScreen
    payMethodsWrapper: {
        marginVertical: normalize360(16)
    },
    payButtonWrapper: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: normalize360(25)
    },
    newPayButtonWrapper: {
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: normalize360(25)
    },

    //NewPaymentMethod
    label: {
        fontSize: normalize360(10),
        marginLeft: 0.02 * width,
        marginBottom: normalize360(-13),
        marginTop: normalize360(20)
    },
    selectMonth: {
        width: '15%',
        marginRight: normalize360(13)
    },
    cvvWrapper: {
        width: '45%',
        marginLeft: '1%',
        flexDirection: 'row'
    },
    cvvImage: {
        width: normalize360(17),
        height: normalize360(17),
        marginTop: normalize360(25)
    },

    //SummaryScreen
    summaryListItemWrapper: {
        flexDirection: 'row',
        margin: normalize360(7),
        backgroundColor: colors.white,
        padding: 0,
        borderBottomRightRadius: normalize360(8),
        borderTopRightRadius: normalize360(8)
    },
    summaryCountMainWrapper: {
        flexDirection: 'row',
        width: '65%',
        justifyContent: 'space-between'
    },
    summaryTotal: {
        marginTop: normalize360(13)
    },
    summaryButtonWrapper: {
        width,
        alignItems: 'center',
        marginVertical: normalize360(17)
    },
    userDataWrapper: {
        flexDirection: 'column',
        paddingBottom: normalize360(13)
    },
    userDataTextWrapper: {
        flexDirection: 'column',
        height: 0.25 * height,
        width: 0.9 * width,
        justifyContent: 'space-around',
        borderBottomWidth: 0.5,
        paddingBottom: normalize360(13),
        borderBottomColor: colors.grey
    },
    estimatedWrapper: {
        marginVertical: 20,
        width: 0.9 * width,
        borderBottomWidth: 0.5,
        paddingBottom: normalize360(13),
        borderBottomColor: colors.grey
    },

    //ExitCartScreen
    exitCartContainer: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center'
    },
    exitCartLogo: {
        width: normalize360(107),
        height: normalize360(89),
        marginTop: normalize360(64),
        marginBottom: normalize360(81)
    },
    exitCartH3: {
        fontFamily: fonts.robotoMedium,
        marginBottom: normalize360(17)
    },
    exitCartButton: {
        width: '80%',
        backgroundColor: colors.tabs,
        borderRadius: 10,
        marginTop: normalize360(72),
        paddingVertical: normalize360(13),
        alignItems: 'center'
    },

    iconButton: {
        padding: normalize360(13)
    }
};

export default styles;