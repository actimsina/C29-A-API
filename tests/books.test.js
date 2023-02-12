const { default: mongoose } = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Book = require('../models/Book')

const api = supertest(app)

const user = {
    username: 'testUser',
    password: 'test123'
}

let token =''

const book = {
    title: 'War and Peace',
    author: 'Leo Tolstoy'
}
// setup
beforeAll(async () => {
    await Book.deleteMany({})
    await api.post('/users/login')
        .send(user)
        .expect(res => {
            token = res.body.token
        })
})

test('create a book' , async ()=> {
    await api.post('/books')
    .set('Authorization', `bearer ${token}`)
    .send(book)
    .expect(201)
    .expect(res => {
        console.log(res.body)
        expect(res.body.title).toBe(book.title)
    })
})

test('get all books', async () => {
    await api.get('/books')
    .set('Authorization', `bearer ${token}`)
    .expect(200)
    .expect(res => {
        console.log(res.body)
        expect(res.body[0].title).toBe(book.title)
    })
})

// teardown
afterAll(async () => {
    await mongoose.connection.close()
})
