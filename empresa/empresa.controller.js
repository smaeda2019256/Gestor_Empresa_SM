import {response, request} from 'express';
import Empresa from './empresa.model.js';

export const empresaPost  = async (req = request, res = response) => {

    try{
        const {nameEmpresa, impactLevel, yearsOfTrajectory, category, email, contactPhone} = req.body;
        const company = new Empresa({
            nameEmpresa,
            impactLevel,
            yearsOfTrajectory,
            category,
            email, 
            contactPhone
        });

        await company.save();

        res.status(200).json({
            msg: 'Company CREATED successfully',
            company
        })

    }catch(error){
        console.error('ERROR - Creating Company: ', error);
        return res.status(500).json({error: 'Internal server ERROR'});
    }
}