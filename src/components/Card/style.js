import {normalize360, rgba} from "../../utilities";
import {fonts, colors} from '../../config';

const styles = {
    categoryBody: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: normalize360(12),
        paddingHorizontal: normalize360(16),
        borderBottomWidth: 1,
        backgroundColor: '#ffffff',
        borderBottomColor: rgba('#000000', 10)
    },
    categoryImg: {
        width: normalize360(40),
        height: normalize360(40),
        borderRadius: normalize360(4),
    },
    categoryView: {
        width: '60%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    categoryTitle: {
        fontSize: normalize360(20),
        color: colors.darkGrey,
        fontFamily: fonts.robotoMedium
    },
    categorySubtitle: {
        fontSize: normalize360(14)
    },
    categoryIconRight: {
        fontSize: normalize360(45)
    }
};

export default  styles;