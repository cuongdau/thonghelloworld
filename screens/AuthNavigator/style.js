import React from 'react';
import {Platform} from 'react-native';
import {height, normalize, normalize360} from "../../utilities/index";
import {colors, fonts} from "../../config/index";
import {Field} from "redux-form";

const styles = {

    // WelcomeScreen
    welcomeLogo: {
        width: normalize360(295),
        height: normalize360(52)
    },
    headWrapper: {
        backgroundColor: colors.default,
        borderBottomColor: 'transparent',
        elevation: 0
    },
    welcomeH2Wrapper: {
        marginTop: normalize360(10),
        flexDirection: 'column',
        width: '100%',
        alignItems: 'center',
        marginHorizontal: normalize360(22),
    },
    welcomeH2: {
        textAlign: 'center',
        fontFamily: fonts.robotoCondensed,
        fontSize: normalize360(20),
        color: colors.darkGrey
    },
    welcomeContent: {
        marginTop: normalize360(40),
        backgroundColor: colors.default,
        flexDirection: 'column',
        alignItems: 'center',
        height: '100%'
    },
    welcomeButtonsBlock: {
        marginTop: normalize360(120),
        width: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    welcomeButton: {
        width: normalize360(316),
        height: normalize360(44),
        borderRadius: normalize360(10),
        justifyContent: 'center',
        alignItems: 'center',
        ...Platform.select({
            ios: {
                shadowOpacity: 0.24,
                shadowColor: colors.black,
                shadowRadius: normalize360(6),
                shadowOffset: {
                    height: normalize360(3),
                    width: 0
                }
            },
            android: {
                elevation: normalize360(3)
            }
        })
    },
    hr: {
        width: normalize360(119),
        height: 1,
        backgroundColor: colors.primary,
        marginVertical: normalize360(32)
    },

    // SignUpScreen
    headTitle: {
        color: colors.primary,
        fontFamily: fonts.robotoMedium
    },
    signUpFormWrapper: {
        //height: 0.8 * height,
        flexDirection: 'column',
        justifyContent: 'space-around'
    },
    signUpInputWrapper: {
        flex: 5,
        flexDirection: "column",
        justifyContent: "space-between",
        marginVertical: '5%'
    },
    agreement: {
        flex: 1,
        width: '90%',
        marginHorizontal: '5%',
    },
    agreementText: {
        fontSize: normalize360(12),
        color: colors.darkGrey,
        fontFamily: fonts.robotoRegular,
        opacity: 0.44
    },
    signUpButton: {
        width: '100%',
        borderRadius: normalize360(10),
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: normalize360(13),
        marginVertical:  Platform.OS === 'ios' ? normalize360(24) : normalize360(10)
    },

    // SignInScreen
    signInLogo: {
        width: Platform.OS === 'ios' ? normalize360(140) : normalize360(130),
        height: Platform.OS === 'ios' ? normalize360(116) : normalize360(106),
        marginBottom: Platform.OS === 'ios' ? normalize360(24) : normalize360(14)
    },
    signInContent: {
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: colors.default,
        marginTop: 0
        //height: Platform.OS === 'ios' ? 0.8 * height : '100%'
    },
    signInFormBlock: {
        width: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: Platform.OS === 'ios' ? 'space-around' : 'space-between',
        marginBottom: normalize360(10),
        marginTop: normalize360(10)
    },
    signInLinkWrapper: {
        marginTop: Platform.OS === 'ios' ? normalize360(56) : normalize360(31),
        marginBottom: Platform.OS === 'ios' ? normalize360(56) : normalize360(20)
    },
    signInH3: {
        color: colors.primary,
        fontFamily: fonts.robotoMedium,
        fontSize: normalize360(20),
        marginVertical: normalize360(14)
    },

    // PasswordRecoveryScreen
    recoveryFormBlock: {
        height: '30%',
        width: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: Platform.OS === 'ios' ? 'space-around' : 'space-between',
        marginBottom: normalize360(10)
    },
    recoveryTextWrapper: {
        width: '90%',
        marginTop: normalize360(62),
        marginBottom: normalize360(14)
    },
    recoveryText: {
        fontSize: normalize360(16),
        fontFamily: fonts.robotoRegular,
        color: colors.darkGrey
    },

    // SecureIcon
    iconSecure: {
        position: 'absolute',
        zIndex: 10,
        top: normalize360(34),
        right: normalize360(34)
    },

    // TextInput
    input: {
        width: '90%',
        marginHorizontal: '5%',
        marginBottom: Platform.OS === 'ios' ? normalize360(24) : normalize360(5),
        borderColor: colors.primary,
        borderWidth: 1,
        borderRadius: normalize360(2)
    },
};

export default styles;