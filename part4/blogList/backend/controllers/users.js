const userRouter = require('express').Router();
const { response } = require('express');
const bcrypt = require('bcrypt')
const User =  require('../models/user');


userRouter.get('/', async(req, res) =>{
    const users = await User.find({}).populate('blogs')
    res.json(users)
})

userRouter.post('/', async(req, res, next) =>{
    const {username, name, password} = req.body;
    if (!password || password.length < 3){
        return res.status(400).json({error: "Password must be at least 3 characters long."})
    }

    const saltRounds = 10;

    const passwordHash = await bcrypt.hash(password, saltRounds)

    try{
        const user = new User({
            username,
            name,
            passwordHash
        })

        const savedUser = await user.save()
        res.status(201).json(savedUser)
    }catch(exception){
        next(exception)
    }
})

userRouter.delete('/:id', async(res, req, next) => {
    
})

module.exports = userRouter