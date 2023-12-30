import * as yup from 'yup';

export const registerSchema = yup.object().shape({
    firstName:yup.string().required('Bu alan zorunludur!'),
    lastName: yup.string().required('Bu alan zorunludur!'),
    email:yup.string().email('Yanlış format').required('Bu alan zorunludur!'),
    phone:yup.string().required('Bu alan zorunludur!'),
    password:yup.string().required('Bu alan zorunludur!')
  });