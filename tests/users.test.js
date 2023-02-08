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
})
// teardown
afterAll(async () => {
    await mongoose.connection.close()
})