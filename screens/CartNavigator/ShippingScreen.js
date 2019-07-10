import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import {Container, View, Text, Card, CardItem} from 'native-base';
import Header from './../../components/Header';
import Radio from './../../components/Radio';
import { CustomButton } from './../../components/Button';
import CheckBox from './../../components/CheckBox';
import Total from './../../components/Total';
import { reduxForm, Field } from "redux-form";
import {colors, countries, states, user} from "../../config";
import styles from "./style";
import { addCartAddressAction } from '../../actions/cartAction';
import {connect} from 'react-redux';

const validate = value => {
    const errors = {};
    if(!value.firstname) {
        errors.firstname = 'please fill your first name';
    }

    if(!value.lastname) {
        errors.lastname = 'please fill your last name';
    }

    if(!value.street) {
        errors.street = 'please fill address';
    }

    if(!value.city) {
        errors.city = 'please fill city';
    }

    if(!value.postcode) {
        errors.postcode = 'please fill ZIP/Postal code';
    }

    if(!value.telephone) {
        errors.telephone = 'please fill phone number';
    }

    return errors;
};

class Shipping extends Component {
    state = {
        agreement: true,
        copyBillingAddress: false,
        country: countries[0]
    };

    getCountryStates = country => states.filter(item => item.country === country).map(item => item.state);
    getRegionId = (country, region) => this.getCountryStates(country).indexOf(region);
    togglePress = value => this.setState({[value]: !this.state[value]});

    submitDetails = values => {
        const data = {
            ...values,
            mode: "billing",
            quote_id: this.props.quoteId,
            store: 5,
            region_id: this.getRegionId(this.state.country, values.region)
        };

        this.props.addCartAddressAction(data);
        console.log(data);

        this.props.navigation.navigate('Pay');
    };

    render() {
        const { navigation, handleSubmit } = this.props;
        const { agreement, copyBillingAddress, country } = this.state;

        return(
            <Container>
                <Header
                    leftIcon="arrow-back"
                    headTitle="Shipping Details"
                    iconColor={colors.white}
                    leftIconPress={() => navigation.navigate('Cart')}
                />

                <ScrollView>
                    <Card style={styles.shippingRadioWrapper}>
                        <CardItem>
                            <View>
                                <Text style={styles.shippingRadioLabel}>SHIPPING ADDRESS</Text>
                                <Radio items={this.props.shippingAddressessList} select={item => console.log(item)} />

                                <View style={styles.cartButtonWrapper}>
                                    <CustomButton
                                        name="Add new"
                                        color={colors.white}
                                        press={() => navigation.navigate('AddNewAddress', {addressType: 'shipping'})}
                                        style={styles.cartButton}
                                    />
                                </View>
                            </View>
                        </CardItem>
                    </Card>

                    <View style={styles.shippingCheckWrapper}>
                        <CheckBox checked={copyBillingAddress} press={() => this.togglePress('copyBillingAddress')} />
                        <Text style={styles.shippingCheckLabel}>Set as your default billing address</Text>
                    </View>

                    {
                        !copyBillingAddress &&
                        <Card style={styles.shippingRadioWrapper}>
                            <CardItem>
                                <View>
                                    <Text style={styles.shippingRadioLabel}>BILLING ADDRESS</Text>
                                    <Radio items={this.props.billingAddressessList} select={item => console.log(item)} />

                                    <View style={styles.cartButtonWrapper}>
                                        <CustomButton
                                            name="Add new"
                                            color={colors.white}
                                            press={() => navigation.navigate('AddNewAddress', {addressType: 'billing'})}
                                            style={styles.cartButton}
                                        />
                                    </View>
                                </View>
                            </CardItem>
                        </Card>
                    }

                    <View style={styles.shippingCheckWrapper}>
                        <CheckBox checked={agreement} press={() => this.togglePress('agreement')} />
                        <Text style={styles.shippingCheckLabel}>I agree with terms and conditions</Text>
                    </View>

                    <View style={styles.shippingTotalWrapper}>
                        <Total name="Continue" disabled={!agreement} press={handleSubmit(this.submitDetails)} />
                    </View>
                </ScrollView>
            </Container>
        )
    }
}
function mapStateToProps (state) {
    return {
        billingAddress: state.cart.data.billing_address,
        quoteId: state.cart.data.quote_id,
        userId: state.login.user.entity_id,
        shippingAddressessList: state.shippingAddressessList || [],
        billingAddressessList: state.billingAddressessList || [],
    }
}

Shipping = connect(mapStateToProps, {addCartAddressAction})(Shipping);

export default reduxForm({
    form: 'BillingAddress', // for unique id
    validate
})(Shipping);