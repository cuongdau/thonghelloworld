import {WATCH} from "../types";

const initialState = {
    loading: false,
    data: {},
    error: null
};

const watchListReducer = (state = initialState, action) => {

    switch (action.type) {
        case WATCH.WATCH_LIST_INFO_LOADING:
            return {...state, loading: true, error: null};
        case WATCH.ADD_TO_WATCH_LIST:
            return {...state, loading: true, error: null};
        case WATCH.DELETE_FROM_WATCH_LIST:
            return {...state, loading: true, error: null};
        case WATCH.WATCH_LIST_INFO_SUCCESS:
            return {...state, loading: false, data: action.data, error: null};
        case WATCH.WATCH_LIST_INFO_ERROR:
            return {...state, loading: false, error: action.error};
        default:
            return state;
    }
};

export default watchListReducer;