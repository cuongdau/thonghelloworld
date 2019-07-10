import {normalize, normalize360} from "../../utilities";
import {colors, fonts} from "../../config";

const styles = {
    buttonGroupContainer: {
        marginVertical: normalize(27)
    },
    title: {
        fontSize: normalize360(14),
        color: colors.icon,
        fontFamily: fonts.robotoCondensed,
        letterSpacing: normalize360(0.08)
    },
    buttonGroupWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    buttonGroupLabel: {
        fontSize: normalize(18),
        marginLeft: normalize(18),
        marginBottom: normalize(18)
    },
    photoContainer: {
        marginHorizontal: normalize360(8),
        marginTop: normalize360(24),
        height: normalize360(160)
    },
    photoWrapper: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginHorizontal: normalize360(8),
    },
    photo: {
        width: normalize360(124),
        height: normalize360(124)
    },
    plus: {
        width: normalize360(36),
        height: normalize360(36),
        marginTop: normalize360(47)
    },
    topCardContainer: {
        marginLeft: normalize(18),
        marginTop: normalize(36),
        marginRight: normalize(18)
    },
    inputText: {
        width: '100%'
    },
    bottomCardContainer: {
        marginLeft: normalize(18),
        marginBottom: normalize(54),
        marginRight: normalize(18)
    },
    minPriceInput: {
        width: '40%'
    },
    submitButton: {
        marginVertical: normalize(36),
        marginHorizontal: '25%',
        backgroundColor: colors.primary,
        width: '50%',
        borderRadius: normalize360(10),
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: normalize360(13)
    },
    cameraBackArrow: {
        fontSize: normalize360(30),
        fontWeight: 'bold'
    },
    removeButtonWrapper: {
        paddingHorizontal: normalize360(3),
        marginLeft: normalize360(3),
        width: normalize360(17),
        height: normalize360(17),
        borderRadius: normalize360(8.5),
        backgroundColor: colors.primary,
        justifyContent: 'center',
        alignItems: 'center'
    },
    plashka: {
        width: normalize360(60),
        height: normalize360(20),
        borderRadius: normalize360(4),
        backgroundColor: colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        margin: normalize360(5)
    },
    drop: {
        fontSize: normalize360(10),
        fontFamily: fonts.robotoMedium,
        color: colors.white
    }
};

export default styles;