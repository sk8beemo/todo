import {FETCH_TODO_LIST_ERROR, FETCH_TODO_LIST_START, FETCH_TODO_LIST_SUCCESS} from "../actions/actionTypes";

const initialState = {
    todoList: [],
    error: null,
    loading: false
}

export default function todoReducer(state=initialState, action) {
    switch (action.type) {
        case FETCH_TODO_LIST_SUCCESS:
            return {
                ...state, loading: false, todoList: action.todoList
            }
        case FETCH_TODO_LIST_ERROR:
            return {
                ...state, error: action.error
            }
        case FETCH_TODO_LIST_START:
            return {
                ...state, loading: true
            }
        default:
            return {
                ...state
            }
    }
}