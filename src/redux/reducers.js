import {
    LOGIN, 
    LOGOUT, 
    ENROLL_SHORTCUT, 
    REMOVE_SHORTCUT, 
    TOGGLE_SIDEBAR, 
    SET_SIDEBAR, 
    UPDATE_POST_LIST,
    // UPDATE_RENDER_LIST,
    UPDATE_POST,
} from './actions';
import {combineReducers} from 'redux';


const userReducer = (state = {authenticated: false, currentUser: {username: 'Stranger'}}, action) => {
    switch (action.type) {
        case LOGIN:
            return ({
                ...state,
                currentUser: action.payload.currentUser,
                authenticated: true,
            });
        case LOGOUT:
            return ({
                ...state,
                currentUser: {
                    username: 'Stranger'
                },
                authenticated: false,
            });
        default:
            return state;
    }
};

const shortcutReducer = (state = {registered: {}}, action) => {
    switch (action.type) {
        case ENROLL_SHORTCUT:
            return ({
                registered: {
                    ...state.registered,
                    [action.payload.key]: action.payload.func
                }
            });
        case REMOVE_SHORTCUT:
            delete state.registered[action.payload.key]
            return ({
                registered: state.registered
            });
        default:
            return state;
    }
};

const sidebarReducer = (state = {visible: false}, action) => {
    switch (action.type) {
        case TOGGLE_SIDEBAR:
            return ({
                visible: !state.visible
            });
        case SET_SIDEBAR:
            return ({
                visible: action.payload.visible
            });
        default:
            return state;
    }
};

const postReducer = (state = {post_list: []}, action) => {
    // const current_length = state.render_list.length;
    // let new_length;
    let post_list = state.post_list;
    switch (action.type) {
        case UPDATE_POST_LIST:
            // new_length = Math.max(current_length, 9);
            // const post_list = action.payload.post_list;
            // const render_list = post_list.slice(0, new_length);
            // return ({post_list, render_list});
            post_list = post_list.concat(action.payload.post_list);
            return ({post_list});
        // case UPDATE_RENDER_LIST:
        //     new_length = Math.min(state.post_list.length, current_length + 10);
        //     return ({...state, render_list: state.post_list.slice(0, new_length)});
        case UPDATE_POST:
            if (post_list.length) {
                const post = action.payload.post;
                // Update existing post
                for (let i in post_list) {
                    if (post.id === post_list[i].id) {
                        post_list[i] = post;
                        return ({post_list});
                    }
                }
                // Or add new post
                post_list = [post].concat(post_list);
                return ({post_list});
            } else {
                // Don't add to empty list.
                return state;
            }
        default:
            return state;
    }
};

const reducer = combineReducers({
    user: userReducer,
    shortcut: shortcutReducer,
    sidebar: sidebarReducer,
    post: postReducer
});

export default reducer;
