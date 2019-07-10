import {API_URL, store} from "../config";

export const fetchPurchases = async entity_id => {
    const response = await fetch(`${API_URL}/api/rest/restapi/user/${entity_id}/orders/store/${store}`, {
        headers: {
            'Accept': 'application/json'
        }
    })
        .then(response => response.json())
        .then(items => {
            const listItem = [];
            for (let elem in items) {
                listItem.push(items[elem])
            }
            return listItem
        })
        .catch(error => new Error(error));
    if (response.status >= 400) {
        throw new Error(data.errors);
    }
    return response;
};

export const fetchPurchase = async order_id => {
    const response = await fetch(`${API_URL}/api/rest/restapi/order/${order_id}/store/${store}`, {
        headers: {
            'Accept': 'application/json'
        }
    })
        .then(response => response.json())
        .then(item => item)
        .catch(error => new Error(error));
    if (response.status >= 400) {
        throw new Error(data.errors);
    }
    return response;
};