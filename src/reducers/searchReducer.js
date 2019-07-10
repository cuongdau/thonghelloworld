import { HOME } from "../types";

const searchReducer = (state = '', action) => {
    switch(action.type) {
        case HOME.SET_SEARCH_VALUE:
            return action.value;
        case HOME.CLEAR_SEARCH_VALUE:
            return '';
        default:
            return state;
    }
};

export default searchReducer;