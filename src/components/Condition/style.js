import {normalize, normalize360} from "../../utilities";
import {colors, fonts} from "../../config";

const styles = {

    modalWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalContent: {
        width: normalize360(280),
        height: normalize360(300),
        paddingHorizontal: normalize360(24),
        paddingTop: normalize360(32),
        borderRadius: normalize360(4),
        backgroundColor: '#f7f7f7',
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    title: {
        fontSize: normalize360(16),
        fontFamily: fonts.robotoCondensed,
        color: colors.icon,
        marginBottom: normalize360(18)
    },
    condition: {
        fontSize: normalize360(16),
        fontFamily: fonts.robotoRegular,
        textDecorationLine: 'underline'
    },
    text: {
        marginTop: normalize360(-25),
        fontSize: normalize360(16),
        fontFamily: fonts.robotoRegular,
        color: "#464d53",
        lineHeight: normalize360(28)
    },
    modalSubmitButton: {
        marginBottom: normalize360(17),
        alignItems: 'flex-end',
        marginRight: normalize360(15)
    },
    textButton: {
        fontSize: normalize360(14),
        fontFamily: fonts.robotoMedium,
        opacity: 0.8
    },
    quality: {
        //textDecorationLine: 'underline',
        fontSize: normalize360(12),
        fontFamily: fonts.robotoMedium
    },
    desc: {
        textDecorationLine: 'underline',
        fontSize: normalize(30)
    }
};

export default styles;