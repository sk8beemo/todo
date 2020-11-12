import axios from "axios";

import {FETCH_TODO_LIST_ERROR, FETCH_TODO_LIST_START, FETCH_TODO_LIST_SUCCESS} from "./actionTypes";

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