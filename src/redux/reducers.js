import { LOGIN, LOGOUT, SETPOSTLIST, LOADCATEGORYCHILDREN } from './actions'
import { combineReducers } from 'redux'

const initialState = {
    authenticated: false,
    currentUser: {
        username: 'Stranger'
    },
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            return ({
                ...state,
                currentUser: action.payload.currentUser,
                authenticated: true,
            })
        case LOGOUT:
            return ({
                ...state,
                currentUser: {
                    username: 'Stranger'
                },
                authenticated: false,
            })
        default:
            return state
    }
}

const postReducer = (state = {postList: []}, action) => {
    switch (action.type) {
        case SETPOSTLIST:
            return ({
                ...state,
                postList: action.payload.postList,
            })
        default:
            return state
    }
}

export const
    CATEGORY = 'CATEGORY',
    POST = 'POST'

const initialCategory = {
    category: {
        id: null,
        title: null,
        parent_category_id: null,
    },
    categoryOrPost: CATEGORY,
    list: []
}

const categoryReducer = (state = initialCategory, action) => {
    switch (action.type) {
        case LOADCATEGORYCHILDREN:
            return ({...action.payload})
        default:
            return state
    }
}

const reducer = combineReducers({
    user: userReducer,
    post: postReducer,
    category: categoryReducer,
})

export default reducer