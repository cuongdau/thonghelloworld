import { API_URL } from "../config";
import {Alert} from "react-native";

const fetchPaymentsInfo = async id => {
    const response = await fetch(`${API_URL}/api/rest/restapi/cart/id/${id}/store/5/payment`, {
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

const fetchPayMethod = async request => {
    const response = await fetch(`${API_URL}/api/rest/restapi/cart/id/${request.cart}/store/5/payment`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(request.body)
    });


    const data = response.json();

    if (response.status >= 400) {
        data.then(response => response.messages.error[0].message)
            .then(text =>
                Alert.alert(
                    'Add Pay Method Alert',
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

export { fetchPaymentsInfo, fetchPayMethod };