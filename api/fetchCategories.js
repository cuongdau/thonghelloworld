import { API_URL, store } from "../config";
import {Alert} from "react-native";

export const fetchCategories = async () => {
    const response = await fetch(`${API_URL}/api/rest/restapi/catalog/category/tree`, {
        headers: {
            'Accept': 'application/json'
        }
    })
        .then(response => response.json())
        .then(categories => categories.children[3].children)
        .catch(error => new Error(error));
    if (response.status >= 400) {
        throw new Error(data.errors);
    }

    return response;
};

export const fetchCategoriesByBrand = async id => {
    return await fetch(`${API_URL}/api/rest/restapi/brand/${id}/store/${store}`, {
        headers: {
            'Accept': 'application/json'
        }
    })
        .then(response => response.json())
        .then(categories => categories)
        .catch(error => {
            Alert.alert(
                'Categories Alert',
                `${error.toString()}`,
                [
                    {text: 'OK'},
                ],
                { cancelable: false }
            );

            throw new Error(error);
        });
};