import React, {Component} from 'react';
import {Image, Platform, ScrollView} from 'react-native';
import {Container, View, Text, Tabs, Tab, ListItem, Card, Row} from 'native-base';
import styles from './style';
import {colors} from "../../config";
import Header from "../../components/Header";
import {UppercaseTextButton} from "../../components/Button/Button";
import tabsStyles from "../../styles/TabsStyles";
import OfferStatus from './innerComponents/OfferStatus';
import {getRoundingNumber, normalize360} from "../../utilities";
import {fetchConfirmOffer} from "../../api";
import StatusBar from "../../components/StatusBar";

const BuyingOfferItem = ({item, navigation}) => (
    <Card style={styles.orderCard}>
        <Image style={styles.orderImage} source={{uri: item.image}}/>
        <View style={styles.orderWrapper}>
            <Text style={styles.orderTitle}>{item.name}</Text>
            <Text style={styles.textSmall}>Price: ${getRoundingNumber(Number(item.price))} <Text style={styles.textSmaller}>
                + ${getRoundingNumber(Number(item.national_shipping_price))} shipping</Text>
            </Text>
            <Text style={styles.textSmall}>My offer: ${getRoundingNumber(Number(item.offer_price))}
                <Text style={styles.textSmaller}> + ${getRoundingNumber(Number(item.national_shipping_price))} shipping</Text>
            </Text>
            <Row style={styles.buyingOfferBottom}>
                <UppercaseTextButton style={styles.viewDetails} name="HISTORY" navigation={navigation}
                                     press={() => navigation.navigate('OfferHistory', { item })}
                />
                <OfferStatus value={item.offer_status} />
            </Row>
        </View>
    </Card>
);




class SellingOfferItem extends Component {
    state = {
        pressed: false,
        status: this.props.item.offer_status
    };

    offerConfirm = status => {
        const {item, user} = this.props;
        const data = {
            "seller_id": user,
            "offer_status": status,
            "offer_id": item.offer_id
        };

        this.setState({pressed: true, status});

        return fetchConfirmOffer(data);
    };

    render() {
        const {item} = this.props;
        const {pressed, status} = this.state;

        return (
            <Card key={item.offer_id} style={styles.orderCard}>
                <Image style={styles.orderImage} source={{uri: item.image}}/>
                <View style={styles.orderWrapper}>
                    <Text style={styles.orderTitle}>{item.name}</Text>
                    <Text style={styles.textSmall}>Price: ${getRoundingNumber(Number(item.price))} <Text style={styles.textSmaller}>
                        + ${getRoundingNumber(Number(item.national_shipping_price))} shipping</Text>
                    </Text>
                    <Text style={styles.textSmall}>
                        Offer from buyer: ${getRoundingNumber(Number(item.offer_price))} <Text style={styles.textSmaller}>
                        + ${getRoundingNumber(Number(item.national_shipping_price))} shipping</Text>
                    </Text>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>

                        <Row style={[styles.sellingOfferBottom,
                            {justifyContent: item.offer_status === '0' && !pressed ? 'space-between' : 'flex-end'}]}>
                            {item.offer_status === '0' && !pressed &&
                            <UppercaseTextButton style={styles.sellingBottomButton} name="Accept"
                                                 press={() => this.offerConfirm('1')}/>}
                            {item.offer_status === '0' && !pressed &&
                            <UppercaseTextButton style={styles.sellingBottomButton} name="Decline"
                                                 press={() => this.offerConfirm('2')}/>}

                            <OfferStatus value={status}/>
                        </Row>

                    </View>
                </View>
            </Card>
        )
    }
}

class OffersScreen extends Component {
    render () {
        const { offers, user } = this.props.navigation.state.params;

        return (
            <Container>
                {Platform.OS === "ios" && <StatusBar />}

                <Header
                    containerStyle={{elevation: 0, borderBottomColor: 'transparent'}}
                    leftIcon="arrow-back"
                    headTitle="Offers"
                    iconColor={colors.icon}
                    leftIconPress={() => this.props.navigation.goBack()}
                />

                <Tabs tabBarUnderlineStyle={styles.underlineStyle}>
                    <Tab heading='BUYING' tabStyle={tabsStyles.tabSellersStyle}
                         activeTabStyle={tabsStyles.activeSellersTabStyle}
                         textStyle={styles.tabTextStyle}
                         activeTextStyle={styles.activeMyShopTabTextStyle}>
                        {
                            offers.customers.length > 0 ?
                                <ScrollView contentContainerStyle={styles.ordersContent}
                                            showsVerticalScrollIndicator={false}>
                                    {offers.customers.map((item) => {
                                        return (
                                            <View key={item.offer_id} noBorder={true}
                                                      style={{marginBottom: normalize360(10)}}>
                                                <BuyingOfferItem item={item} navigation={this.props.navigation}/>
                                            </View>

                                        )
                                    })}
                                </ScrollView> :
                                <Text style={styles.noOffers}>
                                    No offers. To send an offer, {'\n'}
                                    go to the product page of your {'\n'}
                                    interest and click {'\n'}
                                    Make Offer.
                                </Text>
                        }
                    </Tab>

                    <Tab heading='SELLING' tabStyle={tabsStyles.tabSellersStyle}
                         activeTabStyle={tabsStyles.activeSellersTabStyle}
                         textStyle={styles.tabTextStyle}
                         activeTextStyle={styles.activeMyShopTabTextStyle}>
                        {
                            offers.sellers.length > 0 ?
                                <ScrollView contentContainerStyle={styles.ordersContent}
                                            showsVerticalScrollIndicator={false}>
                                    {offers.sellers.map((item) => {
                                        return (
                                            <View key={item.offer_id} noBorder={true}
                                                      style={{marginBottom: normalize360(10)}}>
                                                <SellingOfferItem item={item} user={user}/>
                                            </View>
                                        )
                                    })}
                                </ScrollView> :
                                <Text style={styles.noOffers}>
                                    No offers. If your store has not {'\n'}
                                    yet been created, you can do this {'\n'}
                                    by clicking on the link.
                                </Text>
                        }
                    </Tab>
                </Tabs>
            </Container>
        )
    }
}

export default OffersScreen;