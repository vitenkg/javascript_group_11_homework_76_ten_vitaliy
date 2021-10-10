import React from 'react';
import './InputMessage.css';

const InputMessage = (props) => {

    return (
        <div className="WriteMessage">
            <form onSubmit={props.onSubmitForm}>
                <fieldset>
                    <legend>Отправить Сообщение</legend>
                    <input
                        id="InputPost"
                        type="text"
                        value={props.newMessage}
                        onChange={props.onChangeInput}
                    />
                    <button type="submit">Отправить</button>
                </fieldset>
            </form>
        </div>
    );
};

export default React.memo(InputMessage);