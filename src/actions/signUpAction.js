import { AUTH } from './../types';

export const signUpDataAction = (values, navigation) => {
    return {
        type: AUTH.SIGN_UP_LOADING,
        values,
        navigation
    };
};

export const setSignUpSuccess = user => {
    return {
        type: AUTH.SIGN_UP_SUCCESS,
        user
    }
};

export const setSignUpError = error => {
    return {
        type: AUTH.SIGN_UP_ERROR,
        error
    }
};

export const setSignUpLogout = () => {
    return {
        type: AUTH.SIGN_UP_LOGOUT
    }
};