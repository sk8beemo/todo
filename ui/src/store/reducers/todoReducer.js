import {
    ADD_TODO_ERROR,
    ADD_TODO_START, ADD_TODO_SUCCESS,
    FETCH_TODO_LIST_ERROR,
    FETCH_TODO_LIST_START,
    FETCH_TODO_LIST_SUCCESS,
    FETCH_TODO_STATUS
} from "../actions/actionTypes";

const initialState = {
    todoList: [],
    error: null,
    loading: false
}

export default function todoReducer(state=initialState, action) {
    switch (action.type) {
        case ADD_TODO_ERROR:
            return {
                ...state,
                error: action.payload
            }
        case ADD_TODO_SUCCESS:
            return {
                ...state,
                loading: false,
                todoList: [...state.todoList, action.payload]
            }
        case ADD_TODO_START:
            return {
                ...state,
                loading: true
            }
        case FETCH_TODO_STATUS:
            return {
                ...state,
                // eslint-disable-next-line array-callback-return
                todoList: state.todoList.map((todo, index) => index === action.index
                        ? {...todo, is_completed: action.todo.is_completed}
                        : todo
                )
            }
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