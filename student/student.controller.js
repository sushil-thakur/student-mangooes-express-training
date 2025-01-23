import express from 'express';
const router =express.Router();
import bcrypt from 'bcrypt'
import Student from './student.list.js';
import jwt from 'jsonwebtoken';
import studentValidationSchema from './student.validation.js';
import Yup from 'yup';


// Register route
router.post("/student/register", async (req, res, next) => {
    //validate data
    try {
        req.body = await studentValidationSchema.validate(req.body);
        next();
    } catch (error) {
        return res.status(400).send({ message: error.message });
    }
}, async (req, res) => {
    //create schema
    try {
        const newStudent = req.body;

        // Check if a student with the given email already exists
        const existingStudent = await Student.findOne({ email: newStudent.email });
        if (existingStudent) {
            return res.status(409).send({ message: "User already exists" });
        }

        // Hash the password
        const saltRounds = 10;
        newStudent.password = await bcrypt.hash(newStudent.password, saltRounds);

        // Save the student to the database
        await Student.create(newStudent);

        return res.status(201).send({ message: "Registration successful" });
    } catch (error) {
        return res.status(500).send({ message: "Error during registration", error: error.message });
    }
});

// Login route
router.post("/student/login",
   async (req,res,next)=>{
        const loginStudentValidationSchema = Yup.object({
            email: Yup.string().required().email().max(100),
            password: Yup.string().required().max(100).trim(),
        });

    try {
        req.body = await loginStudentValidationSchema.validate(req.body);
        next();
    } catch (error) {
        return res.status(400).send({ message: error.message });
    }
},
async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find the student by email
        const student = await Student.findOne({ email });
        if (!student) {
            return res.status(401).send({ message: "Invalid credentials" });
        }

        // Compare the password
        const passwordMatch = await bcrypt.compare(password, student.password);
        if (!passwordMatch) {
            return res.status(401).send({ message: "Invalid credentials" });
        }

        // Remove the password before sending the response
        student.password = undefined;
        //generate access token
        //secret key
        const secretKey="qwertyuiop";

        //payload=> object inside token
        const payload={email:student.email};

        //encrypt cipher text

        const token=jwt.sign(payload,secretKey,{expiresIn:"17d"});

        return res.status(200).send({ message: "Login successful", studentDetails: student, accessToken: token });
    } catch (error) {
        return res.status(500).send({ message: "Error during login", error: error.message });
    }
});
export{router as studentController};

