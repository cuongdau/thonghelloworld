import { API_URL } from "../config";
import {Alert} from "react-native";

const fetchCartCreating = async store => {

    const response = await fetch(`${API_URL}/api/rest/restapi/cart`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(store)
    });


    const data = response.json();

    if (response.status >= 400) {
        data.then(response => response.messages.error[0].message)
            .then(text =>
                Alert.alert(
                    'Golfing Exchange Alert',
                    `${text}`,
                    [
                        {text: 'OK'},
                    ],
                    { cancelable: false }
                )
            );

        throw new Error(data.errors);
    }

    return data;
};


const fetchCartInfo = async id => {
    const response = await fetch(`${API_URL}/api/rest/restapi/cart/${id}`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });


    const data = response.json();

    if (response.status >= 400) {
        throw new Error(data.errors);
    }

    return data;
};

const fetchAddToCart = async product => {
    const response = await fetch(`${API_URL}/api/rest/restapi/cart/${product.quote_id}/product`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({"product_id": product.product_id, "qty": 1})
    });


    const data = response.json();

    if (response.status >= 400) {
        data.then(response => response.messages.error[0])
            .then(text => {

                    Alert.alert(
                        'Golfing Exchange Alert',
                        `${text.message}`,
                        [
                            {text: 'OK'},
                        ],
                        {cancelable: false}
                    );
                }
            );

        throw new Error(data.errors);
    }

    return data;
};


const fetchDeleteFromCart = async req  => {

    const response = await fetch(`${API_URL}/api/rest/restapi/cart/${req.quote_id}/product`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "DELETE",
        body: JSON.stringify(req)
    });


    if (response.status >= 400) {

        response.then(response => response.messages.error[0].message)
            .then(text =>
                Alert.alert(
                    'Golfing Exchange Alert',
                    `${text}`,
                    [
                        {text: 'OK'},
                    ],
                    { cancelable: false }
                )
            );

        throw new Error(response.errors);
    }

    return response;
};


const fetchAddCartCustomer = async req  => {

    const response = await fetch(`${API_URL}/api/rest/restapi/cart/${req.cart}/customer`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(req.customer)
    });


    const data = response.json();

    if (response.status >= 400) {
        data.then(response => response.messages.error[0].message)
            .then(text =>
                Alert.alert(
                    'Golfing Exchange Alert',
                    `${text}`,
                    [
                        {text: 'OK'},
                    ],
                    { cancelable: false }
                )
            );

        throw new Error(data.errors);
    }

    return data;
};


const fetchCartAddAddress = async req => {
    const response = await fetch(`${API_URL}/api/rest/restapi/cart/customer/address/${req.quote_id}/store/${req.store}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(req)
    });

    const data = response.json();

    if (response.status >= 400) {
        data.then(response => response.messages.error[0])
            .then(text =>
                Alert.alert(
                    'Golfing Exchange Alert',
                    `${text.message}`,
                    [
                        {text: 'OK'},
                    ],
                    {cancelable: false}
                )
            );

        throw new Error(data.errors);
    }

    return data;
};


export {
    fetchCartCreating,
    fetchCartInfo,
    fetchAddToCart,
    fetchDeleteFromCart,
    fetchAddCartCustomer,
    fetchCartAddAddress
}

