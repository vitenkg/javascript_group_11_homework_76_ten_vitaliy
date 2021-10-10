import axios from "axios";
import ring from '../../audio/u_edomlenie.mp3';

export const FETCH_MESSAGES_REQUEST = 'FETCH_MESSAGES_REQUEST';
export const FETCH_MESSAGES_SUCCESS = 'FETCH_MESSAGES_SUCCESS';
export const FETCH_MESSAGES_FAiLURE = 'FETCH_MESSAGES_FAiLURE';

export const FETCH_NEW_MESSAGE_REQUEST = 'FETCH_NEW_MESSAGE_REQUEST';
export const FETCH_NEW_MESSAGE_SUCCESS = 'FETCH_NEW_MESSAGE_SUCCESS';
export const FETCH_NEW_MESSAGE_FAiLURE = 'FETCH_NEW_MESSAGE_FAiLURE';

export const POST_MESSAGE_REQUEST = 'POST_MESSAGE_REQUEST';
export const POST_MESSAGE_SUCCESS = 'POST_MESSAGE_SUCCESS';
export const POST_MESSAGE_FAILURE = 'POST_MESSAGE_FAILURE';

export const CHANGE_MESSAGE_VALUE = 'CHANGE_MESSAGE_VALUE';
export const INPUT_FILL_ERASE = 'INPUT_FILL_ERASE';

export const fetchMessagesRequest = () => ({type:FETCH_MESSAGES_REQUEST});
export const fetchMessagesSuccess = data => ({type:FETCH_MESSAGES_SUCCESS, payload: data});
export const fetchMessagesFailure = () => ({type:FETCH_MESSAGES_FAiLURE});

export const fetchNewMessageRequest = () => ({type:FETCH_NEW_MESSAGE_REQUEST});
export const fetchNewMessageSuccess = data => ({type:FETCH_NEW_MESSAGE_SUCCESS, payload: data});
export const fetchNewMessageFailure = () => ({type:FETCH_NEW_MESSAGE_FAiLURE});

export const postMessageRequest = () => ({type: POST_MESSAGE_REQUEST});
export const postMessageSuccess = () => ({type: POST_MESSAGE_SUCCESS});
export const postMessageFailure = error => ({type: POST_MESSAGE_FAILURE, payload: error});

export const changeMessageValue = value => ({type:CHANGE_MESSAGE_VALUE, payload: value});
export const inputFillErase = () => ({type:INPUT_FILL_ERASE});

export const fetchMessages = () => {
    return async dispatch => {
        try {
            dispatch(fetchMessagesRequest());
            const response = await axios.get('http://localhost:8000/messages');
            dispatch(fetchMessagesSuccess(response.data));
        } catch (e) {
            dispatch(fetchMessagesFailure());
        }
    };
};

export const fetchNewMessage = lastMsg => {
    const audio = new Audio(ring);
    return async dispatch => {
        try {
            dispatch(fetchNewMessageRequest());
            const response = await axios.get('http://localhost:8000/messages?datetime=' + lastMsg);
            const newMessage = response.data;
            if (newMessage.length > 0) {
                await audio.play();
                dispatch(fetchNewMessageSuccess(response.data));
            }
        } catch (e) {
          dispatch(fetchNewMessageFailure())
        }
    };
};

export const postNewMessage = ({author, message}) => {
    return async dispatch => {
        try {
            dispatch(postMessageRequest());
            await axios.post('http://localhost:8000/messages', {
                author: author,
                message: message,
            });
            await dispatch(postMessageSuccess());
            await dispatch(inputFillErase());

        } catch (e) {
            dispatch(postMessageFailure(e));
        }

    };
};