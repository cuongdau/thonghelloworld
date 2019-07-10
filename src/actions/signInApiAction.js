import { AUTH } from './../types';

export const signInApiDataAction = (values, navigation) => {
    return {
        type: AUTH.SIGN_IN_API_LOADING,
        values,
        navigation
    };
};

export const signInFbDataAction = (email, navigation) => {
    return {
        type: AUTH.SIGN_IN_FB_LOADING,
        email,
        navigation
    };
};

export const setSignInApiSuccess = user => {
    return {
        type: AUTH.SIGN_IN_API_SUCCESS,
        user
    }
};

export const setSignInApiError = error => {
    return {
        type: AUTH.SIGN_IN_API_ERROR,
        error
    }
};

export const setSignInApiLogout = () => {
    return {
        type: AUTH.SIGN_IN_API_LOGOUT
    }
};

export const submitUserData = values => {
    return {
        type: AUTH.CHANGE_USER_MAIN_LOADING,
        values
    };
};