import React from 'react';
import {Image, Platform, TouchableOpacity} from 'react-native';
import {Container, View, Text, Tabs, Tab, Body} from 'native-base';
import Icon from './../../components/Icon';
import Feedback from './../../components/Feedback';
import Offers from './../../components/Products';
import { CustomButton } from './../../components/Button';
import styles from './style';
import {colors} from "../../config";
import {connect} from 'react-redux';
import {HOME} from "../../types";
import StatusBar from "../../components/StatusBar";
import {normalize360} from "../../utilities";


const SellersScreen = ({ navigation, shop, user, product, changeProduct }) => {
    const handleProduct = product => changeProduct(product, navigation, 'Description');

    const leftIconPress = () => {
        const navigator = navigation.getParam('navigator');
        return navigator ? navigation.navigate(navigator) : navigation.goBack();
    };

    return(
        <Container style={{backgroundColor: colors.default}}>
            {Platform.OS === "ios" && <StatusBar />}
            <View style={styles.sellersHeaderContainer}>
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
                paddingLeft: normalize360(5)}}>
                    <TouchableOpacity style={styles.iconButton} onPress={leftIconPress}>
                        <Icon name="arrow-back" color={colors.black}/>
                    </TouchableOpacity>
                    <Body style={{alignItems: 'flex-start', marginLeft: normalize360(20)}}>
                        <Text style={styles.sellerBody}>{shop.seller_data.shopName}</Text>
                    </Body>
                </View>

                <View style={{flex: 2, flexDirection: 'row'}}>
                    <Image source={{uri: shop.seller_data.shopImage}}
                           style={styles.sellersHeaderImage} />

                    <View style={styles.sellersInfoWrapper}>
                        <Text style={styles.sellersInfoText}>
                            {shop.seller_data.shopStateCity}, {shop.seller_data.shopCountry}{'\n'}
                            {shop.seller_data.shopFeedbacks}% Positive Feedback
                        </Text>

                        <View style={styles.sellerShopEstimation}>
                            {
                                new Array(5).fill('').map((item, key) => {
                                    return <Icon
                                        key={key}
                                        name={key + 1 <= Math.round(shop.seller_data.shopFeedbacks/20) ? "md-star" : "md-star-outline"}
                                        color={key + 1 <= Math.round(shop.seller_data.shopFeedbacks/20) ? colors.primary : colors.grey}
                                        style={styles.sellersStars}
                                    />
                                })
                            }
                        </View>

                        <CustomButton
                            name='ADD FEEDBACK'
                            color={shop.customer_can_add_review === 0 ? colors.grey : colors.primary}
                            style={styles.reviewButton}
                            disabled={shop.customer_can_add_review === 0}
                            fontSize={12}
                            press={() => navigation.navigate('AddFeedback')}
                        />
                    </View>
                </View>
            </View>

            <Tabs initialPage={0}
                  tabBarUnderlineStyle={styles.underlineStyle}
                  style={styles.sellersTabsWrapper}>
                <Tab heading={'OFFERS'}
                     activeTabStyle={styles.activeSellersTabStyle}
                     tabStyle={styles.tabSellersStyle}
                     textStyle={styles.tabSellersTextStyle}
                     activeTextStyle={styles.activeTabTextStyle}
                >
                    <Offers products={shop.seller_data.shopListings} handleProduct={handleProduct} />
                </Tab>

                <Tab heading={'FEEDBACK'}
                     activeTabStyle={styles.activeSellersTabStyle}
                     tabStyle={styles.tabSellersStyle}
                     textStyle={styles.tabSellersTextStyle}
                     activeTextStyle={styles.activeTabTextStyle}
                >
                    <Feedback review={shop.seller_received_review} />
                </Tab>
            </Tabs>
        </Container>
    )
};

function mapStateToProps(state) {
    return {
        shop: state.seller.data,
        user: state.login.user,
        product: state.product.data,
    }
}

function matchDispatchToProps(dispatch) {
    return {
        changeProduct: (id, navigation, navigator) => dispatch({type: HOME.CHANGE_PRODUCT, id, navigation, navigator})
    }
}

export default connect(mapStateToProps, matchDispatchToProps)(SellersScreen);