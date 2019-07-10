import React, { Component } from 'react';
import { Container, Text, Content, Card, Grid, Row, Col, View } from 'native-base';
import Header from './../../components/Header';
import Hr from './../../components/Hr';
import { colors } from "../../config";
import LoadIndicator from "../../components/LoadIndicator";
import styles from "./style";
import { connect } from "react-redux"
import { getRoundingNumber } from "../../utilities";
import CartItem from '../../components/CartItem';
import { fetchPurchase } from "../../api";
import {shopInfoLoading} from "../../actions";
import {Platform} from "react-native";
import StatusBar from "../../components/StatusBar";

class PurchaseDetails extends Component {
    state = {
        item: null,
        error: "",
        isLoading: true
    };

    componentDidMount = async () => {
        let item = await fetchPurchase(this.props.navigation.state.params.order_id);
        console.log(item);
        item.error !== undefined ?
            this.setState({ error: item[0].error[0].message, isLoading: false })
            : this.setState({ item: item, isLoading: false })

    };

    render() {
        const { navigation, shopInfoLoading, user } = this.props;
        const purchase = this.state.item;
        if (this.state.isLoading) return <LoadIndicator />;
        return (
            <Container>
                {Platform.OS === "ios" && <StatusBar />}

                <Header
                    leftIcon="arrow-back"
                    headTitle="Details"
                    iconColor={colors.icon}
                    leftIconPress={() => navigation.goBack()}
                />

                <Content showsVerticalScrollIndicator={false}>
                    {this.state.error ? <Text>{this.state.error}</Text>
                        : <View style={styles.ordersContent}>
                            <Card style={styles.orderInfoCard}>
                                <Text style={styles.purchaseDetailsTitle}>Your order</Text>
                                <Hr />
                                <Grid>
                                    <Row>
                                        <Col><Text style={styles.textSmall}>Order No.:</Text></Col>
                                        <Col><Text style={styles.textSmall}>{purchase.increment_id}</Text></Col>
                                    </Row>
                                    <Row>
                                        <Col><Text style={styles.textSmall}>Order date:</Text></Col>
                                        <Col><Text style={styles.textSmall}>{purchase.order_date}</Text></Col>
                                    </Row>
                                </Grid>
                            </Card>

                            {Object.values(purchase.products).map(item =>
                                <CartItem key={item.product_id}
                                          image={{ uri: item.product_image }}
                                          title={item.product_name}
                                          shop={item.seller.seller_name}
                                          price={getRoundingNumber(+item.product_price)}
                                          quantity={(+item.qty).toFixed(0) + " item(s)"}
                                          condition={item.product_condition}
                                          showTrashIcon={false}
                                          press={() => shopInfoLoading(item.seller.seller_id,
                                              user.entity_id, navigation, 'Sellers', 'Profile')}
                                />
                            )}

                            <Card style={styles.orderInfoCard}>
                                <Text style={styles.orderInfoTitle}>DELIVERY DETAILS</Text>
                                <Text style={styles.textSmall}>{`${this.props.user.firstname} ${this.props.user.lastname}`}</Text>
                                <Text style={styles.textSmall}>{this.props.user.email}</Text>
                                <Text style={styles.textSmall}>{purchase.delivery_address.region}</Text>
                                <Text style={styles.textSmall}>{purchase.delivery_address.city}</Text>
                                <Text style={styles.textSmall}>{purchase.delivery_address.street[0]}</Text>
                                <Hr />
                                <Text style={styles.orderInfoTitle}>PAYMENT METHOD</Text>
                                <Text style={styles.textSmall}>{purchase.payment_method}</Text>
                            </Card>

                            <Card style={styles.orderInfoCard}>
                                <Text style={styles.orderInfoTitle}>ORDER TOTAL</Text>
                                <Grid>
                                    <Row>
                                        <Col><Text style={styles.textSmall}>Sub-total</Text></Col>
                                        <Col>
                                            <Text style={styles.textSmall}>${getRoundingNumber(+purchase.product_amount)}</Text>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col><Text style={styles.textSmall}>Shipping</Text></Col>
                                        <Col><Text style={styles.textSmall}>${getRoundingNumber(+purchase.shipping_amount)}</Text></Col>
                                    </Row>
                                    <Row>
                                        <Col><Text style={styles.textSmall}>Tax</Text></Col>
                                        <Col><Text style={styles.textSmall}>${getRoundingNumber(+purchase.base_tax_amount)}</Text></Col>
                                    </Row>
                                    <Row>
                                        <Col><Text style={[styles.textSmall, styles.textMedium]}>TOTAL <Text style={styles.noteText}>(including TAX)</Text></Text></Col>
                                        <Col><Text style={styles.textSmall}>${getRoundingNumber(+purchase.grand_total)}</Text></Col>
                                    </Row>
                                </Grid>
                            </Card>
                        </View>}
                </Content>
            </Container>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.login.user
    }
}

export default connect(mapStateToProps, {shopInfoLoading})(PurchaseDetails);