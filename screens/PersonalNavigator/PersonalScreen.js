import React, { Component } from 'react';
import {Platform, ScrollView, TouchableOpacity} from 'react-native';
import {Card, CardItem, View, Text, List, Container} from 'native-base';
import Icon from './../../components/Icon';
import Hr from './../../components/Hr';
import Header from './../../components/Header';
import { connect } from 'react-redux';
import styles from "./style";
import {colors} from "../../config";
import { profilesData } from './profiles';
import {setSignInApiLogout, shopInfoLoading, customerInfoLoading, clearListing} from "../../actions";
import {fetchOrders, fetchOffers, fetchPayPal} from "../../api";
import {normalize360, resetNavigationPage} from "../../utilities";
import StatusBar from "../../components/StatusBar";


const Item = ({ name, navigation, navigator, user, shopInfoLoading, customerInfoLoading, style }) => {
    const handlePress = () => {
        switch (navigator) {
            case 'Orders':
                return fetchOrders(user, navigation, navigator);
            case 'MyShop':
            case 'Feedback':
                return shopInfoLoading(user.entity_id, user.entity_id, navigation, navigator); // shop id = user.entity_id
            case 'Offers':
                return fetchOffers(user.entity_id, navigation, navigator);
            case 'MyDetails':
                return customerInfoLoading(user.entity_id, navigation, navigator);
            case 'Web':
                return navigation.navigate(navigator, {page: 'marketplace-policies'});
            default:
                navigation.navigate(navigator);
        }
    };

    return(
        <TouchableOpacity onPress={() => handlePress()} style={[styles.profileItemWrapper, style]}>
            <Text style={styles.labelStyle}>{ name }</Text>
            <Icon name="arrow-dropright" color={colors.black} fontSize={45} />
        </TouchableOpacity>
    )
};


class PersonalScreen extends Component {
    state = {
        messages: false,
        offers: false,
        sales: false,
        paypal: null
    };

    async componentWillMount(): void {
        if(!this.props.user.entity_id)
            return this.props.navigation.navigate('Welcome', {navigator: 'Profile'});
        else {

            const paypal = await fetchPayPal(this.props.user);
            this.setState({paypal: paypal.result})
        }

        if(this.props.listing)
            this.props.clearListing();
    }

    handleLogout = () => {
        const {navigation} = this.props;
        this.props.setSignInApiLogout();
        return resetNavigationPage(navigation);
    };

    render() {
        const { navigation, user, shopInfoLoading, customerInfoLoading } = this.props;

        return(
            <Container>
                {Platform.OS === "ios" && <StatusBar />}

                <Header
                    headTitle="Profile"
                    containerStyle={{backgroundColor: '#f7f7f7', borderBottomColor: 'transparent'}}
                />

                <View style={styles.subtitleContainer}>
                    <Text style={styles.subtitle}>
                        { user.firstname } { user.lastname }</Text>
                    <View style={styles.payPalWrapper}>
                        <View style={styles.payPalIconWrapper}>
                            <Icon name="close" color={colors.icon} fontSize={30}/>
                        </View>
                        <Text style={styles.payPalText}>
                            {this.state.paypal === "Success" ? "PAYPAL CONFIRMED" : "PAYPAL NOT CONFIRMED"}
                        </Text>
                    </View>
                </View>

                <ScrollView showsVerticalScrollIndicator={false}>
                    <TouchableOpacity activeOpacity={1} onPress={() => this.setState({isVisible: false})}>
                        {profilesData.map((profile, key) => {
                            return (
                                <Card key={key} style={styles.topCardContainer}>
                                    <CardItem style={{flexDirection: 'column', alignItems: 'flex-start',
                                        backgroundColor: '#f7f7f7'}}>
                                        {profile.title &&
                                        <Text style={styles.title}>{ profile.title }</Text>}

                                        <List style={{width: '100%'}}>
                                            {
                                                profile.items.map((item, index) =>
                                                    <View key={index}>
                                                        <Item name={item.name} navigation={navigation}
                                                              navigator={item.navigator} user={user}
                                                              shopInfoLoading={shopInfoLoading}
                                                              customerInfoLoading={customerInfoLoading}
                                                              style={{paddingVertical: normalize360(4)}}
                                                        />
                                                        {(index !== profile.items.length - 1) &&
                                                        <Hr/>}
                                                    </View>
                                                )
                                            }
                                        </List>
                                    </CardItem>
                                </Card>
                            )
                        })}
                    </TouchableOpacity>

                    {/*<Card style={styles.topCardContainer}>*/}
                        {/*<CardItem style={{flexDirection: 'column', alignItems: 'flex-start'}}>*/}
                            {/*<Text style={styles.title}>NOTIFICATIONS</Text>*/}

                            {/*{*/}
                                {/*switches.map((item, key) =>*/}
                                    {/*<Switch key={key} value={this.state[item.state]}*/}
                                            {/*labelStyle={styles.labelStyle}*/}
                                            {/*label={item.label}*/}
                                            {/*toggleSwitch={() => this.toggleSwitch(item.state)}*/}
                                    {/*/>*/}
                                {/*)*/}
                            {/*}*/}
                        {/*</CardItem>*/}
                    {/*</Card>*/}

                    <Card style={styles.topCardContainer}>
                        <CardItem style={{flexDirection: 'column', alignItems: 'flex-start', backgroundColor: '#f7f7f7'}}>
                            <List style={{width: '100%'}}>
                                <Item name="Change password" navigation={navigation}
                                      style={{paddingVertical: normalize360(4)}}
                                      navigator="Password" user={user}
                                />
                            </List>
                        </CardItem>
                    </Card>

                    <Card style={styles.topCardContainer}>
                        <CardItem style={{flexDirection: 'column', alignItems: 'flex-start', backgroundColor: '#f7f7f7'}}>
                            <TouchableOpacity onPress={() => this.handleLogout()}
                                              style={{paddingVertical: normalize360(4), width: '100%'}}>
                                <Text style={{marginLeft: normalize360(8)}}>Logout</Text>
                            </TouchableOpacity>
                        </CardItem>
                    </Card>
                </ScrollView>
            </Container>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.login.user,
        listing: state.listing
    }
}

export default connect(mapStateToProps, {
    setSignInApiLogout,
    shopInfoLoading,
    customerInfoLoading,
    clearListing
})(PersonalScreen);