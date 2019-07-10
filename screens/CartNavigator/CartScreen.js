import React, { Component } from 'react';
import {Alert} from "react-native";
import {Container, Content, List} from 'native-base';
import Header from './../../components/Header';
import CartItem2 from './../../components/CartItem2';
import Total from './../../components/Total';
import LoadIndicator from './../../components/LoadIndicator';
import {colors} from "../../config";
import styles from "./style";
import {connect} from 'react-redux';
import {deleteFromCartAction, cartSetCustomerLoading, changeProduct, cartInfoLoading} from '../../actions';


class CartScreen extends Component {
    componentWillMount(): void {
        const {cart, user, cartInfoLoading, cartSetCustomerLoading} = this.props;

        if(user.entity_id && user.email !== cart.customer_email) {
            const customer = {
                "firstname": user.firstname,
                "lastname": user.lastname,
                "email": user.email,
                "mode": "customer",
                "website_id": 5
            };

            cartSetCustomerLoading(customer, cart.quote_id);
        } else
            cartInfoLoading(cart.quote_id);
    }

    getProductsQuantity = () => {
        return (this.props.cart && this.props.cart.items) ?
            this.props.cart.items.reduce((accumulator, currentValue) => accumulator + currentValue.qty, 0) : 0;
    };


    handleDeleteItem = (cart, product) => {
        const data = {
            "store": 5,
            "quote_id": cart.quote_id,
            "product_id": product.product_id,
            "qty": "1"
        };

        Alert.alert(
            'Golfing',
            'Are you sure you want to delete this item?',
            [
                {
                    text: 'No',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {text: 'Yes', onPress: () => this.props.deleteFromCartAction(data)},
            ],
            {cancelable: false},
        );

    };


    handlePress = () => this.props.user.entity_id ? this.props.navigation.navigate('GuestShipping') :
        this.props.navigation.navigate('Welcome', {navigator: 'Cart'});


    render() {
        const { navigation, cart, loading, changeProduct } = this.props;


        return(
            <Container>
                <Header
                    leftIcon="close"
                    headTitle={`My cart (${this.getProductsQuantity()} item)`}
                    iconColor={colors.icon}
                    leftIconPress={() => navigation.navigate('Homepage')}
                />

                <Content>
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
                                    onPress={() => changeProduct(item.product_id, navigation)}
                                    trashPress={() => this.handleDeleteItem(cart, item)}
                                    wrapperStyle={styles.cartListItemWrapper}
                                    trashIcon
                                />)
                        )}
                    </List>

                    <Total disabled={cart.items.length === 0} name="Checkout" press={this.handlePress} />
                </Content>

                <LoadIndicator animating={loading} />
            </Container>
        )
    }
}

function mapStateToProps (state) {
    return {
        cart: state.cart.data,
        loading: state.cart.loading,
        user: state.login.user
    }
}

export default connect(mapStateToProps, {
    deleteFromCartAction,
    cartSetCustomerLoading,
    changeProduct,
    cartInfoLoading
})(CartScreen);
