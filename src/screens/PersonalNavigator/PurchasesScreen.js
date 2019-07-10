import React, { Component } from 'react';
import {ScrollView, Image, Linking, TouchableOpacity, Platform} from 'react-native';
import { Container, View, Text, Content, Card, Row } from 'native-base';
import Header from './../../components/Header';
import { colors } from "../../config";
import { UppercaseTextButton } from '../../components/Button/Button';
import LoadIndicator from "../../components/LoadIndicator";
import styles from "./style";
import { fetchPurchases } from "../../api";
import { connect } from "react-redux"
import StatusBar from "../../components/StatusBar";

class Purchases extends Component {
    state = {
        listItem: null,
        error: "",
        isLoading: true
    };

    componentDidMount = async () => {
        let items = await fetchPurchases(this.props.user.entity_id);
        items[0].error !== undefined ?
            this.setState({ error: items[0].error[0].message, isLoading: false })
            : this.setState({ listItem: items, isLoading: false })
    };

    render() {
        const { navigation } = this.props;
        // todo: rewrite link
        if (this.state.isLoading) return <LoadIndicator />;
        return (
            <Container>
                {Platform.OS === "ios" && <StatusBar />}

                <Header
                    leftIcon="arrow-back"
                    headTitle="Purchases"
                    iconColor={colors.icon}
                    leftIconPress={() => navigation.goBack()}
                />

                <Content style={styles.ordersContent}>
                    {this.state.error ? <Text>{this.state.error}</Text>
                        :
                        <ScrollView showsVerticalScrollIndicator={false}>
                            {this.state.listItem.map((item) => {
                                return (
                                    <Card key={item.increment_id} style={styles.orderCard}>
                                        <TouchableOpacity style={styles.orderImageWrapper} onPress={() => {
                                            navigation.navigate('PurchaseDetails', { order_id: item.order_id }) }}>
                                            <Image style={styles.orderImage} source={{ uri: item.products.product_image }} />
                                        </TouchableOpacity>
                                        <View style={styles.orderWrapper}>
                                            <Text style={styles.orderStatus}>{item.status.toUpperCase()}</Text>
                                            <TouchableOpacity onPress={() => { navigation.navigate('PurchaseDetails',
                                                { order_id: item.order_id }) }}>
                                                <Text style={styles.orderTitle}>{item.products.product_name}</Text>
                                            </TouchableOpacity>
                                            <Text style={styles.orderNo}>Order No.: {item.increment_id}</Text>
                                            <Text style={styles.orderDate}>
                                                {'Order Date: ' + item.order_date}
                                            </Text>
                                            <Row>
                                                <UppercaseTextButton style={styles.viewDetails} name="View DETAILS"
                                                                     press={() => navigation.navigate('PurchaseDetails',
                                                                         { order_id: item.order_id })} />
                                            </Row>

                                        </View>
                                    </Card>
                                )
                            })}
                        </ScrollView>
                    }
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

export default connect(mapStateToProps)(Purchases);