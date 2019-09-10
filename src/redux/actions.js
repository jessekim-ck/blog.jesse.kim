// Action Types

export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'
export const SET_RECENT_POST_LIST = 'SET_RECENT_POST_LIST'
export const SET_CURRENT_CATEGORY = 'SET_CURRENT_CATEGORY'


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

export const setRecentPostList = recentPostList => {
    return ({
        type: SET_RECENT_POST_LIST,
        payload: {
            recentPostList
        }
    })
}

export const setCurrentCategory = props => {
    return ({
        type: SET_CURRENT_CATEGORY,
        payload: {...props}
    })
}
