import React, {Component} from 'react';
import {ScrollView, WebView} from 'react-native';
import {Container, View, Text, Card, CardItem, CheckBox, Button} from 'native-base';
import Header from './../../components/Header';
import CheckBoxExample from './../../components/CheckBox';
import Total from './../../components/Total';
import InputText from "../../components/InputText";
import Select from './../../components/Select';
import LoadIndicator from './../../components/LoadIndicator';
import {reduxForm, Field} from "redux-form";
import {colors, countries, states, API_URL} from "../../config";
import styles from "./style";
import {addCartAddressAction} from '../../actions';
import {connect} from 'react-redux';
import {CHECK} from "../../types";
import {validateEmail, validatePhone} from "../../utilities";


const validate = value => {
    const errors = {};
    if (!value.shipping_firstname) {
        errors.shipping_firstname = 'please fill your first name';
    }

    if (!value.shipping_lastname) {
        errors.shipping_lastname = 'please fill your last name';
    }

    if (!value.shipping_street) {
        errors.shipping_street = 'please fill address';
    }

    if (!value.shipping_city) {
        errors.shipping_city = 'please fill city';
    }

    if (!value.shipping_postcode) {
        errors.shipping_postcode = 'please fill ZIP/Postal code';
    } else if (value.shipping_postcode.length < 5)
        errors.shipping_postcode = 'ZIP/Postal code more then four symbols';

    if (!value.shipping_telephone) {
        errors.shipping_telephone = 'please fill phone number';
    } else if (!validatePhone(value.shipping_telephone))
        errors.shipping_telephone = 'incorrect format of telephone number';

    if(!value.email) {
        errors.email = 'please fill email';
    } else if(!validateEmail(value.email)) {
        errors.email = 'incorrect format of email';
    }

    if(!value.password) {
        errors.password = 'please fill password';
    }

    if(!value.check) {
        if (!value.billing_firstname) {
            errors.billing_firstname = 'please fill your first name';
        }

        if (!value.billing_lastname) {
            errors.billing_lastname = 'please fill your last name';
        }

        if (!value.billing_street) {
            errors.billing_street = 'please fill address';
        }

        if (!value.billing_city) {
            errors.billing_city = 'please fill city';
        }

        if (!value.billing_postcode) {
            errors.billing_postcode = 'please fill ZIP/Postal code';
        }else if (value.billing_postcode.length < 5)
            errors.billing_postcode = 'ZIP/Postal code more then four symbols';

        if (!value.billing_telephone) {
            errors.billing_telephone = 'please fill phone number';
        } else if (!validatePhone(value.billing_telephone))
            errors.billing_telephone = 'incorrect format of telephone number';
    }

    return errors;
};

const CheckBoxRedux = ({input: {onChange, value}, ...custom}) => (
    <CheckBox checked={Boolean(value)}
              color={ colors.blue }
              onPress={() => onChange(!value)}
              {...custom} />
);


class GuestShipping extends Component {
    constructor(props) {
        super(props);
        this.state = {
            agreement: true,
            shippingCountry: countries[0], // United States
            billingCountry: countries[0], // United States
            shippingRegion: this.getCountryStates(countries[0])[0], // Alabama
            billingRegion: this.getCountryStates(countries[0])[0], // Alabama
            isShowWebView: true
        };
    }

    componentWillMount(): void {
        const {shippingCountry, billingCountry, shippingRegion, billingRegion} = this.state;
        this.props.initialize({
            check: this.props.check,
            shipping_country_id: shippingCountry,
            billing_country_id: billingCountry,
            shipping_region: shippingRegion,
            billing_region: billingRegion
        })
    }

    getCountryStates = country => states.filter(item => item.country === country).map(item => item.state);

    getRegionId = (country, region) => this.getCountryStates(country).indexOf(region);

    unitDetails = values => {
        const {cart, navigation, submitDetails} = this.props;
        const {shipping_country_id, shipping_region, billing_country_id, billing_region} = values;
        const addition = {
            shipping_region_id: this.getRegionId(shipping_country_id, shipping_region),
            billing_region_id: this.getRegionId(billing_country_id, billing_region),
            quote_id: cart.quote_id,
            status: "guest",
            store: 5
        };

        return submitDetails(Object.assign(values, addition), navigation);
    };

    togglePress = () => this.setState({agreement: !this.state.agreement});

    render() {
        const {navigation, handleSubmit, checkBilling, check, loading, cart} = this.props;
        const {agreement, shippingCountry, billingCountry, isShowWebView} = this.state;

        const shippingRegions = this.getCountryStates(shippingCountry),
            billingRegions = this.getCountryStates(billingCountry);

        if(isShowWebView) {
            return (
                <View style={{ flex: 1 }}>
                    <WebView
                        source={{uri: `${API_URL}/onestepcheckout?qid=${cart.quote_id}&ck=PmdNjP4Z2972su9d`}}
                    />

                    <Button block info onPress={() => navigation.goBack()}>
                        <Text>Back to app</Text>
                    </Button>
                </View>
            )
        }

        return (
            <Container>

                <Header
                    leftIcon="arrow-back"
                    headTitle="Shipping Details"
                    iconColor={colors.white}
                    leftIconPress={() => navigation.goBack()}
                />

                <ScrollView>

                    <Card style={styles.shippingFormWrapper}>
                        <Text style={styles.shippingFormLabel}>SHIPPING ADDRESS</Text>

                        <CardItem style={{flexDirection: 'column'}}>
                            <Field name="shipping_firstname" label="First name" component={InputText}
                                   style={styles.inputText}/>
                            <Field name="shipping_lastname" label="Last name" component={InputText}
                                   style={styles.inputText}/>
                            <Field name="email" label="Email" component={InputText}
                                   style={styles.inputText}/>
                            <Field name="shipping_street" label="Address" component={InputText}
                                   style={styles.inputText}/>
                            <Field
                                label='Country'
                                component={Select}
                                items={countries}
                                name='shipping_country_id'
                                defaultValue={shippingCountry}
                                onChange={shippingCountry => this.setState({shippingCountry})}
                            />

                            {
                                shippingCountry === 'United States' &&
                                <Field
                                    label='Region'
                                    component={Select}
                                    items={shippingRegions}
                                    name='shipping_region'
                                    defaultValue={shippingRegions[0]}
                                    onChange={shippingRegion => this.setState({shippingRegion})}
                                />
                            }

                            {
                                shippingCountry === 'Canada' &&
                                <Field
                                    label='Region'
                                    component={Select}
                                    items={shippingRegions}
                                    name='shipping_region'
                                    defaultValue={shippingRegions[0]}
                                    onChange={shippingRegion => this.setState({shippingRegion})}
                                />
                            }

                            <Field name="shipping_city" label="City" component={InputText} style={styles.inputText}/>
                            <Field name="shipping_postcode" label="ZIP/Postal code" component={InputText}
                                   style={styles.inputText}/>
                            <Field name="shipping_telephone" label="Phone number" component={InputText}
                                   style={styles.inputText}/>
                            <Field name="password" label="Password" component={InputText}
                                   style={styles.inputText}/>

                        </CardItem>
                    </Card>


                    <View style={styles.shippingCheckWrapper}>
                        <Field component={CheckBoxRedux} name="check" value={check}
                               onChange={value => checkBilling(value)}/>
                        <Text style={styles.shippingCheckLabel}>Set as your default billing address</Text>
                    </View>

                    {
                        !check &&
                        <Card style={styles.shippingFormWrapper}>
                            <Text style={styles.shippingFormLabel}>BILLING ADDRESS</Text>

                            <CardItem style={{flexDirection: 'column'}}>
                                <Field name="billing_firstname" label="First name" component={InputText}
                                       style={styles.inputText}/>
                                <Field name="billing_lastname" label="Last name" component={InputText}
                                       style={styles.inputText}/>
                                <Field name="billing_street" label="Address" component={InputText}
                                       style={styles.inputText}/>

                                <Field
                                    label='Country'
                                    component={Select}
                                    items={countries}
                                    name='billing_country_id'
                                    defaultValue={billingCountry}
                                    onChange={billingCountry => this.setState({billingCountry})}
                                />

                                {
                                    billingCountry === 'United States' &&
                                    <Field
                                        label='Region'
                                        component={Select}
                                        items={billingRegions}
                                        name='billing_region'
                                        defaultValue={billingRegions[0]}
                                        onChange={billingRegion => this.setState({billingRegion})}
                                    />
                                }

                                {
                                    billingCountry === 'Canada' &&
                                    <Field
                                        label='Region'
                                        component={Select}
                                        items={billingRegions}
                                        name='billing_region'
                                        defaultValue={billingRegions[0]}
                                        onChange={billingRegion => this.setState({billingRegion})}
                                    />
                                }

                                <Field name="billing_city" label="City" component={InputText} style={styles.inputText}/>
                                <Field name="billing_postcode" label="ZIP/Postal code" component={InputText}
                                       style={styles.inputText}/>
                                <Field name="billing_telephone" label="Phone number" component={InputText}
                                       style={styles.inputText}/>
                            </CardItem>
                        </Card>
                    }

                    <View style={styles.shippingCheckWrapper}>
                        <CheckBoxExample checked={agreement} press={this.togglePress}/>
                        <Text style={styles.shippingCheckLabel}>I agree with terms and conditions</Text>
                    </View>

                    <View style={styles.shippingTotalWrapper}>
                        <Total name="Continue" disabled={!agreement} press={handleSubmit(this.unitDetails)}/>
                    </View>
                </ScrollView>

                <LoadIndicator  animating={loading}/>
            </Container>
        )
    }
}

function mapStateToProps(state) {
    return {
        billingAddress: state.cart.data.billing_address,
        cart: state.cart.data,
        userId: state.login.user.entity_id,
        shippingAddressessList: state.shippingAddressessList || [],
        billingAddressessList: state.billingAddressessList || [],
        check: state.check.billing,
        loading: state.cart.loading
    }
}

function matchDispatchToProps(dispatch) {
    return {
        checkBilling: payload => dispatch({type: CHECK.VISIBLE_BILLING_ADDRESS, payload}),
        submitDetails: (values, navigation) => dispatch(addCartAddressAction(values, navigation))
    }
}

GuestShipping = connect(mapStateToProps, matchDispatchToProps)(GuestShipping);

export default reduxForm({
    form: 'BillingAddress', // for unique id
    validate
})(GuestShipping);