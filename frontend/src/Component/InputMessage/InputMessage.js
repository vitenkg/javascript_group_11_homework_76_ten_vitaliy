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
    const [warningText, setWarningText] = useState('');

    useEffect(() => {
        if (error) {
            setWarningText('Пустое сообщение');
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
                <Grid container justifyContent="space-between" alignItems="center">
                    <Grid item>
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
                    </Grid>
                    <Grid item spasing={2}>
                        <Button

                            type="submit"
                            variant="outlined"
                        >
                            Отправить
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Grid>
    );
};

export default React.memo(InputMessage);