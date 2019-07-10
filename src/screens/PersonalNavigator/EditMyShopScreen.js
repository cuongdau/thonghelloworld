import React, { Component } from 'react';
import {TouchableOpacity, Image, Alert, Platform, TextInput} from 'react-native';
import {Container, Header, Body, Left, Right, Title, Text, Card, CardItem, View} from 'native-base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Icon from './../../components/Icon';
import InputText from './../../components/InputTextSimple';
import Select from "../../components/SelectSimple";
import Switch from './../../components/Switch';
import CheckBox from './../../components/CheckBox';
import LoadIndicator from './../../components/LoadIndicator';
import { TextButton } from './../../components/Button';
import {colors, countries, states, stateCodes} from "../../config";
import styles from "./style";
import {normalize360, toDataURL, validatePhone} from "../../utilities";
import {connect} from 'react-redux';
import {editMyShopInfoLoading} from "../../actions";
import ImagePicker from "react-native-image-picker";
import ImageResizer from "react-native-image-resizer";
import StatusBar from "../../components/StatusBar";


const options = {
    title: "Select Image",
    takePhotoButtonTitle: "Take image with your camera",
    chooseFromLibraryButtonTitle: "Choose image from library",
    rotation: 360
};

class EditMyShop extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shopImage: null,
            submit: false,
            store_title: this.props.shop.shopName,
            contact: this.props.shop.shopContactNumber,
            description: this.props.shop.shopDescription,
            shopCountry: this.getCountry(),
            region: this.getState(),
            city: this.getCity(this.props.shop.shopStateCity),
            show_profile: this.props.shop.isDisabled === "1",
            use_tax: this.props.shop.salesTaxEnabled === "1",
            indicator: false
        };
    }

    componentWillMount(): void {
        const {shop} = this.props;
        this.setState({indicator: true});
        const array = {},
            americanStates = Object.keys(stateCodes).slice(0, 65);
        if(shop.tax_rates) {
            this.setState({array: shop.tax_rates});
        } else {
            americanStates.map((item, key) => Object.assign(array, {
                [key + 1]: {
                    name: item,
                    code: stateCodes[item],
                    rate: "0",
                    region_id: (key + 1).toString(),
                    inc_shipping: null
                }
            }));

            this.setState({array});
        }

        setTimeout(() => this.setState({indicator: false}), 500)
    }

    getResizeImage = image => {
        ImageResizer.createResizedImage(image.uri, 320, 480, 'JPEG', 80)
            .then(({uri}) => {
                const index = uri.toString().lastIndexOf('/') + 1;
                toDataURL(uri)
                    .then(dataUrl => {
                        this.setState({
                            shopImage: {
                                data: dataUrl.slice(dataUrl.indexOf(',') + 1),
                                fileName: uri.slice(index),
                                height: 320,
                                width: 480,
                                isVertical: true,
                                originalRotation: 0,
                                path: uri,
                                type: "image/jpeg"
                            }
                        }, () => console.log(this.state.shopImage));
                    });
            })
            .catch(err => {
                console.log(err);
                return Alert.alert('Unable to resize the photo', 'Check the console for full the error message');
            });
    };

    handleSelectImage = () => {
        ImagePicker.showImagePicker(options, (response) => {
            console.log("Response = ", response);

            if (response.didCancel) {
                console.log("User cancelled image picker")
            }
            else if (response.error) {
                console.log("Image Picker Error: ", response.error)
            }
            else {
                this.getResizeImage(response);
            }
        })
    };

    getCountry = () => this.props.shop.shopCountry === 'US' ? 'United States' : 'Canada';

    isStateInCountry = (country, region) => states.find(item => item.country === country && item.state === region);

    getUserState = (country, region) => this.isStateInCountry(country, region) ? region : '';

    getCountryStates = country => states.filter(item => item.country === country).map(item => item.state);

    getState = () => Object.keys(stateCodes).filter(item =>
        this.props.shop.shopStateCity.indexOf(stateCodes[item]) > -1).toString();

    getCity = city => city.substring(0, city.indexOf(','));

    handleChange = key => text => this.setState({[key]: text});

    submitDetails = errors => {
        const {user, navigation, editMyShopInfoLoading} = this.props;
        const { show_profile, use_tax, shopCountry, region, city, shopImage, array } = this.state;

        this.setState({submit: true});

        const addition = {
            country: shopCountry === 'United States' ? 'US' : 'CA',
            state: `${city}, ${stateCodes[region && this.isStateInCountry(shopCountry, region) ? 
                region : shopCountry === 'United States' ? 'Alabama' : 'Alberta']}`,
            use_tax,
            show_profile,
            tax_rates: use_tax ? array : false
        };

        if(shopImage) {
            Object.assign(addition, {images: shopImage});
        }

        Object.assign(this.state, addition);

        const nextStep = Object.values(errors).every(error => error === null);
        nextStep ? editMyShopInfoLoading(user.entity_id, this.state, navigation) : null;
    };

    render() {
        const { navigation, loading, shop } = this.props;
        const { store_title, use_tax, shopCountry, city, contact, description,
            shopImage, submit, array, indicator } = this.state;

        const states = this.getCountryStates(shopCountry);

        const region = shop.shopStateCity.split(',')[1] ? this.getState(shop.shopStateCity) : "Alberta";

        const errors = {
            store_title: !store_title ? 'Please fill shop name' : null,
            city: !city ? 'Please fill your city' : null,
            description: !description ? 'Please fill description' : null,
            contact: !contact ? 'Please fill your phone' : !validatePhone(contact) ?
                'incorrect format. Must be xxx xxx xx xx' : null,
        };

        return(
            <Container>
                {Platform.OS === "ios" && <StatusBar />}

                <Header style={styles.header}>
                    <Left>
                        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.goBack()}>
                            <Icon name="close" color={colors.icon} />
                        </TouchableOpacity>
                    </Left>
                    <Body style={Platform.select({
                        ios: {
                            alignItems: 'flex-start', marginLeft: normalize360(-100)
                        }
                    })}>
                        <Title style={{color: colors.icon}}>Edit My Shop</Title>
                    </Body>
                    <Right>
                        <TextButton name="SAVE" style={styles.right}
                                    color={colors.icon} press={() => this.submitDetails(errors)} />
                    </Right>
                </Header>

                <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.editMyShopImageWrapper}>
                        <Image source={{uri: shopImage ? shopImage.path : shop.shopImage}} style={styles.editMyShopImage}/>
                        <TouchableOpacity onPress={this.handleSelectImage}>
                            <Icon name="create" fontSize={45} style={styles.editMyShopIcon} />
                        </TouchableOpacity>
                    </View>

                    <Card style={styles.editMyShopWrapper}>
                        <Text style={styles.editMyShopLabel}>SHOP NAME/ SELLER NAME</Text>

                        <CardItem style={{flexDirection: 'column', backgroundColor: '#f7f7f7'}}>
                            <InputText name="store_title"
                                       label="Name"
                                       value={store_title}
                                       error={submit ? errors.store_title : null}
                                       onChange={this.handleChange('store_title')}
                                       submit={submit}
                                       style={styles.inputText} />
                        </CardItem>
                    </Card>

                    <Card style={styles.editMyShopWrapper}>
                        <Text style={styles.editMyShopLabel}>SHOP LOCATION</Text>

                        <CardItem style={{flexDirection: 'column', backgroundColor: '#f7f7f7'}}>
                            <Select name="country" label="Country" items={countries}
                                   defaultValue={shopCountry}
                                   onChange={this.handleChange('shopCountry')}/>

                            {shopCountry === 'United States' &&
                            <Select name="state" label="Region"
                                    items={states}
                                    defaultValue={this.getUserState(shopCountry, region)}
                                    onChange={this.handleChange('region')}/>}

                            {shopCountry === 'Canada' &&
                            <Select name="state" label="Region"
                                    items={states}
                                    defaultValue={this.getUserState(shopCountry, region)}
                                    onChange={this.handleChange('region')}/>}

                            <InputText name="city"
                                       label="City"
                                       value={city}
                                       error={submit ? errors.city : null}
                                       onChange={this.handleChange('city')}
                                       submit={submit}
                                       style={styles.inputText} />
                        </CardItem>
                    </Card>

                    <Card style={styles.editMyShopWrapper}>
                        <Text style={styles.editMyShopLabel}>CONTACT NUMBER</Text>

                        <CardItem style={{flexDirection: 'column', backgroundColor: '#f7f7f7'}}>
                            <InputText name="contact"
                                       label="Phone"
                                       value={contact}
                                       error={submit ? errors.contact : null}
                                       onChange={this.handleChange('contact')}
                                       submit={submit}
                                       style={styles.inputText} />
                        </CardItem>
                    </Card>

                    <Card style={styles.editMyShopWrapper}>
                        <Text style={styles.editMyShopLabel}>SHOP DESCRIPTION</Text>

                        <CardItem style={{flexDirection: 'column', backgroundColor: '#f7f7f7'}}>
                            <InputText name="description"
                                       label="Description"
                                       value={description}
                                       error={submit ? errors.description : null}
                                       onChange={this.handleChange('description')}
                                       submit={submit}
                                       style={styles.inputText} />
                        </CardItem>
                    </Card>

                    <Card style={styles.editMyShopWrapper}>
                        <Text style={styles.editMyShopLabel}>SALES TAX SETTINGS</Text>

                        <CardItem style={{flexDirection: 'column', backgroundColor: '#f7f7f7'}}>
                            <Text style={{fontSize: normalize360(12), color: '#464d53',
                                marginLeft: normalize360(5)}}>
                                Enable the Sales Tax module if you need to charge
                                sales tax. See our FAQs for more information about
                                sales tax.
                            </Text>

                            <Switch
                                value={use_tax}
                                labelStyle={styles.editMyShopLabelStyle}
                                toggleSwitch={() => this.setState({use_tax: !use_tax})}
                            />

                            <View style={{height: use_tax ? null : 0}}>
                                <Text style={{fontSize: normalize360(12), color: '#464d53',
                                    marginLeft: normalize360(5), marginTop: normalize360(15)}}>Enter the tax rate you want to charge for
                                    each state. The sales tax will be applied to the Ask Price and optionally to
                                    the Shipping Cost. Leave the field blank if you do not charge tax in a specific
                                    state.</Text>

                                <View style={{width: '100%', height: 50, flexDirection: 'row',
                                    justifyContent: 'flex-start', alignItems: 'center', paddingLeft: normalize360(5)}}>
                                    <View style={{flex: 6}}>
                                        <Text style={{fontSize: normalize360(12), color: colors.grey}}>State</Text>
                                    </View>
                                    <View style={{flex: 4}}>
                                        <Text style={{fontSize: normalize360(12), color: colors.grey}}>Sales Tax Rate</Text>
                                    </View>
                                    <View style={{flex: 2}}>
                                        <Text style={{fontSize: normalize360(12), color: colors.grey}}>Tax S&H</Text>
                                    </View>
                                </View>

                                {Object.values(array).map((item, key) => {
                                    return (
                                        <View key={key} style={{width: '100%', flexDirection: 'row',
                                            justifyContent: 'flex-start', alignItems: 'center'}}>
                                            <View style={{flex: 6}}>
                                                <Text style={{fontSize: normalize360(14)}}>{item.name} ({item.code})</Text>
                                            </View>
                                            <View style={{flex: 4}}>
                                                <TextInput
                                                    defaultValue={array[item.region_id].rate}
                                                    keyboardType="numeric"
                                                    onChangeText={rate => {
                                                        const obj = Object.assign(item, {rate});
                                                        this.setState({array: {
                                                            ...array, [item.region_id]: obj
                                                            }})
                                                    }}
                                                    style={styles.input}
                                                />
                                            </View>
                                            <View style={{flex: 2, alignItems: 'center', marginRight: normalize360(10)}}>
                                                <CheckBox
                                                    checked={Boolean(item.inc_shipping)}
                                                    color={colors.primary}
                                                    style={{transform: [{ scaleX: .8 }, { scaleY: .8 }]}}
                                                    press={() => {
                                                        const obj = Object.assign(item, {inc_shipping: item.inc_shipping ? null : true});
                                                        this.setState({array: {
                                                                ...array, [item.region_id]: obj
                                                            }})
                                                    }}
                                                />
                                            </View>
                                        </View>
                                    )
                                })}
                            </View>
                        </CardItem>
                    </Card>

                    <Card style={styles.editMyShopWrapper}>
                        <Text style={styles.editMyShopLabel}>POLICIES</Text>

                        <CardItem style={{flexDirection: 'column', alignItems: 'flex-start',
                            backgroundColor: '#f7f7f7'}}>
                            <TextButton name="Edit return policy" style={{marginLeft: normalize360(5)}}
                                        press={() => navigation.navigate('EditPolicy')} />
                        </CardItem>
                    </Card>
                </KeyboardAwareScrollView>

                <LoadIndicator animating={loading || indicator}/>
            </Container>
        )
    }
}


function mapStateToProps(state) {
    return {
        loading: state.seller.loading,
        shop: state.seller.data.seller_data,
        user: state.login.user
    }
}

export default connect(mapStateToProps, {editMyShopInfoLoading})(EditMyShop);