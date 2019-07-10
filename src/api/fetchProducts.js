import {API_URL} from "../config";

const getDate90DaysAgo = () => {
    const backTime = 7776000000; // 90 days in milliseconds;
    return new Date(Date.now() - backTime).toISOString().slice(0, -5);
};

export const fetchProducts = async () => {
    const response = await fetch(`${API_URL}/api/rest/restapi/products/store/5?order=created_at&dir=desc`, {
        headers: {
            'Accept': 'application/json'
        }
    })
        .then(response => response.json())
        .then(products => products)
        .catch(error => new Error(error));
    if (response.status >= 400) {
        throw new Error(data.errors);
    }
    return response;
};

export const fetchProductsForPeriod = async () => {
    const response = await fetch(`${API_URL}/api/rest/restapi/products/store/5?limit=100&order=created_at&dir=dsc&filter[1][attribute]=created_at&filter[1][gt]=${getDate90DaysAgo()}`, {
        headers: {
            'Accept': 'application/json'
        }
    })
        .then(response => response.json())
        .then(products => products)
        .catch(error => new Error(error));
    if (response.status >= 400) {
        throw new Error(data.errors);
    }
    return response;
};

export const fetchCategoryProducts = async category => {
    const response = await fetch(`${API_URL}/api/rest/restapi/products/store/5/category/${category.id}?
    page=${category.page}&limit=100`, {
        headers: {
            'Accept': 'application/json'
        }
    })
        .then(response => response.json())
        .then(products => products)
        .catch(error => new Error(error));
    if (response.status >= 400) {

        throw new Error(data.errors);
    }
    return response;
};

export const fetchProduct = async id => {
    const response = await fetch(`${API_URL}/api/rest/restapi/products/${id}/store/5`, {
        headers: {
            'Accept': 'application/json'
        }
    })
        .then(response => response.json())
        .then(products => products)
        .catch(error => new Error(error));
    if (response.status >= 400) {
        throw new Error(data.errors);
    }
    return response;
};