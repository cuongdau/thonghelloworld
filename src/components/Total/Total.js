import React from 'react';
import {View, Text} from 'native-base';
import {CustomButton} from './../../components/Button';
import {colors} from "../../config";
import styles from "./style";
import {getRoundingNumber} from "../../utilities";
import {connect} from 'react-redux';


const Total = ({ name, disabled, press, cart }) => {
    const subtotal_with_discount = Number(cart.shipping_address.subtotal),
          tax = Number(cart.shipping_address.base_tax_amount),
          shipping = Number(cart.shipping_address.shipping_amount),
          subtotal_with_tax = Number(cart.shipping_address.base_grand_total);

    return (
        <View style={styles.cartCountContainer}>
            <View style={styles.cartCountMainWrapper}>
                <Text style={styles.cartCountMainText}>Price</Text>
                <Text style={styles.cartCountMainText}>
                    ${getRoundingNumber(subtotal_with_discount)}
                </Text>
            </View>
            <View style={styles.cartCountSecondaryWrapper}>
                <Text style={styles.cartCountSecondaryText}>Shipping</Text>
                <Text style={styles.cartCountSecondaryText}>${getRoundingNumber(shipping)}</Text>
            </View>
            <View style={styles.cartCountSecondaryWrapper}>
                <Text uppercase style={styles.cartCountSecondaryText}>Tax</Text>
                <Text style={styles.cartCountSecondaryText}>
                    ${getRoundingNumber(tax)}
                </Text>
            </View>
            <View style={styles.cartCountMainWrapper}>
                <Text uppercase style={styles.cartCountMainText}>Total</Text>
                <Text style={styles.cartCountMainText}>
                    ${getRoundingNumber(subtotal_with_tax)}
                </Text>
            </View>

            <View style={styles.cartButtonWrapper}>
                <CustomButton
                    name={name}
                    color={colors.white}
                    disabled={disabled}
                    press={() => press()}
                    style={[styles.cartButton, {backgroundColor: disabled ? colors.disable : colors.tabs}]}
                />
            </View>
        </View>
    )
};

function mapStateToProps (state) {
    return {
        cart: state.cart.data
    }
}

export default connect(mapStateToProps)(Total);
