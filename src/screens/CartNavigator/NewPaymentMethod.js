import React from 'react';
import { Image } from 'react-native';
import {Form, View, Label} from 'native-base';
import InputText from "../../components/InputText";
import Select from './../../components/Select';
import { TextButton } from './../../components/Button';
import {reduxForm, Field} from "redux-form";
import { connect } from 'react-redux';
import styles from "./style";
import {colors} from "../../config";
import {addPayMethod} from "../../actions";
import {getCurrentYear} from "../../utilities";

const validate = value => {
    const errors = {};
    if(!value.name) {
        errors.name = 'please fill your name';
    }

    if(!value.card) {
        errors.card = 'please fill card number';
    } else if(value.card.length !== 16) {
        errors.card = 'card number must be 16 symbols';
    }

    if(!value.cvv) {
        errors.cvv = 'please fill CVV';
    }

    return errors;
};

const NewPaymentMethod = ({ navigation, handleSubmit, initialize, navigator, payments, addPayMethod, cart }) => {
    const getDateInterval = (min, max) => {
        const array = [];
        for(; min <= max; min++) {
            array.push(min < 10 ? `0${min}` : `${min}`);
        }
        return array;
    };

    const getMethods = () => payments.map(pay => pay.title);

    const handleDataAction = values => {
        const data = {
            values,
            navigation,
            navigator,
            payments,
            cart
        };

        addPayMethod(data);
        initialize();
    };

    return(
        <Form style={styles.shippingFormWrapper}>
            <Field name="method" label="Choose method" items={getMethods()} component={Select} />

            <View style={{width: '98%', marginLeft: '1%'}}>
                <Field name="card" label="Card number" component={InputText} style={styles.inputText} />
            </View>

            <Label style={styles.label}>Expiry date</Label>
            <View style={{flexDirection: 'row'}}>
                <View style={styles.selectMonth}>
                    <Field name="month" items={getDateInterval(1, 12)} component={Select} />
                </View>
                <View style={{width: '20%'}}>
                    <Field name="year" items={getDateInterval(getCurrentYear(), 2040)} component={Select} />
                </View>
            </View>

            <View style={{width: '98%', marginLeft: '1%'}}>
                <Field name="name" label="Name on card" component={InputText} style={styles.inputText} />
            </View>

            <View style={styles.cvvWrapper}>
                <Field name="cvv" label="CVV" component={InputText} style={styles.inputText} />
                <Image source={require('./../../assets/icons/cvv-code.png')} style={styles.cvvImage}/>
            </View>

            <View style={styles.newPayButtonWrapper}>
                <TextButton name="SAVE" payments={payments} color={colors.tabs} press={handleSubmit(handleDataAction)}/>
            </View>
        </Form>
    )
};

const mapStateToProps = state => ({
    payments: state.payment.data,
    cart: state.cart.data.quote_id
});

const NewPaymentMethodConnect = connect(mapStateToProps, {addPayMethod})(NewPaymentMethod);

export default reduxForm({
    form: 'NewPaymentMethod', // for unique id
    validate
})(NewPaymentMethodConnect);
