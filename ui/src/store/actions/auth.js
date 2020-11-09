import axios from 'axios';
import {AUTH_ERROR, AUTH_LOGOUT, AUTH_SUCCESS} from "./actionTypes";

export function auth(email, password) {
    return async dispatch => {
        const authData = {
            email: email.value,
            password: password.value
        }
        try {
            const response = await axios.post('http://127.0.0.1:8000/auth/jwt/create/', authData);
            const data = response.data;

            const endAccessToken = new Date(new Date().getTime() + 1209600000);
            const endRefreshToken = new Date(new Date().getTime() + 2419200000);

            localStorage.setItem(
                'accessToken', data.access
            );
            localStorage.setItem(
                'endAccessToken', endAccessToken
            );
            localStorage.setItem(
                'Email', email.value
            );
            localStorage.setItem(
                'refreshToken', data.refresh
            );
            localStorage.setItem(
                'endRefreshToken', endRefreshToken
            );

            dispatch(authSuccess(data.access));
        } catch (e) {
            dispatch(authError(e));
        }
    }
}

export function autoLogin() {
    return dispatch => {
        const accessToken = localStorage.getItem('accessToken');
        const refreshToken = localStorage.getItem('refreshToken');
        if (!accessToken) {
            dispatch(logout())
        } else {
            const endAccessToken = new Date(localStorage.getItem('endAccessToken'));
            const endRefreshToken = new Date(localStorage.getItem('endRefreshToken'));
            if (endAccessToken <= new Date()) {
                if (endRefreshToken <= new Date()) {
                    dispatch(logout())
                } else {
                    dispatch(authSuccess(accessToken, refreshToken))
                }
            } else {
                dispatch(authSuccess(accessToken, refreshToken))
            }
        }
    }
}

export function logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('endAccessToken');
    localStorage.removeItem('Email');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('endRefreshToken');
    return {
        type: AUTH_LOGOUT
    }
}

export function authSuccess(accessToken, refreshToken) {
    return {
        type: AUTH_SUCCESS,
        accessToken,
        refreshToken
    }
}

export function authError(error) {
    return {
        type: AUTH_ERROR,
        error
    }
}