import { SELL } from "../types";

const listingReducer = (state = null, action) => {
    switch(action.type) {
        case SELL.EDIT_LISTING:
            return action.payload;
        case SELL.CLEAR_LISTING:
            return null;
        default:
            return state;
    }
};

export default listingReducer;