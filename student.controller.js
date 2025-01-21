import express from 'express';
const router =express.Router();


router.post("/student/register",async(req,res)=>{
    //extract new user from request.body
    const newUser = req.body;
    //hash password
    //plain password ,salt,hash password
    const plainPassword = newUser.password;
    const saltRounds = 10;
    const hashedPassword =  await bcrypt.hashSync(plainPassword,saltRounds);

    //replace plain pasword by hashed password
    newUser.password = hashedPassword;
    await Student.create(newUser);

    return res.status(201).send({message:"sucessfull"});
export{router as studentController};