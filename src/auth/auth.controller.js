import bcrypt from 'bcrypt';
import User from '../userAdmin/user.model.js';
import { generateJWT } from '../helpers/generar-jwt.js';

export const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const admin = await User.findOne({ username });

        if(!admin) {
            return res.status(400).json({
                msg: "Username are INCORRECT or NOT FOUND in the Database",
            })
        };

        if(!admin.state){
            return res.status(400).json({
                msg: "The user was NOT FOUND in the Database"
            })
        }

        const validPassword = bcrypt.compareSync(password, admin.password);
        
        if(!validPassword) {
            return res.status(400).json({
                msg: "The password is INCORRECT"
            });
        }

        const token = await generateJWT( admin.id);

        res.status(201).json({
            msg: 'Welcome! - Your LOGIN was successful!',
            admin,
            token
        });

    } catch (e) {
        console.log(e);
        res.status(500).json({
            msg: "Contact administrator",
        });
    }
}