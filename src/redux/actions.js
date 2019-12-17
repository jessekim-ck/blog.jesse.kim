// Action Types

export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'
export const ENROLL_SHORTCUT = "ENROLL_SHORTCUT"
export const REMOVE_SHORTCUT = "REMOVE_SHORTCUT"
export const TOGGLE_SIDEBAR = "TOGGLE_SIDEBAR"
export const SET_SIDEBAR = "SET_SIDEBAR"


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

export const enroll_shortcut = (key, func) => {
    return ({
        type: ENROLL_SHORTCUT,
        payload: {
            key,
            func
        },
    })
}

export const remove_shortcut = key => {
    return ({
        type: REMOVE_SHORTCUT,
        payload: {
            key
        },
    })
}

export const toggle_sidebar = () => {
    return ({
        type: TOGGLE_SIDEBAR,
        payload: {}
    })
}

export const set_sidebar = visible => {
    return ({
        type: SET_SIDEBAR,
        payload: {visible}
    })
}
