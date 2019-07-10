import { API_URL } from "../config";
import {Alert} from 'react-native';


const fetchSignUpUser = async user => {

    const response = await fetch(`${API_URL}/api/rest/restapi/customers`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        method: "POST",
        body: JSON.stringify(user)
    });

    const data = response.json();
    if(response.status >= 400) {
        data.then(response => response.messages.error[0].message)
            .then(text =>
                Alert.alert(
                    'Customers Registration Alert',
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

export { fetchSignUpUser }