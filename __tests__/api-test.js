import { Response } from "node-fetch"
import { 
    getUsers,
    getUser,
    getPostsForUser,
    createPostForUser,
    deletePostForUser
} from "../index"

// change this value to test with different userId
// should be a number between 1 and 10
const USER_ID = 1
const USER_DETAILS = {
    title: 'foo',
    body: 'bar',
    userId: USER_ID,
}

describe('Mock API tests', () => {

    //Declaring variables
    let id;

    //Run once after all the test cases
    afterAll(async () => {
        const post = await deletePostForUser(id)
        expect(post.status).toEqual(200)
    })

    // example test using jest
    it('should get list of all users', async () => {
        const users = await getUsers()
        expect(users.length).toEqual(10)
    })

    it('should get user by id', async () => {
        const user = await getUser(USER_ID)
        expect(user.id).toEqual(USER_ID)
    })

    it('should create a post for user', async () => {
        const response = await createPostForUser(USER_DETAILS.userId)
       expect(response.status).toEqual(201)
       expect(response.statusText).toEqual('Created')
       const json = await response.json();
       id = json.id;
       expect(id).toBeGreaterThan(100)
       expect(json.title).toBe(USER_DETAILS.title) 
       expect(json.body).toBe(USER_DETAILS.body) 
       expect(json.userId).toEqual(USER_DETAILS.userId)    
    })
})