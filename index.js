import express from 'express';
import mongoose from "mongoose";

import { studentController } from './student.controller.js';

const app=express();

//to make app understand json
app.use(express.json());
//datebase connection
app.use(studentController);
//database connect
const dbConnect = async()=>{
    try{
        const url ="mongodb+srv://bigmart:1234@sushil.rf9fj.mongodb.net/big-mart?retryWrites=true&w=majority&appName=sushil";
        await mongoose.connect(url);
        console.log("DB connection sucessfull..");


    }catch(error){
        console.log("DB connection failed..");
        console.log(error.message);
    }
};
dbConnect();
//network port
// app.post("/student/add",async(req,res)=>{
//     const student = req.body;
//     await Student.create(student);

   
//     return res.status(201).send({message:"adding..."});
// });

// app.get("/student/list",async(req,res)=>{
//     const student = await Student.find();
//     return res.status(200).send({message:"success", students:student});

//route/api
// });

// app.delete("/student/delete/:id", async (req, res) => {
//     try {
//         const studentId = req.params.id;

//         // Check if the ID is a valid MongoDB ObjectId
//         if (!mongoose.isValidObjectId(studentId)) {
//             return res.status(400).send({ message: "Invalid student ID" });
//         }

//         // Find the student by ID
//         const student = await Student.findById(studentId);

//         // If student not found, return 404 error
//         if (!student) {
//             return res.status(404).send({ message: "Student not found" });
//         }

//         // Delete the student document
//         await student.deleteOne();

//         // Send success response
//         return res.status(200).send({ message: "Student deleted successfully" });
//     } catch (error) {
//         console.error("Error deleting student:", error);
//         return res.status(500).send({ message: "Internal Server Error" });
//     }
// });


const PORT=8000;

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
});