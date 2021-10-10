import React, {useEffect} from 'react';
import InputMessage from "../../Component/InputMessage/InputMessage";
import DisplayMessages from "../../Component/DisplayMessages/DisplayMessages";
import './Chat.css';
import {useDispatch, useSelector} from "react-redux";
import {changeMessageValue, fetchMessages, fetchNewMessage, postNewMessage} from "../../store/Actions/ChatAction";


const Chat = () => {
    const dispatch = useDispatch();
    const messages = useSelector(state => state.chat.messages);
    const newMessage = useSelector(state => state.chat.newMessage);
    const errorPost = useSelector(state => state.chat.errorSentMessage)

    useEffect(() => {
        dispatch(fetchMessages());
    }, [dispatch]);

    useEffect(() => {
        const interval = setInterval(() => {
            let lastMsg = messages[messages.length - 1].datetime;
            console.log(lastMsg);
            dispatch(fetchNewMessage(lastMsg));
        }, 3000);
        return () => clearInterval(interval);
    }, [dispatch, messages]);

    const inputSubmitForm = async (e) => {
        e.preventDefault();
        dispatch(postNewMessage({author: 'Writer', message: newMessage}));

    };

    const onChangeHandler = e => {
        const {value} = e.target;
        dispatch(changeMessageValue(value));

    };

    return (
        <>
            <div className="Cont">
                <DisplayMessages
                    messages={messages}
                />
                <InputMessage
                    error={errorPost}
                    onSubmitForm = {inputSubmitForm}
                    newMessage={newMessage}
                    onChangeInput={onChangeHandler}
                />
            </div>
        </>

    );
};

export default Chat;