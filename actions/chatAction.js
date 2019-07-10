import { CHAT } from "../types";

const loadMessages = () => {
    return {
        type: CHAT.LOAD_MESSAGES
    }
};

const setMessagesSuccess = messages => {
    return {
        type: CHAT.SET_MESSAGES_SUCCESS,
        messages
    }
};

const setMessagesError = error => {
    return {
        type: CHAT.SET_MESSAGES_ERROR,
        error
    }
};

export { setMessagesSuccess, setMessagesError, loadMessages }