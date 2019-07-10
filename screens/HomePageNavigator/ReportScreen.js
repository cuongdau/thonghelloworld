import React, { Component } from 'react';
import { Container, Header, Body, View, Right, Left, Content, Text } from 'native-base';
import {TouchableOpacity, StyleSheet, Platform} from 'react-native';
import Icon from './../../components/Icon';
import Radio from './../../components/Radio';
import {API_URL, colors, fonts, store} from "../../config";
import {connect} from 'react-redux';
import {Alert} from "react-native";
import styles from './style';
import {normalize360} from "../../utilities";
import StatusBar from "../../components/StatusBar";

const feedbackList = [
    "False, inaccurate or misleading listing",
    "Fraudulent, illegal, counterfeit or stolen items",
    "Copyright, trademark or intellectual property rights infringement",
    "Violation of law, statute, ordinance or regulation",
    "Defamatory, libelous threatening or unlawfully harassing language",
    "Obscene or inappropriate content",
    "Images do not represent listing",
    "Links directly or references items prohibited Online Exchanges",
    "Contains offer to by or sell outside of Online Exchanges",
    "Other"
];

class ReportScreen extends Component {
    state = {
        report: feedbackList[0]
    };

    handleSelect = item => this.setState({report: feedbackList[item]});

    fetchReport = report => {
        const { product, user, navigation } = this.props;
        const body = {
            "product" : product.name,
            "sku": product.sku,
            "website": "Golfing-Exchange",
            "customer_email": user.email,
            "customer_name": user.firstname + " " + user.lastname,
            "reason": report,
            "store_id": store
        };

        return fetch(`${API_URL}/api/rest/restapi/product/${product.entity_id}/report`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            method: "POST",
            body: JSON.stringify(body)
        })
            .then(() => navigation.goBack())
            .catch(error =>
                Alert.alert(
                    'Report Item Alert',
                    `${error.toString()}`,
                    [
                        {text: 'OK'},
                    ],
                    { cancelable: false }
                )
            )
    };

    render() {
        const {navigation} = this.props;
        const {report} = this.state;

        return (
            <Container>
                {Platform.OS === "ios" && <StatusBar />}
                <Header style={styles.header}>
                    <Left>
                        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.goBack()}>
                            <Icon name="close" color={colors.icon} />
                        </TouchableOpacity>
                    </Left>

                    <Body />

                    <Right>
                        <TouchableOpacity style={styles.iconButton} onPress={() => this.fetchReport(report)}>
                            <View>
                                <Text style={{color: colors.icon}}>OK</Text>
                            </View>
                        </TouchableOpacity>
                    </Right>
                </Header>

                <Content showsVerticalScrollIndicator={false} style={mainStyles.container}>
                        <View style={mainStyles.wrapper}>
                            <View style={mainStyles.textWrapper}>
                                <Text style={mainStyles.text}>
                                    Please use this form to report listing that you belive violate our site Marketplays
                                    Polices or Terms of Use.
                                </Text>
                            </View>

                            <View>
                                <Radio style={mainStyles.radio} items={feedbackList} select={this.handleSelect} />
                            </View>
                        </View>
                </Content>
            </Container>
        );
    }
}

function mapStateToProps(state) {
    return {
        product: state.product.data,
        user: state.login.user
    }
}

export default connect(mapStateToProps)(ReportScreen);

const mainStyles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
    },
    wrapper: {
        width: normalize360(344),
        marginHorizontal: normalize360(8),
        marginVertical: normalize360(16),
        backgroundColor: '#f7f7f7',
        flexDirection: 'column',
        paddingVertical: normalize360(10),
        paddingHorizontal: normalize360(8)
    },
    textWrapper: {
        marginBottom: normalize360(10),
        marginHorizontal: normalize360(8)
    },
    text: {
        fontSize: normalize360(16),
        fontFamily: fonts.robotoCondensed,
        opacity: 0.5,
        color: '#464d53',
        lineHeight: normalize360(25)
    },
    radio: {
        fontSize: normalize360(16),
        fontFamily: fonts.robotoRegular,
        color: '#464d53',
        marginHorizontal: normalize360(23)
    }
});