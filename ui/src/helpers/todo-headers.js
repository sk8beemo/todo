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
            title: toDo
        }
    }
}
