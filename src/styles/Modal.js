import {normalize, normalize360} from "../utilities";
import {colors, fonts} from "../config";

const modalStyles = {
    modalWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalContent: {
        padding: normalize360(17),
        paddingTop: normalize360(23),
        borderRadius: normalize360(4),
        width: normalize360(284),
        backgroundColor: colors.white
    },
    modalTitle: {
        fontFamily: fonts.robotoMedium,
        fontFamily: fonts.robotoMedium,
        fontSize: normalize360(20)
    },
    inputText: {
        width: '100%'
    },
};

export default modalStyles;