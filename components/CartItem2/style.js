import {normalize360} from "../../utilities";
import {colors} from "../../config";

const styles = {
    cartListItemImage: {
        width: normalize360(100),
        height: normalize360(100)
    },
    cartListItemInfoWrapper: {
        flexDirection: 'column',
        marginHorizontal: normalize360(8),
        width: '60%',
        height: normalize360(100),
        padding: normalize360(8),
        justifyContent: 'space-between'
    },
    cartListItemPrice: {
        flexDirection: 'row'
    },
    cartListItemQuantityText: {
        fontSize: normalize360(11),
        color: colors.grey,
        marginTop: normalize360(10)
    },
};

export default styles;