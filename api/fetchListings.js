import { API_URL, store } from "../config"

export const fetchListings = async entity_id => {
    const response = await fetch(`${API_URL}/api/rest/restapi/marketplace/product/seller/${entity_id}/store/${store}`, {
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

export const fetchUpdateListing = async product => {
    return fetch(`${API_URL}/api/rest/restapi/marketplace/product/${product.product_id}/store/${store}`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "PUT",
        body: JSON.stringify({ "product": product })
    })
};

export const fetchMassUpdateListings = async products => {
    return fetch(`${API_URL}/api/rest/restapi/marketplace/product`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "PUT",
        body: JSON.stringify({
            "update": products
        })
    })
};

export const fetchDeleteListing = async product => {
    return fetch(`${API_URL}/api/rest/restapi/marketplace/product/${product.product_id}/store/${store}`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "DELETE",
    })
};

