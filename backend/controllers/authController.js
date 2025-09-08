const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// Register a new user
exports.register = async (req, res) => {
    try {
    const { userName, email, password } = req.body

    // check if user already exists
    const userExists = await User.findOne({ email })
    if(userExists) return res.status(400).json({ message: 'User already exists' })
    
    // hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // create new user
    const newUser = new User({
        userName,
        email,
        password: hashedPassword
    })
    res.status(201).json({ message: 'User registered successfully', user: newUser })
} catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
}
}

// Login user
exports.login = async (req, res) => {
    try{
        const { email, password } = req.body

        // check if user exists
        const user = await User.findOne({ email })
        if(!user) return res.status(400).json({ message: 'Invaild credentials' })
        
        // check password
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch) return res.status(400).json({ message: 'Invaild credentials' })

        // create and assign a token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' })
        res.json({ message: 'Login successful', token })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}