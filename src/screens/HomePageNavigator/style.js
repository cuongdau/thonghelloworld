import React from 'react';
import {Platform} from 'react-native';
import {normalize, normalize360, rgba, width} from "../../utilities/index";
import {colors, fonts} from "../../config/index";

const styles = {

    // HomepageScreen
    titleHome: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: normalize360(16),
        paddingTop: normalize360(8),
        paddingBottom: normalize360(8),
        flex: 1
    },
    title: {
        fontSize: normalize360(14),
        color: colors.icon,
        fontFamily: fonts.robotoRegular,
        letterSpacing: normalize360(0.21)
    },
    title2: {
        fontSize: normalize360(14),
        color: rgba(colors.primary, 50),
        fontFamily: fonts.robotoCondensed
    },
    homeListWrapper: {
        paddingLeft: normalize360(8),
        marginBottom: normalize360(5)
    },
    homeCategories: {
        flexDirection: 'column',
    },

    // ProductScreen
    wrapper_product_up: {
        flex: 1,
        flexDirection: 'column'
    },
    text_product_up: {
        marginLeft: normalize360(16),
        marginVertical: normalize360(18),
        fontFamily: fonts.robotoRegular,
        color: rgba(colors.darkGrey, 60),
        fontSize: normalize360(12)
    },
    wrapper_product_body: {
        flex: 4,
        flexDirection: 'column'
    },
    scroll_product_body: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        marginLeft: normalize360(8),
        marginBottom: normalize360(10),
    },
    item_wrapper: {
        width: normalize360(168 + 8),
        borderRadius: normalize360(4),
        overflow: 'hidden',
        paddingTop: normalize360(16)
    },
    dropdown: {
        wrapper:  {
            flex: 1,
            backgroundColor: '#f7f7f7',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: normalize(15),
            borderBottomWidth: 1,
            borderColor: '#e6e6e6'
        },
        button: {
            flexDirection: 'row',
            alignItems: 'center',
            padding: normalize360(10),
            marginBottom: normalize360(9),
            marginTop: normalize360(10)
        },
        icon: {
            marginLeft: normalize360(22),
            width: normalize360(10),
            height: normalize360(5)
        }
    },
    picker: {
        paddingTop: 0,
        marginTop: normalize360(-15),
        width: Platform.OS === 'ios' ? normalize360(140) : normalize360(150),
        marginLeft: normalize360(16)
    },
    borderPicker: {
        position: 'absolute',
        zIndex: 10,
        bottom: 0,
        left: 0,
        width: normalize360(170),
        backgroundColor: colors.primary,
        height: normalize360(9)
    },
    text_filter: {
        color: colors.icon,
        fontFamily: fonts.robotoMedium,
        fontSize: normalize360(14),
        marginRight: normalize360(14)
    },
    degreesWrapper: {
        marginLeft: normalize360(16)
    },

    // DescriptionScreen
    cartButton: {
        width: normalize360(316),
        height: normalize360(44),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.primary,
        borderRadius: normalize360(10)
    },
    lightButton: {
        width: normalize360(151),
        height: normalize360(44),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.disable,
        borderRadius: normalize360(10)
    },
    wrapperLightButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: normalize360(316),
        marginHorizontal: normalize360(14),
        marginVertical: normalize360(18)
    },
    imageBackground: {
        width,
        height: normalize360(265)
    },
    iconWrapper: {
        width,
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingHorizontal: normalize360(10),
        marginTop: normalize360(6),
        position: 'absolute',
        zIndex: 7,
        top: 0
    },
    starWrapper: {
        marginLeft: normalize(27),
        width: normalize(36),
        height: normalize(36),
        borderRadius: normalize(18),
        backgroundColor: colors.white,
        justifyContent: 'center',
        alignItems: 'center'
    },
    oldPrice: {
        fontSize: normalize360(14),
        textDecorationLine: 'line-through',
        fontFamily: fonts.robotoRegular,
        color: colors.icon,
        marginRight: normalize360(15)
    },
    text1: {
        fontSize: normalize360(18),
        color: colors.icon,
        fontFamily: fonts.robotoMedium
    },
    text2: {
        fontSize: normalize360(14),
        color: colors.darkGrey,
        fontFamily: fonts.robotoRegular
    },
    buttonsWrapper: {
        width: normalize360(344),
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#f7f7f7',
        position: 'absolute',
        zIndex: 10,
        top: normalize360(223),
        marginLeft: normalize360(8),
        paddingTop: normalize360(18),
        borderRadius: normalize360(2),
        ...Platform.select({
            ios: {
                shadowOpacity: 0.24,
                shadowColor: colors.black,
                shadowRadius: normalize360(6),
                shadowOffset: {
                    height: normalize360(1),
                    width: 0
                }
            },
            android: {
                elevation: normalize360(1)
            }
        })
    },
    cardModelWrapper: {
        marginTop: normalize360(143),
        width: normalize360(344),
        marginLeft: normalize360(8),
        marginBottom: normalize360(8),
        paddingRight: normalize360(15),
        backgroundColor: '#f7f7f7',
        borderRadius: normalize360(2),
        ...Platform.select({
            ios: {
                shadowOpacity: 0.24,
                shadowColor: colors.black,
                shadowRadius: normalize360(6),
                shadowOffset: {
                    height: normalize360(1),
                    width: 0
                }
            },
            android: {
                elevation: normalize360(1)
            }
        })
    },
    cardModelName: {
        fontFamily: fonts.robotoMedium,
        fontSize: normalize360(20),
        color: '#343434'
    },
    cardModelItem: {
        flexDirection: 'column',
        alignItems: 'flex-start'
    },
    cardModelItem2: {
        flexDirection: 'row',
        alignItems: 'flex-start'
    },
    cardModelTitle: {
        fontFamily: fonts.robotoMedium,
        fontSize: normalize360(14),
        color: colors.icon,
        marginBottom: normalize360(10)
    },
    cardModelSimpleText: {
        fontFamily: fonts.robotoRegular,
        fontSize: normalize360(14),
        color: colors.icon
    },
    cardModelButton: {
        textDecorationLine: 'underline',
        alignSelf: 'center',
        marginVertical: normalize(22),
        fontSize: normalize360(14),
        fontFamily: fonts.robotoRegular
    },
    cardModelViewItem: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    cardPaymentWrapper: {
        width: normalize360(344),
        marginLeft: normalize360(8),
        marginBottom: normalize360(8),
        backgroundColor: '#f7f7f7',
        paddingRight: normalize360(15),
        borderRadius: normalize360(2),
        ...Platform.select({
            ios: {
                shadowOpacity: 0.24,
                shadowColor: colors.black,
                shadowRadius: normalize360(6),
                shadowOffset: {
                    height: normalize360(1),
                    width: 0
                }
            },
            android: {
                elevation: normalize360(1)
            }
        })
    },
    cardPaymentItem: {
        flexDirection: 'column',
        alignItems: 'center'
    },
    cardPaymentImage: {
        width: normalize(72),
        height: normalize(72),
        marginVertical: normalize(18)
    },
    shippingListItem: {
        marginRight: normalize360(8),
        fontSize: normalize360(16)
    },
    sellerCardTitle: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginLeft: '5%'
    },
    sellerCardImage: {
        width: normalize360(80),
        height: normalize360(80),
        marginRight: normalize360(16),
        borderRadius: normalize360(normalize360(4))
    },
    sellerCardItemWrapper: {
        flexDirection: 'column',
        width: '70%',
        marginLeft: normalize(18)
    },
    sellerCardButtonWrapper: {
        paddingLeft: normalize360(15),
        width: '100%',
        alignItems: 'center'
    },
    sellerCardButton: {
        marginRight: '8%',
        fontSize: normalize360(14),
        fontFamily: fonts.robotoCondensed
    },
    flatListWrapper: {
        width: '90%',
        marginLeft: '5%',
        marginTop: normalize(36)
    },
    flatListTitleWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: '5%'
    },
    flatListTitleText: {
        fontSize: normalize(29)
    },
    absoluteTextWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: normalize(27)
    },
    modalWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalContent: {
        paddingVertical: normalize360(16),
        borderRadius: normalize360(4),
        width: normalize360(280),
        height: normalize360(352),
        backgroundColor: colors.white
    },
    modalTitleWrapper: {
        paddingHorizontal: normalize360(17),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: normalize360(20)
    },
    modalTitle: {
        fontFamily: fonts.robotoMedium,
        fontSize: normalize360(20)
    },
    modalShopName: {
        color: colors.primary,
        fontSize: normalize360(16),
        fontFamily: fonts.robotoRegular
    },
    modalCloseButton: {
        padding: normalize360(10)
    },
    priceFieldWrapper: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginBottom: normalize360(16)
    },
    priceFieldInput: {
        width: normalize360(110),
        marginRight: normalize360(28)
    },
    priceFieldText: {
        fontSize: normalize360(16),
        fontFamily: fonts.robotoRegular,
        color: '#464d53'
    },
    modalInput: {
        marginTop: Platform.OS === 'ios' ? normalize360(5) : normalize360(-10),
        paddingBottom: Platform.OS === 'ios' ? normalize360(10) : normalize360(5),
        paddingLeft: normalize360(12),
        marginHorizontal: normalize360(8),
        borderBottomWidth: Platform.OS === 'ios' ? 1 : 0,
        borderColor: '#464d53'
    },
    modalLabel: {
        color: colors.darkGrey,
        fontSize: normalize360(12),
        fontFamily: fonts.robotoRegular,
        marginLeft: normalize360(24)
    },
    modalError: {
        color: '#ea2727',
        fontSize: normalize360(10),
        marginLeft: normalize360(11),
        marginTop: Platform.OS === 'ios' ? 0 : normalize360(-8)
    },
    radioButtonWrapper: {
        width: normalize360(200),
        flexDirection: 'row',
        marginLeft: normalize360(16),
        marginTop: normalize360(16)
    },
    textConsent: {
        marginLeft: normalize360(16),
        fontSize: normalize360(14),
        fontFamily: fonts.robotoRegular,
        color: '#464d53',
        opacity: 0.5
    },
    modalSubmitButton: {
        marginTop: normalize360(43),
        alignItems: 'flex-end',
        marginRight: normalize(36)
    },
    offerSubmittedText: {
        marginTop: normalize360(26),
        marginBottom: normalize360(34)
    },

    // SearchScreen
    searchInput: {
        width: '80%',
        borderWidth: normalize360(1),
        borderColor: '#ebebeb'
    },
    searchButton: {
        paddingHorizontal: normalize(18)
    },

    // PolicyScreen
    h2Policy: {
        margin: normalize(36),
        fontFamily: fonts.robotoMedium
    },
    wrapperPolicy: {
        paddingLeft: normalize(36),
        paddingRight: normalize(18),
        marginVertical: normalize(18)
    },
    textPolicy: {
        marginVertical: normalize(18)
    },
    itemListPolicy: {
        marginHorizontal: 10
    },
    iconLeftPolicy: {
        marginLeft: normalize(18)
    },
    iconRightPolicy: {
        marginRight: normalize(18)
    },

    // ChatScreen
    chatHeaderContainer: {
        height: normalize(198),
        paddingTop: normalize(27)
    },
    chatHeaderImage: {
        width: normalize(90),
        height: normalize(90),
        marginVertical: normalize(18)
    },
    chatButtonsWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: normalize(27),
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
        alignItems: 'center'
    },

    // SellersScreen
    sellersHeaderContainer: {
        backgroundColor: 'transparent',
        height: normalize360(150),
        paddingTop: normalize360(5),
        paddingHorizontal: normalize360(11)
    },
    sellersHeaderImage: {
        width: normalize360(90),
        height: normalize360(90),
        borderRadius: normalize360(4)
    },
    activeSellersTabStyle: {
        backgroundColor: colors.default,
        borderBottomWidth: normalize(5)
    },
    tabSellersStyle: {
        backgroundColor: colors.default,
        borderBottomWidth: 0
    },
    underlineStyle: {
        borderBottomColor: colors.icon,
        borderBottomWidth: 3,
        borderColor: colors.white
    },
    sellersInfoWrapper: {
        marginLeft: normalize(27)
    },
    sellersInfoText: {
        color: "#464d53",
        fontFamily: fonts.robotoRegular
    },
    sellerShopEstimation: {
        marginTop: normalize360(5),
        flexDirection: 'row'
    },
    tabSellersTextStyle: {
        color: rgba('#353535', 60),
        fontFamily: fonts.robotoMedium,
        fontSize: normalize360(14)
    },
    activeTabTextStyle: {
        color: colors.darkGrey,
        fontFamily: fonts.robotoMedium,
        fontSize: normalize360(14),
    },
    sellersFilterButton: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        backgroundColor: colors.default
    },
    sellersStars: {
        marginRight: normalize360(5)
    },
    sellerBody: {
        color: colors.darkGrey,
        fontSize: normalize360(20),
        fontFamily: fonts.robotoMedium
    },
    reviewButton: {
        marginTop: normalize360(5)
    },

    // BrandScreen
    brandButtonWrapper: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingLeft: normalize360(17),
        paddingTop: normalize360(10)
    },
    buttonStyle: {
        backgroundColor: "#f7f7f7",
        marginTop: normalize360(10),
        paddingHorizontal: normalize360(15),
        marginRight: normalize360(13),
        marginBottom: normalize360(7)
    },

    iconButton: {
        padding: normalize360(6),
        backgroundColor: 'transparent'
    },
    iconButtonWrapper: {
        backgroundColor: colors.white,
        opacity: 0.88,
        width: normalize360(28),
        height: normalize360(28),
        borderRadius: normalize360(14),
        justifyContent: 'center',
        alignItems: 'center'
    },

    // subcategoryScreen
    subcategoriesWrapper: {
        flex: 1,
        marginVertical: normalize360(17),
    },

    // AddFeedbackScreen
    feedbackWrapper: {
        width: '95%',
        marginTop: '5%',
        marginLeft: '2.5%'
    },
    feedbackRatingText: {
        marginStart: '6%',
        color: colors.grey,
        fontSize: normalize360(12)
    },
    feedbackRatingWrapper: {
        flexDirection: 'row',
        marginStart: '6%',
        marginTop: normalize360(15),
        width: '30%',
        justifyContent: 'space-between'
    },

    header: {
        backgroundColor: '#f7f7f7',
        borderBottomWidth: 1,
        borderBottomColor: '#e6e6e6'
    }
};

export default styles;