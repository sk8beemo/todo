import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {fetchTodoList} from "../../store/actions/todo";


function TodoList (props) {

    const todoList = useSelector(state => state.todo.todoList);
    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(fetchTodoList());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            {
                todoList.map((item, index) => {
                    return (
                        <h1 key={index}>{item.title}</h1>
                    )
                })
            }
        </div>
    )
}

export default TodoList;