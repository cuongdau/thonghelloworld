import { HOME } from "../types";

const initialState = {
    loading: false,
    data: [],
    error: false
};

const categoriesReducer = (state = initialState, action) => {
    switch(action.type) {
        case HOME.CATEGORIES_LOADING:
            return { ...state, loading: true, error: false };
        case HOME.CATEGORIES_SUCCESS:
            return { ...state, loading: false, data: action.categories };
        case HOME.CATEGORIES_ERROR:
            return { ...state, loading: false, error: true };
        default:
            return state;
    }
};

export default categoriesReducer;