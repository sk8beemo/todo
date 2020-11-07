import axios from 'axios';
import {AUTH_ERROR, AUTH_SUCCESS} from "./actionTypes";

export default function auth(email, password) {
    return async dispatch => {
        const authData = {
            email: email.value,
            password: password.value
        }
        try {
            const response = await axios.post('http://127.0.0.1:8000/auth/jwt/create/', authData);
            const data = response.data;

            localStorage.setItem(
                'accessToken', data.access
            )
            localStorage.setItem(
                'Email', email.value
            )
            localStorage.setItem(
                'refreshToken', data.refresh
            )

            dispatch(authSuccess(data.access));
        } catch (e) {
            console.log(e);
            dispatch(authError(e));
        }
    }
}

export function authSuccess(token) {
    return {
        type: AUTH_SUCCESS,
        token
    }
}

export function authError(error) {
    return {
        type: AUTH_ERROR,
        error
    }
}