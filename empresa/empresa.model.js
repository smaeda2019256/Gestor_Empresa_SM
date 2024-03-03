import mongoose from "mongoose";

const EmpresaSchema = mongoose.Schema({
    nameEmpresa: {
        type: String,
        required: [true, 'The company name is required'],
        uniqued: true
    },
    impactLevel: {
        type: String,
        required: [true, 'The company Impact level is required'],
    },
    yearsOfTrajectory: {
        type: String,
        required: [true, 'The company years of trajectory is required'],
    },
    category: {
        type: String,
        required: [true, 'The company category is required'],
    },
    email: {
        type: String,
        required: [true, 'The company email is required'],
    },
    contactPhone: {
        type: String,
        required: [true, 'The company  phone number is required'],
    }
});

export default mongoose.model('Empresa', EmpresaSchema);