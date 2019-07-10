import { normalize, normalize360, rgba, width } from "../../utilities";
import {colors, fonts} from "../../config";
import {Platform} from "react-native";

const styles = {
    // for PersonalScreen
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: colors.tabs,
        paddingHorizontal: normalize(27),
        paddingVertical: normalize360(4)
    },
    subtitleContainer: {
        flexDirection: 'column',
        backgroundColor: '#f7f7f7',
        paddingLeft: normalize360(16),
        borderBottomWidth: 1,
        borderBottomColor: '#e6e6e6'
    },
    subtitle: {
        color: colors.icon,
        marginTop: normalize360(5),
        fontFamily: fonts.robotoRegular,
        fontSize: normalize360(18),
        paddingVertical: normalize360(4)
    },
    payPalWrapper: {
        flexDirection: 'row',
        paddingBottom: normalize360(normalize360(40)),
        marginTop: normalize360(5)
    },
    payPalIconWrapper: {
        width: normalize360(20),
        height: normalize360(20),
        borderRadius: normalize360(10),
        borderWidth: 1,
        borderColor: colors.icon,
        alignItems: 'center',
        justifyContent: 'center'
    },
    payPalText: {
        color: colors.icon,
        fontSize: normalize360(16),
        fontFamily: fonts.robotoCondensed,
        marginLeft: normalize360(15)
    },
    topCardContainer: {
        marginLeft: normalize360(8),
        marginTop: normalize360(10),
        marginRight: normalize360(8)
    },
    profileItemWrapper: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    groupSwitchTitle: {
        color: colors.blue,
        marginBottom: normalize(27)
    },
    labelStyle: {
        flex: 6,
        fontSize: normalize360(16),
        fontFamily: fonts.robotoRegular,
        color: colors.darkGrey,
        marginLeft: normalize360(8)
    },
    pickerContainer: {
        position: 'absolute',
        top: normalize(18),
        right: normalize(72),
        backgroundColor: colors.white,
        borderWidth: 0.4,
        paddingRight: normalize(27)
    },
    icon: {
        position: 'absolute',
        zIndex: -10,
        top: normalize360(10),
        right: normalize360(10),
        fontSize: normalize360(25)
    },
    title: {
        color: colors.icon,
        marginBottom: normalize360(13),
        fontSize: normalize360(14),
        fontFamily: fonts.robotoCondensed
    },


    // for ListingScreen
    listingItem: {
        marginHorizontal: normalize360(10),
        marginBottom: normalize360(5),
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    listingItemText: {
        fontSize: normalize360(16),
        fontFamily: fonts.robotoRegular,
        color: colors.icon
    },
    menuContainer: {
        paddingTop: normalize(15),
        marginTop: normalize360(20),
        marginLeft: normalize360(-20)
    },
    listingItemContainer: {
        flexDirection: 'row',
        backgroundColor: '#f7f7f7',
        borderBottomColor: '#e6e6e6',
        borderBottomWidth: normalize360(1),
        height: normalize(270),
        marginBottom: normalize360(10)
    },
    listingItemImage: {
        width: normalize(270),
        height: normalize(270)
    },
    listingDataContainer: {
        flexDirection: 'column',
        margin: normalize(27),
        width: '60%',
        justifyContent: 'space-between'
    },
    listingViewStatistic: {
        color: colors.grey,
        fontSize: normalize(22)
    },
    listingsUpdateButton: {
        marginRight: normalize360(16),
        fontSize: normalize360(12),
        fontFamily: fonts.robotoRegular,
        letterSpacing: 0.11
    },
    animatedPanel: {
        marginBottom: 0,
        width: '100%',
        backgroundColor: colors.white,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },



    // for FeedbackScreen
    headerFeedbackContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: colors.chat,
        paddingHorizontal: normalize(27)
    },
    activeFeedbackTabStyle: {
        backgroundColor: colors.chat,
        borderBottomWidth: normalize(5)
    },
    tabFeedbackStyle: {
        backgroundColor: colors.chat,
        borderBottomWidth: 0
    },
    underlineStyle: {
        borderBottomColor: colors.icon,
        borderBottomWidth: 3,
        borderColor: colors.white
    },
    underlineStyleShop: {
        borderBottomColor: colors.primary,
        borderBottomWidth: 3,
        borderColor: colors.white
    },
    feedbackTabsWrapper: {
        marginTop: normalize(27),
    },
    activeFeedbackTabTextStyle: {
        color: colors.primary
    },
    tabTextStyle: {
        color: rgba('#353535', 60),
        fontSize: normalize360(14),
        fontFamily: fonts.robotoMedium
    },
    feedbackGiveItemWrapper: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        flex: 4,
        padding: normalize360(20),
        justifyContent: 'space-between'
    },
    feedbackGiveTitleWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        alignItems: 'flex-end'
    },
    feedbackGiveButtonWrapper: {
        width: '100%',
        alignItems: 'flex-end'
    },
    feedbackListContainer: {
        marginTop: normalize360(20)
    },
    emptyView: {
        marginTop: '20%',
        alignItems: 'center'
    },
    emptyText: {
        color: colors.grey,
        textAlign: 'center'
    },

    // for Orders screen
    ordersContent: {
        paddingVertical: normalize360(17),
        paddingHorizontal: normalize360(8),
        backgroundColor: colors.white
    },
    orderCard: {
        borderRadius: normalize360(4),
        width: '98%',
        backgroundColor: '#f7f7f7'
    },
    orderWrapper: {
        paddingVertical: normalize360(18),
        paddingHorizontal: normalize360(16)
    },
    orderImageWrapper: {
        width: '100%',
        height: (width - normalize360(16)) * 0.5625,
    },
    orderImage: {
        width: '100%',
        height: (width - normalize360(16)) * 0.5625,
        borderTopRightRadius: normalize360(4),
        borderTopLeftRadius: normalize360(4),
    },
    orderBuyer: {
        color: colors.blueText,
        fontSize: normalize360(12),
        fontFamily: fonts.robotoCondensed,
        marginBottom: normalize360(5),
        opacity: 0.5
    },
    orderTitle: {
        color: 'black',
        fontSize: normalize360(20),
        fontFamily: fonts.robotoMedium,
        marginBottom: normalize360(26)
    },
    orderStatus: {
        color: '#3434347f',
        fontSize: normalize360(12),
        fontFamily: fonts.robotoCondensed,
        marginBottom: normalize360(5)
    },
    orderNo: {
        color: 'grey',
        fontSize: normalize360(14),
        fontFamily: fonts.robotoRegular
    },
    orderDate: {
        color: 'grey',
        fontSize: normalize360(14),
        fontFamily: fonts.robotoRegular,
        marginBottom: normalize360(19)
    },
    orderPrice: {
        color: colors.blueText,
        fontSize: normalize360(14),
        fontFamily: fonts.robotoMedium,
        marginBottom: normalize360(23)
    },
    orderShippingPrice: {
        color: '#989fa7',
        fontSize: normalize360(13),
    },
    viewDetails: {
        marginRight: normalize360(36),
        fontSize: normalize360(14),
        fontFamily: fonts.robotoMedium
    },


    // order details
    orderInfoCard: {
        borderRadius: normalize360(4),
        padding: normalize360(16),
        backgroundColor: '#f7f7f7'
    },
    orderInfoTitle: {
        color: colors.icon,
        fontSize: normalize360(14),
        letterSpacing: normalize360(0.24),
        fontFamily: fonts.robotoCondensed,
        marginBottom: normalize360(5)
    },
    orderDetailsTitle: {
        marginBottom: normalize360(10)
    },
    orderDetailsDate: {
        marginBottom: normalize360(10)
    },
    orderDetailsPrice: {
        marginBottom: 0
    },
    orderDetailsGridText: {
        fontSize: normalize360(14),
        color: '#464d53',
        flex: 1
    },
    textSmall: {
        fontSize: normalize360(14),
        color: '#464d53',
    },
    textSmaller: {
        fontSize: normalize360(13),
        color: '#464d53',
    },
    textTotal: {
        color: colors.great,
        fontSize: normalize360(18),
        fontWeight: 'bold'
    },
    orderDetailsText: {
        color: '#464d53',
        fontSize: normalize360(16)
    },
    shippingConfirmedLabel: {
        fontSize: normalize360(16),
        color: colors.darkGrey,
        flex: 1
    },

    // Purchase Details Screen
    purchaseDetailsTitle: {
        color: 'black',
        fontSize: normalize360(20),
        fontFamily: fonts.robotoMedium,
    },
    textMedium: {
        fontFamily: fonts.robotoMedium,
    },
    textRegular: {
        fontFamily: fonts.robotoRegular,
    },
    noteText: {
        fontSize: normalize360(12),
        fontFamily: fonts.robotoRegular,
        color: rgba('#1f2727', 50)
    },

    // Offers Screen
    buyingOfferBottom: {
        justifyContent: 'space-between',
        marginTop: normalize360(24)
    },

    sellingOfferBottom: {
        marginTop: normalize360(24),
        width: '100%',
        flexDirection: 'row'
    },
    sellingBottomButton: {
        marginRight: normalize360(37)
    },
    offerStatus: {
        fontFamily: fonts.robotoRegular,
        fontSize: normalize360(14),
        textAlign: 'right'
    },
    offerStatusAccepted: {
        color: '#209549',
    },
    offerStatusRejected: {
        color: '#d93e31',
    },
    offerStatusPending: {
        color: colors.tabs,
    },
    ResponseToOfferComment: {
        marginTop: normalize360(48)
    },
    noOffers: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: normalize360(16),
        marginTop: '15%'
    },
    
    // MyShopScreen
    myShopHeaderContainer: {
        backgroundColor: '#f7f7f7',
        height: normalize(300),
        paddingTop: normalize(27),
        paddingHorizontal: normalize(27)
    },
    myShopHeaderImage: {
        width: normalize(160),
        height: normalize(160),
        marginVertical: normalize(18),
        borderRadius: normalize360(5)
    },
    activeMyShopTabStyle: {
        backgroundColor: '#f7f7f7',
        borderBottomWidth: normalize360(2)
    },
    tabMyShopStyle: {
        backgroundColor: '#f7f7f7',
        borderBottomWidth: 0
    },
    myShopInfoWrapper: {
        marginLeft: normalize(27)
    },
    myShopInfoText: {
        color: colors.icon,
        marginTop: normalize360(5),
        fontFamily: fonts.robotoRegular
    },
    myShopTabsWrapper: {
        marginTop: normalize360(5)
    },
    activeMyShopTabTextStyle: {
        color: colors.darkGrey,
        fontSize: normalize360(14),
        fontFamily: fonts.robotoMedium
    },
    myShopAboutPolicy: {
        color: "#d9d9d9",
        marginTop: normalize360(16),
        fontFamily: fonts.robotoCondensed,
        textDecorationLine: 'underline'
    },
    sellerBody: {
        color: colors.icon,
        fontFamily: fonts.robotoMedium,
        fontSize: normalize360(20)
    },

    // EditMyShopScreen
    editMyShopWrapper: {
        width: normalize360(348),
        marginLeft: normalize360(6),
        marginTop: normalize(27),
        backgroundColor: '#f7f7f7'
    },
    editMyShopLabel: {
        marginLeft: normalize360(25),
        marginTop: normalize360(13),
        color: colors.icon,
        fontSize: normalize360(14),
        fontFamily: fonts.robotoCondensed
    },
    inputText: {
        width: '100%',
        marginTop: normalize360(4)
    },
    editMyShopLabelStyle: {
        flex: 6,
        fontSize: normalize(31),
        marginLeft: normalize(9)
    },
    editMyShopImageWrapper: {
        flexDirection: 'row',
        padding: normalize360(15)
    },
    editMyShopImage: {
        width: normalize360(100),
        height: normalize360(100),
        borderRadius: normalize360(8)
    },
    editMyShopIcon: {
        margin: normalize360(20)
    },

    // EditPolicyScreen
    editPolicyContainer: {
        paddingLeft: normalize360(24),
        paddingRight: normalize360(18),
        paddingVertical: normalize360(16)
    },
    editPolicyTextWrapper: {
        fontSize: normalize360(14),
        color: '#464d53'
    },
    editPointPolicy: {
        width: normalize360(5),
        height: normalize360(5),
        backgroundColor: '#464d53',
        borderRadius: normalize360(2.5),
        marginLeft: normalize360(2),
        marginTop: normalize360(7),
        marginRight: normalize360(7)
    },

    // MyDetailsScreen
    shippingFormWrapper: {
        width: '96%',
        marginLeft: '2%',
        marginBottom: normalize(45),
        marginTop: normalize(27)
    },
    shippingRadioWrapper: {
        width: '96%',
        marginLeft: '2%',
        marginBottom: normalize(45)
    },
    shippingRadioLabel: {
        color: colors.icon,
        fontFamily: fonts.robotoCondensed,
        fontSize: normalize360(14),
        marginLeft: normalize360(5),
        marginBottom: normalize360(8)
    },
    itemWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: normalize360(5)
    },
    addressText: {
        fontSize: normalize360(12),
        fontFamily: fonts.robotoRegular,
        color: '#4a4a4a'
    },
    itemButtonWrapper: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingVertical: normalize360(10)
    },
    addButton: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingRight: normalize360(20)
    },
    addButtonName: {
        fontSize: normalize360(14),
        fontFamily: fonts.robotoMedium,
        opacity: 0.8,
        letterSpacing: normalize360(1.25)
    },
    checkboxWrapper: {
        flexDirection: 'row',
        width: '100%',
        marginTop: normalize360(20)
    },
    checkboxName: {
        marginLeft: normalize360(20),
        fontSize: normalize360(12)
    },

    iconButton: {
        paddingHorizontal: normalize360(13),
        paddingVertical: normalize360(13)
    },
    moreButton: {
        paddingLeft: normalize360(26),
        paddingRight: normalize360(13),
        paddingVertical: normalize360(13)
    },


    // PasswordScreen
    passwordFormWrapper: {
        width: '96%',
        marginLeft: '2%',
        paddingHorizontal: 0,
        marginBottom: normalize(45),
        marginTop: normalize(27)
    },
    iconSecure: {
        position: 'absolute',
        zIndex: 10,
        top: normalize360(21),
        right: normalize360(16)
    },
    right: {
        letterSpacing: 1.25,
        fontSize: normalize360(14),
        marginRight: normalize360(39)
    },

    select: {
        fontSize: normalize360(14),
        fontFamily: fonts.robotoRegular,
        letterSpacing: 0.44
    },


    input: {
        paddingHorizontal: normalize360(8),
        borderBottomWidth: Platform.OS === 'ios' ? 1 : 0,
        borderColor: colors.grey,
        fontSize: normalize360(14)
    },

    header: {
        backgroundColor: '#f7f7f7',
        borderBottomWidth: 1,
        borderBottomColor: '#e6e6e6'
    }

};

export default styles;