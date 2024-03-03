import User from '../userAdmin/user.model.js';

 export const existeEmail = async (email = '') => {
    const existingEmail = await User.findOne({email});
    if (existingEmail){
        throw new Error(`The email ${email} does EXIST in the database`);
    }
 }

 