import { API_URL } from "../config";
import {Alert} from "react-native";

const fetchChangeMainUserData = async user => {

    const response = await fetch(`${API_URL}/api/rest/restapi/customers/${user.entity_id}`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'PUT',
        body: JSON.stringify(user)
    });

    if(response.status >= 400) {
        data.then(response => response.messages.error[0].message)
            .then(text =>
                Alert.alert(
                    'Customers Changing Alert',
                    `${text}`,
                    [
                        {text: 'OK'},
                    ],
                    { cancelable: false }
                )
            );

        throw new Error(data.errors);
    }

    return response;
};

const fetchGetMainUserData = async id => {

    const response = await fetch(`${API_URL}/api/rest/restapi/customers/${id}`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });

    const data = response.json();
    if(response.status >= 400) {
        data.then(response => response.messages.error[0].message)
            .then(text =>
                Alert.alert(
                    'Customers Changing Alert',
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

export { fetchChangeMainUserData, fetchGetMainUserData }