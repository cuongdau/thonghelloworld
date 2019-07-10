import {normalize, normalize360, width} from "../../utilities";
import {colors} from "../../config";

const styles = {
    payIconCardWrapper: {
        width: 0.85 * width,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    shippingRadioLabel: {
        color: colors.primary,
        marginLeft: normalize(27),
        marginBottom: normalize(18)
    },
    payRadioWrapper: {
        flexDirection: 'row',
        width: normalize360(250)
    },
    payCodeDataWrapper: {
        flex: 1,
        marginVertical: normalize360(8),
        flexDirection: 'column',
        justifyContent: 'space-between'
    }
};

export default styles;