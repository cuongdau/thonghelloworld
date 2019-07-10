import { SELLER } from "../types";

const initialState = {
    loading: false,
    data: {},
    error: null
};

const sellerReducer = (state = initialState, action) => {
    switch(action.type) {
        case SELLER.SHOP_INFO_LOADING:
            return { ...state, loading: true, error: null };
        case SELLER.SHOP_EDIT_INFO_LOADING:
            return { ...state, loading: true, error: null };
        case SELLER.SHOP_INFO_SUCCESS:
            return { ...state, loading: false, data: action.payload, error: null };
        case SELLER.SHOP_INFO_ERROR:
            return { ...state, loading: false, error: action.error, data: {} };
        default:
            return state;
    }
};

export default sellerReducer;