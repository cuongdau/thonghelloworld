import { API_URL } from "../config";

export const fetchBrands = async () => {
    return await fetch(`${API_URL}/api/rest/restapi/brands/store/5`, {
        headers: {
            'Accept': 'application/json'
        }
    })
        .then(response => response.json())
        .then(brands => brands)
        .catch(error => new Error(error));
};