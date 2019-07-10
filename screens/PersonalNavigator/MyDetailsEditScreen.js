import React, {Component} from 'react';
import {Platform, ScrollView, TouchableOpacity} from 'react-native';
import {Container, Card, CardItem, View, Text, Header, Left, Right, Title, Body} from 'native-base';
import Select from './../../components/SelectSimple';
import Icon from './../../components/Icon';
import CheckBox from './../../components/CheckBox';
import InputText from "../../components/InputTextSimple";
import {normalize360, validatePhone} from "../../utilities";
import {countries, states, colors} from './../../config';
import styles from "./style";
import {TextButton} from "../../components/Button";
import { connect } from 'react-redux';
import { customerAddressChange } from "../../actions";
import LoadIndicator from "../../components/LoadIndicator";
import StatusBar from "../../components/StatusBar";


class MyDetailsEditScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: this.props.user.firstname,
            lastname: this.props.user.lastname,
            telephone: '',
            city: '',
            postcode: '',
            country_id: 'Canada',
            region: 'Alberta',
            isShipping: 0,
            isBilling: 0,
            submit: false
        }
    }


    componentWillMount () {
        const { params } = this.props.navigation.state;
        if (params.item) {
            this.setState({
                telephone: params.item.telephone,
                isShipping: params.item.is_default_shipping,
                isBilling: params.item.is_default_billing,
                country_id: this.getCountry(params.item.country_id),
                street: Array.isArray(params.item.street) ? params.item.street.join() : params.item.street,
                city: params.item.city,
                postcode: params.item.postcode,
                region: params.item.region
            }, () => Object.assign(params.item, this.state))
        }
    }

    getCountry = country => country === 'US' || country === 'United States' ? 'United States' : 'Canada';

    isStateInCountry = (country, region) => states.find(item => item.country === country && item.state === region);

    getUserState = (country, region) => this.isStateInCountry(country, region) ? region : '';

    getCountryStates = country => states.filter(item => item.country === country).map(item => item.state);

    handleChange = key => text => this.setState({[key]: text});

    submitData = errors => {
        const {user, navigation, customerAddressChange} = this.props;
        const {params} = navigation.state;

        this.setState({submit: true});

        Object.assign(this.state, {
            address: params.item ? params.item.entity_id : null,
            action: params.action,
            user: user.entity_id
        });

        const nextStep = Object.values(errors).every(error => error === null);

        return nextStep ? customerAddressChange(this.state, navigation) : null
    };


    render () {

        const {navigation, loading} = this.props;
        const { firstname, lastname, telephone, street, city, postcode, country_id, isShipping, isBilling, submit } = this.state;

        const { params } = navigation.state;

        const region = params.item ? params.item.region : "Alberta";

        const errors = {
            firstname: firstname.length < 1 ? 'Please fill first name' : null,
            lastname: lastname.length < 1 ? 'Please fill last name' : null,
            telephone: telephone.length < 1 ? 'Please fill phone number' : !validatePhone(telephone) ?
                'Phone number format is not valid' : null,
            city: city.length < 1 ? 'Please fill in the city' : null,
            postcode: postcode.length < 1 ? 'Please fill in the postcode' : null
        };

        return (
            <Container>
                {Platform.OS === "ios" && <StatusBar />}

                <Header style={styles.header}>
                    <Left>
                        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.goBack()}>
                            <Icon name="arrow-back" color={colors.icon} />
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
                        <TextButton name="SAVE" color={colors.icon}  style={styles.right}
                                    press={() => this.submitData(errors)} />
                    </Right>
                </Header>

                <ScrollView showsVerticalScrollIndicator={false}>
                    <Card style={styles.shippingFormWrapper}>
                        <CardItem style={{flexDirection: 'column', backgroundColor: '#f7f7f7'}}>
                            <InputText label='First name'
                                       name='firstname'
                                       value={firstname}
                                       error={submit ? errors.firstname : null}
                                       onChange={this.handleChange('firstname')}
                                       submit={submit}
                                       style={styles.inputText} />
                            <InputText label='Last name'
                                       name='lastname'
                                       value={lastname}
                                       error={submit ? errors.lastname : null}
                                       onChange={this.handleChange('lastname')}
                                       submit={submit}
                                       style={styles.inputText} />
                            <InputText label='Phone number'
                                       name='telephone'
                                       value={telephone}
                                       error={submit ? errors.telephone : null}
                                       onChange={this.handleChange('telephone')}
                                       submit={submit}
                                       keyboardType="numeric"
                                       style={styles.inputText} />
                        </CardItem>
                    </Card>

                        <Card style={styles.shippingFormWrapper}>
                            <CardItem style={{flexDirection: 'column', backgroundColor: '#f7f7f7'}}>
                                <InputText label='Address'
                                           name='street'
                                           value={street}
                                           error={submit ? errors.street : null}
                                           onChange={this.handleChange('street')}
                                           submit={submit}
                                           style={styles.inputText} />
                                <Select
                                    label='Country'
                                    items={countries}
                                    name='country_id'
                                    defaultValue={country_id}
                                    onChange = {country_id => this.setState({country_id})}
                                />

                                {
                                    country_id === 'United States' &&
                                    <Select
                                        label='Region'
                                        items={this.getCountryStates(country_id)}
                                        name='region'
                                        defaultValue={this.getUserState(country_id, region)}
                                        onChange={this.handleChange('region')}
                                    />
                                }

                                {
                                    country_id === 'Canada' &&
                                    <Select
                                        label='Region'
                                        items={this.getCountryStates(country_id)}
                                        name='region'
                                        defaultValue={this.getUserState(country_id, region)}
                                        onChange={this.handleChange('region')}
                                    />
                                }

                                <InputText label='City'
                                           name='city'
                                           value={city}
                                           error={submit ? errors.city : null}
                                           onChange={this.handleChange('city')}
                                           submit={submit}
                                           style={styles.inputText} />
                                <InputText label='ZIP / Postal code'
                                           name='postcode'
                                           value={postcode}
                                           error={submit ? errors.postcode : null}
                                           onChange={this.handleChange('postcode')}
                                           submit={submit}
                                           keyboardType="numeric"
                                           style={styles.inputText} />

                                <View style={styles.checkboxWrapper}>
                                    <CheckBox checked={isShipping > 0}
                                              press={() => this.setState({isShipping: isShipping > 0 ? 0 : 1})} />
                                    <Text style={styles.checkboxName}>Use as my Primary Shipping Address</Text>
                                </View>
                                <View style={styles.checkboxWrapper}>
                                    <CheckBox checked={isBilling > 0}
                                              press={() => this.setState({isBilling: isBilling > 0 ? 0 : 1})} />
                                    <Text style={styles.checkboxName}>Use as my Primary Billing Address</Text>
                                </View>
                            </CardItem>
                        </Card>
                </ScrollView>

                <LoadIndicator animating={loading} />
            </Container>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.login.user,
        cart: state.cart.data,
        customer: state.customer.data,
        loading: state.customer.loading
    }
}

export default connect(mapStateToProps, {customerAddressChange})(MyDetailsEditScreen);