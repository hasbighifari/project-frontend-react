const intialstate = {
    serviceStart: false,
    snackbarMsg: null,
    snackbarStatus: null,
}

const system = (state = intialstate, action) => {
    switch(action.type) {
        case 'SERVICE_START':
            return {
                ...state,
                serviceStart: true
            }
        case 'SERVICE_END':
            return {
                ...state,
                serviceStart: false
            }
        case 'SNACKBAR_ERROR_MSG':
            return {
                ...state,
                snackbarMsg: action.msg
            }
        case 'SNACKBAR_ERROR_STATUS':
            return  {
                ...state,
                snackbarStatus: action.val
            }
        case 'CLOSE_SNACKBAR':  
            return {
                ...state,
                snackbarMsg: null,
                snackbarStatus: false
            }
        case 'LOGOUT_STATUS':
            return {
                ...state,
                logout: true
            }
        default: // need this for default case
            return state 
    }
}

export default system;
