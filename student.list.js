import mongoose from "mongoose";
//we are going to create a tabel
//tabel has field:
//1.name=>string
//2.age =>number
//3.phone number =>number
//4.subject =>string

//schema => rule
const studentSchema = mongoose.Schema({
    fullName:String,
    email:String,
    password:String,
    gender:String,
    phoneNumber:String,
    address:String,
});

//create tabel/model/collection/entity
const student = mongoose.model("Student",studentSchema);
export default student;