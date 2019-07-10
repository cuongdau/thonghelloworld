import { CART, PAYMENT } from "../types";

const initialState = {
    loading: false,
    data: {},
    error: null
};

const cartReducer = (state = initialState, action) => {

    switch (action.type) {
        case CART.CONSUMER_CART_LOADING:
            return {...state, loading: true, error: null};
        case CART.ADD_TO_CART_LOADING:
            return {...state, loading: true, error: null};
        case CART.PROMO_CODE_LOADING:
            return {...state, loading: true, error: null};
        case CART.CONSUMER_CART_INFO_LOADING:
            return {...state, loading: true, error: null};
        case PAYMENT.ADD_PAY_METHOD_LOADING:
            return {...state, loading: true, error: null};
        case CART.CONSUMER_CART_INFO_SUCCESS:
            return {...state, loading: false, data: action.cart, error: null};
        case CART.CONSUMER_CART_INFO_ERROR:
            return {...state, loading: false, error: action.error};
        case CART.DELETE_FROM_CART:
            return {...state, loading: true, error: null};
        case CART.ADD_CART_ADDRESS:
            return {...state, loading: true, error: null};
        default:
            return state;
    }
};

export default cartReducer;