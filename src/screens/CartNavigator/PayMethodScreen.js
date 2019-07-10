import React, {Component} from 'react';
import {ScrollView} from 'react-native';
import {Container, View, Text, Card, CardItem} from 'native-base';
import connect from "react-redux/es/connect/connect";
import Header from './../../components/Header';
import {TextButton} from './../../components/Button';
import Icon from './../../components/Icon';
import NewPaymentMethod from './NewPaymentMethod';
import {payListLoading} from "../../actions";
import {colors} from "../../config";
import styles from "./style";


class PayMethod extends Component {
    state = {
        more: false
    };

    componentWillMount(): void {
        const {cart, payListLoading, payments} = this.props;

        if(cart.quote_id && !payments)
            payListLoading(cart.quote_id);
    }

    render() {
        const {navigation} = this.props;
        const { more } = this.state;
        const navigator = navigation.state.params ? navigation.state.params.navigator : '';

        const methods = [
            {
                type: 'Credit Card',
                value: `************${this.props.cart.payment.cc_last4}`
            },
            {
                type: 'PayPal',
                value: ''
            },
        ];

        return (
            <Container>
                <Header
                    leftIcon="close"
                    headTitle="Payment Method"
                    iconColor={colors.white}
                    leftIconPress={() => navigation.navigate(navigator)}
                />

                <ScrollView>
                    <Card style={styles.shippingRadioWrapper}>
                        <CardItem>
                            <View>
                                <Text style={styles.shippingRadioLabel}>PAYMENT METHOD</Text>
                                <View>
                                    {
                                        methods.map((item, key) =>
                                            <View key={key}
                                                  style={[styles.payIconCardWrapper, styles.payMethodsWrapper]}>
                                                <Text>
                                                    <Text>{item.type}  </Text>
                                                    <Text>{item.value}</Text>
                                                </Text>

                                                <Icon name="trash" color={colors.black} fontSize={45}
                                                      press={() => alert('Trash')}/>
                                            </View>
                                        )
                                    }
                                </View>

                                <View style={styles.payButtonWrapper}>
                                    <TextButton name="ADD ONE MORE" color={colors.tabs}
                                                press={() => this.setState({more: true})}/>
                                </View>
                            </View>
                        </CardItem>
                    </Card>

                    {
                        more && <NewPaymentMethod navigation={navigation} navigator={navigator} />
                    }
                </ScrollView>
            </Container>
        )
    }
}

const mapStateToProps = state => ({
    cart: state.cart.data,
    payments: state.payment.data
});

export default connect(mapStateToProps, {payListLoading})(PayMethod);