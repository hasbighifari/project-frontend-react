export const serviceStart = () => {
    return {
        type: 'SERVICE_START',
    }
}
export const serviceEnd = () => {
    return {
        type: 'SERVICE_END',
    }
}
export const snackbarErrorMsg = (msg) => {
    return  {
        type: 'SNACKBAR_ERROR_MSG',
        msg
    }
}
export const snackbarErrorStatus = (val) => {
    return {
        type: 'SNACKBAR_ERROR_STATUS',
        val
    }
}
export const closeSnackbar = () => {
    return {
        type: 'CLOSE_SNACKBAR'
    }
}
