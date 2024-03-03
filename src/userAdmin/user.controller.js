import { response, request } from "express";
import User from './user.model';
import bcrypt from "bcrypt";

export const userPost = async (req, res) => {
    try {
        const { username, email, password, name, role } = req.body;
        const newAdmin = new User({ 
            username, 
            email, 
            password, 
            name, 
            role 
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
