import {normalize360} from "../utilities";
import {colors} from "../config";

const tabsStyles = {
    sellersTabsWrapper: {
    },
    TabsWrapper: {
        marginTop: normalize360(5)
    },
    activeSellersTabStyle: {
        backgroundColor: '#f7f7f7',
        // borderBottomWidth: normalize(5)
    },
    tabSellersStyle: {
        backgroundColor: '#f7f7f7',
        borderBottomWidth: 0
    },
    tabTextStyle: {
        color: colors.grey
    },
    activeSellersTabTextStyle: {
        color: colors.white
    },
    activeTabTextStyle: {
        color: colors.primary
    },
    tabStyle: {
        backgroundColor: colors.tabs,
    }
};

export default tabsStyles;
