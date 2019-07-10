import React from 'react';
import {Platform, StatusBar} from 'react-native';
import {colors} from "../../config";


const styles = {
    container: {
        backgroundColor: colors.darkblue,
        height: Platform.OS === 'ios'? 20 : StatusBar.currentHeight
    }
};

export default styles;