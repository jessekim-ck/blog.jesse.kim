import {axios_api, get_header} from "./config"


// Authenticate User and Save the Token To the LocalStorage
export const authenticateUser = async (username, password) => {
    try {
        const response = await axios_api.post(
            'token-auth/',
            {username, password},
        )
        const result = await response.data
        localStorage.setItem('token', result.token)
        return result
    } catch (err) {
        const err_msg = err.toString()
        if (err_msg.includes("400")) {
            alert("Cannot find the account!")
        }
        throw err
    }
}

// Refresh JWT Token using Current Token
export const refreshToken = async () => {
    try {
        const header = await get_header()
        const token = localStorage.getItem('token')
        const response = await axios_api.post(
            'token-refresh/',
            {token},
            {headers: header}
        )
        const result = await response.data
        localStorage.setItem('token', result.token)
        return true
    } catch (err) {
        console.log("Error Refreshing Token")
        return false
    }
}

// Get Current User Information using Saved Token
export const getCurrentUser = async () => {
    try {
        const header = await get_header()
        const response = await axios_api.get(
            'api/current_user/',
            {headers: header}
        )
        const result = await response.data
        return result
    } catch (err) {
        console.log(err)
        throw err
    }
}

// Enroll User: Not Needed
export const signupUser = async (username, password) => {
    try {
        const response = await axios_api.post(
            'api/user/',
            {username, password},
        )
        const result = await response.data
        localStorage.setItem('token', result.token)
        return result
    } catch (err) {
        console.log(err)
        throw err
    }
}



// Get Post List
export const getPostList = async () => {
    try {
        const response = await axios_api.get('api/post/')
        const result = await response.data
        return result
    } catch (err) {
        console.log(err)
        throw err
    }
}


// Write Post (Should be Authenticated)
export const writePost = async (writer_id, category_id, title, text, is_private) => {
    try {
        const header = await get_header()
        const response = await axios_api.post(
            'api/post/',
            {writer_id, category_id, title, text, is_private},
            {headers: header}
        )
        const result = await response.data
        return result
    } catch (err) {
        if (err.message.includes("400")) {
            alert("Bad Request!")
            throw err
        } else {
            console.log(err)
            throw err
        }
    }
}

// Edit Existing Post's Content
export const editPost = async (post_id, writer_id, category_id, title, text, is_private) => {
    try {
        const header = await get_header()
        await axios_api.put(
            `api/post/${post_id}/`,
            {writer_id, category_id, title, text, is_private},
            {headers: header}
        )
    } catch (err) {
        console.log(err)
        throw err
    }
}

// Get Post's Detail Information
export const getPostDetail = async post_id => {
    try {
        const response = await axios_api.get(
            `api/post/${post_id}/`
        )
        const result = await response.data
        return result
    } catch (err) {
        if (err.message.includes("404")) {
            return null
        } else {
            console.log(err)
            throw err
        }
    }
}


export const getCategoryList = async () => {
    try {
        const response = await axios_api.get('api/category/list/')
        const result = await response.data
        return result
    } catch (err) {
        console.log(err)
        throw err
    }
}


export const getCategoryDetail = async category_id => {
    try {
        const response = await axios_api.get(`api/category/${category_id}/`)
        const result = await response.data
        return result
    } catch (err) {
        console.log(err)
        throw err
    }
}


export const getCategoryGenealogy = async category_id => {
    try {
        const response = await axios_api.get(`api/category/${category_id}/`)
        const result = await response.data.category
        if (result.parent_category_id) {
            const parent = await getCategoryGenealogy(result.parent_category_id)
            result.parent = await parent
        } else {
            result.parent = null
        }
        return result
    } catch (err) {
        console.log(err)
        throw err
    }
}


export const writeComment = async (post_id, nickname, text) => {
    try {
        const response = await axios_api.post(
            `api/comment/${post_id}/`,
            {post_id, nickname, text}
        )
        const result = await response.data
        return result
    } catch (err) {
        console.log (err)
        throw err
    }
}
