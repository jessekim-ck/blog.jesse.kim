import { LOGIN, LOGOUT, SET_RECENT_POST_LIST, SET_CURRENT_CATEGORY } from './actions'
import { combineReducers } from 'redux'


const userReducer = (state = {authenticated: false, currentUser: {username: 'Stranger'}}, action) => {
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

const recentPostReducer = (state = {recentPostList: []}, action) => {
    switch (action.type) {
        case SET_RECENT_POST_LIST:
            return ({
                ...state,
                recentPostList: action.payload.recentPostList,
            })
        default:
            return state
    }
}


const currentCategoryReducer = (
    state = {
        category:
            {
                id: null,
                title: null,
                parent_category_id: null
            },
        children_category_list: [],
        children_post_list: []
    },
    action) => {
    switch (action.type) {
        case SET_CURRENT_CATEGORY:
            return ({
                ...state,
                ...action.payload
            })
        default:
            return state
    }
}

const reducer = combineReducers({
    user: userReducer,
    recentPost: recentPostReducer,
    currentCategory: currentCategoryReducer,
})

export default reducer