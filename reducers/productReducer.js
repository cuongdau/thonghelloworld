import { HOME } from "../types";

const initialState = {
    loading: false,
    data: null,
    error: false
};

const productReducer = (state = initialState, action) => {
    switch(action.type) {
        case HOME.CHANGE_PRODUCT:
            return { ...state, loading: true, error: false };
        case HOME.PRODUCT_SUCCESS:
            return { ...state, loading: false, data: action.payload };
        case HOME.PRODUCT_ERROR:
            return { ...state, loading: false, error: true };
        default:
            return state;
    }
};

export default productReducer;