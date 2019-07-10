import {WATCH} from "../types";

export const getWatchList = user => {
    return {
        type: WATCH.WATCH_LIST_INFO_LOADING,
        user
    }
};

export const watchListSuccess = data => {
    return {
        type: WATCH.WATCH_LIST_INFO_SUCCESS,
        data
    }
};

export const watchListError = error => {
    return {
        type: WATCH.WATCH_LIST_INFO_ERROR,
        error
    }
};

export const addToWatchList = (user, product) => {
    return {
        type: WATCH.ADD_TO_WATCH_LIST,
        user,
        product
    }
};

export const delFromWatchList = (user, product) => {
    return {
        type: WATCH.DELETE_FROM_WATCH_LIST,
        user,
        product
    }
};