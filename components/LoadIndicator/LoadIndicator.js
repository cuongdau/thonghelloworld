import React from 'react'
import {
    ActivityIndicator,
    View,
} from 'react-native'
import { colors } from "../../config";
import styles from './style';

const LoadingIndicator = props => (
    <View style={[styles.container, { zIndex: props.animating ? 10 : -10 }]}>
        <ActivityIndicator size="large" color={colors.primary} animating={ props.animating } />
    </View>
);

export default LoadingIndicator;