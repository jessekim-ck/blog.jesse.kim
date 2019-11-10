import { LOGIN, LOGOUT } from './actions'
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

const reducer = combineReducers({
    user: userReducer,
})

export default reducer