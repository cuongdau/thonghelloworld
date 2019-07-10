import React, { Component } from 'react';
import {Alert, ScrollView} from 'react-native';
import {View, Text, Container, Content, List} from 'native-base';
import Header from "../../components/Header";
import WatchlistItem from '../../components/WatchlistItem';
import LoadIndicator from '../../components/LoadIndicator';
import Suitcase from "../../components/Suitcase";
import {colors} from "../../config";
import styles from './style';
import {connect} from 'react-redux';
import {getWatchList, delFromWatchList, addToCartAction, changeProduct, cartLoading} from './../../actions';

class WishListScreen extends Component {
    componentWillMount(): void {
        const {user, cart, navigation, getWatchList, cartLoading} = this.props;
        if (!user.entity_id)
            return navigation.navigate('Welcome', {navigator: 'WishList'});
        else
            getWatchList(user.entity_id);

        if(!cart.quote_id) cartLoading();
    }

    handleAddToCart = item => {
        const {cart, user, addToCartAction, delFromWatchList} = this.props;
        const inCart = Object.values(cart.items).find(cartItem => cartItem.product_id === item.product.product_id);

        if (!inCart || inCart.qty < Number(item.product["qty_in stock"])) {
            const data = {
                'quote_id': cart.quote_id,
                'product_id': item.product.product_id,
                'qty': 1
            };

            addToCartAction(data);

            if(!inCart || inCart.qty < 10)
                delFromWatchList(user.entity_id, item.product.product_id)

        } else {
            Alert.alert(
                'Golfing Exchange Alert',
                `The requested quantity for ${item.product.product_title} is not available.`,
                [
                    {text: 'OK'},
                ],
                {cancelable: false}
            );
        }
    };

    render() {
        const {navigation, watchlist, loading, user, delFromWatchList, changeProduct} = this.props;

        return (
            <Container>
                <Header
                    rightIcon="search"
                    headTitle="Watchlist"
                    iconColor={colors.icon}
                    rightIconPress={() => navigation.navigate('Search', {navigator: 'WishList'})}
                />

                {watchlist.messages ?
                    <Text style={{textAlign: 'center', fontWeight: 'bold'}}>
                        {watchlist.messages.error[0].message}
                    </Text> :

                    <Content>
                        <View>
                            <Text style={styles.itemsCount}>
                                {Object.values(watchlist).length} item(s) add
                            </Text>
                        </View>
                        <ScrollView>
                            <List style={{padding: 0}}>
                                {Object.values(watchlist).map(item => (
                                    <WatchlistItem key={item.product.product_id}
                                                   image={item.product.product_image}
                                                   title={item.product.product_title}
                                                   oldPrice={item.product.product_regular_price}
                                                   newPrice={item.product.product_final_price}
                                                   quality={item.product.product_condition}
                                                   onPress={() => changeProduct(item.product.product_id, navigation, 'WishList')}
                                                   onTrashPress={() =>
                                                       delFromWatchList(user.entity_id, item.product.product_id)}
                                                   onAddToCartPress={() => this.handleAddToCart(item)}
                                    />
                                ))}
                            </List>
                        </ScrollView>
                    </Content>}

                <Suitcase navigation={navigation}/>

                <LoadIndicator animating={loading}/>
            </Container>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.login.user,
        loading: state.watchlist.loading,
        watchlist: state.watchlist.data,
        cart: state.cart.data,
        listing: state.listing
    }
}

export default connect(mapStateToProps, {
    getWatchList,
    delFromWatchList,
    addToCartAction,
    changeProduct,
    cartLoading
})(WishListScreen);