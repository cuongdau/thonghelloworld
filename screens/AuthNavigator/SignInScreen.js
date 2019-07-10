import React, { Component } from 'react';
import { Text, Container, Content, View } from 'native-base';
import {Image, Platform} from 'react-native';
import Header from './../../components/Header';
import Icon from './../../components/Icon';
import InputText from './../../components/InputTextSimple';
import StatusBar from './../../components/StatusBar';
import { CustomButton, TextButton } from './../../components/Button';
import { connect } from 'react-redux';
import styles from './style';
import {signInApiDataAction} from "../../actions";
import {colors, logo} from "../../config";
import {normalize360, validateEmail} from "../../utilities";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


class SignInScreen extends Component {
    state = {
        secure: true,
        data: {
            username: '',
            password: ''
        },
        submit: false
    };

    toggleSecureState = () => this.setState({secure: !this.state.secure});

    handleChange = key => text => this.setState({
        data: {
            ...this.state.data,
            [key]: text
        }
    });

    handleSubmit = errors => {
        const {signInApiDataAction, navigation} = this.props;
        this.setState({submit: true});
        const nextStep = Object.values(errors).every(error => error === null);
        nextStep ? signInApiDataAction(this.state.data, navigation) : null;
    };

    render() {
        const { navigation } = this.props;
        const { secure, submit, data } = this.state;

        const errors = {
            username: data.username.length < 1 ? 'Please fill email' : !validateEmail(data.username) ?
                'Incorrect format of email' : null,
            password: data.password.length < 1 ? 'Please fill password' : null
        };

        return(
            <Container style={{backgroundColor: colors.default}}>
                {Platform.OS === "ios" && <StatusBar />}
                <Header
                    leftIcon="arrow-back"
                    iconColor={colors.primary}
                    containerStyle={styles.headWrapper}
                    leftIconPress={() => navigation.goBack()}
                />

                <KeyboardAwareScrollView>
                    <Content contentContainerStyle={styles.signInContent} showsVerticalScrollIndicator={false}>
                        <Image source={logo} style={styles.signInLogo} />
                        <Text style={styles.signInH3}>Login</Text>

                        <View style={styles.signInFormBlock}>
                            <InputText name="username"
                                       label="Email"
                                       value={data.username}
                                       error={submit ? errors.username : null}
                                       onChange={this.handleChange('username')}
                                       submit={submit}
                                       underline='transparent'/>

                            <View style={{width: '100%', position: 'relative',
                                marginVertical: Platform.OS === 'ios' ? normalize360(5) : 0}}>
                                <InputText name="password"
                                           label="Password"
                                           value={data.password}
                                           error={submit ? errors.password : null}
                                           onChange={this.handleChange('password')}
                                           submit={submit}
                                           underline='transparent'
                                           secureTextEntry={secure} />
                                <Icon name="eye"
                                      press={this.toggleSecureState}
                                      style={styles.iconSecure} />
                            </View>

                            <CustomButton
                                name="Login"
                                color={colors.white}
                                style={[styles.welcomeButton,
                                    {backgroundColor: colors.primary, marginTop: normalize360(15)}]}
                                press={() => this.handleSubmit(errors)}
                            />
                        </View>

                        <View>
                            <Text>
                                Forgot <TextButton name="Password?" color={colors.primary}
                                                   press={() => navigation.navigate('PasswordRecovery')}/>
                            </Text>
                        </View>

                        <View style={styles.signInLinkWrapper}>
                            <Text>By singing in you agree to our</Text>
                            <Text>
                                <TextButton name='terms of use ' color={colors.primary}
                                            press={() => navigation.navigate('Web', {page: 'terms-of-use'})} />
                                and
                                <TextButton name=' privacy policy' color={colors.primary}
                                            press={() => navigation.navigate('Web', {page: 'privacy-policy'})} />
                            </Text>
                        </View>
                    </Content>
                </KeyboardAwareScrollView>
            </Container>
        )
    }
}


export default connect(null, {signInApiDataAction})(SignInScreen);