const initialState = {
    loginStatus: false,
}

const userReducers = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN_STATUS':
            return {
                ...state,
                loginStatus: action.val
            }
        default:
            return state
    }
}
export default userReducers

