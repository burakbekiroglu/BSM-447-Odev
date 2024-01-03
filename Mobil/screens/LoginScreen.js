import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet,ActivityIndicator } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import AuthService from '../services/AuthService';
import {colors} from '../themes/theme';
import { loginSchema } from '../validations/AuthValidation';
import Constants from '../constants/Constants';

const ErrorMessage=({value})=>(value ? <Text style={styles.errorText}>{value}</Text> : null);

const LoginScreen = ({ navigation }) => {
  const { setToken ,user } = useAuth();
  const [isLoading,setIsLoading]=useState(false);
 const [data,setData]=useState({
  email:'',
  password:''
 });
 const [errors, setErrors] = useState({
  email:'',
  password:''
});


  const handleLogin = async () => {
    try {
      
      await loginSchema.validate(data, { abortEarly: false });

      setIsLoading(true);
      const response = await AuthService.login(data);
      setIsLoading(false);
      if(!response  || response.error){
        alert("Kullanıcı bilgileri hatalı");
        return;
      }

       setToken(response.data);
        
    } catch (error) {
      setIsLoading(false);
      if (error.name === 'ValidationError') {
        const newErrors = {};
        error.inner.forEach((e) => {
          newErrors[e.path] = e.message;
        });
        setErrors(newErrors);
      }
    }
  };

  const handleRegister = () => {
    navigation.navigate('Register');
  };

  const  onChange=(key,value)=>{
    setData({ ...data, [key]: value });
  };

  useEffect(()=>{
    if(!user)return;
    if(user.typeId===Constants.UserType.Admin){
      navigation.navigate('AdminHome');
    }else{
      navigation.navigate('CustomerHome');
    }
  },[user]);


  return (
    <View style={styles.container}>
      {isLoading?(<ActivityIndicator size="large" color="#0000ff" style={{flexDirection:"row" }} />):(
        <>
      <Text style={styles.title}>Giriş Yap</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={data.email}
        onChangeText={(text) => onChange('email',text)}
      />
      <ErrorMessage value={errors.email}/>
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={data.password}
        onChangeText={(text) => onChange('password',text)}
        secureTextEntry
      />
      <ErrorMessage value={errors.password}/>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.buttonText}>Giriş Yap</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleRegister}>
          <Text style={styles.registerLink}>Kayıt Ol</Text>
        </TouchableOpacity>
      </View></>)}
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 20,
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 10,
    width: '100%',
  },
  buttonContainer: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    width: '100%', 
  },
  loginButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 24,
    width: '48%', 
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
  registerLink: {
    color: 'blue',
    textAlign: 'center',
    marginTop: 10,
  },
  errorText: {
    color: 'red',
    marginBottom: 8,
  },
});

export default LoginScreen;