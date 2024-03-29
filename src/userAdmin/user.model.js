import mongoose from "mongoose";

const UserAdminSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, 'The ADMIN username is required'],
        uniqued: true
    },
    name: {
        type: String,
        required: [true, 'The name is required'],
    },
    email: {
        type: String,
        required: [true, 'The ADMIN email is required'],
        uniqued: true
    },
    password: {
        type: String,
        required: [true, 'The password is required'],
    },
    role: {
        type: String,
        required: [true, 'The role is required'],
    },
    state: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});

export default mongoose.model('Admin', UserAdminSchema);