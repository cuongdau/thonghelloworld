import { CHECK } from "../types";

const initialState = {
    billing: false
};

const checkReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHECK.VISIBLE_BILLING_ADDRESS:
            return {...state, billing: action.payload};
        default:
            return state;
    }
};

export default checkReducer;