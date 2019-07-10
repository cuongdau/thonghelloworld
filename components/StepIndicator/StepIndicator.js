import React from 'react';
import { View, Text } from 'native-base';
import { colors } from "../../config";
import styles from './style';

const StepIndicator = props => {

    const getStepColor = (key, nextStep) => nextStep < key ? colors.grey : colors.blue;

    const { maxStep, nextStep } = props;

    return(
        <View style={styles.container}>
            {
                new Array(maxStep).fill('').map((item, key) => {
                    return (
                        <View key={key} style={styles.wrapper}>
                            <Text style={{color: getStepColor(key, nextStep)}}>Step {key + 1}</Text>
                            <View style={[styles.direction, {backgroundColor: getStepColor(key, nextStep)}]} />
                        </View>
                    )
                })
            }
            <Text style={{color: getStepColor(maxStep, nextStep)}}>Step { maxStep + 1}</Text>
        </View>
    )
};

export default StepIndicator;