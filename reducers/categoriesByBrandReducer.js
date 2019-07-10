import { HOME } from "../types";

const initialState = {
    loading: false,
    data: {
        category: null
    },
    error: false
};

const categoriesByBrandReducer = (state = initialState, action) => {
    switch(action.type) {
        case HOME.CATEGORIES_BY_BRAND_LOADING:
            return { ...state, loading: true, error: false };
        case HOME.CATEGORIES_BY_BRAND_SUCCESS:
            return { ...state, loading: false, data: action.categories };
        case HOME.CLEAR_CATEGORIES_BY_BRAND:
            return { ...state, loading: false, data: {category: null} };
        case HOME.CATEGORIES_BY_BRAND_ERROR:
            return { ...state, loading: false, error: true };
        default:
            return state;
    }
};

export default categoriesByBrandReducer;