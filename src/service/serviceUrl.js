export const serviceUrl = (serviceCode, request) => {
    switch (serviceCode) {
        case 'login':
            return 'http://localhost:8181/api/auth/login'
        case 'logout':
            return 'http://localhost:8181/api/auth/logout'
        case 'register':
            return 'http://localhost:8181/api/auth/register'
        case 'getAllTodos':
            return 'http://localhost:8181/api/todo/user'
        case 'addTodo':
            return 'http://localhost:8181/api/todo'
        case 'deleteTodo':
            return 'http://localhost:8181/api/todo/' + request._id
        case 'updateTodo':
            return 'http://localhost:8181/api/todo/' + request._id
        case 'searchTodo':
            return 'http://localhost:8181/api/todo/user?q=' + request.q + '&' + 'filter='+request.filter 
        default:
            break;
    }
}