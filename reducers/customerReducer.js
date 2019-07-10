import { CUSTOMER } from "../types";

const initialState = {
    loading: false,
    data: [],
    error: null
};

const sellerReducer = (state = initialState, action) => {
    switch(action.type) {
        case CUSTOMER.MY_INFO_LOADING:
            return { ...state, loading: true, error: null };
        case CUSTOMER.CHANGE_USER_ADDRESS:
            return { ...state, loading: true, error: null };
        case CUSTOMER.DELETE_USER_ADDRESS:
            return { ...state, loading: true, error: null };
        case CUSTOMER.MY_INFO_SUCCESS:
            return { ...state, loading: false, data: action.payload, error: null };
        case CUSTOMER.MY_INFO_ERROR:
            return { ...state, loading: false, error: action.error, data: [] };
        default:
            return state;
    }
};

export default sellerReducer;