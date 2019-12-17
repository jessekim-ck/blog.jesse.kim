import {LOGIN, LOGOUT, ENROLL_SHORTCUT, REMOVE_SHORTCUT, TOGGLE_SIDEBAR, SET_SIDEBAR} from './actions'
import {combineReducers} from 'redux'


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

const shortcutReducer = (state = {registered: {}}, action) => {
    switch (action.type) {
        case ENROLL_SHORTCUT:
            return ({
                registered: {
                    ...state.registered,
                    [action.payload.key]: action.payload.func
                }
            })
        case REMOVE_SHORTCUT:
            delete state.registered[action.payload.key]
            return ({
                registered: state.registered
            })
        default:
            return state
    }
}

const sidebarReducer = (state = {visible: false}, action) => {
    switch (action.type) {
        case TOGGLE_SIDEBAR:
            return ({
                visible: !state.visible
            })
        case SET_SIDEBAR:
            return ({
                visible: action.payload.visible
            })
        default:
            return state
    }
}

const reducer = combineReducers({
    user: userReducer,
    shortcut: shortcutReducer,
    sidebar: sidebarReducer,
})

export default reducer
