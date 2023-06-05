import fetch from "node-fetch"

const validateUserId = (userId) => {
    if (!userId || userId < 1 || userId > 10) {
        throw new Error("userId must be a number between 1 and 10")
    }
}

export const getUsers = async () => {
    const users = await fetch('https://jsonplaceholder.typicode.com/users').then((r) => r.json())
    
    return users
}

export const getUser = async (userId) => {
    validateUserId(userId)

    const users = await getUsers()

    // index of user
    return users[userId - 1]
}

export const getPostsForUser = async (userId) => {
    validateUserId(userId)
    
    const posts = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`).then((r) => r.json())
    
    return posts
}

export const createPostForUser = async (userId) => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify({
            title: 'foo',
            body: 'bar',
            userId: userId,
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    })

    return response
}

export const deletePostForUser = async (id) => {
    const post = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: 'DELETE',
    })

    return post
}