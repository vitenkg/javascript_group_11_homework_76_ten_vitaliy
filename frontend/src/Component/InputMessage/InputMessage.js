import React, {useEffect, useState} from 'react';
import './InputMessage.css';
import {Button, Grid, makeStyles, TextField} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(2),
            width: 700,
        },
    },
}));

const InputMessage = ({error, newMessage, onChangeInput, onSubmitForm}) => {
    const classes = useStyles();
    const [warningText,setWarningText] = useState('');

    useEffect(()=> {
        if (error) {
            setWarningText('Empty Text Field');
        } else {
            setWarningText("");
        }
    }, [onSubmitForm]);

    return (
        <Grid container spacing={2}>
            <form
                className={classes.root}
                noValidate
                autoComplete="off"
                onSubmit={onSubmitForm}
            >
                <TextField
                    error={error}
                    id="inputPost"
                    label="Введите сооющение"
                    value={newMessage}
                    onChange={onChangeInput}
                    variant="outlined"
                    helperText={warningText}
                    rows={4}
                    multiline
                />
                <Button
                    type="submit"
                    variant="outlined"
                >
                    Отправить
                </Button>
            </form>
        </Grid>
    );
};

export default React.memo(InputMessage);