import React from 'react';
import { ScrollView } from 'react-native';
import {Container, List, Card, CardItem, View, Text} from 'native-base';
import Header from './../../components/Header';
import {colors} from "../../config";
import styles from "./style";
import CartItem2 from "../../components/CartItem2";
import {getRoundingNumber} from "../../utilities";
import {CustomButton} from "../../components/Button";
import {connect} from 'react-redux';

const user = {
    name: "Andrew Uskov",
    email: "au@brsw.io",
    street: "Azovstalska, 43/6, 58",
    city: "Mariupol",
    country: "UKRAINE"
};

const Summary = ({ navigation, cart }) => {
    const subtotal_with_discount = Number(cart.subtotal_with_discount),
        tax = subtotal_with_discount * 0.1,
        shipping = Number(cart.national_shipping_price_sum),
        subtotal_with_tax = subtotal_with_discount + tax + shipping;

    return(
        <Container>
            <Header
                leftIcon="arrow-back"
                headTitle="Summary"
                iconColor={colors.white}
                leftIconPress={() => navigation.navigate('Pay')}
            />

            <ScrollView>
                <List style={styles.cartListWrapper}>
                    {cart.items.map((item) =>
                        (
                            <CartItem2
                                key={item.item_id}
                                image={{uri: item.image}}
                                title={item.name}
                                price={item.final_price_without_tax}
                                shipping={item.national_shipping_price}
                                quantity={item.qty}
                                quality={item.product_condition}
                                wrapperStyle={styles.summaryListItemWrapper}
                                trashIcon={false}
                                trashPress={() => null}
                            />)
                    )}
                </List>

                <Card style={{width: '96%', marginLeft: '2%'}}>
                    <CardItem>
                        <View style={styles.userDataWrapper}>
                            <View>
                                <Text style={styles.shippingRadioLabel}>DELIVERY DETAILS</Text>
                                <View style={styles.userDataTextWrapper}>
                                    <Text>{user.name}</Text>
                                    <Text>{user.email}</Text>
                                    <Text>{user.street}</Text>
                                    <Text>{user.city}</Text>
                                    <Text>{user.country}</Text>
                                </View>
                            </View>

                            <View style={styles.estimatedWrapper}>
                                <Text style={styles.shippingRadioLabel}>ESTIMATED DELIVERY</Text>
                                <Text>Friday, 11 Desember, 2018</Text>
                            </View>

                            <View>
                                <Text style={styles.shippingRadioLabel}>DELIVERY METHOD</Text>
                                <Text>Standart Shipping</Text>
                            </View>
                        </View>
                    </CardItem>
                </Card>

                <Card style={{width: '96%', marginLeft: '2%'}}>
                    <CardItem>
                        <View style={{flexDirection: 'column'}}>
                            <Text style={styles.shippingRadioLabel}>ORDER TOTAL</Text>
                            <View style={styles.summaryCountMainWrapper}>
                                <Text>Sub-total</Text>
                                <Text>${getRoundingNumber(subtotal_with_discount)}</Text>
                            </View>
                            <View style={styles.summaryCountMainWrapper}>
                                <Text>Shipping</Text>
                                <Text>${getRoundingNumber(13)}</Text>
                            </View>
                            <View style={styles.summaryCountMainWrapper}>
                                <Text uppercase>Tax</Text>
                                <Text>${getRoundingNumber(tax)}</Text>
                            </View>
                            <View style={[styles.summaryCountMainWrapper, styles.summaryTotal]}>
                                <Text uppercase>Total</Text>
                                <Text>${getRoundingNumber(subtotal_with_tax)}</Text>
                            </View>
                        </View>
                    </CardItem>
                </Card>

                <View style={styles.summaryButtonWrapper}>
                    <CustomButton
                        name='Pay'
                        color={colors.white}
                        press={() => navigation.navigate('ExitCart')}
                        style={[styles.cartButton, {backgroundColor: colors.tabs}]}
                    />
                </View>
            </ScrollView>
        </Container>
    )
};

function mapStateToProps (state) {
    return {
        cart: state.cart.data
    }
}

export default connect(mapStateToProps)(Summary);