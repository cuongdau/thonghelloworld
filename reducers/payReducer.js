import {PAYMENT} from "../types";

const initialState = {
    loading: false,
    data: null,
    error: false
};

const payReducer = (state = initialState, action) => {
    switch (action.type) {
        case PAYMENT.PAY_LIST_LOADING:
            return {...state, loading: true, error: false};
        case PAYMENT.PAY_LIST_SUCCESS:
            return {...state, loading: false, data: action.payments};
        case PAYMENT.PAY_LIST_ERROR:
            return {...state, loading: false, error: action.error};
        default:
            return state;
    }
};

export default payReducer;