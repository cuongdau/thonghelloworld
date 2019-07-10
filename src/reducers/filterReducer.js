import { HOME } from "../types";

const initialState = {
    conditions: [],
    brands: [],
    hands: [],
    genders: [],
    flexes: [],
    min: 0,
    max: 0,
    selected: "NEW"
};

const filterReducer = (state = initialState, action) => {
    switch (action.type) {
        case HOME.SET_FILTERS:
            return action.filters;
        case HOME.ADD_BRAND:
            return {...state, brands: [action.payload]};
        case HOME.CLEAR_FILTERS:
            return initialState;
        default:
            return state;
    }
};

export default filterReducer;