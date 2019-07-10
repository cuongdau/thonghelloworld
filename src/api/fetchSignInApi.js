import {API_URL, store} from "../config";
import { objectToQueryString } from "../utilities";
import {Alert} from "react-native";

const fetchSignInApi = async user => {

    const response = await fetch(`${API_URL}/api/rest/restapi/customer/login?${objectToQueryString(user)}`, {
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
                    'Customers Login Alert',
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

const fetchSignInFb = async email => {
    const response = await fetch(`${API_URL}/api/rest/restapi/customer/${email}/fblogin/${store}`, {
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
                    'Customers Login Alert',
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


export { fetchSignInApi, fetchSignInFb }