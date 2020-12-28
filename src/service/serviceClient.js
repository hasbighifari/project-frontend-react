import { serviceUrl } from './serviceUrl'
import { serviceStart, serviceEnd } from '../actions/systemAction'
import { snackbarErrorMsg, snackbarErrorStatus, closeSnackbar } from '../actions/systemAction';
import { loginStatus } from '../actions/userAction'
import store from '../Store'

export const SendToService = (request, method, serviceCode, onsucceed) => {
    let xAuthToken = localStorage.getItem('x-auth-token')
    let requestJson = JSON.stringify(request)
    let oReq = new XMLHttpRequest();
    console.log('request', request)
    console.log('url', serviceUrl(serviceCode, request))
    console.log('method', method)
    store.dispatch(serviceStart())
    oReq.open(method, serviceUrl(serviceCode, request), true);
    oReq.setRequestHeader("Content-Type", "application/json")
    if (serviceCode !== 'login') {
        oReq.setRequestHeader('x-auth-token', xAuthToken)
    }
    oReq.send(requestJson)
    oReq.addEventListener('load', () => {
        if (oReq.readyState === 4 && oReq.status === 200) {
            let response = {
                headers: {
                    'statusCode': String(oReq.status),
                    'x-auth-token': oReq.getResponseHeader('x-auth-token'),
                },
                body: JSON.parse(oReq.responseText)
            }
            store.dispatch(serviceEnd())
            if (serviceCode === 'login') {
                store.dispatch(snackbarErrorMsg("login is success"))
                store.dispatch(snackbarErrorStatus("success"))
            }
            else if (serviceCode === 'addTodo') {
                store.dispatch(snackbarErrorMsg("add Todo is success"))
                store.dispatch(snackbarErrorStatus("success"))
            }
            else if (serviceCode === 'deleteTodo') {
                store.dispatch(snackbarErrorMsg("Delete Todo is success"))
                store.dispatch(snackbarErrorStatus("success"))
            }
            else if (serviceCode === 'updateTodo') {
                store.dispatch(snackbarErrorMsg("update Todo is success"))
                store.dispatch(snackbarErrorStatus("success"))
            }
            else if (serviceCode === 'register') {
                store.dispatch(snackbarErrorMsg("register is success"))
                store.dispatch(snackbarErrorStatus("success"))
            }
            onsucceed(response)
        }
        else {
            let response = {
                headers: {
                    'statusCode': String(oReq.status),
                    'x-auth-token': oReq.getResponseHeader('x-auth-token')
                },
                body: JSON.parse(oReq.responseText)
            }
            console.log('response', response)
            store.dispatch(serviceEnd())
            store.dispatch(snackbarErrorMsg(response.body.errorMessage))
            store.dispatch(snackbarErrorStatus("error"))
            if (response.body.errorMessage === 'your session is finish, please login again') {
                // onsucceed(response)
                store.dispatch(loginStatus(false))
                localStorage.setItem('x-auth-token', '')
            }
            else if (response.body.errorMessage === 'Access denied. No provided token') {
                store.dispatch(loginStatus(false))
                localStorage.setItem('x-auth-token', '')
            }
        }
    })
}