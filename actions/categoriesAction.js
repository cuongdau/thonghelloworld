import { HOME } from "../types";

export const onAddCategories = () => {
    return {
        type: HOME.CATEGORIES_LOADING
    }
};

export const setCategoriesSuccess = categories => {
    return {
        type: HOME.CATEGORIES_SUCCESS,
        categories
    }
};

export const setCategoriesError = () => {
    return {
        type: HOME.CATEGORIES_ERROR
    }
};

export const setCategoriesByBrandSuccess = categories => {
    return {
        type: HOME.CATEGORIES_BY_BRAND_SUCCESS,
        categories
    }
};

export const setCategoriesByBrandError = error => {
    return {
        type: HOME.CATEGORIES_BY_BRAND_ERROR,
        error
    }
};