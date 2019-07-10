import {API_URL} from "../config";
import {Alert} from "react-native";

const fetchOfferCreate = values => {

    return fetch(`${API_URL}/api/rest/offers`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(values)
    })
        .then(response => response.json())
        .then(offer => {
            if (offer.messages) {
                Alert.alert(
                    'Offer Alert',
                    `${offer.messages.error[0].message}`,
                    [
                        {text: 'OK'},
                    ],
                    {cancelable: false}
                );

                return null;
            }

            Alert.alert(
                'Successful',
                'Your offer has been submitted to the seller. You will be notified when they respond. Thanks!',
                [
                    {text: 'OK'},
                ],
                {cancelable: false}
            )
        })
        .catch(error =>
            Alert.alert(
                'Offer Alert',
                `${error.toString()}`,
                [
                    {text: 'OK'},
                ],
                {cancelable: false}
            )
        );
};

const fetchOffers = (user, navigation, navigator) => {
    return fetch(`${API_URL}/api/rest/offers/customer/${user}`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(customers => {
            return fetchSellerOffers(customers, user, navigation, navigator)
        })
        .catch(error => console.log(error.toString()))
};

const fetchSellerOffers = (customers, user, navigation, navigator) => {
    return fetch(`${API_URL}/api/rest/offers/seller/${user}`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(sellers => {
            const offers = {
                customers,
                sellers
            };

            return navigation.navigate(navigator, {offers, user})
        })
        .catch(error => console.log(error.toString()))
};

const fetchConfirmOffer = request => {
    return fetch(`${API_URL}/api/rest/offers/${request.offer_id}`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'PUT',
        body: JSON.stringify(request)
    })
        .then(response => response.json())
        .then(confirm => {
            if(confirm.status === 'success') {
                Alert.alert(
                    'Successful',
                    `Offer status was successfully changed!`,
                    [
                        {text: 'OK'},
                    ],
                    {cancelable: false}
                )
            } else {
                const errors = [];
                confirm.messages.error.map(error => errors.push(error.message));

                Alert.alert(
                    'Offer Alert',
                    `${errors.join('\n')}`,
                    [
                        {text: 'OK'},
                    ],
                    {cancelable: false}
                )
            }
        })
        .catch(error => console.log('ERROR', error.toString()))
};

export {fetchOfferCreate, fetchOffers, fetchConfirmOffer};
