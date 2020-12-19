import React from "react";
import ListItem from "@material-ui/core/ListItem";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import {addToDoHandler, deleteToDoHandler, inArchiveToDoHandler, statusToDoHandler} from "../../../store/actions/todo";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import {useDispatch} from "react-redux";
import {makeStyles} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles({
    ListItem: {
        justifyContent: 'flex-end'
    },
    FormControlLabel: {
        marginRight: 'auto'
    },
    subListItem: {
        position: 'relative',
        left: '10px',
        bottom: '0',
        paddingLeft: '10%',
        paddingRight: '0',
        paddingTop: '0',
        paddingBottom: '0',
        transform: 'scale(0.9)'
    },
    InVisibleInput: {
        display: 'none',
    },
    VisibleInput: {
        display: 'flex',
    },
    Form: {
        margin: '0 12px',
        marginLeft: '20px',
        flexWrap: 'nowrap',
        justifyContent: 'flex-end',
    },
});

export const ToDoItem = props => {
    const classes = useStyles();

    const dispatch = useDispatch();

    const deleteClickHandler = toDo => {
        dispatch(inArchiveToDoHandler(toDo));
    }

    const deleteForeverHandler = toDo => {
        dispatch(deleteToDoHandler(toDo));
    }

    const [show, setShow] = React.useState(false);

    const [toDo, setToDo] = React.useState({
        title: '',
        parent: null
    });
    const inputHandler = (event, id) => {
        const value = event.target.value;
        setToDo({title: value, parent: id});
    }
    const submitHandler = event => {
        event.preventDefault();

        if (toDo.length !== 0) {
            dispatch(addToDoHandler(toDo.title, toDo.parent));
            setShow(!show);
            setToDo({title: '', parent: null});
        }
    }

    return (
        <div key={props.item.id}>
            <ListItem className={classes.ListItem} role={undefined} dense button >
                <FormControlLabel
                    className={`${classes.FormControlLabel} ${(props.item.is_completed ? ' todo__completed' : '')}`}
                    control={
                        <Checkbox
                            checked={props.item.is_completed}
                            onChange={() => dispatch(statusToDoHandler(props.item))}
                            name={props.item.title} />}
                    label={props.item.title}
                />
                <AddIcon onClick={() => setShow(!show)} />
                <DeleteIcon
                    className={classes.DeleteIcon}
                    onClick={() => deleteClickHandler(props.item)}
                />
                <DeleteForeverIcon
                    className={classes.DeleteForeverIcon}
                    onClick={() => deleteForeverHandler(props.item)}
                />
            </ListItem>
            <form
                noValidate
                autoComplete="off"
                className={`${classes.Form} ${(show ? classes.VisibleInput : classes.InVisibleInput)}`}
                onSubmit={submitHandler}
            >
                <TextField
                    className={classes.addSubTodo}
                    id="outlined-basic"
                    label="Add subtodo"
                    variant="outlined"
                    value={toDo.title}
                    onChange={(event) => inputHandler(event, props.item.id)}
                />
            </form>
            {
                props.item.children.map((subItem) => {
                    return (
                        <ListItem className={classes.subListItem} key={subItem.id} role={undefined} dense button >
                            <FormControlLabel
                                className={`${classes.FormControlLabel} ${(subItem.is_completed ? ' todo__completed' : '')}`}
                                control={
                                    <Checkbox
                                        checked={subItem.is_completed}
                                        onChange={() => dispatch(statusToDoHandler(subItem))}
                                        name={subItem.title} />}
                                label={subItem.title}
                            />
                            <DeleteForeverIcon
                                className={classes.DeleteForeverIcon}
                                onClick={() => deleteForeverHandler(subItem)}
                            />
                        </ListItem>
                    )
                })
            }
        </div>
    )
}