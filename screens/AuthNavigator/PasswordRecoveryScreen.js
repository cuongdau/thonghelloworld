import React, {Component} from 'react';
import { Text, Container, Content, View } from 'native-base';
import {Alert, Image, Platform} from 'react-native';
import Header from './../../components/Header';
import InputText from './../../components/InputTextSimple';
import StatusBar from './../../components/StatusBar';
import { CustomButton } from './../../components/Button';
import styles from './style';
import {API_URL, colors, logo, store} from "../../config";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {normalize360, validateEmail} from "../../utilities";


class PasswordRecovery extends Component {
    state = {
        email: '',
        submit: false
    };

    handleSubmit = errors => {
        const {navigation} = this.props;
        this.setState({submit: true});

        if(!errors.email)
            return fetch(`${API_URL}/api/rest/restapi/resetpassword/${store}`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                method: "PUT",
                body: JSON.stringify({"email": this.state.email})
            })
                .then(() => {

                    Alert.alert(
                        'Recovery Password',
                        `An email has been sent to you to confirm!`,
                        [
                            {text: 'OK', onPress: () => navigation.goBack()},
                        ],
                        { cancelable: false }
                    )
                })
                .catch(error =>
                    Alert.alert(
                        'Recovery Password Alert',
                        `${error.toString()}`,
                        [
                            {text: 'OK'},
                        ],
                        { cancelable: false }
                    )
                )
        };

    render(): React.ReactNode {
        const {email, submit} = this.state;

        const errors = {
            email: email.length < 1 ? 'Please fill email' : !validateEmail(email) ?
                'Incorrect format of email' : null
        };

        return (
            <Container style={{backgroundColor: colors.default}}>
                {Platform.OS === "ios" && <StatusBar />}
                <Header
                    leftIcon="arrow-back"
                    iconColor={colors.primary}
                    containerStyle={styles.headWrapper}
                    leftIconPress={() => this.props.navigation.goBack()}
                />

                <KeyboardAwareScrollView>
                    <Content contentContainerStyle={styles.signInContent} showsVerticalScrollIndicator={false}>
                        <Image source={logo} style={styles.signInLogo} />
                        <View style={styles.recoveryTextWrapper}>
                            <Text style={styles.recoveryText}>
                                Enter your email and we’ll send you a link to reset your password
                            </Text>
                        </View>

                        <View style={styles.recoveryFormBlock}>
                            <InputText label='Email'
                                       name='email'
                                       value={email}
                                       error={submit ? errors.email : null}
                                       onChange={text => this.setState({email: text})}
                                       submit={submit}
                                       underline='transparent' />

                            <CustomButton
                                name="Send Password Reset Email"
                                color={colors.white}
                                style={[styles.welcomeButton,
                                    {backgroundColor: colors.primary, marginTop: normalize360(78)}]}
                                press={() => this.handleSubmit(errors)}
                            />
                        </View>
                    </Content>
                </KeyboardAwareScrollView>
            </Container>
        );
    }
}

export default PasswordRecovery;