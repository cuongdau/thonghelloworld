import React, { Component } from 'react';
import {TouchableOpacity, FlatList as RNFlatList, Keyboard, ScrollView, Platform} from 'react-native';
import {Container, Header, Content, Left, Item, Input, Text, View, Row} from 'native-base';
import Icon from './../../components/Icon';
import { TextButton } from './../../components/Button';
import { FLItemSearch } from './../../components/FlatListItem';
import LoadIndicator from './../../components/LoadIndicator';
import { connect } from 'react-redux';
import { colors } from "../../config";
import { HOME } from "../../types";
import styles from './style';
import { fetchSearchProducts } from "../../api";
import StatusBar from "../../components/StatusBar";


class Search extends Component {
    state = {
        searchText: "",
        message: "Enter your text for searching",
        listItem: [],
        isLoading: false
    };

    handleFetch = async () => {
        await this.setState({ isLoading: true });
        let items = await fetchSearchProducts(this.state.searchText);
        if (items.messages) {
            this.setState({ message: items.messages.error[0].message, isLoading: false })
        } else {
            const listItem = [];
            for (const elem in items.products) {
                listItem.push(items.products[elem])
            }
            this.setState({ listItem, isLoading: false }, () => console.log(listItem))
        }
    };

    handleSearch = async () => {
        Keyboard.dismiss();
        let { searchText } = this.state;
        this.setState({ message: "", listItem: [] }, () => {
            searchText.length < 3 ?
                this.setState({ message: "Please enter at least 3 characters for correct search" })
                : this.handleFetch()
        })
    };

    handleProduct = product => {
        this.props.changeProduct(product, this.props.navigation);
    };

    leftIconPress = () => {
        const {navigation} = this.props;
        const navigator = navigation.getParam('navigator');
        if (navigator)
            navigation.navigate(navigator);
        else
            navigation.goBack()
    };

    render() {
        const { searchText, message, isLoading, listItem } = this.state;

        return (
            <Container>
                {Platform.OS === "ios" && <StatusBar />}
                <Header searchBar rounded style={styles.header}>
                    <Left style={{ flex: 1 }}>
                        <TouchableOpacity style={styles.iconButton} onPress={this.leftIconPress}>
                            <Icon
                                name="arrow-back"
                                color={colors.icon}
                                press={this.leftIconPress} />
                        </TouchableOpacity>
                    </Left>

                    <Item style={{ flex: 7 }}>
                        <Input
                            placeholder="Search"
                            value={searchText}
                            style={styles.searchInput}
                            onBlur={this.handleSearch}
                            onChangeText={text => this.setState({ searchText: text })} />

                        <TextButton
                            name="CLEAR"
                            style={styles.searchButton}
                            press={() => this.setState({ searchText: '', listItem: [],
                                message: "Enter your text for searching" })} />
                    </Item>
                </Header>

                {isLoading ? <LoadIndicator /> :
                    <Content showsVerticalScrollIndicator={false}>
                        <Row style={styles.wrapper_product_body}>
                            <View style={styles.scroll_product_body}>
                                {message ?
                                    <View>
                                        <Text>{message}</Text>
                                    </View>
                                    :
                                    <RNFlatList
                                        numColumns={2}
                                        keyExtractor={(item) => item.product_id}
                                        data={listItem}
                                        renderItem={(item) => {
                                            return <View style={styles.item_wrapper} key={item.item.product_id}>
                                                <FLItemSearch item={item.item}
                                                    press={() => this.handleProduct(item.item.product_id)} />
                                            </View>
                                        }}
                                    />
                                }
                            </View>
                        </Row>
                    </Content>
                }
            </Container>
        )
    }
}

function mapStateToProps(state) {
    return {
        search: state.search,
        category: state.category,
    }
}

function matchDispatchToProps(dispatch) {
    return {
        onSearch: value => dispatch({ type: HOME.SET_SEARCH_VALUE, value }),
        clearSearch: () => dispatch({ type: HOME.CLEAR_SEARCH_VALUE }),
        changeProduct: (id, navigation, navigator) => dispatch({ type: HOME.CHANGE_PRODUCT, id, navigation, navigator })
    }
}

export default connect(mapStateToProps, matchDispatchToProps)(Search)