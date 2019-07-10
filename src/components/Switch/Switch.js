import React from 'react';
import { Switch, View, Text } from 'react-native';
import { colors } from "../../config";
import styles from './style';

const SwitchExample = ({ label, labelStyle, value, toggleSwitch }) => {
    return (
        <View style={styles.container}>
            <Text style={labelStyle}>
                { label }
            </Text>
            <Switch
                thumbTintColor={value ? colors.primary : null}
                onTintColor={colors.blue}
                onValueChange = {() => toggleSwitch()}
                value = {value}
                style={styles.switch}
            />
        </View>
    )
};

export default SwitchExample;