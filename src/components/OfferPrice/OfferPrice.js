import React, { Component } from "react"
import { Text, CardItem } from "native-base"
import InputText from "../InputTextSimple"
import styles from "./style"
import Switch from "../Switch";


class OfferPrice extends Component {
    state = {
        isOffer: false,
        min_price_offer: null
    };

    componentDidMount() {
        if(this.props.listing) {
            Object.assign(this.state, {
                isOffer: !isNaN(Number(this.props.listing.min_price_offer)),
                min_price_offer: this.props.listing.min_price_offer
            });
        }

        if(this.state.isOffer)
            return this.props.setValues(this.state);
    }

    handleChange = key => text => this.setState({[key]: text},
        () => this.props.setValues(this.state));

    render() {
        const {isOffer, min_price_offer} = this.state;

        return (
            <CardItem style={{ flexDirection: "column", alignItems: "flex-start", backgroundColor: '#f7f7f7' }}>
                <Text uppercase style={styles.title}>Offers</Text>
                <Switch value={isOffer}
                        label="Automatically reject offers below"
                        toggleSwitch={() => {
                            this.setState({
                                isOffer: !isOffer
                            }, () => {
                                if(!this.state.isOffer) {
                                    this.setState({min_price_offer: null});
                                    return this.props.setValues({})
                                }
                            })
                        }}
                />
                {isOffer && <InputText name="min_price_offer"
                                       label="Minimum price for automatic bid offers"
                                       value={min_price_offer}
                                       style={styles.inputText}
                                       onChange={this.handleChange('min_price_offer')}
                                       keyboardType="numeric" />}
            </CardItem>
        )
    }
}

export default OfferPrice;