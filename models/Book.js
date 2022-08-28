const mongoose = require('mongoose')

const BookSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, 'Please provide book name'],
    },
    imageUrl:{
        type:String,
        required:[true, 'Please provide image url']
    },
    author:{
        type:String,
        required:[true, 'Please provide author name']
    },
    pages:{
        type:Number,
        required:[true, 'Please provide number of pages in book']
    },
    price:{
        type:Number,
        required:[true, 'Please provide book price']
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:'user'
    }
}, {timestamps:true})

module.exports = mongoose.model('book', BookSchema)

