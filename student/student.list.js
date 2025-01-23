import mongoose from "mongoose";

// Define the Student Schema
const studentSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        trim: true,
        maxlength: 225,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    gender: {
        type: String,
        required: true,
        trim: true,
        enum: ["male", "female", "other", "preferNotToSay"],
    },
    phoneNumber: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        maxlength: 20,
        minlength: 10,
    },
    address: {
        type: String,
        required: false,
        trim: true,
        maxlength: 225,
    },
});

// Create and export the Student model
const Student = mongoose.model("Student", studentSchema);
export default Student;
