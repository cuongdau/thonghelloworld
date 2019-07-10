import React, { Component } from "react"
import { View } from "react-native"
import { Text, CardItem } from "native-base"
import Select from "../SelectSimple"
import styles from "./style"
import InputText from "../InputTextSimple";

const condition = ["", "Fair", "Good", "Great", "New"];
const status = ["", "Visible in store", "Hidden from store"];

class ItemCondition extends Component {
    state = {
        product_condition: '',
        status: ''
    };

    componentDidMount() {
        const {listing} = this.props;
        if(listing) {
            Object.assign(this.state, {
                product_condition: listing.product_condition,
                quantity: listing.qty_in_stock.toString(),
                status: this.getStatus(listing.status)
            })
        }

        return this.props.setValues(this.state);
    }

    getStatus = listing => listing === "1" ? status[1] : status[2];

    handleCondition = condition => {
        this.setState({
            product_condition: condition,
            quantity: '1'
        },() => this.props.setValues(this.state));
    };

    render() {
        const {listing} = this.props;
        return (
                <CardItem style={{ flexDirection: "column", alignItems: "flex-start", backgroundColor: '#f7f7f7' }}>
                    <Text uppercase style={styles.title}>Conditions & Status</Text>

                    <Select name="product_condition" label="Condition" items={condition}
                           onChange={this.handleCondition}
                           defaultValue={listing ? listing.product_condition : condition[0]}/>
                    {this.state.product_condition === 'New' &&
                    <InputText name="quantity" label="Quantity" keyboardType="numeric"
                               value={this.state.quantity}
                               onChange={quantity => this.setState({quantity},
                                   () => this.props.setValues(this.state))}
                               style={styles.inputText} />}

                    <View style={styles.wrapper}>
                        <Text style={styles.gray}>
                            New{'\n'}Unused, original packaging, no blemishes{'\n\n'}
                            Great{'\n'}Little sign of use, almost unblemished{'\n\n'}
                            Good{'\n'}Minor blemishes, functions as intended{'\n\n'}
                            Fair{'\n'}Moderate blemishes, very used but useful
                        </Text>
                    </View>

                    <Select name="status" label="Status" items={status}
                           defaultValue={listing ? this.getStatus(listing.status) : status[0]}
                           onChange={status => this.setState({status},
                               () => this.props.setValues(this.state))} />
                </CardItem>
        )
    }
}
export default ItemCondition