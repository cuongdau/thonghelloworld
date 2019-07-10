import { HOME } from "../types";

const subcategoryReducer = (state = null, action) => {
    if(action.type === HOME.CHANGE_SUBCATEGORY) {
        return action.category;
    }
    return state;
};

export default subcategoryReducer;