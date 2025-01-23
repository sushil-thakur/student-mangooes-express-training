import jwt from 'jsonwebtoken';
import studentController  from '../student/student.list.js';
import StudentTable from '../student/student.list.js';

const isStudent = async (req, res, next) => {
  // extract token from req.headers.authorization
  const authorization = req?.headers?.authorization;
  const splittedToken = authorization?.split(' ');

  const token = splittedToken?.length === 2 ? splittedToken[1] : null;

  if (!token) {
    return res.status(401).send({ message: 'Unauthorized.' });
  }

  let payload = null;
  try {
    const secretKey = 'qwertyuiop';

    payload = jwt.verify(token, secretKey);
  } catch (error) {
    //if decrytion fails, throw error
    //reseason
    //secretkey is different
    //token is not from our system/altered token
    //token is from system,but token has been expired
    return res.status(401).send({ message: 'Unauthorized.' });
  }

  //  find user
  const user = await StudentTable.findOne({ email: payload.email });
//if user doensot exist in our system return error
  if (!user) {
    return res.status(401).send({ message: 'Unauthorized.' });
  }

  next();
};

export default isStudent;
