import * as yup from 'yup';

export const registerSchema = yup.object().shape({
    firstName:yup.string().required('Bu alan zorunludur!'),
    lastName: yup.string().required('Bu alan zorunludur!'),
    email:yup.string().email('Yanlış format').required('Bu alan zorunludur!'),
    phone:yup.string().required('Bu alan zorunludur!'),
    password:yup.string().required('Bu alan zorunludur!')
  });

  export const productSchema=yup.object().shape({
    categoryId:yup.number().min(1,"Kategori seçiniz!").required('Bu alan zorunludur!'),
        name:yup.string().required('Bu alan zorunludur!'),
        description:yup.string().required('Bu alan zorunludur!'),
        amount:yup.string().required('Bu alan zorunludur!'),
        stock:yup.string().required('Bu alan zorunludur!'),
  });

  export const categorySchema=yup.object().shape({
        category:yup.string().required('Bu alan zorunludur!'),
  });

  export const loginSchema = yup.object().shape({
      email:yup.string().email('Yanlış format').required('Bu alan zorunludur!'),
      password:yup.string().required('Bu alan zorunludur!')
    });

    export const addressSchema = yup.object().shape({
      country:yup.string().required('Bu alan zorunludur!'),
    city: yup.string().required('Bu alan zorunludur!'),
    district:yup.string().required('Bu alan zorunludur!'),
    description:yup.string().required('Bu alan zorunludur!'),
    });

    export const paymentSchema=yup.object().shape({
      addressId:yup.number().min(1,"Adres seçiniz!").required('Bu alan zorunludur!'),
        cardNumber:yup.string().required('Bu alan zorunludur!'),
        fullName: yup.string().required('Bu alan zorunludur!'),
        cvv:yup.string().required('Bu alan zorunludur!'),
        validDate:yup.string().required('Bu alan zorunludur!'),
    });