import React, { Component } from "react"
import {ScrollView, Image, TouchableOpacity, Alert, Platform, Animated, Easing} from "react-native"
import {Container, View, Text, Left, Body, Title, Right, Header} from "native-base"
import { connect } from "react-redux"
import Icon from "./../../components/Icon"
import Condition from "./../../components/Condition"
import LoadIndicator from "../../components/LoadIndicator"
import CheckBox from "../../components/CheckBox"
import TrashIcon from "../../components/TrashIcon"
import Switch from "../../components/Switch"
import {TextButton} from "../../components/Button";
import { colors, fonts } from "../../config"
import styles from "./style"
import {getRoundingNumber, normalize360, resetNavigationPage} from "../../utilities"
import { fetchListings, fetchUpdateListing, fetchDeleteListing, fetchMassUpdateListings,
    fetchProduct } from "../../api";
import {getProductsLoading, editListing} from "./../../actions";
import { Menu, MenuProvider, MenuOptions, MenuOption, MenuTrigger } from "react-native-popup-menu"
import StatusBar from "../../components/StatusBar";


class Item extends Component {
    state = {
        Enabled: this.props.elem.status === "Enabled"
    };

    handleChengeStatus = statusValue => {
        const { elem } = this.props;
        elem.status = statusValue;
        this.setState({ Enabled: false, Disabled: false }, () => this.setState({ [statusValue]: !this.state[statusValue] }))
        fetchUpdateListing(elem)
            .then(response => response.status >= 400 ? new Error(data.errors) :
                this.props.getProductsLoading())
            .catch(error => new Error(error));

    };

    render() {
        const { elem, index, handleDelete, handleEdit, handleCheck, width, checked } = this.props;
        const { Enabled } = this.state;
        return <View style={styles.listingItemContainer}>
                <Animated.View style={{height: '100%', width, justifyContent: 'center', alignItems: 'center'}}>
                    <CheckBox checked={checked} press={() => handleCheck(elem, checked)}/>
                </Animated.View>
                <Image source={{ uri: elem.product_image }} style={styles.listingItemImage} />
                <View style={styles.listingDataContainer}>
                    <View style={{flexDirection: "row", justifyContent: 'space-between', alignItems: 'flex-start'}}>
                        <Text>{elem.name}</Text>
                        <Menu>
                            <MenuTrigger style={{paddingHorizontal: normalize360(15)}} >
                                <Icon name="more" fontSize={45} />
                            </MenuTrigger  >
                            <MenuOptions optionsContainerStyle={styles.menuContainer}>
                                <MenuOption value={"Enabled"}>
                                    <View style={[styles.listingItem, {marginRight: 0}]}>
                                        <Text style={styles.listingItemText}>Enable</Text>
                                        <Switch
                                            value={Enabled}
                                            toggleSwitch={() => this.handleChengeStatus(Enabled ? "Disabled" : "Enabled")}
                                        />
                                    </View>
                                </MenuOption>
                                <MenuOption value={"Edit"}>
                                    <View style={styles.listingItem}>
                                        <Text style={styles.listingItemText}>Edit</Text>
                                        <TouchableOpacity onPress={() => handleEdit(elem)}>
                                            <Icon name="create"/>
                                        </TouchableOpacity>
                                    </View>
                                </MenuOption>
                                <MenuOption value={"Delete"}>
                                    <View style={styles.listingItem}>
                                        <Text style={styles.listingItemText}>Delete</Text>
                                        <TrashIcon onPress={() => handleDelete(index, elem)} />
                                    </View>
                                </MenuOption>
                            </MenuOptions>
                        </Menu>
                    </View>

                    <View style={{ flexDirection: "row", justifyContent: 'space-between', alignItems: 'flex-end',
                    paddingRight: normalize360(10)}}>
                        <Text>
                            <Text style={{ color: colors.primary, fontFamily: fonts.robotoMedium }}>
                                ${getRoundingNumber(elem.final_price)}
                            </Text>
                            <Text style={styles.orderShippingPrice}> + $
                                {getRoundingNumber(elem.national_shipping_price)} shipping
                            </Text>
                        </Text>
                        <Condition quality={elem.product_condition} />
                    </View>

                    {Enabled ?
                        <View style={{
                            width: '60%',
                            flexDirection: "row",
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}>
                            <Icon name="checkmark-circle" fontSize={30}/>
                            <Text style={styles.listingViewStatistic}>{elem.qty_in_stock || 0}</Text>
                            <View style={{width: 1, height: normalize360(10), backgroundColor: colors.grey}}/>
                            <Icon name="eye" fontSize={30}/>
                            <Text style={styles.listingViewStatistic}>{elem.views || 0}</Text>
                            <View style={{width: 1, height: normalize360(10), backgroundColor: colors.grey}}/>
                            <Icon name="md-star" fontSize={30}/>
                            <Text style={styles.listingViewStatistic}>{elem.in_wishlist || 0}</Text>
                        </View> :
                        <Text style={{color: '#e32626', fontSize: normalize360(14)}}>Disabled</Text>}
                </View>
            </View>
    }
}


class Listing extends Component {
    state = {
        listItem: null,
        error: "",
        isLoading: true,
        select: false,
        listUpdate: []
    };

    animatedValue = new Animated.Value(1);

    componentDidMount() {
        return this.getListing()
    };

    getListing = async () => {
        let items = await fetchListings(this.props.user.entity_id);
        this.setState({ listItem: items.reverse(), isLoading: false, listUpdate: [] })
    };

    animate () {
        this.animatedValue.setValue(0);
        Animated.timing(
            this.animatedValue,
            {
                toValue: 1,
                duration: 200,
                easing: Easing.linear
            }
        ).start()
    }

    handleDelete = (index, elem) => {
        const { listItem } = this.state;

        Alert.alert(
            'Golfing Exchange',
            'Are you sure you want to delete the listing?',
            [
                {
                    text: 'No',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {text: 'Yes', onPress: () => {
                        listItem.splice(index, 1);
                        this.setState({ listItem });
                        return fetchDeleteListing(elem)
                            .then(response => response.status >= 400 ? new Error(data.errors) :
                                this.props.getProductsLoading())
                            .catch(error => new Error(error));
                    }},
            ],
            {cancelable: false},
        );
    };

    handleEdit = elem => {
        return fetchProduct(elem.product_id)
            .then(product => {
                this.props.editListing(product);
                //return this.props.navigation.navigate('Sell')
                return resetNavigationPage(this.props.navigation, 'Sellpage')
            })
            .catch(e => Alert.alert('Error', e.message.toString()));
    };

    handleCheck = (elem, checked) => {
        if (!checked)
            this.setState({
                listUpdate: [
                    ...this.state.listUpdate,
                    elem.product_id
                ]
            });
        else {
            this.setState({
                listUpdate: [...this.state.listUpdate.filter(item => item !== elem.product_id)]
            })
        }
    };

    handleMassUpdate = value => {
        const {listUpdate} = this.state;

        this.setState({isLoading: true});

        const products = {
            'action': 'massUpdate',
            'store_id': 5,
            'attributeToUpdate': 'status',
            'attributeNewValue': value,
            'productsId': listUpdate
        };

        return fetchMassUpdateListings(products)
            .then(response => {
                if(response.status >= 400)
                    this.setState({isLoading: false},
                        () => alert("Error..."));
                else {
                    this.props.getProductsLoading();
                    return this.getListing();
                }
            })
            .catch(error => new Error(error));
    };

    handleMassDelete = () => {
        const {listUpdate} = this.state;

        const products = {
            'action': 'massDelete',
            'productsId': listUpdate
        };

        Alert.alert(
            'Golfing Exchange',
            'Are you sure you want to delete the listing?',
            [
                {
                    text: 'No',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {text: 'Yes', onPress: () => {
                        this.setState({ isLoading: true });
                        return fetchMassUpdateListings(products)
                            .then(response => {
                                if(response.status >= 400)
                                    this.setState({isLoading: false},
                                        () => alert('Error...'));
                                else {
                                    this.props.getProductsLoading();
                                    return this.getListing();
                                }
                            })
                            .catch(error => new Error(error));
                    }},
            ],
            {cancelable: false},
        );
    };


    render() {
        const { navigation, getProductsLoading } = this.props;
        const { listItem, select, listUpdate } = this.state;

        const width = this.animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: select ? [0, normalize360(80)] : [normalize360(80), 0]
        });

        const opacity = this.animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: select ? [0, 1] : [1, 0]
        });

        const height = this.animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: select ? [0, normalize360(40)] : [normalize360(40), 0]
        });

        if (this.state.isLoading) return <LoadIndicator />;
        return (
            <Container>
                {Platform.OS === "ios" && <StatusBar />}

                <MenuProvider>

                    <Header style={styles.header}>
                        <Left>
                            <TouchableOpacity style={styles.iconButton} onPress={() => navigation.goBack()}>
                                <Icon name="arrow-back" color={colors.icon}/>
                            </TouchableOpacity>
                        </Left>
                        <Body style={Platform.select({
                            ios: {
                                alignItems: 'flex-start', marginLeft: normalize360(-100)
                            }
                        })}>
                            <Title style={{color: colors.icon}}>Listings</Title>
                        </Body>
                        <Right>
                            {select ?
                                <TextButton name="CANCEL" color={colors.primary}  style={styles.select}
                                            press={() => this.setState({select: !select}, () =>
                                            this.animate())}/> :
                                <TextButton name="SELECT" color={colors.primary}  style={styles.select}
                                            press={() => this.setState({select: !select}, () =>
                                            this.animate())}/>
                            }
                        </Right>
                    </Header>

                    <View style={{ padding: 15 }}>
                        {listItem.length ?
                            <Text>{listItem.length} item(s)</Text>
                            : <Text>Listing not found</Text>
                        }
                    </View>
                    {this.state.error ? <Text>{this.state.error}</Text>
                        :
                        <ScrollView showsVerticalScrollIndicator={false}>
                            {listItem.map((elem, index) => {
                                return (
                                    <Item
                                        elem={elem}
                                        width={width}
                                        select={select}
                                        checked={listUpdate.indexOf(elem.product_id) !== -1}
                                        key={elem.product_id}
                                        index={index}
                                        handleDelete={this.handleDelete}
                                        handleEdit={this.handleEdit}
                                        handleCheck={this.handleCheck}
                                        getProductsLoading={getProductsLoading}
                                    />
                                )
                            })}
                        </ScrollView>
                    }
                </MenuProvider>

                <Animated.View style={[styles.animatedPanel, {opacity, height}]}>
                    <View style={{flexDirection: 'row'}}>
                        <TextButton name="ENABLE" style={styles.listingsUpdateButton} color={colors.primary}
                                    press={() => this.handleMassUpdate(1)} />

                        <TextButton name="DISABLE" style={styles.listingsUpdateButton} color={colors.icon}
                                    press={() => this.handleMassUpdate(2)} />
                    </View>
                    <TrashIcon onPress={this.handleMassDelete} />
                </Animated.View>
            </Container>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.login.user
    }
}
export default connect(mapStateToProps, {getProductsLoading, editListing})(Listing)