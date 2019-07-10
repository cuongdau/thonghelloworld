import React from 'react';
import { Button, Text, View } from 'native-base';
import { TouchableOpacity } from 'react-native';
import { styles } from './style';
import {fonts} from "../../config";
import {normalize360} from './../../utilities';


const PrimaryButton = props => (
    <Button style={styles.button} onPress={() =>props.press()} disabled={props.disabled}>
        <Text>{ props.name }</Text>
    </Button>
);

const InfoBlockButton = props => (
    <Button info style={styles.button} onPress={() =>props.press()} disabled={props.disabled}>
        <Text>{ props.name }</Text>
    </Button>
);

const InfoRoundedButton = props => (
    <Button info rounded small  onPress={() =>props.press()}>
        <Text uppercase={false}>{ props.name }</Text>
    </Button>
);

const LightRoundedButton = props => (
    <Button light={props.light} rounded small style={props.buttonStyle}
            onPress={() =>props.press()}>
        <Text uppercase={false} style={[styles.lightRoundedButtonText, {color: props.color}]}>{ props.item }</Text>
    </Button>
);

const TextButton = props => (
    <Text onPress={() =>props.press()}
        style={[props.style, {color: props.color}]}>{ props.name }</Text>
);

const UppercaseTextButton = props => (
    <Text onPress={() =>props.press()}
          style={[styles.uppercaseTextButton, props.style]}>{ props.name.toUpperCase() }</Text>
);

const CustomButton = props => (
    <TouchableOpacity  style={props.style} onPress={() => props.press()} disabled={props.disabled}>
            <Text style={{color: props.color, fontFamily: fonts.robotoMedium,
                fontSize: props.fontSize ? normalize360(props.fontSize) : normalize360(16)}}>{ props.name }</Text>
    </TouchableOpacity>
);

export { PrimaryButton, InfoBlockButton, InfoRoundedButton, LightRoundedButton,
    TextButton, CustomButton, UppercaseTextButton};