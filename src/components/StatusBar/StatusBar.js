import React from 'react';
import {View, StatusBar} from 'react-native';
import styles from './style';
import {colors} from "../../config";


const StatusBarExample = () => {
    return (

        <View style={styles.container}>
            <StatusBar
                translucent
                backgroundColor={colors.darkblue}
                barStyle="light-content"
            />
        </View>
    )
};

export default StatusBarExample;