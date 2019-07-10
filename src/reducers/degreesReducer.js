import { DEGREE } from "../types";

const degreesReducer = (state = null, action) => {
    if(action.type === DEGREE.CHANGE_VALUE) {
        return action.value
    }
    return state;
};

export default degreesReducer;