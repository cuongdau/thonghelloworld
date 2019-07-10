import { HOME } from "../types";

const initialState = {
    loading: false,
    data: [],
    error: null
};

const brandsReducer = (state = initialState, action) => {
    switch(action.type) {
        case HOME.BRANDS_LOADING:
            return { ...state, loading: true, error: null };
        case HOME.BRANDS_SUCCESS:
            return { ...state, loading: false, data: action.brands };
        case HOME.BRANDS_ERROR:
            return { ...state, loading: false, error: action.error };
        default:
            return state;
    }
};

export default brandsReducer;