import { response, request } from "express";
import User from './user.model.js';
import bcrypt from "bcrypt";

export const userPost = async (req, res) => {
    try {
        const { username, email, password, name, role } = req.body;
        const newAdmin = new User({ 
            username, 
            email, 
            password, 
            name, 
            role,
            createdAt: Date.now(),
        });

        const salt = bcrypt.genSaltSync();
        newAdmin.password = bcrypt.hashSync(password, salt);

        await newAdmin.save();
        
        res.status(200).json({
            msg: 'User created successfully',
            newAdmin
        })


    } catch(error) {
        console.error('ERROR - Creating Admin:', error);
        return res.status(500).json({error: 'Internal server ERROR'});
    }
    
};

export const usersGet = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({
            msg: 'Users Admins Added',
            users
        });
    } catch(error) {
        console.error('ERROR - Getting users:', error);
        return res.status(500).json({error: 'Internal server ERROR'});
    }
};
