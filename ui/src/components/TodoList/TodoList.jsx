import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {makeStyles} from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Checkbox from "@material-ui/core/Checkbox";
import ListItemText from "@material-ui/core/ListItemText";
import DeleteIcon from '@material-ui/icons/Delete';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

import {statusToDoHandler, fetchTodoList} from "../../store/actions/todo";


//TODO: добавить label для input['checkbox']
//TODO: завершенные таски зачёркнутым текстом
//TODO: добавить/удалить таску

const useStyles = makeStyles({
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
});

function TodoList (props) {
    const classes = useStyles();

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
                    <Tab label="All" />
                    <Tab label="Active" />
                    <Tab label="Done" />
                </Tabs>
            </Paper>
            <List className={classes.List}>
                {
                    todoList.map((item, index) => {
                        const labelId = `checkbox-list-label-${item}`;
                        return (
                            <ListItem key={index} role={undefined} dense button >
                                <ListItemIcon>
                                    <Checkbox
                                        edge="start"
                                        checked={item.is_completed}
                                        onChange={() => dispatch(statusToDoHandler(item))}
                                        tabIndex={-1}
                                        disableRipple
                                        inputProps={{ 'aria-labelledby': labelId }}
                                    />
                                </ListItemIcon>
                                <ListItemText id={labelId} primary={item.title} />
                                <DeleteIcon />
                                <DeleteForeverIcon />
                            </ListItem>
                        );
                    })
                }
            </List>
        </Container>
    )
}

export default TodoList;