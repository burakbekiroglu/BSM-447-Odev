import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet,TouchableOpacity,ActivityIndicator } from 'react-native';
import { registerSchema } from '../validations/AuthValidation';
import {colors} from '../themes/theme'
import AuthService from '../services/AuthService';

const ErrorMessage=({value})=>(value ? <Text style={styles.errorText}>{value}</Text> : null);

const RegisterScreen = ({ navigation }) => {
  const[user,setUser]=useState({
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
    setUser({ ...user, [key]: value });
  };
  

  const handleRegister = async () => {
    try {
      await registerSchema.validate(user, { abortEarly: false });

      setIsLoading(true);
      const response = await AuthService.register(user);
      setIsLoading(false);
      if(response  && !response.error){
        navigation.navigate('Login');
      }
    } catch (error) {
      if (error.name === 'ValidationError') {
        const newErrors = {};
        error.inner.forEach((e) => {
          newErrors[e.path] = e.message;
        });
        setErrors(newErrors);
      }
    }
  };

  return (
    <View style={styles.container}>
      {
        isLoading&&( <ActivityIndicator size="large" color="#0000ff" style={{flexDirection:"row" }} />)
      }
      <Text style={styles.title}>Kayıt Ol</Text>
      <TextInput
        style={styles.input}
        placeholder="Ad"
        value={user.firstName}
        onChangeText={(text) => onChange('firstName',text)}
      />
      <ErrorMessage value={errors.firstName}/>
      <TextInput
        style={styles.input}
        placeholder="Soyad"
        value={user.lastName}
        onChangeText={(text) => onChange('lastName',text)}
      />
      <ErrorMessage value={errors.lastName}/>
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        value={user.email}
        onChangeText={(text) => onChange('email',text)}
      />
      <ErrorMessage value={errors.email}/>
      <TextInput
        style={styles.input}
        placeholder="Telefon"
        value={user.phone}
        onChangeText={(text) => onChange('phone',text)}
      />
      <ErrorMessage value={errors.phone}/>
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={user.password}
        onChangeText={(text) => onChange('password',text)}
        secureTextEntry
      />
      <ErrorMessage value={errors.password}/>
      <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
          <Text style={styles.buttonText}>Kayıt Ol</Text>
      </TouchableOpacity>
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

export default RegisterScreen;