import { HOME } from "../types";

const initialState = {
    loading: false,
    data: [],
    error: false
};

const productsReducer = (state = initialState, action) => {
    switch(action.type) {
        case HOME.PRODUCTS_LOADING:
            return { ...state, loading: true, error: false };
        case HOME.PRODUCTS_SUCCESS:
            return { ...state, loading: false, data: action.payload };
        case HOME.PRODUCTS_ERROR:
            return { ...state, loading: false, error: true };
        default:
            return state;
    }
};

export default productsReducer;