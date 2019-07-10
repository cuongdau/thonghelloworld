import React, {Component} from 'react';
import {Item, Label, Input, Text, View} from "native-base";
import styles from './style';
import {TextInput} from "react-native";

export  default class InputText extends Component {
    state = {
        focus: false
    };

    handleFocus = () => this.setState({focus: !this.state.focus});

    render() {
        const {focus} = this.state;
        const { label, value, onChange, secureTextEntry, style, multiline, maxLength,keyboardType, underline, submit, error }  = this.props;
        const opacity = focus || value ? 0.5 : 0;

        return(
            <View style={style? style : styles.container}>
                <Text
                    style={[styles.label, {opacity}]}>{label}</Text>
                <TextInput
                    value={value}
                    maxLength={maxLength}
                    keyboardType={keyboardType}
                    onFocus={this.handleFocus}
                    onBlur={this.handleFocus}
                    onChangeText={onChange}
                    multiline={multiline}
                    secureTextEntry={secureTextEntry}
                    underlineColorAndroid={underline}
                    style={[styles.input, underline ? styles.border : null]}
                    placeholder={focus ? '' : label} />

                {(submit && error) &&
                <Text  style={styles.error}>{error}</Text>}
            </View>
        )
    }
}
