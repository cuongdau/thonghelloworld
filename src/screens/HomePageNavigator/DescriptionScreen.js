import React, { Component } from 'react';
import {TouchableOpacity, ScrollView, Image, TextInput, Platform, Alert} from 'react-native';
import {Container, Left, Right, View, Text, ListItem, Radio} from 'native-base';
import Modal from "react-native-modal";
import Icon from './../../components/Icon';
import Share from './../../components/Share';
import Suitcase from './../../components/Suitcase';
import LoadIndicator from './../../components/LoadIndicator';
import Condition from './../../components/Condition';
import StatusBar from './../../components/StatusBar';
import Gallery from './../../components/Gallery';
import { CustomButton, TextButton } from "../../components/Button";
import { cartLoading, cartInfoLoading, addToCartAction,
    shopInfoLoading, addToWatchList } from './../../actions';
import {fetchOfferCreate} from "../../api";
import {colors} from "../../config";
import styles from './style';
import {getRoundingNumber, getKeyName, normalize360, rgba} from "../../utilities";
import {connect} from "react-redux";
import Swiper from 'react-native-swiper';


class Description extends Component {
    state = {
        isModalVisible: false,
        visible: false,
        gallery: false,
        submit: false,
        price: '',
        message: '',
        priceFocus: false,
        messageFocus: false
    };

    componentWillMount() {
        const {cart, cartLoading, cartInfoLoading} = this.props;

        if(!cart.quote_id) cartLoading();

        // if(cart.quote_id) {
        //     cartInfoLoading(cart.quote_id);
        // }
    }

    _toggleModal = () => this.setState({isModalVisible: !this.state.isModalVisible});

    handleOfferSubmit = error => {
        const {price, message} = this.state;
        const {product, login} = this.props;
        this.setState({submit: true}, () => {
            if(!error) {
                this._toggleModal();
                const offer = {
                    "offer_store_id": "5",
                    "product_id": product.entity_id,
                    "seller_id": product.seller_profile.seller_id,
                    "offer_price": price,
                    "offer_message": message,
                    "customer_id": login.entity_id
                };

                setTimeout(() => {
                    fetchOfferCreate(offer);
                    this.setState({price: '', message: ''});
                }, 1000)
            }
        });
    };

    handleNavigateOffer = () => this.props.login.entity_id ? this._toggleModal() :
        this.props.navigation.navigate('Welcome', { navigator: 'Description'});

    toggleShare() {
        this.setState({visible: !this.state.visible});
    }

    handleAddToCart = () => {
        const {cart, product, login, addToCartAction} = this.props;
        const inCart = Object.values(cart.items).find(item => item.product_id === product.entity_id);

        if (login.entity_id === product.seller_profile.seller_id) {
            Alert.alert(
                'Golfing Exchange Alert',
                `It looks like this is your product. Good luck with the listing! You can't buy your own product (because that would be weird, right?) but please keep shopping.`,
                [
                    {text: 'OK'},
                ],
                {cancelable: false}
            )
        } else if (!inCart || inCart.qty < product.qty_in_stock) {
            const data = {
                'quote_id': cart.quote_id,
                'product_id': product.entity_id,
                'qty': 1
            };

            addToCartAction(data);
        } else {
            Alert.alert(
                'Golfing Exchange Alert',
                `The requested quantity for ${product.name} is not available.`,
                [
                    {text: 'OK'},
                ],
                {cancelable: false}
            );
        }
    };

    getCategory = product => {
        const string = getKeyName(product, ['brand']);
        const index = string.lastIndexOf('_');
        return string.slice(0, index - string.length);
    };

    getListedDate = () => {
        const date = this.props.product.created_at.slice(0, 10).split("-" );
        const listed =new Date(date[0], date[1] -1, date[2])
            .toDateString()
            .slice(4, 10);
        return `${listed}, ${date[0]}`
    };

    handleNavigateReport = () => this.props.login.entity_id ? this.props.navigation.navigate('Report') :
        this.props.navigation.navigate('Welcome', { navigator: 'Description'});

    rightIconPress = () => {
        const {login, product, addToWatchList} = this.props;

        if(login.entity_id) {
            if (login.entity_id === product.seller_profile.seller_id) {
                Alert.alert(
                    'Golfing Exchange Alert',
                    `It looks like this is your product. Good luck with the listing! You can't buy your own product (because that would be weird, right?) but please keep shopping.`,
                    [
                        {text: 'OK'},
                    ],
                    {cancelable: false}
                )
            } else
                addToWatchList(login.entity_id, product.entity_id);
        } else
            this.props.navigation.navigate('Welcome', { navigator: 'Description'});
    };

    isProductInWatchList = (watchlist, product) => {
        if(!watchlist.messages)
            return Object.values(watchlist).find(item => item.product.product_id === product.entity_id)
    };

    handleChange = key => text => this.setState({[key]: text});

    handleFocusPrice = () => this.setState({priceFocus: !this.state.priceFocus});
    handleMessagePrice = () => this.setState({messageFocus: !this.state.messageFocus});

    render() {
        const { navigation, product, loading, shopInfoLoading, watchlist, login } = this.props;
        const { price, message, submit, priceFocus, messageFocus} = this.state;

        const navigator = navigation.getParam('navigator');

        const leftIconPress = () => {
            if (navigator === 'WishList')
                navigation.navigate('WishList');
            else if(navigator)
                navigation.navigate('Homepage');
            else
                navigation.goBack()
        };

        const prefix = this.getCategory(product);
        const gender = product[prefix + '_gender'];
        const hand = product[prefix + '_hand'];
        const loft = product[prefix + '_loft'];
        const flex = product[prefix + '_shaft_flex'];
        const brand = product[getKeyName(product, ['brand'])];

        const id = product.seller_profile.seller_id;

        const error = price.length < 1 ? 'Please fill the price' :
            Number(price) < Number(product.min_price_offer) ?
                `Your offer price is lower than the seller will accept. It has been automatically rejected` : null;

        const priceOpacity = priceFocus || price.length > 0 ? 0.3 : 0;
        const messageOpacity = messageFocus || message.length > 0 ? 0.3 : 0;

        return(
            <Container>
                {Platform.OS === "ios" && <StatusBar />}

                <ScrollView showsVerticalScrollIndicator={false}>
                    {product.image_url && product.image_url.length > 1 ?

                        <View style={[styles.imageBackground, {padding: 0}]}>
                            <Swiper showsButtons={false} loop={true}
                                    dotStyle={{marginBottom: normalize360(25)}}
                                    activeDotStyle={{marginBottom: normalize360(25)}}
                                    activeDotColor={colors.primary}
                            >
                                {product.image_url.map((item, key) => {
                                    return (
                                        <TouchableOpacity key={key}
                                            onPress={() => this.setState({gallery: true})}>
                                            <Image
                                                source={{uri: item}}
                                                style={styles.imageBackground} />
                                        </TouchableOpacity>
                                    )
                                })}
                            </Swiper>
                        </View> :

                        <TouchableOpacity onPress={() => this.setState({gallery: true})}>
                            <Image
                                source={{uri: product.thumb_image_url}}
                                style={styles.imageBackground} />
                        </TouchableOpacity>
                    }

                    <View style={styles.iconWrapper}>
                        <Left>
                            <TouchableOpacity style={styles.iconButton} onPress={leftIconPress}>
                                <View style={styles.iconButtonWrapper}>
                                    <Icon name="arrow-back" color={colors.grey} />
                                </View>
                            </TouchableOpacity>
                        </Left>
                        <Right style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                            <TouchableOpacity style={styles.iconButton}
                                              onPress={this.toggleShare.bind(this)}>
                                <View style={styles.iconButtonWrapper}>
                                    <Icon name="share" color={colors.grey} />
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.iconButton} onPress={this.rightIconPress}>
                                <View style={styles.iconButtonWrapper}>
                                    <Icon
                                        name={this.isProductInWatchList(watchlist, product) ? "md-star" : "md-star-outline"}
                                        color={colors.grey} />
                                </View>
                            </TouchableOpacity>
                        </Right>
                    </View>
                    <View style={styles.cardModelWrapper}>
                        <View>
                            <View>
                                <ListItem>
                                    <Text style={styles.cardModelName}>{product.name}</Text>
                                </ListItem>

                                <ListItem style={styles.cardModelItem}>
                                    <View>
                                        <Text style={styles.cardModelTitle}>Description</Text>
                                    </View>
                                    <View>
                                        <Text style={styles.cardModelSimpleText}>
                                            {product.description}
                                        </Text>
                                    </View>
                                </ListItem>

                                <ListItem style={styles.cardModelItem}>
                                    <View>
                                        <Text style={styles.cardModelTitle}>
                                            Additional Info
                                        </Text>
                                    </View>
                                    <View style={styles.cardModelItem2}>
                                        <View style={{flexDirection: 'column', alignItems: 'flex-start', width: '50%'}}>
                                            <Text style={styles.cardModelSimpleText}>Item condition:</Text>
                                            {gender && <Text style={styles.cardModelSimpleText}>Gender:</Text>}
                                            {hand && <Text style={styles.cardModelSimpleText}>Hand:</Text>}
                                            {brand && <Text style={styles.cardModelSimpleText}>Brand:</Text>}
                                            {loft && <Text style={styles.cardModelSimpleText}>Loft:</Text>}
                                            {flex && <Text style={styles.cardModelSimpleText}>Flex:</Text>}
                                            <Text style={styles.cardModelSimpleText}>Listed on:</Text>
                                        </View>

                                        <View style={{flexDirection: 'column', alignItems: 'flex-start', width: '50%'}}>
                                            <Condition desc
                                                       quality={product.product_condition}/>
                                            {gender && <Text style={styles.cardModelSimpleText}>{gender}</Text>}
                                            {hand && <Text style={styles.cardModelSimpleText}>{hand}</Text>}
                                            {brand && <Text style={styles.cardModelSimpleText}>{brand}</Text>}
                                            {loft && <Text style={styles.cardModelSimpleText}>{loft}</Text>}
                                            {flex && <Text style={styles.cardModelSimpleText}>{flex}</Text>}
                                            <Text style={styles.cardModelSimpleText}>{this.getListedDate()}</Text>
                                        </View>
                                    </View>
                                </ListItem>
                            </View>

                            <TextButton name='Report item'
                                        color={colors.icon}
                                        style={styles.cardModelButton}
                                        press={() => this.handleNavigateReport()}/>
                        </View>
                    </View>

                    <View style={styles.cardPaymentWrapper}>
                        <View>
                            <View>
                                <ListItem style={styles.cardModelItem}>
                                    <View>
                                        <Text style={styles.cardModelTitle}>Shipping & handling</Text>
                                    </View>

                                    <View style={styles.cardModelItem2}>
                                        <View style={{flexDirection: 'column', alignItems: 'flex-start', width: '50%'}}>
                                            <Text style={styles.cardModelSimpleText}>Shipping from:</Text>
                                            <Text style={styles.cardModelSimpleText}>Domestic Shipping{'\n'}Fee:</Text>
                                            {product.international_shipping_price !== "" &&
                                            <Text style={styles.cardModelSimpleText}>
                                                International Shipping{'\n'}Fee:
                                            </Text>}
                                        </View>
                                        <View style={{flexDirection: 'column', alignItems: 'flex-start', width: '50%'}}>
                                            <Text style={styles.cardModelSimpleText}>{product.default_location}</Text>
                                            <Text
                                                style={styles.cardModelSimpleText}>{'\n'}${product.national_shipping_price}</Text>
                                            {product.international_shipping_price !== "" &&
                                            <Text style={styles.cardModelSimpleText}>{'\n'}${product.international_shipping_price}</Text>}
                                        </View>
                                    </View>
                                </ListItem>

                                {!product.international_shipping_price &&
                                <ListItem>
                                    <View style={styles.sellerCardButtonWrapper}>
                                        <Text style={styles.cardModelSimpleText}>
                                            Seller WILL NOT ship internationally
                                        </Text>
                                    </View>
                                </ListItem>}

                                <ListItem style={styles.cardModelItem}>
                                    <View>
                                        <Text style={[styles.cardModelSimpleText,
                                            {opacity: 0.5, marginBottom: normalize360(8)}]}>
                                            Standart Shippiing Policies
                                        </Text>
                                    </View>

                                    <View>
                                        <View style={{flexDirection: 'row'}}>
                                            <Text style={styles.shippingListItem}>&#8226;</Text>
                                            <View style={{width: '96%'}}>
                                                <Text style={styles.cardModelSimpleText}>
                                                    Seller expected to ship within 2 business days
                                                    of receiving payment.
                                                </Text>
                                            </View>
                                        </View>

                                        <View style={{flexDirection: 'row'}}>
                                            <Text style={styles.shippingListItem}>&#8226;</Text>
                                            <View style={{width: '96%'}}>
                                                <Text style={styles.cardModelSimpleText}>
                                                    Seller is not responsible for any Duty, VAT
                                                    or additional taxes that may be incurred by
                                                    buyer after the purchase of an item. It is
                                                    the sole responsibility of the international
                                                    buyer to check local regulations when buying
                                                    exported goods.
                                                </Text>
                                            </View>
                                        </View>
                                    </View>
                                </ListItem>
                            </View>
                        </View>
                    </View>

                    <View style={styles.cardPaymentWrapper}>
                        <View>
                            <View>
                                <ListItem style={styles.cardModelItem}>
                                    <View>
                                        <Text style={styles.cardModelTitle}>Seller Profile</Text>
                                    </View>

                                    <View style={{flexDirection: 'row'}}>
                                        <Image source={{uri: product.seller_profile.user_image}}
                                               style={styles.sellerCardImage}/>
                                        <View style={styles.sellerCardItemWrapper}>
                                            <TouchableOpacity onPress={() =>
                                                shopInfoLoading(id, login.entity_id, navigation, 'Sellers')}>
                                                <Text style={styles.modalShopName}>
                                                    {product.seller_profile.store_title}
                                                </Text>
                                            </TouchableOpacity>
                                            <Text style={styles.cardModelSimpleText}>
                                                {product.seller_profile.state}, {product.seller_profile.country}
                                            </Text>
                                            <Text style={styles.cardModelSimpleText}>
                                                {product.seller_profile.feedback}% Positive Feedback
                                            </Text>
                                            <View style={{flexDirection: 'row'}}>
                                                {
                                                    new Array(5).fill('').map((item, key) => {
                                                        return <Icon
                                                            key={key}
                                                            name={key + 1 <= Math.round(product.seller_profile.feedback/20) ?
                                                                "md-star" : "md-star-outline"}
                                                            color={key + 1 <= Math.round(product.seller_profile.feedback/20) ?
                                                                colors.primary : colors.black}
                                                            fontSize={30}
                                                            style={styles.sellersStars}
                                                        />
                                                    })
                                                }
                                            </View>
                                        </View>
                                    </View>
                                </ListItem>

                                <View style={[styles.sellerCardButtonWrapper, {marginVertical: normalize360(16)}]}>
                                    <Text style={styles.cardModelSimpleText}>
                                        {product.seller_profile.tax_rates ? 'Seller DOES charge sales tax in some states' :
                                            'Seller DOES NOT charge sales tax'}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    <View style={styles.buttonsWrapper}>
                        <View style={styles.absoluteTextWrapper}>
                            <Text style={styles.oldPrice}>
                                {product.final_price_without_tax !== product.regular_price_without_tax ?
                                    `$${getRoundingNumber(product.regular_price_without_tax)}` : null}
                            </Text>
                            <Text style={styles.text1}>${getRoundingNumber(product.final_price_without_tax)} </Text>
                            <Text style={styles.text2}>
                                + ${getRoundingNumber(Number(product.national_shipping_price))} shipping
                            </Text>
                        </View>

                        <CustomButton name="ADD TO CART" color={colors.white} style={styles.cartButton}
                                      press={this.handleAddToCart} />

                        <View style={styles.wrapperLightButton}>
                            <CustomButton name="Make Offer" style={styles.lightButton}
                                          fontSize={14}
                                          color="#464d53"
                                          disabled={login.entity_id === id}
                                          press={this.handleNavigateOffer}/>
                            <CustomButton name="Start Chat" style={styles.lightButton}
                                          fontSize={14}
                                          color="#464d53"
                                          press={() => navigation.navigate('HomeChat')} />
                        </View>
                    </View>

                    <Modal isVisible={this.state.isModalVisible} onBackdropPress={this._toggleModal}>
                        <View style={styles.modalWrapper}>
                            <View style={styles.modalContent}>
                                <View style={styles.modalTitleWrapper}>
                                    <Text style={styles.modalTitle}>Your offer</Text>
                                    <TouchableOpacity onPress={this._toggleModal} style={styles.modalCloseButton}>
                                        <Icon name="close" color={colors.primary} />
                                    </TouchableOpacity>
                                </View>
                                <View>
                                    <View style={styles.priceFieldWrapper}>
                                        <View style={styles.priceFieldInput}>
                                            <Text
                                                style={[styles.modalLabel, {opacity: priceOpacity}]}>Your price</Text>
                                            <TextInput
                                                value={price}
                                                keyboardType="numeric"
                                                onFocus={this.handleFocusPrice}
                                                onBlur={this.handleFocusPrice}
                                                onChangeText={this.handleChange('price')}
                                                style={styles.modalInput}
                                                placeholder={priceFocus ? '' : 'Your price'} />
                                        </View>
                                        <Text style={styles.priceFieldText}>
                                            + ${getRoundingNumber(Number(product.national_shipping_price))} Shipping
                                        </Text>
                                    </View>

                                    <View>
                                        <Text
                                            style={[styles.modalLabel, {opacity: messageOpacity}]}>Your message</Text>
                                        <TextInput
                                            value={message}
                                            onFocus={this.handleMessagePrice}
                                            onBlur={this.handleMessagePrice}
                                            onChangeText={this.handleChange('message')}
                                            style={styles.modalInput}
                                            placeholder={messageFocus ? '' : 'Your message'} />

                                        {(submit && error) &&
                                            <Text style={styles.modalError}>{error}</Text>}
                                    </View>

                                    <View style={styles.radioButtonWrapper}>
                                        <Radio selected={true} />

                                        <Text style={styles.textConsent}>
                                            I agree to pay if my offer is {'\n'} accepted.
                                        </Text>
                                    </View>
                                </View>

                                <View style={styles.modalSubmitButton}>
                                    <TextButton name="MAKE OFFER" color={colors.primary}
                                                press={() => this.handleOfferSubmit(error)}/>
                                </View>
                            </View>
                        </View>
                    </Modal>

                    <Modal isVisible={this.state.gallery} style={{margin: 0}}>
                        <Gallery images={product.image_url} goBack={() => this.setState({gallery: false})} />
                    </Modal>
                </ScrollView>

                <Suitcase navigation={navigation} />

                <LoadIndicator animating={loading} />

                <Share visible={this.state.visible} toggle={this.toggleShare.bind(this)} url={product.url} />
            </Container>
        )
    }
}

const mapStateToProps = state => ({
    category: state.category,
    product: state.product.data,
    cart: state.cart.data,
    login: state.login.user,
    loading: state.cart.loading || state.watchlist.loading,
    watchlist: state.watchlist.data
});

export default connect(mapStateToProps, {
    cartLoading,
    cartInfoLoading,
    addToCartAction,
    shopInfoLoading,
    addToWatchList
})(Description);