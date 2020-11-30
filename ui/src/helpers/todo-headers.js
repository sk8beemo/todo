export const baseURL = 'http://127.0.0.1:8000/';

export function addToDoHeader(toDo, token) {
    return {
        url: 'api/v1/todolist/todo',
        method: 'post',
        baseURL: baseURL,

        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'JWT ' + token
        },

        data: {
            title: toDo,
            children: []
        }
    }
}

export function deleteToDoHandlerHeader(toDo, token) {
    return {
        url: `api/v1/todolist/todo/${toDo.id}`,
        method: 'put',
        baseURL: baseURL,

        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'JWT ' + token
        },

        data: {
            title: toDo.title,
            in_archive: !toDo.in_archive
        }
    }
}

export function deleteForeverToDoHandlerHeader(toDo, token) {
    return {
        url: `api/v1/todolist/todo/${toDo.id}`,
        method: 'delete',
        baseURL: baseURL,

        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'JWT ' + token
        },

        data: {
            title: toDo.title,
        }
    }
}

export function tabSwitcherHandlerHeader(value, token) {
    let params;
    if (value === 0) {

    } else if (value === 1) {
        params = {
            is_completed: 'False'
        }
    } else if (value === 2) {
        params = {
            is_completed: 'True'
        }
    } else if (value === 3) {
        params = {
            in_archive: 'True'
        }
    }
    return {
        url: 'api/v1/todolist',
        method: 'get',
        baseURL: baseURL,

        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'JWT ' + token
        },

        params
    }
}