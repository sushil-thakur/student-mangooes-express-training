import yup from 'yup';

const studentValidationSchema = yup.object ({
    fullName: yup.string().required().max(255),
    email: yup.string().required().email().max(100),
    password: yup.string().required().max(100).trim(),
    address: yup.string().required().max(255),
    gender: yup.string().required().oneOf(["Male", "Female", "Other", "PreferNotToSay"]),
    phoneNumber: yup.string().notRequired().trim(),
    });

export default studentValidationSchema;