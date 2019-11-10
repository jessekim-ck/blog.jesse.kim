// Action Types

export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'


// Action Creators

export const login = currentUser => {
    return ({
        type: LOGIN,
        payload: {
            currentUser,
        },
    })
}

export const logout = () => {
    return ({
        type: LOGOUT,
        payload: {},
    })
}

