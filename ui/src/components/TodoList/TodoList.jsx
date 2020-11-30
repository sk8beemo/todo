import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {makeStyles} from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Checkbox from "@material-ui/core/Checkbox";
import DeleteIcon from '@material-ui/icons/Delete';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import TextField from "@material-ui/core/TextField";
import AddIcon from '@material-ui/icons/Add';
import Button from "@material-ui/core/Button";

import {
    statusToDoHandler,
    fetchTodoList,
    addToDoHandler,
    inArchiveToDoHandler,
    deleteToDoHandler
} from "../../store/actions/todo";
import "./TodoList.css";


//TODO: удалить таску
//TODO: добавить подзадачу
//TODO: фильтр todo по завершенности, и корзина
//TODO: тесты
//TODO: прелоадер на действия с todo
//TODO: регистрация/рефактор авторизации

const useStyles = makeStyles({
    Tab: {
        paddingLeft: 0,
        paddingRight: 0,
        minWidth: '100px',
    },
    Container: {
        marginTop: 100
    },
    Paper: {
        flexGrow: 1,
    },
    List: {
        width: '100%',
    },
    ListItem: {
        justifyContent: 'flex-end'
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
    FormControlLabel: {
        marginRight: 'auto'
    },
    MuiPickersUtilsProvider: {
        top: '10%',
    },
    Form: {
        margin: '0 12px',
        display: 'flex',
        flexWrap: 'nowrap',
    },
    addTodo: {
        width: '90%'
    },
});
const useIcons = makeStyles((theme) => ({
    root: {
        color: '#fff',
        backgroundColor: 'green',
        borderRadius: '20px'
    },
}));

function TodoList () {
    const classes = useStyles();
    const icons = useIcons();

    const todoList = useSelector(state => state.todo.todoList);
    const dispatch = useDispatch();
    React.useEffect(() => {
        dispatch(fetchTodoList());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [toDo, setToDo] = React.useState('');
    const inputHandler = event => {
        const value = event.target.value;
        setToDo(value);
    }
    const submitHandler = event => {
        event.preventDefault();

        if (toDo.length !== 0) {
            dispatch(addToDoHandler(toDo));
            setToDo('');
        }
    }

    const deleteClickHandler = toDo => {
        dispatch(inArchiveToDoHandler(toDo));
    }

    const deleteForeverHandler = toDo => {
        dispatch(deleteToDoHandler(toDo));
    }

    return (
        <Container className={classes.Container} maxWidth="sm">
            <Paper className={classes.Paper}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    centered
                >
                    <Tab className={classes.Tab} label="All" />
                    <Tab className={classes.Tab} label="Active" />
                    <Tab className={classes.Tab} label="Done" />
                    <Tab className={classes.Tab} label="basket" />
                </Tabs>
            </Paper>
            <List className={classes.List}>
                {
                    todoList.map((item) => {
                        return (
                            <div key={item.id}>
                                <ListItem className={classes.ListItem} role={undefined} dense button >
                                    <FormControlLabel
                                        className={`${classes.FormControlLabel} ${(item.is_completed ? ' todo__completed' : '')}`}
                                        control={
                                            <Checkbox
                                                checked={item.is_completed}
                                                onChange={() => dispatch(statusToDoHandler(item))}
                                                name={item.title} />}
                                                label={item.title}
                                    />
                                    {/*<AddIcon*/}
                                    {/*    className={icons.root}*/}
                                    {/*/>*/}
                                    <DeleteIcon
                                        className={classes.DeleteIcon}
                                        onClick={() => deleteClickHandler(item)}
                                    />
                                    <DeleteForeverIcon
                                        className={classes.DeleteForeverIcon}
                                        onClick={() => deleteForeverHandler(item)}
                                    />
                                </ListItem>
                                {
                                    item.children.map((subItem) => {
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
                                                <DeleteIcon className={classes.DeleteIcon}/>
                                                <DeleteForeverIcon className={classes.DeleteForeverIcon} />
                                            </ListItem>
                                        )
                                    })
                                }
                            </div>
                        );
                    })
                }
            </List>
            <form
                className={classes.Form}
                noValidate autoComplete="off"
                onSubmit={submitHandler}
            >
                <TextField
                    className={classes.addTodo}
                    id="outlined-basic"
                    label="Add todo"
                    variant="outlined"
                    value={toDo}
                    onChange={inputHandler}
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                >
                    <AddIcon />
                </Button>
            </form>
        </Container>
    )
}

export default TodoList;