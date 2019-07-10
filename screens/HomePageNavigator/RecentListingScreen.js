import React, { Component } from 'react';
import {FlatList as RNFlatList, Platform} from 'react-native';
import {Container, Content, Text, View, Row} from 'native-base';
import { FLItemProducts } from './../../components/FlatListItem';
import LoadIndicator from './../../components/LoadIndicator';
import Header from './../../components/Header';
import { connect } from 'react-redux';
import { colors } from "../../config";
import { HOME } from "../../types";
import styles from './style';
import { fetchProductsForPeriod } from "../../api";
import StatusBar from "../../components/StatusBar";
import Suitcase from "../../components/Suitcase";


class RecentListingScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listItem: [],
            isLoading: false,
            message: 'Sorry, there are no recently added listings!'
        };
    }

    async componentDidMount() {
        await this.setState({ isLoading: true });
        let items = await fetchProductsForPeriod();
        if (items.messages) {
            this.setState({ message: items.messages.error[0].message, isLoading: false })
        } else {
            this.setState({ listItem: Object.values(items).reverse(), isLoading: false })
        }
    }

    handleProduct = product => {
        this.props.changeProduct(product, this.props.navigation);
    };

    leftIconPress = () => this.props.navigation.goBack();

    render() {
        const { message, isLoading, listItem } = this.state;
        const {navigation} = this.props;

        return (
            <Container>
                {Platform.OS === "ios" && <StatusBar />}
                <Header
                    leftIcon="arrow-back"
                    rightIcon="search"
                    headTitle="Recent Listings"
                    iconColor={colors.icon}
                    leftIconPress={() => navigation.goBack()}
                    rightIconPress={() => navigation.navigate('Search')}
                />

                {isLoading ? <LoadIndicator /> :
                    <Content showsVerticalScrollIndicator={false}>
                        <Row style={styles.wrapper_product_body}>
                            <View style={styles.scroll_product_body}>
                                {message && listItem.length < 1 ?
                                    <View>
                                        <Text>{message}</Text>
                                    </View>
                                    :
                                    <RNFlatList
                                        numColumns={2}
                                        keyExtractor={(item) => item.entity_id}
                                        data={listItem}
                                        renderItem={(item) => {
                                            return <View style={styles.item_wrapper} key={item.item.entity_id}>
                                                <FLItemProducts item={item.item}
                                                              press={() => this.handleProduct(item.item.entity_id)} />
                                            </View>
                                        }}
                                    />
                                }
                            </View>
                        </Row>
                    </Content>
                }

                <Suitcase navigation={navigation} />
            </Container>
        )
    }
}

function matchDispatchToProps(dispatch) {
    return {
        changeProduct: (id, navigation, navigator) => dispatch({ type: HOME.CHANGE_PRODUCT, id, navigation, navigator })
    }
}

export default connect(null, matchDispatchToProps)(RecentListingScreen)