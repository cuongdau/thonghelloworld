import { HOME } from "../types";

export const getProductsLoading = () => {
    return {
        type: HOME.PRODUCTS_LOADING
    }
};

export const setProductsSuccess = payload => {
    return {
        type: HOME.PRODUCTS_SUCCESS,
        payload
    }
};

export const setProductsError = () => {
    return {
        type: HOME.PRODUCTS_ERROR
    }
};

export const setCategoryProductsSuccess = payload => {
    return {
        type: HOME.CATEGORY_PRODUCTS_SUCCESS,
        payload
    }
};

export const setCategoryProductsError = error => {
    return {
        type: HOME.CATEGORY_PRODUCTS_ERROR,
        error
    }
};

export const setProductSuccess = payload => {
    return {
        type: HOME.PRODUCT_SUCCESS,
        payload
    }
};

export const setProductError = () => {
    return {
        type: HOME.PRODUCT_ERROR
    }
};

export const changeProduct = (id, navigation, navigator) => {
    return {
        type: HOME.CHANGE_PRODUCT,
        id,
        navigation,
        navigator
    }
};