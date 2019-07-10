import { SELLER } from "../types";

export const shopInfoLoading = (id, user, navigation, navigator, parent) => {
    return {
        type: SELLER.SHOP_INFO_LOADING,
        id,
        user,
        navigation,
        navigator,
        parent
    }
};

export const shopInfoSuccess = payload => {
    return {
        type: SELLER.SHOP_INFO_SUCCESS,
        payload
    }
};

export const shopInfoError = error => {
    return {
        type: SELLER.SHOP_INFO_ERROR,
        error
    }
};

export const editMyShopInfoLoading = (id, values, navigation) => {
    return {
        type: SELLER.SHOP_EDIT_INFO_LOADING,
        id,
        values,
        navigation
    }
};