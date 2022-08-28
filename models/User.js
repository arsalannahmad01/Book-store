const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, 'Please provide name']
    },
    email:{
        type:String,
        required:[true, 'Plaese provide email'],
        unique:true
    },
    password:{
        type:String,
        required:[true, 'Please provide password'],
        minlength:6
    }
},{timestamps:true})

UserSchema.pre('save', function(next) {
    if(this.isModified('password')) {
        bcrypt.hash(this.password, 10, (err, hash)=> {
            if(err) return err

            this.password = hash
            next()
        })
    }
})

UserSchema.methods.comparePassword = async function(password) {
    if(!password) return 'Password is missing'

    try {
        const result = await bcrypt.compare(password, this.password)
        return result
    } catch (error) {
        console.log('Error while comparing password', error.message)
    }
}

UserSchema.methods.createJWT = function() {
    return jwt.sign({email:this.email, id:this._id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_LIFETIME})
}

module.exports = mongoose.model('user', UserSchema)