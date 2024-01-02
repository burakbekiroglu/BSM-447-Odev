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