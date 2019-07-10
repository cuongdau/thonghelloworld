import { API_URL, store } from "../config"

export const fetchSearchProducts = async text=> {
    const response = await fetch(`${API_URL}/api/rest/restapi/search/${text}/store/${store}`, {
        headers: {
            'Accept': 'application/json'
        }
    })
        .then(response => response.json())
        .catch(error => new Error(error));
    if (response.status >= 400) {
        throw new Error(data.errors);
    }
    return response;
};




