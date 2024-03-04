import { response, request } from 'express';
import Empresa from './empresa.model.js';
import excel from 'exceljs';

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

    const companybeforeupd = await Empresa.findByIdAndUpdate(id, resto);

    const company = req.body;

    res.status(200).json({
        msg: 'The company has been UPDATED',
        company,
        companybeforeupd
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
            case 'az':
                sortCriteria = { nameEmpresa: 1 };
                break;
            case 'za':
                sortCriteria = { nameEmpresa: -1 };
                break;
            case 'yearstrajectoryAsc':
                sortCriteria = { yearsOfTrajectory: 1 };
                break;
            case 'yearstrajectoryDesc':
                sortCriteria = { yearsOfTrajectory: -1 };
                break;
            case 'categoryAsc':
                sortCriteria = { category: 1 };
                break;
            case 'categoryDesc':
                sortCriteria = { category: -1 };
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

export const getReportExc = async (req, res) => {
    try{
    const company = await Empresa.find({ state: true }).lean();

    const workbook = new excel.Workbook();
    const worksheet = workbook.addWorksheet('Company');

    worksheet.columns = [
        { header: 'Company Name', 
          key: 'nameEmpresa', 
          width: 30},

        { header: 'Impact level', 
          key: 'impactLevel', 
          width: 20},

        { header: 'Years of Trajectory', 
          key: 'yearsOfTrajectory', 
          width: 20},

        { header: 'Category', 
          key: 'category', 
          width: 30},
        
        { header: 'Company email', 
          key: 'email', 
          width: 30},

        { header: 'Contact Number', 
          key: 'contactPhone', 
          width: 20}

    ];

    company.forEach(company => {
        worksheet.addRow(company);
    });

    const stream = await workbook.xlsx.writeBuffer();

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename="company_report.xlsx"');

    res.send(stream);

    }catch(error){
        console.error('ERROR - when generating Excel report: ', error);
        res.status(500).json({ message: 'ERROR - when generating Excel report' });
    }
}