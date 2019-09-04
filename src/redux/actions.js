// Action Types

export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'
export const SETPOSTLIST = 'SETPOSTLIST'
export const LOADCATEGORYCHILDREN = 'LOADCATEGORYCHILDREN'


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

export const setPostList = postList => {
    return ({
        type: SETPOSTLIST,
        payload: {
            postList
        }
    })
}

export const loadCategoryChildren = (category, categoryOrPost, list) => {
    return ({
        type: LOADCATEGORYCHILDREN,
        payload: {category, categoryOrPost, list}
    })
}
