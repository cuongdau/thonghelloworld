import React from 'react';
import { Container, Content, View, Text } from 'native-base';
import {Image, Alert, Platform} from 'react-native';
import Header from './../../components/Header';
import LoadIndicator from './../../components/LoadIndicator';
import StatusBar from './../../components/StatusBar';
import { CustomButton } from './../../components/Button';
import { connect } from 'react-redux';
import styles from './style';
import {signInFbDataAction} from "../../actions";
import {AccessToken, LoginManager} from "react-native-fbsdk";
import { welcome, colors } from "../../config";
import {normalize360} from "../../utilities";


const HR = () => <View style={styles.hr} />;


const WelcomeScreen = ({ navigation, signInFbDataAction, loading }) => {

    const getTokenFromFacebook = () => {
        LoginManager.logInWithReadPermissions(['public_profile', 'email', "user_friends"])
            .then((result) => {
                if (result.isCancelled) {
                    Alert.alert('Login cancelled');
                } else {
                    AccessToken.getCurrentAccessToken().then(
                        (data) => {
                            const { accessToken } = data;
                            initUser(accessToken);
                        })
                        .catch(error => alert('Login fail with error: ' + error.toString()));
                }
            }, (error) => {
                Alert.alert('Login fail with error: ' + error.toString());
            }).catch(error => {
            Alert.alert('Login fail with error: ' + error.toString());
        });
    };

    const initUser = token => {
        fetch('https://graph.facebook.com/v2.5/me?fields=email,name,friends&access_token=' + token)
            .then((response) => response.json())
            .then((data) => {
                // Some user object has been set up somewhere, build that user here
                signInFbDataAction(data.email, navigation);
            })
            .catch(() => {
                Alert.alert('ERROR GETTING DATA FROM FACEBOOK');
            })
    };

    const { navigator } = navigation.state.params;

    return(
        <Container style={{backgroundColor: colors.default}}>
            {Platform.OS === "ios" && <StatusBar />}
            <Header
                leftIcon="arrow-back"
                iconColor={colors.primary}
                containerStyle={styles.headWrapper}
                leftIconPress={() => navigation.navigate('Homepage')}
            />

            <Content contentContainerStyle={styles.welcomeContent} showsVerticalScrollIndicator={false}>
                <Image source={welcome} style={styles.welcomeLogo} />

                <View style={styles.welcomeH2Wrapper}>
                    <Text style={styles.welcomeH2}>{`THE place to\nBUY and SELL your golf clubs and gear`}</Text>
                </View>

                <View style={styles.welcomeButtonsBlock}>
                    <CustomButton
                        name="Create Account"
                        color={colors.white}
                        style={[styles.welcomeButton, {backgroundColor: colors.primary, marginBottom: normalize360(27)}]}
                        press={() => navigation.navigate('SignUp', { navigator })}
                    />

                    <CustomButton
                        name="Login With Email"
                        color={colors.primary}
                        style={[styles.welcomeButton, {backgroundColor: colors.white}]}
                        press={() => navigation.navigate('SignIn', { navigator })}
                    />

                    <HR />

                    <CustomButton
                        name="Login With Facebook"
                        color={colors.white}
                        style={[styles.welcomeButton, {backgroundColor: colors.facebook}]}
                        press={() => getTokenFromFacebook()}
                    />
                </View>
            </Content>

            <LoadIndicator animating={loading} />
        </Container>
    )
};

function mapStateToProps(state) {
    return {
        loading: state.login.loading
    }
}


export default connect(mapStateToProps, {signInFbDataAction})(WelcomeScreen);