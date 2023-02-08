const books = require('../data/books')

const getAllBooks = (req, res) => {
    res.json(books)
}

const createABook = (req, res) => {
    let newBook = {
        'id': books[books.length - 1].id + 1,
        'title': req.body.title,
        'author': req.body.author
    }
    books.push(newBook)
    res.status(201).send(books)
}

const deleteBooks = (req, res) => {
    res.json({})
}

const getABook = (req, res) => {
    let theBook = books.find((item) => {
        return item.id == req.params.id
    })
    res.json(theBook)
}

const updateABook = (req, res) => {
    let updatedBooks = books.map((item) => {
        if (item.id == req.params.id) {
            item.title = req.body.title,
                item.author = req.body.author
        }
        return item
    })
    res.json(updatedBooks)
}

const deleteABook = (req, res) => {
    // let updatedBooks = books.filter((item) => {
    //     return item.id != req.params.id
    // })
    let updatedBooks = books.filter(item => item.id != req.params.id)
    res.json(updatedBooks)
}


module.exports = {
    getAllBooks,
    createABook,
    deleteBooks,
    getABook,
    updateABook,
    deleteABook
}
