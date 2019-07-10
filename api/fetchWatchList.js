import {API_URL, store} from "../config";
import {Alert} from "react-native";

const fetchWatchListInfo = async id => {
    const response = await fetch(`${API_URL}/api/rest/restapi/watchlist/${id}/store/${store}`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });

    const data = response.json();

    if (response.status > 400) {
        data.then(response => response.messages.error[0])
            .then(text => {
                    Alert.alert(
                        'Watchlist Alert',
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


const fetchAddWatchList = async req => {
    const response = await fetch(`${API_URL}/api/rest/restapi/watchlist/${req.user}/store/${store}`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({"product_id": req.product})

    });

    const data = response.json();

    if (response.status >= 400) {
        data.then(response => response.messages.error[0])
            .then(text => {
                    Alert.alert(
                        'Watchlist Alert',
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

const fetchDeleteWatchList = async req => {
    const response = await fetch(`${API_URL}/api/rest/restapi/watchlist/${req.user}/product/${req.product}`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'DELETE'
    });

    const data = response;

    if (response.status >= 400) {
        data.then(response => response.messages.error[0])
            .then(text => {
                    Alert.alert(
                        'Watchlist Alert',
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


export {fetchWatchListInfo, fetchAddWatchList, fetchDeleteWatchList}