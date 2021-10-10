import {
    CHANGE_MESSAGE_VALUE,
    FETCH_MESSAGES_FAiLURE,
    FETCH_MESSAGES_REQUEST,
    FETCH_MESSAGES_SUCCESS,
    FETCH_NEW_MESSAGE_FAiLURE,
    FETCH_NEW_MESSAGE_REQUEST,
    FETCH_NEW_MESSAGE_SUCCESS,
    INPUT_FILL_ERASE,
    POST_MESSAGE_FAILURE,
    POST_MESSAGE_REQUEST,
    POST_MESSAGE_SUCCESS
} from "../Actions/ChatAction";

const initialState = {
    messages: [{
        message: '',
        author: '',
        id: '',
        datetime: '',
    }],
    newMessage: '',
    fetchLoading: false,
    errorSentMessage: null,
};

const Reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_MESSAGES_REQUEST:
            return {...state, fetchLoading: true};
        case FETCH_MESSAGES_SUCCESS:
            return {...state, fetchLoading: false, messages: action.payload};
        case FETCH_MESSAGES_FAiLURE:
            return {...state, fetchLoading: false};
        case FETCH_NEW_MESSAGE_REQUEST:
            return {...state, fetchLoading: true};
        case FETCH_NEW_MESSAGE_SUCCESS:
            return {...state, fetchLoading: false, messages: [...state.messages.concat(action.payload)]};
        case FETCH_NEW_MESSAGE_FAiLURE:
            return {...state, fetchLoading: false};
        case POST_MESSAGE_REQUEST:
            return {...state,};
        case  POST_MESSAGE_SUCCESS:
            return {...state};
        case POST_MESSAGE_FAILURE:
            return {...state, errorSentMessage: action.payload}
        case CHANGE_MESSAGE_VALUE:
            return {...state, newMessage: action.payload};
        case INPUT_FILL_ERASE:
            return {...state, newMessage: '', errorSentMessage: null};
        default:
            return state;
    }
};

export default Reducer;