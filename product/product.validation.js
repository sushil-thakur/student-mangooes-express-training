import Yup from 'yup';

const productValidationSchema = Yup.object({
  name: Yup.string().required().trim().max(155),
  brand: Yup.string().required().trim().max(155),
  price: Yup.number().required().min(0),
  quantity: Yup.number().required().min(1),
  category: Yup.string()
    .required()
    .trim()
    .oneOf([
      'grocery',
      'electronics',
      'electrical',
      'clothing',
      'kitchen',
      'kids',
      'laundry',
    ]),

  image: Yup.string().notRequired().trim(),
});

export default productValidationSchema;