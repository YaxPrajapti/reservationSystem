import User from '../models/User.js'

//update user 
export const updateUser = async (req, res, next) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.status(200).json(updatedUser);
    } catch (error) {
        next(error)
    }
}

//delete user 
export const deleteUser = async (req, res, next) => {
    try {
        await User.findOneAndDelete(req.params.id);
        res.status(200).json("User has been deleted");
    } catch (error) {
        next(error)
    }
}

//get user 
export const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(500).json(user);
    } catch (error) {
        next(error)
    }
}

//get all users 
export const getAllUsers = async (req, res, next) => {
    // const failed = true; 
    // if(failed) return next(createError(401, "You are not authenticated!"));
    try {
        const users = await User.find(); 
        res.status(500).json(users);
    } catch (error) {
        next(error)
    }
}

