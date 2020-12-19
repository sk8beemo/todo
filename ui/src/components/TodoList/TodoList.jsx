import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {makeStyles} from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import List from "@material-ui/core/List";
import TextField from "@material-ui/core/TextField";
import AddIcon from '@material-ui/icons/Add';
import Button from "@material-ui/core/Button";

import {addToDoHandler, tabSwitcherHandler} from "../../store/actions/todo";
import "./TodoList.css";
import {ToDoItem} from "./ToDoItem/ToDoItem";


//TODO: удалить таску
//TODO: добавить подзадачу
//TODO: фильтр todo по завершенности, и корзина
//TODO: тесты
//TODO: прелоадер на действия с todo
//TODO: регистрация/рефактор авторизации(фикс автологина)
//TODO: Если таска завершается, подтаски тоже завершаются

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

function TodoList () {
    const classes = useStyles();

    const todoList = useSelector(state => state.todo.todoList);
    const dispatch = useDispatch();
    React.useEffect(() => {
        dispatch(tabSwitcherHandler(value));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
        dispatch(tabSwitcherHandler(newValue));
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
                            <ToDoItem
                                key={item.id}
                                item={item}
                            />
                        )
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