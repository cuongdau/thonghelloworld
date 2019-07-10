import { API_URL, store } from "../config"

export const fetchProductAtributesAndCategory = async id => {

    const response = await fetch(`${API_URL}/api/rest/restapi/marketplace/seller/${id}/product/attributes/${store}`, {
        headers: {
            'Accept': 'application/json'
        }
    })
        .then(response => response.json())
        .then(products => products)
        .catch(error => new Error(error));
    if (response.status >= 400) {
        throw new Error(data.errors)
    }
    return response
};


