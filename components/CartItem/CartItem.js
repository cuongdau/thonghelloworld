import React, {Component} from 'react';
import {Image} from "react-native";
import {Card, Text, View} from "native-base";
import {TextButton} from "../Button";
import Condition from "../Condition";
import styles from './style';
import TrashIcon from './../TrashIcon';
import {colors} from "../../config";


class CartItem extends Component {
    constructor (props) {
        super(props);
    }

    render () {
        const props = this.props;
        return (
            <Card style={styles.card}>
                <View style={styles.wrapper}>
                    <Image source={props.image} style={styles.image} />
                    <View style={styles.infoWrapper}>
                        <Text style={styles.title}>{props.title}</Text>

                        {props.shop &&
                        <TextButton name={props.shop} color={colors.primary} style={styles.shopName}
                                    press={props.press} />}

                        <View style={styles.priceWrapper}>
                            <Text style={styles.price}>${props.price}</Text>
                            {props.shippingPrice &&
                            <Text style={styles.shippingPrice}> + ${props.shippingPrice} shipping</Text>}
                        </View>

                        <View style={styles.row}>
                            <Text style={styles.quantity}>{props.quantity}</Text>
                            <Condition quality={props.condition} />
                            { props.showTrashIcon && (
                                <TrashIcon onPress={props.onTrashPress} />
                            )}
                        </View>
                    </View>
                </View>
            </Card>
        )
    }
};

export default CartItem;