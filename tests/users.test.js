const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const User = require('../models/User')

const api = supertest(app)

const user = {
    username: 'testUser',
    password: 'test123'
}

// setup
beforeAll(async () => {
    await User.deleteMany({})
})

test('register test user', async () => {
    await api.post('/users/register')
        .send(user)
        .expect(201)
        .expect(res => {
            console.log(res.body)
            expect(res.body.status).toContain('success')
            expect(res.body.username).toBe('testUser')
        })
})

test('login test user', async () => {
    await api.post('/users/login')
    .send(user)
    .expect(200)
    .expect(res => {
        console.log(res.body)
        expect(res.body.status).toContain('Successful')
        expect(res.body.token).toBeDefined()
    })
})

// teardown
afterAll(async () => {
    await mongoose.connection.close()
})