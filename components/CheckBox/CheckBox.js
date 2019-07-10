import React from 'react';
import { CheckBox } from 'native-base';
import { colors } from "../../config";

const CheckBoxExample = props => {
    return (
        <CheckBox checked={props.checked} color={ colors.primary } onPress={() => props.press()} style={props.style}/>
    );
};

export default CheckBoxExample;