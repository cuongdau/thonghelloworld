import { AUTH } from "../types";

const initialState = {
    loading: false,
    user: {},
    error: null
};

const signInApiReducer = (state = initialState, action) => {
    switch(action.type) {
        case AUTH.SIGN_IN_API_LOADING:
            return { ...state, loading: true, error: null };
        case AUTH.SIGN_IN_FB_LOADING:
            return { ...state, loading: true, error: null };
        case AUTH.SIGN_IN_API_SUCCESS:
            return { ...state, loading: false, user: action.user };
        case AUTH.SIGN_IN_API_ERROR:
            return { ...state, loading: false, error: action.error };
        case AUTH.SIGN_IN_API_LOGOUT:
            return {...state, loading: false, error: null, user: {}};
        default:
            return state;
    }
};

export default signInApiReducer;