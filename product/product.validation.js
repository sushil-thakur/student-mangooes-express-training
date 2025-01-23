  //create schema


    import Yup from "yup";

  const productValidationSchema = Yup.object({
    name: Yup.string().required().max(160),
    price: Yup.number().required().min(0),
    brand: Yup.string().required().max(150),
    category: Yup.string().required().oneOf(["grocery", "beauty", "electronics", "fashion", "toys", "shoes", "sports", "books", "furniture", "kitchen", "appliances", "others"]),
    image: Yup.string().notRequired(),
    quantity: Yup.number().required().min(1),
});

export default productValidationSchema;