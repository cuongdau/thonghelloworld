import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Card, CardItem, Container, View, Content} from "native-base";
import Header from './../../components/Header';
import {Field, reduxForm} from "redux-form";
import InputText from "../../components/InputText";
import Select from "../../components/Select";
import {colors, countries, states} from "../../config";
import {CustomButton} from "../../components/Button";
import styles from "./style";
import {addCartAddressAction} from "../../actions/cartAction";


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

class AddNewAddressScreen extends Component {

    state = {
        country: countries[0],
        addressType: this.props.navigation.state.params.addressType || ''
    };

    getCountryStates = country => states.filter(item => item.country === country).map(item => item.state);
    getRegionId = (country, region) => {
        const regionId = this.getCountryStates(country).indexOf(region);
        return (regionId !== -1) ? regionId : 0;
    };

    submitDetails = values => {
        const data = {
            ...values,
            mode: this.state.addressType,
            quote_id: this.props.quoteId,
            store: 5,
            region_id: this.getRegionId(this.state.country, values.region)
        };

        this.props.addCartAddressAction(data);
        this.props.navigation.goBack();
    };


    render() {
        const {country} = this.state;
        const {handleSubmit} = this.props;

        return (
            <Container>
                <Header
                    leftIcon="arrow-back"
                    headTitle="Add New Address"
                    iconColor={colors.white}
                    leftIconPress={() => this.props.navigation.goBack()}
                />

                <Content>
                    <Card style={styles.shippingFormWrapper}>
                        <CardItem style={{flexDirection: 'column'}}>
                            <Field name="firstname" label="First name" component={InputText} style={styles.inputText} />
                            <Field name="lastname" label="Last name" component={InputText} style={styles.inputText} />
                            <Field name="street" label="Address" component={InputText} style={styles.inputText} />
                            <Field
                                label='Country'
                                component={Select}
                                items={countries}
                                name='country_id'
                                defaultValue={country}
                                onChange = {country => this.setState({country})}
                            />

                            {
                                country === 'United States' &&
                                <Field
                                    label='Region'
                                    component={Select}
                                    items={this.getCountryStates(country)}
                                    name='region'
                                    defaultValue={this.getCountryStates(country)[0]}
                                />
                            }

                            {
                                country === 'Canada' &&
                                <Field
                                    label='Region'
                                    component={Select}
                                    items={this.getCountryStates(country)}
                                    name='region'
                                    defaultValue={this.getCountryStates(country)[0]}
                                />
                            }

                            <Field name="city" label="City" component={InputText} style={styles.inputText} />
                            <Field name="postcode" label="ZIP/Postal code" component={InputText} style={styles.inputText} />
                            <Field name="telephone" label="Phone number" component={InputText} style={styles.inputText} />
                        </CardItem>


                        <View style={styles.cartButtonWrapper}>
                            <CustomButton
                                name="Save"
                                color={colors.white}
                                press={handleSubmit(this.submitDetails)}
                                style={styles.cartButton}
                            />
                        </View>

                    </Card>
                </Content>
            </Container>
        )
    }
}

function mapStateToProps (state) {
    return {
        quoteId: state.cart.data.quote_id,
        userId: state.login.user.entity_id
    }
}

AddNewAddressScreen = connect (mapStateToProps, {addCartAddressAction})(AddNewAddressScreen);

export default reduxForm({
    form: 'AddNewAddress', // for unique id
    validate
})(AddNewAddressScreen);