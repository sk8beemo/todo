import axios from "axios";

import {FETCH_TODO_LIST_ERROR, FETCH_TODO_LIST_START, FETCH_TODO_LIST_SUCCESS, FETCH_TODO_STATUS} from "./actionTypes";

export function statusToDoHandler(todo, index) {
    return async (dispatch, getState) => {
        const authToken = getState().auth.accessToken;
        todo.is_completed = !todo.is_completed;
        const options = {
            method: 'put',
            url: `http://127.0.0.1:8000/api/v1/todolist/todo/${todo.id}`,
            headers: {
                Authorization: `JWT ${authToken}`,
            },
            data: todo,
        };
        const response = await axios(options);
        dispatch(fetchToDoStatus(response.data, index));
    }
}

export function fetchToDoStatus(todo, index) {
    return {
        type: FETCH_TODO_STATUS,
        todo: todo,
        index: index
    }
}

export function fetchTodoList() {
    return async (dispatch, getState) => {
        dispatch(fetchTodoListStart());
        const options = {
            method: 'GET',
            headers: {
                'Authorization': `JWT ${getState().auth.accessToken}`,
            },
            url: 'http://127.0.0.1:8000/api/v1/todolist',
        };
        try {
            const response = await axios(options);
            dispatch(fetchTodoListSuccess(response.data));
        } catch(e) {
            dispatch(fetchTodoListError(e))
        }
    }
}

export function fetchTodoListStart() {
    return {
        type: FETCH_TODO_LIST_START,
    }
}

export function fetchTodoListSuccess(todoList) {
    return {
        type: FETCH_TODO_LIST_SUCCESS,
        todoList
    }
}

export function fetchTodoListError(error) {
    return {
        type: FETCH_TODO_LIST_ERROR,
        error
    }
}