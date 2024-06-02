//define logic functions
const users = require('../Models/userSchema')
// import jwt
const jwt = require('jsonwebtoken')
//register logic
exports.register = async (req, res) => {
    console.log('Inside Register Function');
    try {
        const {
            userName,
            email,
            password
        } = req.body
        const existingUser = await users.findOne({
            email
        })
        if (existingUser) {
            res.status(402).json("User already exists")
        } else {
            const newUser = new users({
                userName,
                email,
                password
            })
            console.log(newUser)
            await newUser.save()
            res.status(200).json("User created successfully")
        }
    } catch (error) {
        res.status(500).json("server error")
    }
}

exports.login = async (req, res) => {
    console.log('Inside Login Function');
    try {
        const {
            email,
            password
        } = req.body
        const user = await users.findOne({
            email,
            password
        })
        if (user) {
            const token = jwt.sign({
                userId: user._id
            }, "superkey2024")
            res.status(200).json({
                user,
                token
            })
        } else {
            res.status(402).json("User not found")
        }
    } catch (error) {
        res.status(500).json("server error")
    }
}


exports.addDetails = async (req, res) => {
    console.log('inside add details')
    try {
        const {
            firstName,
            lastName
        } = req.body

        const fullName = `${firstName} ${lastName}`
        const imagePath = req.file.path

        const updatingData = {
            fullName,
            image: imagePath,
            dataFilled: true
        }
        const userId = req.payload
        const options = {
            new: true
        };
        const user = await users.findByIdAndUpdate(userId, updatingData, options)
        if (user) {
            res.status(200).json({user})
        }
    } catch(err) {
        res.status(500).json("server error")
    }
}
