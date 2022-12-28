import User from "../models/User.js";
import bcrypt from 'bcryptjs'; 
import { createError } from "../utils/error.js";
import jwt from 'jsonwebtoken'; 

export const register = async (req, res, next) => {
    try {

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hash,
        });
        await newUser.save();
        res.status(200).send("User has been created.")
    } catch (error) {
        next(error);
    }
}

export const login = async (req, res, next) => {
    try {
        const user = await User.findOne({username: req.body.username});
        if(!user){
            return next(createError('404', "User with this username does not exits"));
        }
        const isCorrectPassword = await bcrypt.compare(req.body.password, user.password); 
        if(!isCorrectPassword) return next(createError("400", "Incorrect password or Username"))
        const token = jwt.sign({id:user._id, isAdmin: user.isAdmin}, process.env.JWT)
        const {password, isAdmin, ...otherDetails} = user._doc; 
        res.status(200).json({...otherDetails})
    } catch (error) {
        next(error);
    }
}