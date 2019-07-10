import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import {View, Text} from 'native-base';
import styles from "./style";
import {colors, fonts} from "../../config";
import Condition from "../Condition";
import {getRoundingNumber, normalize360} from "../../utilities";
import TrashIcon from "../TrashIcon"


const CartItem2 = ({ image, title, price, shipping, quantity, quality, trashIcon, trashPress, wrapperStyle, onPress }) => {
    return(
        <TouchableOpacity style={wrapperStyle} onPress={onPress}>
            <Image source={image} style={styles.cartListItemImage} />
            <View style={styles.cartListItemInfoWrapper}>
                <View style={{width: '100%'}}>
                    <Text style={{fontFamily: fonts.robotoMedium}}>{ title }</Text>
                </View>

                <View style={styles.cartListItemPrice}>
                    <Text style={{color: colors.primary, fontFamily: fonts.robotoMedium}}>
                        ${ getRoundingNumber(Number(price)) }
                    </Text>
                    <Text style={{color: colors.grey}}> + ${getRoundingNumber(Number(shipping))} shipping</Text>
                </View>

                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>

                    <Text style={styles.cartListItemQuantityText}>{quantity} item(s) </Text>
                    <View style={{paddingTop: normalize360(10)}}>
                        <Condition quality={quality}/>
                    </View>
                    <TrashIcon onPress={() => trashPress()} style={{margin: normalize360(10)}}/>
                </View>
            </View>
        </TouchableOpacity>
    )
};

export default CartItem2;