import React, { Component } from 'react';
import { Container, Row, Grid, View, Text, Drawer } from 'native-base';
import {FlatList as RNFlatList, Alert, Platform, ScrollView, TouchableOpacity} from 'react-native';
import Header from './../../components/Header';
import { FLItemProducts } from './../../components/FlatListItem';
import SideBar from './../SideBarNavigator/FilterMainScreen';
import LoadIndicator from "../../components/LoadIndicator";
import { colors } from "../../config";
import { connect } from 'react-redux';
import styles from "./style";
import {
    compose,
    getArrayValues,
    getKeyName,
    unique,
    number,
    excludeCategories,
    normalize360
} from "../../utilities";
import FlatList from "../../components/FlatList";
import { DEGREE, HOME } from "../../types";
import Suitcase from "../../components/Suitcase";
import StatusBar from "../../components/StatusBar";
import { DropdownList, DropdownButton } from "../../components/Dropdown";

const sortable = [
    { value: 'NEW' },
    { value: 'PRICE - Low to High' },
    { value: 'PRICE - High to Low' },
];

class ProductScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            opened: false
        }
    }

    componentWillMount() {
        const {category, subcategory} = this.props;
        if(this.props.products.length === 0) {
            if(this.props.degree) this.props.changeDegree(null);
            this.getCategoryProducts(subcategory ? subcategory : category);
        }
    }

    getCategoryProducts = category => this.props.getCategoryProductsLoading(category.category_id);

    getString = () => {
        const { products } = this.props;
        return products.length > 0 ? getKeyName(products[0][1], ['brand']) : null;
    };

    getName = string => {
        const { products } = this.props;
        if (products.length > 0) {
            const index = string.lastIndexOf('_');
            return string.slice(0, index - string.length);
        }
        return null;
    };

    getFilterCondition = arg => {
        if(this.props.filters.conditions.length > 0) {
            return arg.filter(item => this.props.filters.conditions.indexOf(item[1].product_condition) > -1);
        }
        return arg;
    };

    getFilterHand = name => {
        const {products, filters} = this.props;
        if(filters.hands.length > 0) {
            return [
                products.filter(item => filters.hands.indexOf(item[1][`${name}_hand`]) > -1),
                name
            ];
        }
        return [products, name];
    };

    getFilterGender = arg => {
        const {genders} = this.props.filters;
        if(genders.length > 0) {
            return [
                arg[0].filter(item => genders.indexOf(item[1][`${arg[1]}_gender`]) > -1),
                arg[1]
            ];
        }
        return arg;
    };

    getFilterFlex = arg => {
        const {flexes} = this.props.filters;
        if(flexes.length > 0) {
            return arg[0].filter(item => flexes.indexOf(item[1][`${arg[1]}_shaft_flex`]) > -1);
        }
        return arg[0];
    };

    getFilterBrand = arg => {
        const string = this.getString();
        const {brands} = this.props.filters;
        if(brands.length > 0) {
            return arg.filter(item => brands.indexOf(item[1][string]) > -1);
        }
        return arg;
    };

    getFilterLoft = arg => {
        if (this.props.products.length > 0) {
            const field = getKeyName(this.props.products[0][1], ['loft', 'length', 'size']);
            if (this.props.degree) {
                return arg.filter(item => item[1][field] === this.props.degree);
            }
        }

        return arg;
    };

    getFilterPrice = arg => {
        if(this.props.filters.max > 0) {
            return arg.filter(item => item[1].final_price_without_tax >= this.props.filters.min &&
                item[1].final_price_without_tax <= this.props.filters.max);
        }
        return arg;
    };

    getProductsSortable = arg => {
        switch (this.props.filters.selected) {
            case "NEW":
                return arg.sort((a, b) => {
                    if (b[1].created_at < a[1].created_at) {
                        return -1;
                    } else if (b[1].created_at > a[1].created_at) {
                        return 1;
                    } else
                        return 0;
                });
            case 'PRICE - Low to High':
                return arg.sort((a, b) => a[1].final_price_without_tax - b[1].final_price_without_tax);
            case 'PRICE - High to Low':
                return arg.sort((a, b) => b[1].final_price_without_tax - a[1].final_price_without_tax);
            default:
                return arg;
        }
    };

    getProducts = compose(
        this.getFilterHand,
        this.getFilterGender,
        this.getFilterFlex,
        this.getFilterBrand,
        this.getFilterCondition,
        this.getFilterLoft,
        this.getFilterPrice,
        this.getProductsSortable
    );

    handleDropPress = () => this.setState({opened: !this.state.opened});

    onValueChange = item => {
        const filters = {...this.props.filters, selected: item.value};
        this.handleDropPress();
        return this.props.setFilters(filters);
    };

    closeDrawer = () => {
        this.drawer._root.close();
    };

    openDrawer = () => {
        this.drawer._root.open();
    };

    handleChange = value => value !== this.props.degree ? this.props.changeDegree(value) :
        this.props.changeDegree(null);

    handleProduct = product => this.props.changeProduct(product, this.props.navigation);

    getLofts = () => {
        const { products } = this.props;
        if (products.length > 0) {
            const field = getKeyName(products[0][1], ['loft', 'length', 'size']);
            const values = products.map(item => item[1][field]);
            return unique(values).sort((a, b) => number(a) - number(b));
        }
        return [];
    };

    getIntervalPrice = () => {
        const products = this.props.products;
        if(products.length > 0) {
            products.sort((a, b) => a[1].final_price_without_tax - b[1].final_price_without_tax);
            const minPrice = products[0][1].final_price_without_tax;
            const maxPrice = products[products.length-1][1].final_price_without_tax;
            const prices = {
                minPrice,
                maxPrice
            };

            return prices;
        }
    };

    render() {
        const { navigation, category, loading, products, error, clearCategoryProducts,
            subcategory, filters } = this.props;

        const degreesData = this.getLofts();

        const string = this.getString();

        const name = this.getName(string);

        if (error) {
            Alert.alert(
                'Products Loading Alert',
                `${error.message}`,
                [
                    { text: 'OK', onPress: clearCategoryProducts },
                ],
                { cancelable: false }
            )
        }

        const navigator = navigation.getParam('navigator');

        const leftIconPress = () => {
            if(navigator)
                return navigation.navigate('Homepage');
            else
                return navigation.goBack();
        };

        return (
            <Drawer
                ref={(ref) => { this.drawer = ref; }}
                content={<SideBar name={name} string={string} selected={filters.selected}
                                  prices={this.getIntervalPrice()} close={this.closeDrawer} />}
                onClose={() => this.closeDrawer()} >
                <Container style={{position: 'relative'}}>
                    {Platform.OS === "ios" && <StatusBar />}

                    <ScrollView style={{backgroundColor: colors.white}} showsVerticalScrollIndicator={false}>
                        {this.state.opened &&
                        <DropdownList
                            values={sortable}
                            itemStyle={{flexDirection: 'row', padding: normalize360(5)}}
                            itemTextStyle={{fontSize: normalize360(14)}}
                            onChangeText={this.onValueChange}
                            onBackdropPress={this.handleDropPress}
                        />}

                        <Header
                            containerStyle={{ elevation: 0, borderBottomColor: '#f7f7f7' }}
                            leftIcon="arrow-back"
                            rightIcon="search"
                            headTitle={subcategory ? subcategory.name : category.name}
                            iconColor={colors.icon}
                            leftIconPress={leftIconPress}
                            rightIconPress={() => navigation.navigate('Search')}
                        />


                        <Grid>
                            <Row style={styles.dropdown.wrapper}>
                                <DropdownButton
                                    name={filters.selected}
                                    fontSize={normalize360(14)}
                                    textColor={colors.icon}
                                    buttonStyle={styles.dropdown.button}
                                    iconStyle={styles.dropdown.icon}
                                    onPress={this.handleDropPress}
                                />

                                <Text uppercase style={styles.text_filter} onPress={() => this.openDrawer()}>Filter</Text>
                            </Row>

                            <Row style={styles.wrapper_product_up}>
                                <Text style={styles.text_product_up}>{this.getProducts(name).length} items</Text>
                                {excludeCategories(subcategory ? subcategory.category_id : category.category_id)
                                && degreesData[0] && degreesData.length > 0 &&
                                    <FlatList data={degreesData} type="degrees" press={this.handleChange}
                                        style={styles.degreesWrapper} />}
                            </Row>

                            <Row style={styles.wrapper_product_body}>
                                {(products.length === 0 && !loading) &&
                                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                        <Text>There are no products in this category yet.</Text>
                                    </View>}
                                {products.length > 0 &&
                                    <View style={styles.scroll_product_body}>
                                        <RNFlatList
                                            numColumns={2}
                                            keyExtractor={(index) => index}
                                            data={this.getProducts(name)}
                                            showsVerticalScrollIndicator={false}
                                            renderItem={(item, index) => {
                                                return <View style={styles.item_wrapper} key={index}>
                                                    <FLItemProducts item={item.item[1]}
                                                        press={() => this.handleProduct(item.item[0])} />
                                                </View>
                                            }}
                                        />
                                    </View>}
                            </Row>
                        </Grid>
                    </ScrollView>

                    <Suitcase navigation={navigation} />

                    <LoadIndicator animating={loading} />
                </Container>
            </Drawer>
        )
    }
}

function matchDispatchToProps(dispatch) {
    return {
        changeDegree: value => dispatch({type: DEGREE.CHANGE_VALUE, value}),
        changeProduct: (id, navigation) => dispatch({type: HOME.CHANGE_PRODUCT, id, navigation}),
        getCategoryProductsLoading: id => dispatch({type: HOME.CATEGORY_PRODUCTS_LOADING, id}),
        clearCategoryProducts: () => dispatch({type: HOME.CATEGORY_PRODUCTS_CLEAR}),
        changeCategory: category => dispatch({type: HOME.CHANGE_CATEGORY, category}),
        setFilters: filters => dispatch({type: HOME.SET_FILTERS, filters})
    }
}

function mapStateToProps(state) {
    return {
        degree: state.degree,
        products: getArrayValues(state.categoryProducts.data),
        category: state.category,
        subcategory: state.subcategory,
        loading: state.categoryProducts.loading || state.product.loading,
        error: state.categoryProducts.error,
        filters: state.filters
    }
}

export default connect(mapStateToProps, matchDispatchToProps)(ProductScreen);