import {CUSTOMER} from "../types";

export const customerInfoLoading = (id, navigation, navigator) => {
    return {
        type: CUSTOMER.MY_INFO_LOADING,
        id,
        navigation,
        navigator
    }
};

export const customerInfoSuccess = payload => {
    return {
        type: CUSTOMER.MY_INFO_SUCCESS,
        payload
    }
};

export const customerInfoError = error => {
    return {
        type: CUSTOMER.MY_INFO_ERROR,
        error
    }
};

export const customerAddressChange = (values, navigation) => {
    return {
        type: CUSTOMER.CHANGE_USER_ADDRESS,
        values,
        navigation
    }
};

export const customerAddressDelete = (user, item) => {
    return {
        type: CUSTOMER.DELETE_USER_ADDRESS,
        user,
        item
    }
};