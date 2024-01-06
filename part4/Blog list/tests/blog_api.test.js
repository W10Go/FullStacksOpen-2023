const mongoose = require('mongoose')
const helper = require('./blog_helper')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

// Blog list tests
// Step1    Use the supertest package, and make a test that send a HTTP GET request to the URL.✔
//          Refactor the route handler to use the async/await syntax instead of promises.✔
// Step2    write a test that verifies that the unique identifier property of the blog post is named id not _id.✔
// Step3    Write a test that verifies that making an HTTP POST request to the /api/blogs URL successfully creates a new blog post.✔
//          Verify  that the total number of blogs in the system is increased by one.✔
//      *   Verify that the content of the blog is saved correctly to the database.✔
//          Refactor the operation to use async/await insted of promises.✔
// Step4    Write a test that verifies that if the likes property is missing from the request, it will default to be 0.✔
// Step5    Write tests related to creating new blogs via the /api/blogs endpoint, if there is no title or URL the backend responds to the request with the status code 400.✔
// Blog list expansions
// Step1    Implement functionality for deleting a single blog post resource, and test it. ✔
// Step2    Implement functionality for updating an individual blog post and test it.✔


beforeEach(async() => {
    await Blog.deleteMany({})
    //await User.deleteMany({})
  
    for(let blog of helper.initialBlogs) {
        let blogObject = new Blog(blog)
        await blogObject.save()
    }
  })
describe('database', () => {

    //  GET
    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
        })
    test('all blogs are returned', async() => {
        const response = await api.get('/api/blogs')
        expect(response.body).toHaveLength(helper.initialBlogs.length)
    })
    test('the unique identifier property must be id', async() => {
        const response = await api.get('/api/blogs')
        const values = Object.values(response.body)
        values.forEach(value => expect(value.id).toBeDefined())
        values.forEach(value => expect(value._id).not.toBeDefined())
    })
    test('if the likes are missing from the request, it will default to be 0', async () => {

        const response = await api.get('/api/blogs')
        const values = Object.values(response.body)
        values.forEach(value => {
            expect(value.likes).toBeDefined()
            if(value.author === 'Diego Carvajal'){ // Is the only one who doesn't have any likes on the initial Blogs
                expect(value.likes).toBe(0)
            }
        })
    })
})

describe('adding a new blog', () => {
    test('a valid blog can be added', async () =>{
        const newBlog = {
            title: 'Minecraft is literally a game',
            author: 'AlexElMago',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 2,
        }

        const loginUser = {
            username: "Richie",
            password: "hello"
        }

        const response = await api
            .post('/api/login/')
            .send(loginUser)
            .expect(200)

        const token = 'Bearer '+ response.body.token
        
        await api
            .post('/api/blogs')
            .set('authorization', token)
            .send(newBlog)
            .expect(201)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length+1)

        const contents = blogsAtEnd.map(n => n.title)
        expect(contents).toContain(
            'Minecraft is literally a game'
        )
    })
    test('if a token is not provided, fails with status 401', async () => {
        const newBlog = {
            title: 'Minecraft is literally a game',
            author: 'AlexElMago',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 2,
        }
        const loginUser = {
            username: "Richie",
            password: "hello"
        }
        await api
            .post('/api/login/')
            .send(loginUser)
            .expect(200)
        
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(401)
    })
    test('if there is no title, respond with a status(400)', async () =>{
        const newBlog = {
            author: 'AlexElMago',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 0
        }
        
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)
        
        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
    })
    test('if there is no URL, respond with a status(400)', async () => {
        const newBlog = {
            title: 'Minecraft is literally a game',
            author: 'AlexElMago',
            likes: 0
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
    })
})


describe('deleting a single blog', () =>{
    test('succeds with status code 204 if id is valid', async () =>{
        const blogsAtStart = await helper.blogsInDb()
        const blogToDelete = blogsAtStart[0]

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .expect(204)

        const blogsAtEnd = await helper.blogsInDb()

        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length-1)
        
        expect(blogsAtEnd).not.toContain(blogToDelete)
    })
})

describe('updating a single blog',() => {
    test('succeds with status code if id is valid', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToUpdate = blogsAtStart[0]

        const newBlog = {
            title: blogToUpdate.title,
            author: blogToUpdate.author,
            url: blogToUpdate.id,
            likes: 15
        }

        await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .send(newBlog)
            .expect(200)
        
        const blogsUpdated = await helper.blogsInDb()
        expect(blogsUpdated).toHaveLength(helper.initialBlogs.length)
        expect(blogsUpdated[0].title).toBe(newBlog.title)
    })
})
describe('login test',() => {
    test('login a normal user', async()=>{
        const newUser = {
            username: "Richie",
            name: "Ricardo Molinette",
            password: "hello",
        }

        await api
            .post('/api/users/')
            .send(newUser)
            
        const loginUser = {
            username: "Richie",
            password: "hello"
        }
        await api
            .post('/api/login/')
            .send(loginUser)
            .expect(200)

        const idForUser = await User.findOne({ username: "Richie" })
        const userForToken = {
            username: "Richie",
            id: idForUser._id
        }
        const token = jwt.sign(userForToken, process.env.SECRET)
    })
        
})


describe('users test', () => {
    describe('creating users', () => {
        test('a new valid user is created', async() => {
            const newUser = {
                username: "Richie",
                name: "Ricardo Molinette",
                password: "hello"
            }

            await api
                .post('/api/users/')
                .send(newUser)
                .expect(201)
        })
        test('new user with no username will be a status(400)', async() => {
            const newUser = {
                name: "Ricardo Molinette",
                password: "hello"
            }

            await api
                .post('/api/users/')
                .send(newUser)
                .expect(400)
        })
        test('new user with an username with less than 3 characters will be a status(400)', async() => {
            const newUser = {
                username: "Ri",
                name: "Ricardo Molinette",
                password: "hello"
            }

            await api
                .post('/api/users/')
                .send(newUser)
                .expect(400)
        })
        test('new user with no password will be a status(400)', async() =>{
            const newUser = {
                username: "Richy",
                name: "Ricardo Molinette"
            }

            await api
                .post('/api/users/')
                .send(newUser)
                .expect(400)
        })
        test('new user with a password with less than 3 characters will be a status(400)', async() => {
            const newUser = {
                username: "Richie",
                name: "Ricardo Molinette",
                password: "he"
            }

            await api
                .post('/api/users/')
                .send(newUser)
                .expect(400)
        })
    })
})


afterAll(async () => {
  await mongoose.connection.close()
})