import React from 'react';
import { Text } from 'native-base';
import PropTypes from 'prop-types';
import {RadioGroup, RadioButton} from 'react-native-flexi-radio-button';
import styles from './style';

const Radio = props => (
    <RadioGroup selectedIndex={0} onSelect={item => props.select(item)}>
        {
            props.items.map((item, key) => (
                <RadioButton key={key} value={`item${key}`}>
                    <Text style={props.style? props.style : styles.text}>{item}</Text>
                </RadioButton>
            ))
        }
    </RadioGroup>
);

export default Radio;

Radio.propTypes = {
    items: PropTypes.array
};