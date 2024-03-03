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
            role,
            createdAt: Date.now(),
            lastAccess: null
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

export const usersGet = async(req = request, res = response) => {
    const { limite, desde } = req.query;
    const query = { estado: true };
    const [total, usuarios] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.status(200).json({
        msg: 'Admin users added',
        total,
        usuarios,
    });
}
