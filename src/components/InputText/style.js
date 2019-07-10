import React from 'react';
import {Platform} from 'react-native';
import {normalize, width, normalize360} from "../../utilities";
import {colors, fonts} from "../../config";

const styles = {
    container: {
        width: '90%',
        marginHorizontal: '5%',
        marginBottom: normalize360(5)
    },
    label: {
        color: colors.black,
        fontFamily: fonts.robotoRegular,
        fontSize: normalize360(12),
        marginLeft: normalize360(16),
        marginBottom: Platform.OS === 'ios' ? normalize360(5) : 0
    },
    error: {
        color: colors.error,
        fontSize: normalize(18),
        marginLeft: normalize(6)
    },
    border: {
        borderColor: colors.primary,
        borderWidth: 1,
        borderRadius: normalize360(4),
        borderBottomWidth: 1
    },
    input: {
        paddingHorizontal: normalize360(16),
        paddingVertical: normalize360(10),
        borderBottomWidth: Platform.OS === 'ios' ? 1 : 0,
        borderColor: colors.grey,
        fontSize: normalize360(14)
    }
};

export default styles