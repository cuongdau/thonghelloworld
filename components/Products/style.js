import React from 'react';
import {Platform} from 'react-native';
import {normalize360} from "../../utilities";

const styles = {
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        paddingLeft: Platform.OS === 'ios' ? normalize360(4) : normalize360(8),
        paddingBottom: normalize360(10),
    },
    itemWrapper: {
        width: normalize360(176),
        borderRadius: normalize360(4),
        overflow: 'hidden',
        paddingTop: normalize360(16)
    }
};

export default styles;