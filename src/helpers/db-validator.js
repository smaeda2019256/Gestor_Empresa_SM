import User from '../userAdmin/user.model.js';
import Empresa from '../../empresa/empresa.model.js'; 

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

export const existeNameCompany = async(nameEmpresa = '') => {
    const existingNameCompany = await Empresa.findOne({nameEmpresa});
    if(existingNameCompany) {
        throw new Error(`The Company ${nameEmpresa} is already REGISTERED`)
    }
}

export const existingById = async(id = '') => {
    const existingById = await Empresa.findOne({id});
    if(existingById) {
        throw new Error(`The id ${id} does EXIST in the Database`);
    }
}