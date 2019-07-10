import { height } from './../../utilities';
import {normalize360} from "../../utilities";
import {colors, fonts} from "../../config";

export const styles = {
    button: {
        width: '90%',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 0.005 * height,
        marginHorizontal: '5%',
    },
    uppercaseTextButton: {
        color: colors.blueText,
        letterSpacing: normalize360(1.25),
        fontFamily: fonts.robotoMedium
    },
    lightRoundedButton: {
        elevation: 1,
        shadowOffset: { width: 0,  height: normalize360(3)},
        shadowColor: colors.black,
        shadowOpacity: 0.16,
        paddingHorizontal: normalize360(14)
    },
    lightRoundedButtonText: {
        fontFamily: fonts.robotoRegular,
        fontSize: normalize360(14),
        letterSpacing: normalize360(0.25)
    }

};