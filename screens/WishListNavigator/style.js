import {normalize360} from "../../utilities/index";
import {colors, fonts} from "../../config";

const styles = {
    itemsCount: {
        color: 'rgba(52, 52, 52, 0.6)',
        fontSize: normalize360(12),
        marginHorizontal: normalize360(16),
        marginTop: normalize360(16),
        marginBottom: normalize360(5),
        fontFamily: fonts.robotoRegular
    },
};

export default styles;