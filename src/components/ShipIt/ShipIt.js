import React, { Component } from "react"
import {  Text, CardItem } from "native-base"
import InputText from "../InputTextSimple"
import Select from "../SelectSimple"
import {colors} from "../../config"
import styles from "./style"
import {normalize360} from "../../utilities";


const country = ["", "Canada", "United States"];

class ShipIt extends Component {
    state = {
        default_country: country[0],
        default_location: '',
        national_shipping_price: ''
    };

    componentDidMount() {
        const {listing} = this.props;
        if(listing) {
            return this.setState({
                default_country: this.getCountry(listing.country),
                default_location: listing.default_location,
                national_shipping_price: listing.national_shipping_price.toString()
            })
        }
        return this.props.setValues(this.state);
    }

    getCountry = listing => listing === 'US' ? country[2] : country[1];

    handleChange = key => text => this.setState({[key]: text},
        () => this.props.setValues(this.state));

    getError = value => value.length < 1 ? "Required" : null;

    render() {
        const {listing, submit} = this.props;
        const { default_country, default_location, national_shipping_price} = this.state;

        return (
            <CardItem style={{ flexDirection: "column", alignItems: "flex-start", backgroundColor: '#f7f7f7' }}>
                <Text uppercase style={styles.title}>Shipping</Text>
                <Select name="default_country"
                        label="What Country Are you Shipping From?"
                        onChange={this.handleChange('default_country')}
                        items={country}
                        defaultValue={listing ? this.getCountry(listing.country) : default_country} />

                <InputText name="default_location"
                           label="What City and State/Province"
                           value={default_location}
                           error={submit ? this.getError(default_location) : null}
                           submit={submit}
                           onChange={this.handleChange('default_location')}
                           style={styles.inputText} maxLength={35} />

                <InputText name="national_shipping_price"
                           label="What Is Your Domestic Shipping Charge?"
                           value={national_shipping_price}
                           error={submit ? this.getError(national_shipping_price) : null}
                           submit={submit}
                           onChange={this.handleChange('national_shipping_price')}
                           style={styles.inputText} keyboardType="numeric" />

                <Text style={[styles.small, {marginTop: normalize360(15)}]}>Ground shipping with tracking and insurance. Not sure what to charge? See our <Text style={[styles.small,{color: colors.primary}]}>Shipping Guide</Text> for help. Tip: Ask a local pro shop for an old box to ship your clubs. It can save you up to $15.00 in shipping cost.</Text>
            </CardItem>
        )
    }
}

export default ShipIt;