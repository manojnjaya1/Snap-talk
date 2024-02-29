const mongoose = require("mongoose");
const bcrypt= require('bcryptjs')

// created Schema for user model
const userModel = mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true
        },
        pic: {
            type: String,
            required: true,
            default: "http://s3.amazonaws.com/37assets/svn/765-default-avatar.png"
        }
    },
    {
        timestamps: true
    }
)

// encrypting password before storing it in data base
userModel.pre('save',async function(next){
    if(this.isModified('password')) {
        const salt = await bcrypt.genSalt(12);
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
})

// creating user model 
const User = mongoose.model("User", userModel);

module.exports = User;