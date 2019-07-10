import React from 'react';
import {View, Text} from 'native-base';
import Radio from './../../components/Radio';
import Icon from './../../components/Icon';
import {colors} from "../../config";
import styles from "./style";
import { connect } from 'react-redux';


const Payment = ({ navigation, navigator, cart }) => {
    const items = [];

    const methods = [
        {
            type: 'Credit Card',
            value: `************${cart.payment.cc_last4}`
        },
        {
            type: 'PayPal',
            value: 'Confirmed'
        },
    ];

    const getColor = item => item.type === 'PayPal' ? colors.green : colors.black;


    methods.map((item, key) =>
        items.push(
            <Text key={key}>{item.type}</Text>
        )
    );

    return(
        <View>
            <View style={styles.payIconCardWrapper}>
                <Text style={styles.shippingRadioLabel}>PAYMENT METHOD</Text>
                <Icon name="create" color={colors.grey} fontSize={45}
                      press={() => navigation.navigate('PayMethod', {navigator})}/>
            </View>
            <View style={styles.payRadioWrapper}>
                <View style={{flex: 1}}>
                    <Radio items={items} select={item => console.log(item)} />
                </View>
                <View style={styles.payCodeDataWrapper}>
                    {
                        methods.map((item, key) =>
                            <Text style={{color: getColor(item)}} uppercase key={key}>
                                {item.value}
                            </Text>
                        )
                    }
                </View>
            </View>
        </View>
    )
};

function mapStateToProps (state) {
    return {
        cart: state.cart.data
    }
}

export default connect(mapStateToProps)(Payment);