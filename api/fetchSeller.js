import {API_URL, store} from "../config";
import {Alert} from 'react-native';


export const fetchSeller = async request => {
    const response = await fetch(`${API_URL}/api/rest/restapi/seller/${request.id}/customer/${request.user}`, {
        headers: {
            'Accept': 'application/json'
        }
    });

    const data = response.json();

    if (response.status >= 400) {
        data.then(response => response.messages.error[0])
            .then(text => {

                    Alert.alert(
                        'Seller Alert',
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


export const fetchEditSeller = async request => {
    const response = await fetch(`${API_URL}/api/rest/restapi/seller/${request.id}`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "PUT",
        body: JSON.stringify(request.values)
    });

    const data = response;

    if (response.status >= 400) {
        data.then(response => response.messages.error[0])
            .then(text => {

                    Alert.alert(
                        'Seller Alert',
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


export const fetchOrders = async (user, navigation, navigator) => {
    return fetch(`${API_URL}/api/rest/restapi/seller/${user.entity_id}/orders/store/${store}`, {
        headers: {
            'Accept': 'application/json'
        }
    })
        .then(response => response.json())
        .then(orders => {
            if(!orders.messages) {
                return navigation.navigate(navigator, {orders})
            }

            Alert.alert(
                'Seller Alert',
                `${orders.messages.error[0].message}`,
                [
                    {text: 'OK'},
                ],
                {cancelable: false}
            );
        })
        .catch(error => console.log(error.toString()));
};

export const fetchOneOrder = async (order, navigation) => {
    return fetch(`${API_URL}/api/rest/restapi/seller/order/${order.order_id}`, {
        headers: {
            'Accept': 'application/json'
        }
    })
        .then(response => response.json())
        .then(order => navigation.navigate('OrderDetails', {order}))
        .catch(error => console.log(error.toString()));
};

export const fetchAddSellerReview = async request => {
    return fetch(`${API_URL}/api/rest/restapi/marketplace/seller/review`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(request)
    })
};