import React, {Component} from 'react';
import {Container, View, Text} from 'native-base';
import {Image, Platform} from 'react-native';
import Header from "../../components/Header";
import {colors, offerStatus} from "../../config";
import {normalize360, getRoundingNumber} from "../../utilities";
import OfferStatus from "./innerComponents/OfferStatus";
import StatusBar from "../../components/StatusBar";

const styles={
    info: {
        flexDirection: 'row',
        backgroundColor: '#f7f7f7',
        padding: normalize360(16),
        paddingTop: 0,
    },
    image: {
        width: normalize360(80),
        height: normalize360(80),
        borderRadius: normalize360(4)
    },
    infoText: {
        marginRight: normalize360(72),
        marginLeft: normalize360(17),
    },
    title: {
        fontSize: normalize360(14),
        color: colors.icon,
    },
    offerMessages: {
        paddingTop: normalize360(16),
        paddingBottom: normalize360(16),
        paddingRight: normalize360(16),
        marginLeft: normalize360(16),
        borderBottomColor: "#e3e3e3",
        borderBottomWidth: 1
    },
    date: {
        fontSize: normalize360(12)
    },
    offer: {
        marginTop: normalize360(11),
        marginBottom: normalize360(3)
    }
};

class OfferHistoryScreen extends Component {

    render () {
        const {navigation} = this.props;
        const { item } = navigation.state.params;

        return (
            <Container>
                {Platform.OS === "ios" && <StatusBar />}

                <Header
                    containerStyle={{elevation: 0, borderBottomColor: 'transparent'}}
                    leftIcon="arrow-back"
                    headTitle={item.store_title}
                    iconColor={colors.icon}
                    leftIconPress={() => navigation.goBack()}
                />
                <View style={styles.info}>
                    <Image source={{uri: item.image}} style={styles.image} />
                    <View style={styles.infoText}>
                        <Text style={styles.title}>{item.name}</Text>
                        <Text style={styles.title}>
                            ${getRoundingNumber(Number(item.price))} + $
                            {getRoundingNumber(Number(item.national_shipping_price))} shipping
                        </Text>
                    </View>
                </View>
                <View style={styles.offerMessages}>
                    <Text style={[styles.date, {alignSelf: 'flex-end'}]}>{item.created_at.split(' ')[0]}</Text>
                    <Text>
                        ${getRoundingNumber(Number(item.offer_price))} + $
                        {getRoundingNumber(Number(item.national_shipping_price))} shipping
                    </Text>
                    <Text>{item.offer_message}</Text>
                    <Text style={[styles.offer, {alignSelf: 'flex-end'}]}>
                        <OfferStatus value={item.offer_status} />
                    </Text>
                </View>
            </Container>
        )
    }
}

export default OfferHistoryScreen;