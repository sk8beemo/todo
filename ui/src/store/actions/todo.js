import axios from "axios";

import {
    ADD_TODO_ERROR,
    ADD_TODO_START, ADD_TODO_SUCCESS,
    FETCH_TODO_LIST_ERROR,
    FETCH_TODO_LIST_START,
    FETCH_TODO_LIST_SUCCESS,
    FETCH_TODO_STATUS, IN_ARCHIVE_TODO_ERROR, IN_ARCHIVE_TODO_START, IN_ARCHIVE_TODO_SUCCESS
} from "./actionTypes";
import {
    addToDoHeader,
    deleteForeverToDoHandlerHeader,
    deleteToDoHandlerHeader,
    tabSwitcherHandlerHeader
} from "../../helpers/todo-headers";

export function tabSwitcherHandler(value) {
    return async (dispatch, getState) => {
        const authToken = getState().auth.accessToken;
        const options = tabSwitcherHandlerHeader(value, authToken);
        dispatch(fetchTodoListStart());
        try {
            const response = await axios(options);
            dispatch(fetchTodoListSuccess(response.data));
        } catch(e) {
            dispatch(fetchTodoListError(e))
        }
    }
}

export function addToDoHandler(toDo, parent) {
    return async (dispatch, getState) => {
        const authToken = getState().auth.accessToken;
        const options = addToDoHeader(toDo, parent, authToken);
        dispatch(addToDoStart());
        try{
            const response = await axios(options);
            dispatch(addToDoSuccess(response.data));
        } catch (e) {
            dispatch(addToDoError(e))
        }
    }
}

export function inArchiveToDoHandler(toDoItem) {
    return async (dispatch, getState) => {
        const authToken = getState().auth.accessToken;
        const todo = getState().todo.todoList;
        const options = deleteToDoHandlerHeader(toDoItem, authToken);
        dispatch(inArchiveTodoStart());
        try {
            await axios(options);
            dispatch(inArchiveTodoSuccess(todo.filter(item => item.id !== toDoItem.id)));
        } catch(e) {
            dispatch(inArchiveTodoError(e));
        }
    }
}

export function deleteToDoHandler(toDoItem) {
    return async (dispatch, getState) => {
        const authToken = getState().auth.accessToken;
        const todo = getState().todo.todoList;
        const options = deleteForeverToDoHandlerHeader(toDoItem, authToken);
        dispatch(inArchiveTodoStart());
        try {
            await axios(options);
            dispatch(inArchiveTodoSuccess(todo.filter(item => item.id !== toDoItem.id)));
        } catch(e) {
            dispatch(inArchiveTodoError(e));
        }
    }
}

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

export function inArchiveTodoStart() {
    return {
        type: IN_ARCHIVE_TODO_START
    }
}
export function inArchiveTodoSuccess(data) {
    return {
        type: IN_ARCHIVE_TODO_SUCCESS,
        data
    }
}
export function inArchiveTodoError(error) {
    return {
        type: IN_ARCHIVE_TODO_ERROR,
        error
    }
}
export function addToDoStart() {
    return {
        type: ADD_TODO_START
    }
}
export function addToDoSuccess(todo) {
    return {
        type: ADD_TODO_SUCCESS,
        todo: {
            id: todo.id,
            parent: todo.parent,
            children: [],
            title: todo.title,
            is_completed: todo.is_completed,
            in_archive: todo.in_archive
        }
    }
}
export function addToDoError(error) {
    return {
        type: ADD_TODO_ERROR,
        payload: error
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