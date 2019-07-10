import React, { Component } from "react";
import {Image, ImageBackground, Alert, ScrollView, TouchableOpacity, Platform} from "react-native";
import { Container, Content, View, Text, Card, CardItem } from "native-base";
import Header from "./../../components/Header";
import Icon from "./../../components/Icon";
import {CustomButton} from "../../components/Button";
import ImagePicker from "react-native-image-picker";
import { connect } from "react-redux";
import { colors, plus } from "../../config";
import styles from "./style";
import CategoryForm from "../../components/CategoryForm";
import CategoryList from "../../components/CategoryList";
import OfferPrice from "../../components/OfferPrice";
import ItemCondition from "../../components/ItemCondition";
import ShipIt from "../../components/ShipIt";
import InShipIt from "../../components/InShipIt";
import PriceDrop from "../../components/PriceDrop";
import LoadIndicator from "../../components/LoadIndicator";
import { fetchProductAtributesAndCategory, fetchCreateProduct, fetchEditProduct } from "../../api";
import {compose, toDataURL, getArrayValues, normalize360} from "../../utilities";
import ImageResizer from 'react-native-image-resizer';
import {clearListing} from "../../actions";
import StatusBar from "../../components/StatusBar";

const options = {
    title: "Select Image",
    takePhotoButtonTitle: "Take image with your camera",
    chooseFromLibraryButtonTitle: "Choose image from library",
    rotation: 360
};

class SellScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            category: "drivers",
            title: "Drivers",
            imageSource: [],
            indicator: false,
            edit: null,
            submit: false,
            mainImageIndex: 0,
            imageIndex: 0
        }
    }

    componentDidMount = async () => {
        if(!this.props.user.entity_id)
            return this.props.navigation.navigate('Welcome', {navigator: 'Sell'});

        let data = await fetchProductAtributesAndCategory(this.props.user.entity_id);
        this.setState({ data });

        if(this.props.listing) {
            const title = this.props.listing.categories[0];
            const array = Object.values(this.state.data.categories).find(item => item.children ?
                Object.values(item.children).find(child => JSON.stringify(child).indexOf(title) > -1) :
                JSON.stringify(item).indexOf(title) > -1);

            const label = getArrayValues(array)[0][0];

            if(this.props.listing.image_url && this.props.listing.image_url.length > 1) {
                this.props.listing.image_url.map(item => this.getArrayImages(item))
            } else {
                const uri = this.props.listing.thumb_image_url;
                this.getArrayImages(uri)
            }

            this.setState({edit: {label, title, id: this.props.listing.entity_id}})
        }

        if(this.props.listing)
            this.props.clearListing()
    };

    getArrayImages = uri => {
        let {imageSource, imageIndex} = this.state;
        const index = uri.toString().lastIndexOf('/') + 1;

        const random = Math.ceil(Math.random() * 10000);
        const name = uri.slice(index).slice(0, 9).concat(`${random}.JPEG`);

        this.setState({imageIndex: imageIndex + 1});

        toDataURL(uri)
            .then(dataUrl => {
                const data = {
                    data: dataUrl.slice(dataUrl.indexOf(',') + 1),
                    fileName: name,
                    height: 960,
                    width: 540,
                    isVertical: true,
                    originalRotation: 0,
                    path: uri,
                    type: "image/jpeg",
                    number: imageIndex
                };

                imageSource.push(data);

                imageSource.sort((x, y) => x.number > y.number ? 1 : -1);

                this.setState({imageSource});
            })
            .catch(err => {
                console.log(err);
            });
    };

    getParentCategory = value => {
        const category = this.props.categories.find(item => item.children.length === 0 ? item.name === value :
            item.children.find(child => child.name === value));

        return [category, value];
    };

    checkChildInCategory = arg => arg[0].children.length === 0 ? arg[0] :
        arg[0].children.find(item => item.name === arg[1]);

    getCategoryId = arg => arg.category_id;

    categoryId = compose(
        this.getParentCategory,
        this.checkChildInCategory,
        this.getCategoryId
    );

    getResizeImage = image => {
        ImageResizer.createResizedImage(image.uri, 540, 960, 'JPEG', 80)
            .then(({uri}) => this.getArrayImages(uri))
            .catch(err => {
                console.log(err);
                return Alert.alert('Unable to resize the photo',
                    'Check the console for full the error message');
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

    submitDetails = () => {
        const {title, edit, mainImageIndex} = this.state;
        const {user, navigation} = this.props;

        this.setState({submit: true});

        const images = this.state.imageSource;

        const allData = {
            ...this.state.form,
            ...this.state.price,
            ...this.state.condition,
            ...this.state.ship,
            ...this.state.inship,
            ...this.state.offer,
            images
        };

        if(Object.values(allData).every(item => item)) {
            this.setState({indicator: true});

            if(edit) {
                return fetchEditProduct(user, allData, this.categoryId(title), mainImageIndex, edit.id)
                    .then(response => response)
                    .then(listing => {
                        if(listing.status >= 400) {
                            return this.setState({indicator: false}, () => alert(JSON.stringify(listing)))
                        }
                        this.setState({indicator: false}, () => navigation.navigate('AfterEdit'))
                    })
                    .catch(error => this.setState({indicator: false}, () => new Error(error)))
            } else {
                return fetchCreateProduct(user, allData, this.categoryId(title), mainImageIndex)
                    .then(response => response)
                    .then(listing => {
                        if(listing.status >= 400) {
                            return this.setState({indicator: false}, () => alert(JSON.stringify(listing)))
                        }
                        this.setState({indicator: false}, () => navigation.navigate('Posted'))
                    })
                    .catch(error => this.setState({indicator: false}, () => new Error(error)))
            }
        } else {
            alert("You need enter all field")
        }
    };

    removeImage = elem => {
        const imageSource = this.state.imageSource.
            filter(image => image.fileName !== elem.fileName);

        this.setState({
            imageSource
        });
    };

    render() {
        const { navigation, listing } = this.props;
        const { imageSource, mainImageIndex, data, indicator, edit, submit } = this.state;

        if (!data || indicator) return <LoadIndicator />;
        return (
            <Container>
                {Platform.OS === "ios" && <StatusBar />}

                <Header
                    leftIcon= {edit ? "arrow-back" : null}
                    rightIcon="search"
                    headTitle="Sell"
                    iconColor={colors.icon}
                    leftIconPress={() => navigation.navigate('Listing')}
                    rightIconPress={() => navigation.navigate("Search")}
                />
                <Content style={{backgroundColor: colors.white}} showsVerticalScrollIndicator={false}>
                    <View style={styles.photoContainer}>
                        <Text uppercase style={styles.title}>Add Photo</Text>
                        <View style={{flexDirection: "row", alignItems: "center"}}>
                            <ScrollView horizontal>
                                {imageSource.map((elem, index) =>
                                    <View style={styles.photoWrapper} key={index}>
                                        <TouchableOpacity onPress={() => this.setState({mainImageIndex: index})}>
                                            <ImageBackground source={{uri: elem.path}} style={styles.photo}>
                                                {imageSource.length > 1 && mainImageIndex === index &&
                                                <View style={styles.plashka}>
                                                    <Text style={styles.drop}>Main image</Text>
                                                </View>}
                                            </ImageBackground>
                                        </TouchableOpacity>

                                        <TouchableOpacity onPress={() => this.removeImage(elem)}>
                                            <View style={styles.removeButtonWrapper}>
                                                <Icon
                                                    name="close"
                                                    fontSize={30}
                                                    color={colors.white} />
                                            </View>
                                        </TouchableOpacity>
                                    </View>)}
                                {imageSource.length < 10 && <TouchableOpacity onPress={this.handleSelectImage}>
                                    <Image style={styles.plus} source={plus}/>
                                </TouchableOpacity>}
                            </ScrollView>
                        </View>

                        {imageSource.length > 1 && <Text style={{fontSize: normalize360(10), marginTop: normalize360(5),
                        marginLeft: normalize360(15)}}>
                            * Please tap on an image to select the main one.
                        </Text>}
                    </View>
                    <Card style={styles.topCardContainer}>
                        <CardItem style={{flexDirection: "column", alignItems: "flex-start", backgroundColor: '#f7f7f7'}}>
                            <Text uppercase style={styles.title}>Ditales</Text>
                            <Text style={{fontSize: normalize360(12), color: colors.darkGrey, opacity: 0.3,
                                marginLeft: normalize360(8), marginVertical: normalize360(14)}}
                            >Category</Text>
                            {!listing ?
                                <CategoryList data={data} getCategory={(category) =>
                                    this.setState({category: category.lable, title: category.title})}/> :
                                edit &&
                                <CategoryList data={data} edit={edit} getCategory={(category) =>
                                    this.setState({category: category.lable, title: category.title})}/>
                            }
                        </CardItem>

                        <CategoryForm category={this.state.category} data={data} edit={edit} listing={listing}
                                      submit={submit}
                                      setValues={values => this.setState({form: values})} />

                        <PriceDrop listing={listing} category={this.state.category}
                                   setValues={values => this.setState({price: values})} />
                    </Card>

                    <Card style={styles.topCardContainer}>
                        <ItemCondition listing={listing} category={this.state.category}
                                       setValues={values => this.setState({condition: values})} />
                    </Card>

                    <Card style={styles.topCardContainer}>
                        <ShipIt listing={listing} category={this.state.category} submit={submit}
                                setValues={values => this.setState({ship: values})} />
                    </Card>

                    <Card style={styles.topCardContainer}>
                        <InShipIt listing={listing}
                                  setValues={values => this.setState({inship: values})} />
                    </Card>

                    <Card style={styles.topCardContainer}>
                        <OfferPrice listing={listing}
                                    setValues={values => this.setState({offer: values})} />
                    </Card>




                    <CustomButton
                        name="Publish"
                        color={colors.white}
                        style={styles.submitButton}
                        press={this.submitDetails}
                    />
                </Content>
            </Container>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.login.user,
        categories: state.categories.data,
        listing: state.listing
    }
}

export default connect(mapStateToProps, {clearListing})(SellScreen);