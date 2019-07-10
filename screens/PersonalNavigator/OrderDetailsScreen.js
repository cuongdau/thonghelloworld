import React from 'react';
import {Container, Text, Content, Card, Row, View, Grid, Col} from 'native-base';
import Header from './../../components/Header';
import Hr from './../../components/Hr';
import {colors} from "../../config";
import styles from "./style";
import {getRoundingNumber} from "../../utilities";
import {Platform} from "react-native";
import StatusBar from "../../components/StatusBar";

const OrderDetails = ({ navigation }) => {

    const {order} = navigation.state.params;

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
                <View style={styles.ordersContent}>
                    <Card style={styles.orderInfoCard}>
                        <Text style={styles.orderInfoTitle}>ORDER DETAILS</Text>
                        <Text style={styles.orderNo}>Order No.: {order.increment_id}</Text>
                        <Text style={[styles.orderDate, styles.orderDetailsDate]}>
                            Order Date: {order.order_date}
                        </Text>
                        {Object.values(order.products).map(item =>
                            <View key={item.product_id}>
                                <Text style={[styles.orderTitle, styles.orderDetailsTitle]}>{item.product_name}</Text>

                                <Text style={[styles.orderPrice, styles.orderDetailsPrice]}>
                                    Price: ${getRoundingNumber(Number(item.product_price))}</Text>
                            </View>
                        )}

                    </Card>

                    <Card style={styles.orderInfoCard}>
                        <Grid>
                            <Row>
                                <Col><Text style={styles.textSmall}>Name of Buyer:</Text></Col>
                                <Col><Text style={styles.textSmall}>{order.buyer.buyer_name}</Text></Col>
                            </Row>
                            <Row>
                                <Col><Text style={styles.textSmall}>Email:</Text></Col>
                                <Col><Text style={styles.textSmall}>{order.buyer.buyer_email}</Text></Col>
                            </Row>
                            <Row>
                                <Col><Text style={styles.textSmall}>Address:</Text></Col>
                                <Col>
                                    <Text style={styles.textSmall}>
                                        {order.buyer_delivery_address.street},{'\n'}
                                        {order.buyer_delivery_address.city},{'\n'}
                                        {order.buyer_delivery_address.region},{'\n'}
                                        {order.buyer_delivery_address.country_id}
                                    </Text>
                                </Col>
                            </Row>
                        </Grid>
                        <Hr />
                        <Text style={styles.orderInfoTitle}>PAYMENT METHOD</Text>
                        <Text style={styles.orderDetailsText}>{order.payment_method}</Text>
                    </Card>

                    <Card style={styles.orderInfoCard}>
                        <Text style={styles.orderInfoTitle}>PAYMENT TOTAL</Text>

                        <Row>
                            <Col><Text style={styles.textSmall}>Shipping & Handling:</Text></Col>
                            <Col>
                                <Text style={[styles.textSmall, {textAlign: 'right'}]}>
                                    {getRoundingNumber(Number(order.shipping_price))}
                                </Text>
                            </Col>
                        </Row>
                        <Row>
                            <Col><Text style={styles.textSmall}>Tax:</Text></Col>
                            <Col>
                                <Text style={[styles.textSmall, {textAlign: 'right'}]}>
                                    {getRoundingNumber(Number(order.tax_amount))}
                                </Text>
                            </Col>
                        </Row>
                        <Row>
                            <Col><Text style={styles.textSmall}>Sales Fee Total:</Text></Col>
                            <Col>
                                <Text style={[styles.textSmall, {textAlign: 'right'}]}>
                                    {getRoundingNumber(Number(order.sales_fee_total))}
                                </Text>
                            </Col>
                        </Row>
                        <Row>
                            <Col><Text style={styles.textSmall}>Total Seller Pmt:</Text></Col>
                            <Col>
                                <Text style={[styles.textSmall, {textAlign: 'right'}]}>
                                    {getRoundingNumber(Number(order.total_seller_pmt))}
                                </Text>
                            </Col>
                        </Row>
                        <Row>
                            <Col><Text style={styles.textTotal}>Order Total:</Text></Col>
                            <Col>
                                <Text style={[styles.textTotal, {textAlign: 'right'}]}>
                                    {getRoundingNumber(Number(order.order_total))}
                                </Text>
                            </Col>
                        </Row>


                    </Card>
                </View>
            </Content>
        </Container>
    )
};

export default OrderDetails;