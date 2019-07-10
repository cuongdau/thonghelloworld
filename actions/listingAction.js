import { SELL } from "../types";

export const editListing = payload => {
    return {
        type: SELL.EDIT_LISTING,
        payload
    }
};

export const clearListing = () => {
    return {
        type: SELL.CLEAR_LISTING
    }
};