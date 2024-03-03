import User from '../userAdmin/user.model.js';

 export const existeEmail = async (email = '') => {
    const existingEmail = await User.findOne({email});
    if (existingEmail){
        throw new Error (`The email ${email} does EXIST in the Database`);
    }
}

export const existeUsername = async (username = '') => {
    const existingUsername = await User.findOne({username})
    if(existingUsername) {
        throw new Error (`The username ${username} does EXIST in the Database`);
    }
}

