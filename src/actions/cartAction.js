import { CART } from "../types";

export const cartLoading = () => {
    return {
        type: CART.CONSUMER_CART_LOADING
    }
};

export const cartInfoLoading = id => {
    return {
        type: CART.CONSUMER_CART_INFO_LOADING,
        id
    }
};

export const setCartInfoSuccess = cart => {
    return {
        type: CART.CONSUMER_CART_INFO_SUCCESS,
        cart
    }
};

export const setCartInfoError = error => {
    return {
        type: CART.CONSUMER_CART_INFO_ERROR,
        error
    }
};

export const addToCartAction = data => {
    return {
        type: CART.ADD_TO_CART_LOADING,
        data
    }
};

export const deleteFromCartAction = data => {
    return {
        type: CART.DELETE_FROM_CART,
        data
    }
};

export const promoCodeActionLoading = data => {
    return {
        type: CART.PROMO_CODE_LOADING,
        data
    }
};

export const addCartAddressAction = (values, navigation) => {
    return {
        type: CART.ADD_CART_ADDRESS,
        values,
        navigation
    }
};

export const cartSetCustomerLoading = (customer, cart) => {
    return {
        type: CART.CUSTOMER_TO_CART_LOADING,
        customer,
        cart
    }
};