const express = require('express')
const router = express.Router()

const {createBook, getAllBook, getBook, updateBook, deleteBook} = require('../controllers/book')

router.route('/').post(createBook).get(getAllBook)
router.route('/:id', ).get(getBook).patch(updateBook).delete(deleteBook)

module.exports = router