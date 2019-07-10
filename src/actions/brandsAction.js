import { HOME } from "../types";

export const getBrandsLoading = () => {
    return {
        type: HOME.BRANDS_LOADING
    }
};

export const setBrandsSuccess = brands => {
    return {
        type: HOME.BRANDS_SUCCESS,
        brands
    }
};

export const setBrandsError = error => {
    return {
        type: HOME.BRANDS_ERROR,
        error
    }
};