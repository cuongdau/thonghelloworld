import { normalize, normalize360 } from "../../utilities";
import { colors } from "../../config";

const styles = {
    cartCountContainer: {
        marginHorizontal: normalize360(8),
        borderTopColor: colors.grey,
        borderTopWidth: 1,
        marginTop: normalize(63),
        flexDirection: 'column',
        paddingHorizontal: normalize360(8)
    },
    cartCountMainWrapper: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        marginTop: normalize(27)
    },
    cartCountSecondaryWrapper: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between'
    },
    cartCountMainText: {
        fontSize: normalize(32),
        color: colors.primary
    },
    cartCountSecondaryText: {
        fontSize: normalize(22),
        color: colors.grey
    },
    cartButtonWrapper: {
        width: '100%',
        alignItems: 'center',
        marginTop: normalize(36)
    },
    cartButton: {
        width: normalize(414),
        paddingVertical: normalize(27),
        alignItems: 'center',
        borderRadius: normalize(18)
    }
};

export default styles;