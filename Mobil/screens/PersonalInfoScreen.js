import React, { useState,useCallback } from 'react';
import { View, Text, TextInput, Button, StyleSheet,TouchableOpacity,ActivityIndicator } from 'react-native';
import { registerSchema } from '../validations/AuthValidation';
import {colors} from '../themes/theme'
import AuthService from '../services/AuthService';
import { useAuth } from '../contexts/AuthContext';
import { useFocusEffect } from '@react-navigation/native';

const ErrorMessage=({value})=>(value ? <Text style={styles.errorText}>{value}</Text> : null);

const PersonalInfoScreen = () => {
    const {user}=useAuth();
  const[data,setData]=useState({
    firstName:'',
    lastName: '',
    email:'',
    phone:'',
    password:''
  });
  const [errors, setErrors] = useState({
    firstName:'',
    lastName: '',
    email:'',
    phone:'',
    password:''
  });
  const [isLoading,setIsLoading]=useState(false);

  const  onChange=(key,value)=>{
    setData({ ...data, [key]: value });
  };
  

  const handleSave = async () => {
    try {
      await registerSchema.validate(data, { abortEarly: false });

      setIsLoading(true);
      const response = await AuthService.Save({...user,...data});
      setIsLoading(false);
      if(response  && !response.error){
        alert('Kişisel bilgiler kaydedildi.');
      }else{
        alert('Bir hata oluştu Tekrar deneyiniz...');
      }
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

  const getUserInfo=async()=>{
    setIsLoading(true);
    const response= await AuthService.GetUser({id:user.id});
    setIsLoading(false);
    if(response && !response.error){
        const esixtUser=response.data;
        setData({
            firstName:esixtUser.firstName,
            lastName: esixtUser.lastName,
            email:esixtUser.email,
            phone:esixtUser.phone,
            password:esixtUser.password,
        })
    }else{
        alert('Bir hata oluştu Tekrar deneyiniz...');
    }
  };

  useFocusEffect(
    useCallback(() => {
      (async()=>{
        await getUserInfo();
      })();
      return () => {
       
      };
    }, []));

  

  return (
    <View style={styles.container}>
      {
        isLoading?( <ActivityIndicator size="large" color="#0000ff" style={{flexDirection:"row" }} />):
        (<><Text style={styles.title}>Kişisel Bilgiler</Text>
        <TextInput
          style={styles.input}
          placeholder="Ad"
          value={data.firstName}
          onChangeText={(text) => onChange('firstName',text)}
        />
        <ErrorMessage value={errors.firstName}/>
        <TextInput
          style={styles.input}
          placeholder="Soyad"
          value={data.lastName}
          onChangeText={(text) => onChange('lastName',text)}
        />
        <ErrorMessage value={errors.lastName}/>
        <TextInput
          style={styles.input}
          placeholder="E-mail"
          value={data.email}
          onChangeText={(text) => onChange('email',text)}
        />
        <ErrorMessage value={errors.email}/>
        <TextInput
          style={styles.input}
          placeholder="Telefon"
          value={data.phone}
          onChangeText={(text) => onChange('phone',text)}
        />
        <ErrorMessage value={errors.phone}/>
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={data.password}
          onChangeText={(text) => onChange('password',text)}
          secureTextEntry
        />
        <ErrorMessage value={errors.password}/>
        <TouchableOpacity style={styles.registerButton} onPress={handleSave}>
            <Text style={styles.buttonText}>Kaydet</Text>
        </TouchableOpacity></>)
      }
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
  buttonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
  registerButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  errorText: {
    color: 'red',
    marginBottom: 8,
  },
});

export default PersonalInfoScreen;