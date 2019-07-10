import React, {Component} from 'react';
import { Image } from 'react-native';
import { Container, View, Text, Content, Header, Left, Body, Right } from 'native-base';
import { connect } from 'react-redux';
import FlatList from './../../components/FlatList';
import LoadIndicator from './../../components/LoadIndicator';
import Suitcase from "../../components/Suitcase";
import { TextButton } from './../../components/Button';
import { colors, brands, welcome } from "../../config";
import styles from './style';
import {getArrayValues, normalize360} from "../../utilities";
import {HOME} from "../../types";
import {Platform, TouchableOpacity} from "react-native";
import StatusBar from "../../components/StatusBar";
import Icon from "../../components/Icon";


class HomePageScreen extends Component {
    componentWillMount(): void {
        this.props.clearFilters();
    }


    render() {
        const { navigation, loading, products, categories, filterBrands, clearFilters } = this.props;

        return (
            <Container>
                {Platform.OS === "ios" && <StatusBar />}
                <Header style={{
                    backgroundColor: '#f7f7f7',
                    borderBottomColor: '#e6e6e6',
                    borderBottomWidth: normalize360(2)
                }}>
                    <Left/>
                    <Body>
                        <Image source={welcome}
                               style={{width: normalize360(211), height: normalize360(37)}} />
                    </Body>
                    <Right>
                        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('Search')}>
                            <Icon name="search" color={colors.icon} />
                        </TouchableOpacity>
                    </Right>
                </Header>

                <Content style={{backgroundColor: '#fdfdfd'}} showsVerticalScrollIndicator={false}>
                    <View style={styles.homeCategories}>
                        <View style={styles.titleHome}>
                            <Text style={styles.title}>Categories</Text>
                            <TextButton
                                name="VIEW ALL"
                                style={styles.title2}
                                color={colors.grey}
                                press={() => {
                                    if(filterBrands.length > 0) {
                                        clearFilters()
                                    }
                                    navigation.navigate('Category')}
                                }
                            />
                        </View>
                        <View style={styles.homeListWrapper}>
                            <FlatList data={categories.slice(0, categories.length - 2)} type="home_head"
                                      navigation={navigation}/>
                        </View>
                    </View>

                    <View style={{flexDirection: 'column'}}>
                        <View style={styles.titleHome}>
                            <Text style={styles.title}>Brands</Text>
                            <TextButton
                                name="VIEW ALL"
                                style={styles.title2}
                                color={colors.grey}
                                press={() => navigation.navigate('Brand')}
                            />
                        </View>
                        {brands &&
                        <View style={[styles.homeListWrapper]}>
                            <FlatList data={brands} type="brands" navigation={navigation}/>
                        </View>}
                    </View>

                    <View>
                        <View style={[styles.titleHome, {marginTop: normalize360(2)}]}>
                            <Text style={styles.title}>Recent Listings</Text>
                            <TextButton
                                name="VIEW ALL"
                                style={styles.title2}
                                color={colors.grey}
                                press={() => navigation.navigate('RecentListing')}
                            />
                        </View>
                        {products &&
                        <View style={styles.homeListWrapper}>
                            <FlatList style={{flex: 1}} data={getArrayValues(products).reverse()} type="home_body"
                                      navigation={navigation}/>
                        </View>}
                    </View>

                    <View style={{flexDirection: 'column'}}>
                        <View style={[styles.titleHome, {marginTop: normalize360(8)}]}>
                            <Text style={styles.title}>Price Drops & Staff Picks</Text>
                        </View>
                        <View style={styles.homeListWrapper}>
                            <FlatList data={categories.slice(-2)} type="home_foot" navigation={navigation}/>
                        </View>
                    </View>
                </Content>

                <Suitcase navigation={navigation}/>

                <LoadIndicator animating={loading}/>
            </Container>
        )
    }
}

function mapStateToProps(state) {
    return {
        products: state.products.data,
        loading: state.products.loading || state.categories.loading || state.product.loading ||
            state.allBrands.loading || state.categoriesByBrand.loading,
        categories: state.categories.data,
        changingBrands: state.brands,
        filterBrands: state.filters.brands
    }
}

function matchDispatchToProps(dispatch) {
    return {
        clearFilters: () => dispatch({type: HOME.CLEAR_FILTERS})
    }
}

export default connect(mapStateToProps, matchDispatchToProps)(HomePageScreen);