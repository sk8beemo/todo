import {AUTH_ERROR, AUTH_LOGOUT, AUTH_SUCCESS} from "../actions/actionTypes";

const initialState = {
    accessToken: null,
    refreshToken: null,
    error: null
}

export default function authReducer(state=initialState, action) {
    switch (action.type) {
        case AUTH_SUCCESS:
            return {
                ...state,
                accessToken: action.accessToken,
                refreshToken: action.refreshToken
            }
        case AUTH_ERROR:
            return {
                ...state, error: action.error
            }
        case AUTH_LOGOUT:
            return {
                ...state,
                accessToken: null,
                refreshToken: null,
            }
        default:
            return state
    }
}