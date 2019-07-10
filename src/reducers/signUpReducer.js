import { AUTH } from "../types";

const initialState = {
    loading: false,
    user: {},
    error: null
};

const signUpReducer = (state = initialState, action) => {
    switch(action.type) {
        case AUTH.SIGN_UP_LOADING:
            return { ...state, loading: true, error: null };
        case AUTH.SIGN_UP_SUCCESS:
            return { ...state, loading: false, user: action.user };
        case AUTH.SIGN_UP_ERROR:
            return { ...state, loading: false, error: action.error };
        case AUTH.SIGN_UP_LOGOUT:
            return {...state, loading: false, error: null};
        default:
            return state;
    }
};

export default signUpReducer;