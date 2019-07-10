import React, { Component } from 'react';
import { ImageBackground, TouchableOpacity } from 'react-native';
import { Card, Button, View} from 'native-base';
import { Text } from 'react-native';
import styles from './style';
import Condition from "../Condition";
import {LightRoundedButton} from "../Button";
import {rgba, getRoundingNumber, normalize360} from "../../utilities";
import { colors, categories } from "../../config";


const FLItemHomeHead = props => (
    <View style={{marginRight: normalize360(4)}}>
        <Button style={styles.imageHomeHead} onPress={() => props.press()}>
            <ImageBackground source={categories[props.item.category_id]}
                             style={styles.imageHomeHead}>
                <Text style={styles.textHomeHead}>{props.item.name}</Text>
            </ImageBackground>
        </Button>
    </View>
);

const FLItemHomeBrands = props => (
    <LightRoundedButton
        item={props.item.name}
        color={colors.primary}
        buttonStyle={styles.brandHomeButton}
        press={() => props.press()}
    />
);

const FLItemProductDegrees = ({ item, degree, press }) => (
    <LightRoundedButton
        item={item}
        color={degree === item ? colors.primary : colors.black}
        buttonStyle={[styles.degreeHomeButton,
            {backgroundColor: degree === item ? rgba(colors.primary, 30) : '#dfdfdf'}
        ]}
        press={() => press()}
    />
);


class FLItemHomeBody extends Component {
    render() {
        const { item, press } = this.props;

        return (
            <View>
                <TouchableOpacity onPress={() => press()}>
                    <View style={styles.productCard}>
                        <ImageBackground source={{uri: item.thumb_image_url}} style={styles.imageHomeBody}>
                            {item.final_price_without_tax !== item.regular_price_without_tax &&
                            <View style={styles.plashka}>
                                <Text style={styles.drop}>Price Drop</Text>
                            </View>}
                        </ImageBackground>

                        <View style={styles.title}>
                            <Text style={styles.titleText}>
                                {item.name.length > 25 ? item.name.slice(0, 22).concat("...") : item.name}
                            </Text>
                        </View>

                        <View style={styles.priceWrapper}>
                            <Condition quality={item.product_condition}/>

                            <Text style={styles.newPrice}>${getRoundingNumber(item.final_price_without_tax)}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}

class FLItemProducts extends Component {
    render() {
        const { item, press } = this.props;

        return (
            <View>
                <TouchableOpacity onPress={() => press()}>
                    <View style={styles.productCard}>
                        <ImageBackground source={{uri: item.thumb_image_url}} style={styles.imageProduct}>
                            {item.final_price_without_tax !== item.regular_price_without_tax &&
                            <View style={styles.plashka}>
                                <Text style={styles.drop}>Price Drop</Text>
                            </View>}
                        </ImageBackground>

                        <View style={styles.title}>
                            <Text style={styles.titleText}>
                                {item.name.length > 25 ? item.name.slice(0, 22).concat("...") : item.name}
                            </Text>
                        </View>
                        <View style={styles.priceWrapper}>
                            <Condition quality={item.product_condition}/>

                            <Text style={styles.newPrice}>${getRoundingNumber(item.final_price_without_tax)}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}

class FLItemSearch extends Component {
    render() {
        const { item, press } = this.props;
        return (
            <View>
                <TouchableOpacity onPress={() => press()}>
                    <View style={styles.productCard}>
                        <ImageBackground source={{uri: item.thumb_image_url}} style={styles.imageProduct}>
                            {(item.special_price !== 0 && item.price !== item.special_price) &&
                            <View style={styles.plashka}>
                                <Text style={styles.drop}>Price Drop</Text>
                            </View>}
                        </ImageBackground>

                        <View style={styles.title}>
                            <Text style={styles.titleText}>
                                {item.name.length > 25 ? item.name.slice(0, 22).concat("...") : item.name}
                            </Text>
                        </View>
                        <View style={styles.priceWrapper}>
                            <Condition quality={item.product_condition}/>

                            <Text style={styles.newPrice}>${getRoundingNumber(item.price)}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}

const FLItemHomeFoot = props => (
    <Button style={styles.buttonHomeFoot} onPress={() => props.press()}>
        <ImageBackground source={categories[props.item.category_id]} style={styles.imageHomeFoot}>
            <Text style={styles.textHomeFoot}>{props.item.name}</Text>
        </ImageBackground>
    </Button>
);

const FLItemSubcategory = props => (
    <Card>
        <Button style={styles.buttonHomeFoot} onPress={() => alert(props.item.bonus)}>
            <ImageBackground source={props.item.uri} style={styles.imageHomeFoot} />
        </Button>
    </Card>
);

export { FLItemHomeHead, FLItemHomeBody, FLItemHomeFoot, FLItemSubcategory, FLItemHomeBrands,
    FLItemProductDegrees, FLItemProducts, FLItemSearch }