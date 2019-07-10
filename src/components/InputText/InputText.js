import React, {Component} from 'react';
import { View, TextInput, Text } from 'react-native';
import PropTypes from 'prop-types';
import styles from './style';

export  default class InputText extends Component {
    state = {
        focus: false
    };

    handleFocus = () => this.setState({focus: !this.state.focus});

    render() {
        const { focus } = this.state;
        const { label, meta: {error, touched}, input: { onChange, ...inputProps }, secureTextEntry, style, multiline, maxLength,keyboardType, underline }  = this.props;
        const opacity = focus || !error ? 0.5 : 0;


        return(
            <View style={style? style : styles.container}>
                <Text
                    style={[styles.label, {opacity}]}>{ label }</Text>
                <TextInput
                    { ...inputProps }
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
                {touched && (error && <Text style={styles.error}>{ error }</Text>)}
            </View>
        )
    }
}

InputText.propTypes = {
    label: PropTypes.string.isRequired
};