import React from 'react';
import {Image, Platform, TouchableOpacity} from 'react-native';
import { Container, View, Text, Tabs, Tab, Body} from 'native-base';
import Icon from './../../components/Icon';
import Feedback from './../../components/Feedback';
import Offers from './../../components/Products';
import styles from './style';
import {colors} from "../../config";
import {connect} from 'react-redux';
import {HOME} from "../../types";
import StatusBar from "../../components/StatusBar";
import {normalize360} from "../../utilities";


const MyShopScreen = ({ navigation, shop, changeProduct }) => {
    const handleProduct = product => changeProduct(product, navigation);

    const leftIconPress = () => navigation.goBack();
    const rightIconPress = () => navigation.navigate('EditMyShop');

    if(!shop.seller_data.shopStateCity) rightIconPress();

    return(
        <Container style={{backgroundColor: '#f7f7f7'}}>
            {Platform.OS === "ios" && <StatusBar />}
            <View style={styles.myShopHeaderContainer}>
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                    <TouchableOpacity style={styles.iconButton} onPress={leftIconPress}>
                        <Icon name="arrow-back" color={colors.icon} />
                    </TouchableOpacity>
                    <Body style={{alignItems: 'flex-start', marginLeft: normalize360(10)}}>
                        <Text style={styles.sellerBody}>{shop.seller_data.shopName}</Text>
                    </Body>
                    <TouchableOpacity style={styles.iconButton} onPress={rightIconPress}>
                        <Icon name="create" color={colors.icon} />
                    </TouchableOpacity>
                </View>

                <View style={{flex: 2, flexDirection: 'row'}}>
                    <Image source={{uri: shop.seller_data.shopImage}}
                           style={styles.myShopHeaderImage} />

                    <View style={styles.myShopInfoWrapper}>
                        <Text style={styles.myShopInfoText}>
                            {shop.seller_data.shopStateCity}, {shop.seller_data.shopCountry}{'\n'}
                            {shop.seller_data.shopFeedbacks}% Positive Feedback
                        </Text>
                        <Text style={styles.myShopAboutPolicy}>
                            View Policies
                        </Text>
                    </View>
                </View>
            </View>

            <Tabs initialPage={0}
                  tabBarUnderlineStyle={styles.underlineStyle}
                  style={styles.myShopTabsWrapper}>
                <Tab heading={'LISTINGS'}
                     activeTabStyle={styles.activeMyShopTabStyle}
                     tabStyle={styles.tabMyShopStyle}
                     textStyle={styles.tabTextStyle}
                     activeTextStyle={styles.activeMyShopTabTextStyle}
                >
                    <Offers products={shop.seller_data.shopListings}  handleProduct={handleProduct} />
                </Tab>

                <Tab heading={'FEEDBACK'}
                     activeTabStyle={styles.activeMyShopTabStyle}
                     tabStyle={styles.tabMyShopStyle}
                     textStyle={styles.tabTextStyle}
                     activeTextStyle={styles.activeMyShopTabTextStyle}
                >
                    <Feedback review={shop.seller_received_review} />
                </Tab>
            </Tabs>
        </Container>
    )
};

function mapStateToProps(state) {
    return {
        shop: state.seller.data
    }
}

function matchDispatchToProps(dispatch) {
    return {
        changeProduct: (id, navigation) => dispatch({type: HOME.CHANGE_PRODUCT, id, navigation})
    }
}

export default connect(mapStateToProps, matchDispatchToProps)(MyShopScreen);