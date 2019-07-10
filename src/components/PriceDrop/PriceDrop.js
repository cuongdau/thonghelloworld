import React, { Component } from "react"
import { Text, CardItem, View } from "native-base"
import InputText from "../InputTextSimple"
import Switch from "../Switch"
import styles from "./style"
import DatePicker from 'react-native-datepicker';
import {normalize360} from "../../utilities";

class MyDatePicker extends Component {
    render() {
        const { onChange, defaultDate } = this.props;

        return (
            <DatePicker
                style={{ width: 130 }}
                date={defaultDate}
                mode="date"
                placeholder="Select date"
                placeHolderTextStyle={{ color: "#444", fontSize: 15 }}
                format="YYYY-MM-DD"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                    dateIcon: {
                        position: 'absolute',
                        left: 0,
                        top: 6,
                        marginLeft: 0,
                        width: normalize360(25),
                        height: normalize360(25)
                    },
                    dateInput: {
                        marginLeft: normalize360(10),
                        borderWidth: 0
                    }
                }}
                onDateChange={onChange}
            />
        )
    }
}

class PriceDrop extends Component {
    state = {
        isPriceDrop: false,
        special_from_date: null,
        special_to_date: null,
        special_price: ''
    };

    componentDidMount() {
        const {listing} = this.props;
        if(listing && listing.special_from_date && listing.special_to_date) {
            Object.assign(this.state, {
                isPriceDrop: true,
                special_from_date: this.getDate(listing.special_from_date),
                special_to_date: this.getDate(listing.special_to_date),
                special_price: listing.final_price_without_tax.toString()
            });
        }

        if(this.state.isPriceDrop)
            return this.props.setValues(this.state);
    }

    getDate = value => value.split(' ')[0];

    handleChange = key => text => this.setState({[key]: text}, () => this.props.setValues(this.state));

    getError = value => value.length < 1 ? "Required" : null;

    render() {
        const { isPriceDrop, special_from_date, special_to_date, special_price, submit } = this.state;
        return (
            <CardItem style={{ flexDirection: "column", alignItems: "flex-start", backgroundColor: '#f7f7f7' }}>
                <Switch value={isPriceDrop}
                    label="Price Drop This Listing?"
                    toggleSwitch={() => {
                        this.setState({
                            isPriceDrop: !isPriceDrop
                        }, () => {
                            if(!this.state.isPriceDrop) {
                                this.setState({
                                    special_from_date: null,
                                    special_to_date: null
                                });
                                return this.props.setValues(null)
                            }
                        })
                    }}
                />
                {isPriceDrop &&
                    <React.Fragment>
                        <Text style={[styles.small, {marginTop: normalize360(15)}]}>If you want to drop the Listing Price, or run a Sale, do it here. This works like a Sale, and shows buyers your new price and that it has been dropped.</Text>
                        <Text style={styles.small}>Note: We do not show your net payment here, but it will be net of the standard sales fee (not shown).</Text>

                        <InputText name="special_price" label="Sale Price ($USD)"
                                   error={submit ? this.getError(special_price) : null}
                                   value={special_price}
                                   submit={submit}
                                   onChange={this.handleChange('special_price')}
                                   style={styles.inputText}
                                   keyboardType="numeric" />

                        <View style={{flexDirection: 'row', width: '100%', justifyContent: 'space-between',
                            marginTop: normalize360(25)}}>
                            <View style={{flexDirection: 'column'}}>
                                <Text style={styles.select}>Sale Start Date</Text>
                                <MyDatePicker name="special_from_date" defaultDate={special_from_date}
                                              onChange={this.handleChange('special_from_date')} />
                            </View>
                            <View style={{flexDirection: 'column'}}>
                                <Text style={styles.select}>Sale End Date</Text>
                                <MyDatePicker name="special_to_date" defaultDate={special_to_date}
                                              onChange={this.handleChange('special_to_date')}/>
                            </View>
                        </View>
                    </React.Fragment>
                }
            </CardItem>
        )
    }
}

export default PriceDrop