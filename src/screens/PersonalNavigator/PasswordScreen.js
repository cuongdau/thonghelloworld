import React, {Component} from 'react';
import {Platform, TouchableOpacity} from 'react-native';
import {Body, Title, Card, CardItem, Content, Container, Left, Right, Header, View} from 'native-base';
import Icon from './../../components/Icon';
import {colors} from "../../config";
import styles from "./style";
import InputText from "../../components/InputTextSimple";
import {TextButton} from "../../components/Button";
import { connect } from 'react-redux';
import StatusBar from "../../components/StatusBar";
import {AUTH} from "../../types";
import {normalize360} from "../../utilities";

const values = [
    {label: 'Old password', name: 'oldpassword'},
    {label: 'New password', name: 'password'},
    {label: 'Confirm new password', name: 'confirmpassword'},
];

class PasswordScreen extends Component {
    state = {
        data: {
            oldpassword: '',
            password: '',
            confirmpassword: '',
        },
        secure: {
            oldpassword: true,
            password: true,
            confirmpassword: true
        },
        submit: false
    };

    toggleSecureState = key => this.setState({
        secure: {
            ...this.state.secure,
            [key]: !this.state.secure[key]
        }
    });

    handleChange = key => text => this.setState({
        data: {
            ...this.state.data,
            [key]: text
        }
    });

    handleSubmit = errors => {
        const {user, submitData} = this.props;
        this.setState({submit: true});
        Object.assign(user, this.state.data);
        const nextStep = Object.values(errors).every(error => error === null);
        nextStep ? submitData(user) : null;
    };

    render(): React.ReactNode {
        const {navigation} = this.props;
        const {data, secure, submit} = this.state;

        const errors = {
            oldpassword: data.oldpassword.length < 1 ? 'Please fill old password' : data.oldpassword.length < 6 ?
                'Every password must be at least 6 characters.' : null,
            password: data.password.length < 1 ? 'Please fill new password' : data.password.length < 6 ?
                'Every password must be at least 6 characters.' : null,
            confirmpassword: data.confirmpassword.length < 1 ? 'Please confirm your password' :
                data.confirmpassword !== data.password ? 'Confirm password must be equal new password' : null
        };

        return (
            <Container>
                {Platform.OS === "ios" && <StatusBar />}

                <Header style={styles.header}>
                    <Left>
                        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.goBack()}>
                            <Icon name="arrow-back" color={colors.icon}/>
                        </TouchableOpacity>
                    </Left>
                    <Body style={Platform.select({
                        ios: {
                            alignItems: 'flex-start', marginLeft: normalize360(-100)
                        }
                    })}>
                        <Title style={{color: colors.icon}}>My Details</Title>
                    </Body>
                    <Right>
                        <TextButton name="SAVE" color={colors.icon} style={styles.right}
                                    press={() => this.handleSubmit(errors)}/>
                    </Right>
                </Header>

                <Content showsVerticalScrollIndicator={false}>
                    <Card style={styles.passwordFormWrapper}>
                        <CardItem style={{flexDirection: 'column', backgroundColor: '#f7f7f7'}}>
                            {values.map((item, key) =>
                                <View key={key} style={{width: '100%', position: 'relative'}}>
                                    <InputText name={item.name}
                                               label={item.label}
                                               value={data[item.name]}
                                               error={submit ? errors[item.name] : null}
                                               secureTextEntry={secure[item.name]}
                                               onChange={this.handleChange(item.name)}
                                               submit={submit}
                                               style={styles.inputText} />
                                    <Icon name="eye"
                                          press={() => this.toggleSecureState(item.name)}
                                          style={styles.iconSecure} />
                                </View>
                            )}
                        </CardItem>
                    </Card>
                </Content>
            </Container>
        )
    }
}

function mapStateToprops(state) {
    return {
        user: state.login.user
    }
}

function matchDispatchToProps(dispatch) {
    return {
        submitData: values => dispatch({type: AUTH.CHANGE_USER_MAIN_LOADING, values})
    }
}

export default connect(mapStateToprops, matchDispatchToProps)((PasswordScreen));