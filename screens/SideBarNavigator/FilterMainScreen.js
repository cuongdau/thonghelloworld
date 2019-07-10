import React, {Component} from 'react';
import {Platform, ScrollView, TextInput, TouchableOpacity} from 'react-native';
import {Body, Container, Left, Right, Text, Title, View, Header} from 'native-base';
import {CustomButton, TextButton} from "../../components/Button";
import {colors, condition, flexes, genders, hands} from "../../config";
import styles from './style';
import {normalize, getArrayValues, unique, excludeCategories, normalize360} from "../../utilities";
import {connect} from 'react-redux';
import CheckBox from "../../components/CheckBox";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import {HOME} from "../../types";
import Icon from "../../components/Icon";
import StatusBar from "../../components/StatusBar";


class SideBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            conditions: false,
            brand: false,
            hand: false,
            gender: false,
            flex: false,
            price: false,
            minFocus: false,
            maxFocus: false,
            filters: this.props.filters,
            reload: false
        };
    }

    componentWillUpdate(prevProps): void {
        const {prices, selected} = this.props;
        if(prices && prices.maxPrice !== prevProps.filters.max && !this.state.reload) {
            this.setState({
                filters: {
                    ...this.state.filters,
                    selected,
                    min: prices.minPrice,
                    max: prices.maxPrice
                },
                reload: true
            });
        }
    }

    accordion(name) {
        if (this.state[name]) {
            this.setState({
                [name]: false
            })
        } else {
            this.setState({
                conditions: false,
                brand: false,
                hand: false,
                gender: false,
                flex: false,
                price: false
            });

            this.setState({
                [name]: true
            })
        }
    }

    getBrands = (products, name) => {
        const values = products.map(item => item[1][name]);
        return unique(values).sort((a, b) => a > b ? 1 : -1);
    };

    addFilter = (name, value) => this.setState({
        filters: {
            ...this.state.filters,
            [name]: [...this.state.filters[name], value]
        }
    });

    deleteFilter = (name, value) => this.setState({
        filters: {
            ...this.state.filters,
            [name]: [...this.state.filters[name].filter(item => item !== value)]
        }
    });

    getValue = (value, key) => this.props.products.filter(item => item[1][key] === value).length;

    getItemInArray = (name, item) => this.state.filters[name].indexOf(item) > -1;

    handleFilter = (name, item) => {
        if(this.getItemInArray(name, item)) {
            return this.deleteFilter(name, item);
        }
        this.addFilter(name, item);
    };

    handleFocusMinPrice = () => {
        const {min, max} = this.state.filters;
        const {minPrice} = this.props.prices;
        this.setState({
            minFocus: !this.state.minFocus,
            filters: {
                ...this.state.filters,
                min: min < minPrice ? minPrice : Number(min) > Number(max) ? max : min
            }
        })
    };

    handleFocusMaxPrice = () => {
        const {min, max} = this.state.filters;
        const {maxPrice} = this.props.prices;
        this.setState({
            maxFocus: !this.state.maxFocus,
            filters: {
                ...this.state.filters,
                max: max > maxPrice ? maxPrice : Number(max) <= Number(min) ? min : max
            }
        })
    };

    handleChangePrice = key => price => {
        if (Number(price) <= this.props.prices.maxPrice) {
            this.setState({
                filters: {
                    ...this.state.filters,
                    [key]: price
                }
            });
        }
    };

    handleValuesChange = values => this.setState({
        filters: {
            ...this.state.filters,
            min: values[0],
            max: values[1]
        }
    });

    isFilters = () => {
        const {conditions, brands, hands, genders, flexes, min, max} = this.state.filters;
        const {prices} = this.props;
        if (prices && min > 0) {
            return conditions.length > 0 ||
                brands.length > 0 ||
                hands.length > 0 ||
                genders.length > 0 ||
                flexes.length > 0 ||
                min > prices.minPrice ||
                max < prices.maxPrice;
        }
        return false;
    };

    clearFilters = () => {
        const {prices, setFilters, selected} = this.props;
        this.setState({
                filters: {
                    ...this.state.filters,
                    conditions: [],
                    brands: [],
                    hands: [],
                    genders: [],
                    flexes: [],
                    min: prices.minPrice,
                    max: prices.maxPrice,
                    selected
                }
            }, () =>
                setTimeout(() => {
                    setFilters(this.state.filters)
                }, 500)
        );
    };

    handleSubmit = () => {
        const {selected} = this.props;
        this.props.close();
        setTimeout(() => {
            this.props.setFilters({...this.state.filters, selected});
        }, 500);
    };

    render() {
        const {conditions, brand, hand, gender, flex, price, minFocus, maxFocus} = this.state;
        const {min, max} = this.state.filters;
        const {products, name, string, category, prices} = this.props;
        const filters = {
            hand: name + '_hand',
            gender: name + '_gender',
            flex: name + '_shaft_flex',
            brand: string
        };

        const minOpacity = minFocus || min !== 0 ? 0.5 : 0;
        const maxOpacity = maxFocus || max !== 0 ? 0.5 : 0;

        return (
            <Container style={{backgroundColor: colors.white}}>
                {Platform.OS === "ios" && <StatusBar />}
                <Header style={{backgroundColor: '#f7f7f7'}}>
                    <Left>
                        <TouchableOpacity style={styles.iconButton} onPress={this.props.close}>
                            <Icon name="close" color={colors.icon}/>
                        </TouchableOpacity>
                    </Left>
                    <Body style={Platform.select({
                        ios: {
                            alignItems: 'flex-start', marginLeft: normalize360(-100)
                        }
                    })}>
                        <Title style={{color: colors.icon}}>Filter</Title>
                    </Body>

                    <Right>
                        {(this.isFilters() || this.state.filters.brands.length > 0) &&
                        <TextButton name="Clear all" color={colors.icon} press={this.clearFilters}/>}
                    </Right>
                </Header>

                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.wrapper}>
                        <View style={styles.listItem}>
                            <TouchableOpacity style={styles.titleWrapper}
                                onPress={() => this.accordion('conditions')}>
                                <Text>Item Condition</Text>
                            </TouchableOpacity>
                            <View style={{
                                opacity: conditions ? 1 : 0,
                                height: conditions ? normalize(290) : 0,
                                paddingTop: normalize(20),
                                width: '90%'}}>
                                <View style={styles.conditionWrapper}>
                                    {
                                        condition.map((item, index) =>
                                            <View key={index}
                                                  style={styles.conditionItem}>
                                                <Text style={styles.conditionText}>
                                                    { item } ({ this.getValue(item, 'product_condition') })
                                                </Text>

                                                <CheckBox
                                                    checked={this.getItemInArray('conditions', item)}
                                                    press={() => this.handleFilter('conditions', item)}
                                                />
                                            </View>
                                        )
                                    }
                                </View>
                            </View>
                        </View>

                        {excludeCategories(category.category_id) && name && products[0][1][filters.brand] ?
                        <View style={styles.listItem}>
                            <TouchableOpacity style={styles.titleWrapper}
                                              onPress={() => this.accordion('brand')}>
                                <Text>Brand</Text>
                            </TouchableOpacity>
                            <View style={{
                                opacity: brand ? 1 : 0,
                                height: brand ?  normalize(this.getBrands(products, filters.brand).length * 70) : 0,
                                paddingTop: 10,
                                width: '90%'}}>
                                <View style={styles.conditionWrapper}>
                                    {
                                        this.getBrands(products, filters.brand).map((item, index) =>
                                            <View key={index}
                                                  style={styles.conditionItem}>
                                                <Text style={styles.conditionText}>
                                                    { item } ({ this.getValue(item, filters.brand) })
                                                </Text>

                                                <CheckBox
                                                    checked={this.getItemInArray('brands', item)}
                                                    press={() => this.handleFilter('brands', item)}
                                                />
                                            </View>
                                        )
                                    }
                                </View>
                            </View>
                        </View> : null}

                        {name && products[0][1][filters.hand] ?
                        <View style={styles.listItem}>
                            <TouchableOpacity style={styles.titleWrapper}
                                              onPress={() => this.accordion('hand')}>
                                <Text>Hand</Text>
                            </TouchableOpacity>
                            <View style={{
                                opacity: hand ? 1 : 0,
                                height: hand ? normalize(140) : 0,
                                paddingTop: normalize(20),
                                width: '90%'}}>
                                <View style={styles.conditionWrapper}>
                                    {
                                        hands.map((item, index) =>
                                            <View key={index}
                                                  style={styles.conditionItem}>
                                                <Text style={styles.conditionText}>
                                                    { item } ({ this.getValue(item, filters.hand) })
                                                </Text>

                                                <CheckBox
                                                    checked={this.getItemInArray('hands', item)}
                                                    press={() => this.handleFilter('hands', item)}
                                                />
                                            </View>
                                        )
                                    }
                                </View>
                            </View>
                        </View> : null}

                        {name && products[0][1][filters.gender] ?
                        <View style={styles.listItem}>
                            <TouchableOpacity style={styles.titleWrapper}
                                              onPress={() => this.accordion('gender')}>
                                <Text>Gender</Text>
                            </TouchableOpacity>
                            <View style={{
                                opacity: gender ? 1 : 0,
                                height: gender ? normalize(210) : 0,
                                paddingTop: normalize(20),
                                width: '90%'}}>
                                <View style={styles.conditionWrapper}>
                                    {
                                        genders.map((item, index) =>
                                            <View key={index}
                                                  style={styles.conditionItem}>
                                                <Text style={styles.conditionText}>
                                                    { item } ({ this.getValue(item, filters.gender) })
                                                </Text>

                                                <CheckBox
                                                    checked={this.getItemInArray('genders', item)}
                                                    press={() => this.handleFilter('genders', item)}
                                                />
                                            </View>
                                        )
                                    }
                                </View>
                            </View>
                        </View> : null}

                        {excludeCategories(category.category_id) && name && products[0][1][filters.flex] ?
                        <View style={styles.listItem}>
                            <TouchableOpacity style={styles.titleWrapper}
                                              onPress={() => this.accordion('flex')}>
                                <Text>Flex</Text>
                            </TouchableOpacity>
                            <View style={{
                                opacity: flex ? 1 : 0,
                                height: flex ? normalize(470) : 0,
                                paddingTop: normalize(20),
                                width: '90%'}}>
                                <View style={styles.conditionWrapper}>
                                    {
                                        flexes.map((item, index) =>
                                            <View key={index}
                                                  style={styles.conditionItem}>
                                                <Text style={styles.conditionText}>
                                                    { item } ({ this.getValue(item, filters.flex) })
                                                </Text>

                                                <CheckBox
                                                    checked={this.getItemInArray('flexes', item)}
                                                    press={() => this.handleFilter('flexes', item)}
                                                />
                                            </View>
                                        )
                                    }
                                </View>
                            </View>
                        </View> : null}

                        <View style={styles.listItem}>
                            <TouchableOpacity style={styles.titleWrapper}
                                              onPress={() => this.accordion('price')}>
                                <Text>Price</Text>
                            </TouchableOpacity>
                            <View style={{opacity: price ? 1 : 0, height: price ? 200 : 0, paddingTop: 10}}>
                                <View>
                                    <View style={styles.intervalPrice}>
                                        <Text>${min !== '' ? min : 0} - ${ max !== '' ? max : 0 }</Text>
                                    </View>

                                    <View style={{paddingHorizontal: 10}}>
                                        {prices && <MultiSlider
                                            selectedStyle={{backgroundColor: colors.tabs}}
                                            unselectedStyle={{backgroundColor: colors.grey}}
                                            markerStyle={{backgroundColor: colors.tabs}}
                                            containerStyle={styles.msContainer}
                                            touchDimensions={styles.msTint}
                                            values={[Number(min), Number(max)]}
                                            sliderLength={normalize360(240)}
                                            onValuesChange={this.handleValuesChange}
                                            min={Number(prices.minPrice)}
                                            max={Number(prices.maxPrice)}
                                            step={1}
                                            allowOverlap
                                            snapped={false}
                                        />}
                                    </View>

                                    <View style={{paddingHorizontal: 10}}>
                                        <Text>or</Text>
                                    </View>

                                    <View style={styles.allInputWrapper}>
                                        <View style={styles.inputWrapper}>
                                            <Text
                                                style={[styles.label, {opacity: minOpacity}]}>Min price</Text>
                                            <TextInput
                                                keyboardType="numeric"
                                                value={min > 0 ? min.toString() : ''}
                                                onFocus={this.handleFocusMinPrice}
                                                onBlur={this.handleFocusMinPrice}
                                                onChangeText={this.handleChangePrice('min')}
                                                style={styles.input}
                                                placeholder={minFocus ? '' : 'Min price'} />
                                        </View>

                                        <View style={styles.inputWrapper}>
                                            <Text
                                                style={[styles.label, {opacity: maxOpacity}]}>Max price</Text>
                                            <TextInput
                                                keyboardType="numeric"
                                                value={max > 0 ? max.toString() : ''}
                                                onFocus={this.handleFocusMaxPrice}
                                                onBlur={this.handleFocusMaxPrice}
                                                onChangeText={this.handleChangePrice('max')}
                                                style={styles.input}
                                                placeholder={maxFocus ? '' : 'Max price'} />
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>

                    <CustomButton
                        name="View items"
                        color={colors.white}
                        style={styles.button}
                        press={() => this.handleSubmit()}
                    />
                </ScrollView>
            </Container>
        );
    }
}

function mapStateToProps(state) {
    return {
        category: state.category,
        products: getArrayValues(state.categoryProducts.data),
        filters: state.filters
    }
}

function matchDispatchToProps (dispatch) {
     return {
         setFilters: filters => dispatch({type: HOME.SET_FILTERS, filters})
     }
}

export default connect(mapStateToProps, matchDispatchToProps)(SideBar);