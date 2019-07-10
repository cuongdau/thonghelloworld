import {Platform} from 'react-native';
import {normalize360} from "../../utilities";
import {colors} from "../../config";

const styles = {
    container: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        width: '100%',
        marginVertical: normalize360(4)
    },
    label: {
        fontSize: normalize360(12),
        marginLeft: normalize360(16),
        color: colors.black,
        opacity: 0.5
    },
    input: {
        backgroundColor: 'transparent',
        borderColor: Platform.OS === 'ios' ? colors.grey : colors.darkGrey,
        borderBottomWidth: 1,
        marginHorizontal: normalize360(4)
    },
    text: {
        fontSize: normalize360(16),
        paddingHorizontal: normalize360(4),
        color: colors.black
    },
    caret: {
        size: normalize360(10),
        color: colors.darkGrey
    }
};

export default styles;