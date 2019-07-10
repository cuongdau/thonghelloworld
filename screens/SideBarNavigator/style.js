import { normalize, normalize360 } from "../../utilities";
import {colors, fonts} from "../../config";
import {Platform} from "react-native";

const styles = {
    wrapper: {
        marginBottom: normalize(100)
    },
    listItem: {
        width: '95%',
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginHorizontal: normalize360(5),
        borderBottomWidth: 1,
        borderColor: colors.grey
    },
    titleWrapper: {
        width: '100%',
        paddingLeft: normalize360(15),
        paddingTop: normalize360(20),
        paddingBottom: normalize360(10),
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    conditionWrapper: {
        flexDirection: 'column',
        paddingHorizontal: normalize360(20),
        width: '100%'
    },
    conditionText: {
        fontSize: normalize360(14)
    },
    conditionItem: {
        marginBottom: normalize(20),
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingRight: normalize360(20)
    },
    label: {
        color: colors.black,
        fontFamily: fonts.robotoRegular,
        fontSize: normalize360(12),
        marginLeft: normalize360(16),
        marginBottom: Platform.OS === 'ios' ? normalize360(5) : 0
    },
    input: {
        paddingHorizontal: normalize360(16),
        paddingVertical: normalize360(10),
        borderBottomWidth: Platform.OS === 'ios' ? 1 : 0,
        borderColor: colors.grey,
        fontSize: normalize360(14)
    },
    intervalPrice: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingRight: normalize360(20)
    },
    slider: {
        width: normalize(450),
        marginVertical: normalize(54),
        marginLeft: 0
    },
    msContainer: {
        height: normalize360(50),
        paddingHorizontal: normalize360(8)
    },
    msTint: {
        height: normalize360(32),
        width: normalize360(32),
        borderRadius: normalize360(16),
        slipDisplacement: normalize360(32)
    },
    allInputWrapper: {
        marginLeft: normalize(18),
        width: normalize(460),
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    inputWrapper: {
        marginLeft: normalize(7),
        width: normalize(200)
    },
    button: {
        width: '60%',
        marginLeft: '20%',
        marginBottom: normalize360(12),
        paddingVertical: normalize(27),
        alignItems: 'center',
        borderRadius: normalize(18),
        backgroundColor: colors.primary
    },

    iconButton: {
        paddingHorizontal: normalize360(13),
        paddingVertical: normalize360(13)
    }
};

export default styles;