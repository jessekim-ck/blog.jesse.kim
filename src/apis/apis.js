import { axios_api } from "./config"


// Authenticate User and Save the Token To the LocalStorage
export const authenticateUser = async (username, password) => {
    try {
        const response = await axios_api.post(
            'token-auth/',
            {username, password},
        )
        const result = await response.data
        await localStorage.setItem('token', result.token)
        return result
    } catch (err) {
        console.log(err)
        throw err
    }
}

// Refresh JWT Token using Current Token
export const refreshToken = async () => {
    try {
        const token = await localStorage.getItem('token')
        const response = await axios_api.post(
            'token-refresh/',
            {token}
            )
        const result = await response.data
        await localStorage.removeItem('token')
        await localStorage.setItem('token', result.token)
        return result
    } catch (err) {
        console.log(err)
        throw err
    }
}

// Get Current User Information using Saved Token
export const getCurrentUser = async () => {
    try {
        const response = await axios_api.get('api/current_user/')
        const result = await response.data
        return result
    } catch (err) {
        localStorage.removeItem('token')
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
        await localStorage.setItem('token', response.token)
        return response
    } catch (err) {
        console.log(err)
        throw err
    }
}



// Get Post List
export const getRecentPostList = async category_id => {
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
export const writePost = async (writer_id, category_id, title, text) => {
    try {
        const response = await axios_api.post(
            'api/post/',
            {writer_id, category_id, title, text},
        )
        const result = await response.data
        return result
    } catch (err) {
        console.log(err)
        throw err
    }
}

// Edit Existing Post's Content
export const editPost = async (post_id, writer_id, title, text) => {
    try {
        await axios_api.put(
            `api/post/${post_id}/`,
            {writer_id, title, text},
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
        console.log(err)
        throw err
    }
}


export const getCategoryList = async () => {
    try {
        const response = await axios_api.get('api/category/list/')
        const result = await response.data.children_category_list
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


