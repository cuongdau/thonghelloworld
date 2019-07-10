import { API_URL } from "../config";
import {Alert} from "react-native";

const fetchCustomerInfo = async id => {
    const response = await fetch(`${API_URL}/api/rest/restapi/customers/${id}/addresses`, {
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

const fetchChangeAddress = async values => {
    const country = values.country_id === 'United States' ? 'US' : 'CA';
    const response = await fetch(`${API_URL}/api/rest/restapi/customers/addresses/${values.address}`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'PUT',
        body: JSON.stringify({
            "firstname": values.firstname,
            "lastname": values.lastname,
            "city": values.city,
            "country_id": country,
            "region": values.region,
            "postcode": values.postcode,
            "telephone": values.telephone,
            "street": [values.street],
            "is_default_billing": values.isBilling,
            "is_default_shipping": values.isShipping
        })
    });

    const data = response;

    if (response.status >= 400) {
        data.then(response => response.messages.error[0])
            .then(text => {

                    Alert.alert(
                        'Customer Alert',
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

const fetchCreateAddress = async values => {
    const country = values.country_id === 'United States' ? 'US' : 'CA';
    const region = values.region ? values.region : "Alberta";

    const response = await fetch(`${API_URL}/api/rest/restapi/customers/${values.user}/addresses/`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
            "firstname": values.firstname,
            "lastname": values.lastname,
            "city": values.city,
            "country_id": country,
            "region": region,
            "postcode": values.postcode,
            "telephone": values.telephone,
            "street": [values.street],
            "is_default_billing": values.isBilling,
            "is_default_shipping": values.isShipping
        })
    });

    const data = response.json();

    if (response.status >= 400) {
        data.then(response => response.messages.error[0])
            .then(text => {

                    Alert.alert(
                        'Customer Alert',
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

const fetchDeleteAddress = async id => {
    return await fetch(`${API_URL}/api/rest/restapi/customers/addresses/${id}`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'DELETE'
    })
        .then(response => response)
        .catch(error =>
            Alert.alert(
                'Customer Alert',
                `${error.toString()}`,
                [
                    {text: 'OK'},
                ],
                {cancelable: false}
            )
        );
};

export {fetchCustomerInfo, fetchChangeAddress, fetchCreateAddress, fetchDeleteAddress}