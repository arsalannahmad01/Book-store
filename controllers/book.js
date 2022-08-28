const {StatusCodes} = require('http-status-codes')
const {NotFoundError, BadRequestError, Forbidden} = require('../errors')
const Book = require('../models/Book')
const User = require('../models/User')

const createBook = async (req, res) => {
    req.body.createdBy = req.user.id
    const book = await Book.create(req.body)
    res.status(StatusCodes.OK).json({msg: 'Created successfully'})
}

const getAllBook = async (req, res) => {
    const books = await Book.find({ createdBy: req.user._id })
    res.status(StatusCodes.OK).json({ books: books, count:books.length })
}

const getBook = async (req, res) => {
    const book = await Book.findOne({ _id: req.params.id })
    if (!book) {
        throw new NotFoundError(`No item found with id ${req.params.id}`)
    }

    res.status(StatusCodes.OK).json({ book })
}

const updateBook = async (req, res) => {

    const {
        params: { id: bookId },
        body: { imageUrl, price },
        user:{_id: userId}
    } = req

    if(imageUrl === '' || price === '') {
        throw new BadRequestError('imageUrl or price field can not be empty')
    }

    const isAuth = await Book.findOne({ _id: bookId, createdBy: userId })
    if (!isAuth) {
        throw new Forbidden('Permission denied')
    }

    const book = await Book.findByIdAndUpdate({ _id: bookId }, { imageUrl, price }, { new: true, runValidators: true })
    if(!book) {
        throw new NotFoundError(`No book with id ${bookId}`)
    }

    res.status(StatusCodes.OK).json({ msg: 'Updated successfully' })
}

const deleteBook = async (req, res) => {
    


    const book = await Book.findOneAndDelete({ createdBy: req.user._id ,_id: req.params.id })
    if (!book) {
        throw new Forbidden('Permission denied')
    }

    res.status(StatusCodes.OK).json({ msg: 'Deleted successfully' })
}

module.exports = { createBook, getAllBook, getBook, updateBook, deleteBook }