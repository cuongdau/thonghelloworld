import React from 'react';
import {View, ImageBackground, Text, TouchableOpacity} from 'react-native';
import { connect } from 'react-redux';
import {suitcase} from "../../config";
import styles from './style';


const Suitcase = ({cart, navigation}) => {
    const getProductsQuantity = () =>
        cart.reduce((accumulator, currentValue) => accumulator + currentValue.qty, 0);

    if(!cart || cart.length === 0) return null;

    return (
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Cart')}>
            <ImageBackground source={suitcase} style={styles.image}>
                <View>
                    <Text style={styles.text}>{getProductsQuantity()}</Text>
                </View>
            </ImageBackground>
        </TouchableOpacity>
    )
};

function mapStateToProps(state) {
    return {
        cart: state.cart.data.items
    }
}

export default connect(mapStateToProps)(Suitcase);
