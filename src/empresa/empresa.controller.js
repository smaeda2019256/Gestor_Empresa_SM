import { response, request } from 'express';
import Empresa from './empresa.model.js';

export const empresaPost = async (req = request, res = response) => {

    try {
        const { nameEmpresa, impactLevel, yearsOfTrajectory, category, email, contactPhone } = req.body;
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

    } catch (error) {
        console.error('ERROR - Creating Company: ', error);
        return res.status(500).json({ error: 'Internal server ERROR' });
    }
}

export const empresaPut = async (req, res = response) => {
    const { id } = req.params;
    const { _id, ...resto } = req.body;

    const companyL = await Empresa.findByIdAndUpdate(id, resto);

    const company = req.body;

    res.status(200).json({
        msg: 'The company has been UPDATED',
        company,
        companyL
    })
}

export const getEmpresa = async (req, res) => {
    const { limit, from, yearsOfTrajectory, category, order } = req.query;
    const query = { state: true };

    if (yearsOfTrajectory !== undefined) {
        query.yearsOfTrajectory = yearsOfTrajectory;
    }

    if (category) {
        query.category = category;

    }

    let sortCriteria = {};
    if (order) {
        switch (order) {
            case 'trajectoryAsc':
                sortCriteria = { yearsOfTrajectory: 1 };
                break;
            case 'trajectoryDesc':
                sortCriteria = { yearsOfTrajectory: -1 };
                break;
            case 'categoryAsc':
                sortCriteria = { category: 1 };
                break;
            case 'categoryDesc':
                sortCriteria = { category: -1 };
                break;
            case 'az':
                sortCriteria = { nameEmpresa: 1 };
                break;
            case 'za':
                sortCriteria = { nameEmpresa: -1 };
                break;
        }
    }

    const [total, companys] = await Promise.all([
        Empresa.countDocuments(query),
        Empresa.find(query)
            .skip(Number(from))
            .limit(Number(limit))
            .sort(sortCriteria)
    ]);


    res.status(200).json({
        msg: "Aggregate Companies and By order of filtration",
        total,
        companys
    });
}