import { normalize, normalize360 } from "../../utilities";
import {colors} from "../../config";

export default styles = {
    wrapper: {
        marginBottom: normalize(100)
    },
    listItem: {
        flexDirection: 'column',
        alignItems: 'flex-start'
    },
    categoryWrapper: {
        flexDirection: 'column'
    },
    categoryItem: {
        marginBottom: normalize(20),
        flexDirection: 'row'
    },
    categoryOtherItem: {
        width: normalize360(15),
        height: normalize360(15),
        marginLeft: normalize360(12)
    },
    categoryItemText: {
        marginLeft: normalize360(20)
    },
    categoryItemText2: {
        marginLeft: normalize360(13)
    },
    subcategoryItem: {
        marginBottom: normalize(20),
        flexDirection: 'row',
        marginLeft: 40
    }
}
