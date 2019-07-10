import { HOME } from "../types";

const initialState = {
    loading: false,
    data: {},
    error: null
};

const categoryProductsReducer = (state = initialState, action) => {
    switch(action.type) {
        case HOME.CATEGORY_PRODUCTS_LOADING:
            return { ...state, loading: true, error: null };
        case HOME.CATEGORY_PRODUCTS_SUCCESS:
            return { ...state, loading: false, data: Object.assign({}, state.data, action.payload)};
        case HOME.CATEGORY_PRODUCTS_ERROR:
            return { ...state, loading: false, error: action.error };
        case HOME.CATEGORY_PRODUCTS_CLEAR:
            return { ...state, loading: false, data: [], error: null };
        default:
            return state;
    }
};

export default categoryProductsReducer;