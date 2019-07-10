import { HOME } from "../types";

const categoryReducer = (state = null, action) => {
    if(action.type === HOME.CHANGE_CATEGORY) {
        return action.category;
    }
    return state;
};

export default categoryReducer;