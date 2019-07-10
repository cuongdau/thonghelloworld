import React, { Component } from 'react';
import { Text, Container, Content, Form, View} from 'native-base';
import Header from './../../components/Header';
import Icon from './../../components/Icon';
import InputText from './../../components/InputTextSimple';
import StatusBar from './../../components/StatusBar';
import {CustomButton, TextButton} from './../../components/Button';
import { connect } from 'react-redux';
import styles from './style';
import {signUpDataAction} from '../../actions';
import {colors} from "../../config";
import {normalize360, validateEmail} from "../../utilities";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {Platform} from "react-native";


class SignUpScreen extends Component {
    state = {
        password: true,
        confirmpassword: true,
        data: {
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            password2: ''
        },
        submit: false
    };

    toggleSecureState = key => this.setState({[key]: !this.state[key]});

    handleChange = key => text => this.setState({
        data: {
            ...this.state.data,
            [key]: text
        }
    });

    handleSubmit = errors => {
        const {signUpDataAction, navigation} = this.props;
        this.setState({submit: true});
        const nextStep = Object.values(errors).every(error => error === null);
        nextStep ? signUpDataAction(this.state.data, navigation) : null;
    };

    render() {
        const { navigation } = this.props;
        const { password, confirmpassword, data, submit } = this.state;

        const errors = {
            firstname: data.firstname.length < 1 ? 'Please fill first name' : null,
            lastname: data.lastname.length < 1 ? 'Please fill last name' : null,
            email: data.email.length < 1 ? 'Please fill email' : !validateEmail(data.email) ?
                'Incorrect format of email' : null,
            password: data.password.length < 1 ? 'Please fill password' : data.password.length < 6 ?
                'Every password must be at least 6 characters.' : null,
            password2: data.password2.length < 1 ? 'Please confirm your password' :
                data.password2 !== data.password ? 'Confirm password must be equal password' : null
        };

        return(
            <Container style={{flex: 1, backgroundColor: colors.default}}>
                {Platform.OS === "ios" && <StatusBar />}
                <Header
                    leftIcon="arrow-back"
                    headTitle="Create account"
                    iconColor={colors.primary}
                    containerStyle={styles.headWrapper}
                    headTitleStyle={styles.headTitle}
                    leftIconPress={() => navigation.goBack()}
                />

                <KeyboardAwareScrollView>
                    <Content contentContainerStyle={styles.signInContent} showsVerticalScrollIndicator={false}>
                        <Form style={styles.signUpFormWrapper}>
                            <View style={styles.signUpInputWrapper}>
                                <InputText label='First'
                                           name='firstname'
                                           value={data.firstname}
                                           error={submit ? errors.firstname : null}
                                           onChange={this.handleChange('firstname')}
                                           submit={submit}
                                           underline='transparent' />

                                <InputText label='Last'
                                           name='lastname'
                                           value={data.lastname}
                                           error={submit ? errors.lastname : null}
                                           onChange={this.handleChange('lastname')}
                                           submit={submit}
                                           underline='transparent' />

                                <InputText label='Email'
                                           name='email'
                                           value={data.email}
                                           error={submit ? errors.email : null}
                                           onChange={this.handleChange('email')}
                                           submit={submit}
                                           underline='transparent' />

                                <View style={{width: '100%', position: 'relative'}}>
                                    <InputText name="password"
                                               label="Password"
                                               value={data.password}
                                               error={submit ? errors.password : null}
                                               onChange={this.handleChange('password')}
                                               submit={submit}
                                               underline='transparent'
                                               secureTextEntry={password} />
                                    <Icon name="eye"
                                          press={() => this.toggleSecureState('password')}
                                          style={styles.iconSecure} />
                                </View>

                                <View style={{width: '100%', position: 'relative'}}>
                                    <InputText label='Confirm Password'
                                               name='password2'
                                               value={data.password2}
                                               error={submit ? errors.password2 : null}
                                               onChange={this.handleChange('password2')}
                                               submit={submit}
                                               underline='transparent'
                                               secureTextEntry={confirmpassword} />
                                    <Icon name="eye"
                                          press={() => this.toggleSecureState('confirmpassword')}
                                          style={styles.iconSecure} />
                                </View>
                            </View>

                            <View style={styles.agreement}>
                                <Text style={styles.agreementText}>
                                    When you Sign Up, you agree to our
                                    <TextButton name=' Privacy Policy ' color={colors.primary}
                                                style={{fontSize: normalize360(12)}}
                                                press={() => navigation.navigate('Web', {page: 'privacy-policy'})} />
                                    and our
                                    <TextButton name=' Terms of Use ' color={colors.primary}
                                                style={{fontSize: normalize360(12)}}
                                                press={() => navigation.navigate('Web', {page: 'terms-of-use'})} />
                                </Text>
                            </View>

                            <View style={{paddingHorizontal: '5%'}}>
                                <CustomButton
                                    name="Create Account"
                                    color={colors.white}
                                    style={[styles.signUpButton,
                                        {backgroundColor: colors.primary}]}
                                    press={() => this.handleSubmit(errors)}
                                />
                            </View>
                        </Form>
                    </Content>
                </KeyboardAwareScrollView>
            </Container>
        )
    }
}


export default connect(null, {signUpDataAction})(SignUpScreen);