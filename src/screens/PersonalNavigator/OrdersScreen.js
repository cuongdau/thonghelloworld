import React, { Component } from 'react';
import {Image, Platform} from 'react-native';
import { Container, View, Text, Content, Card} from 'native-base';
import Header from './../../components/Header';
import {colors} from "../../config";
import { UppercaseTextButton } from '../../components/Button/Button';
import {getRoundingNumber} from "../../utilities";
import styles from "./style";
import {fetchOneOrder} from '../../api';
import StatusBar from "../../components/StatusBar";

class Orders extends Component {
    render() {
        const { navigation } = this.props;
        const { orders } = navigation.state.params;

        return(
            <Container>
                {Platform.OS === "ios" && <StatusBar />}

                <Header
                    leftIcon="arrow-back"
                    headTitle="Orders"
                    iconColor={colors.icon}
                    leftIconPress={() => navigation.goBack()}
                />
                <Content showsVerticalScrollIndicator={false}>
                    {orders ?
                        <View style={styles.ordersContent}>
                            {Object.values(orders).map(item =>
                                <Card key={item.increment_id} style={styles.orderCard}>
                                    <View style={styles.orderImageWrapper}>
                                        <Image style={styles.orderImage} source={{uri: item.product_image}}/>
                                    </View>
                                    <View style={styles.orderWrapper}>
                                        <View>
                                            <Text uppercase style={styles.orderBuyer}>BUYER: {item.buyer_name}</Text>
                                        </View>

                                        <Text style={styles.orderTitle}>Item: {item.product_name}</Text>
                                        <Text style={styles.orderNo}>Order No.: {item.increment_id}</Text>
                                        <Text style={styles.orderPrice}>
                                            Price: ${getRoundingNumber(Number(item.product_amount))} <Text
                                            style={styles.orderShippingPrice}>
                                            + ${getRoundingNumber(Number(item.shipping_amount))} shipping
                                        </Text>
                                        </Text>
                                        <UppercaseTextButton name="View DETAILS" style={styles.viewDetails}
                                                             press={() => fetchOneOrder(item, navigation)}/>
                                    </View>
                                </Card>
                            )}
                        </View> :

                        <Text style={{textAlign: 'center'}}>Orders not found!</Text>}
                </Content>
            </Container>
        )
    }
}

export default Orders;