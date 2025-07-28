const mongoose = require('mongoose')
const rols = require('../utils/rols-utilts')

modelSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:[true, 'email is alrady exsist'],
        lowercase: true
    },
    password:{
        type:String,
        required:true,
        minlength:[6 , 'Password must be more than 6 characters']
    },
    role:{
        type:String,
        enum:[rols.user, rols.admin],
        default:rols.user
    },
    token:{
        type:String,
        required:true
    },
    profileimg:{
        type:String
    }
})


module.exports = mongoose.model('Usero', modelSchema)