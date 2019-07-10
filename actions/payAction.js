import {PAYMENT} from "../types";

export const payListLoading = id => {
    return {
        type: PAYMENT.PAY_LIST_LOADING,
        id
    }
};

export const payListSuccess = payments => {
    return {
        type: PAYMENT.PAY_LIST_SUCCESS,
        payments
    }
};

export const payListError = error => {
    return {
        type: PAYMENT.PAY_LIST_ERROR,
        error
    }
};

export const addPayMethod = data => {
    return {
        type: PAYMENT.ADD_PAY_METHOD_LOADING,
        data
    }
};