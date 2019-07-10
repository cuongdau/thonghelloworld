import React, { Component } from "react"
import {  Text, CardItem } from "native-base"
import InputText from "../InputTextSimple"
import Switch from "../Switch"
import {colors} from "../../config"
import styles from "./style"
import {normalize360} from "../../utilities";


class ShipIt extends Component {
    state = {
        isInternationally: false,
        international_shipping_price: null
    };

    componentDidMount() {
        const {listing} = this.props;
        if(listing) {
            Object.assign(this.state, {
                isInternationally: listing.ship_internationally !== 'No',
                international_shipping_price: listing.international_shipping_price
            });
        }

        if(this.state.isInternationally)
            return this.props.setValues(this.state);
    }

    handleChange = key => text => this.setState({[key]: text},
        () => this.props.setValues(this.state));

    render() {
        const { isInternationally, international_shipping_price } = this.state;
        return (
            <CardItem style={{ flexDirection: "column", alignItems: "flex-start", backgroundColor: '#f7f7f7' }}>
                <Text uppercase style={styles.title}>International Ship</Text>

                <Switch value={isInternationally}
                        label="Will You Ship Internationally?"
                        toggleSwitch={() => {
                            this.setState({
                                isInternationally: !isInternationally
                            }, () => {
                                if(!this.state.isInternationally) {
                                    this.setState({international_shipping_price: null});
                                    return this.props.setValues(null)
                                }
                            })
                        }}
                />
                {isInternationally &&
                <InputText name="international_shipping_price"
                           label="What Is Your International Shipping Charge?"
                           value={international_shipping_price}
                           keyboardType="numeric"
                           onChange={this.handleChange('international_shipping_price')}
                           style={styles.inputText} />
                }

                <Text style={[styles.small, {marginTop: normalize360(15)}]}>Ground shipping with tracking and insurance. Not sure what to charge? See our <Text style={[styles.small,{color: colors.primary}]}>Shipping Guide</Text> for help. Tip: Ask a local pro shop for an old box to ship your clubs. It can save you up to $15.00 in shipping cost.</Text>

            </CardItem>
        )
    }
}

export default ShipIt;