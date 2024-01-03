import React, { useState,useCallback, useLayoutEffect } from 'react';
import { View, Text, TextInput, StyleSheet,TouchableOpacity,ActivityIndicator } from 'react-native';
import {colors} from '../themes/theme'
import AddressService from '../services/AddressService';
import { addressSchema } from '../validations/Validation';



const ErrorMessage=({value})=>(value ? <Text style={styles.errorText}>{value}</Text> : null);

const AddressDetailScreen = ({route}) => {
    const { id } = route.params;
  const[data,setData]=useState({
    id:id,
    country:'',
    city: '',
    district:'',
    description:'',
  });
  const [errors, setErrors] = useState({
    country:'',
    city: '',
    district:'',
    description:'',
  });
  const [isLoading,setIsLoading]=useState(false);

  const  onChange=(key,value)=>{
    setData({ ...data, [key]: value });
  };
  

  const handleSave = async () => {
    try {
      await addressSchema.validate(data, { abortEarly: false });

      setIsLoading(true);
      const response = await AddressService.Save(data);
      setIsLoading(false);
      if(response  && !response.error){
        alert('Adres kaydedildi.');
        await getAddress(response.data.id)
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

  const getAddress=async(addressId)=>{
    setIsLoading(true);
    const response= await AddressService.GetAddressById({id:addressId});
    setIsLoading(false);
    if(response && !response.error){
        const address=response.data;
        setData({
            id:address.id,
            country:address.country,
            city: address.city,
            district:address.district,
            description:address.description,
        })
    }else{
        alert('Bir hata oluştu Tekrar deneyiniz...');
    }
  };

  useLayoutEffect(()=>{
    (async()=>{
        if(id>0) await getAddress(id);
       })();
  },[id])

  return (
    <View style={styles.container}>
      {
        isLoading?( <ActivityIndicator size="large" color="#0000ff" style={{flexDirection:"row" }} />):
        (<><Text style={styles.title}>Adres Detay</Text>
        <Text style={{ fontSize: 24, marginBottom: 16 }}>Ülke</Text>
        <TextInput
          style={styles.input}
          placeholder="Ülke"
          value={data.country}
          onChangeText={(text) => onChange('country',text)}
        />
        <ErrorMessage value={errors.country}/>
        <Text style={{ fontSize: 24, marginBottom: 16 }}>Şehir</Text>
        <TextInput
          style={styles.input}
          placeholder="Şehir"
          value={data.city}
          onChangeText={(text) => onChange('city',text)}
        />
        <ErrorMessage value={errors.city}/>
        <Text style={{ fontSize: 24, marginBottom: 16 }}>İlçe</Text>
        <TextInput
          style={styles.input}
          placeholder="İlçe"
          value={data.district}
          onChangeText={(text) => onChange('district',text)}
        />
        <ErrorMessage value={errors.district}/>
        <Text style={{ fontSize: 24, marginBottom: 16 }}>Açıklama</Text>
        <TextInput
          style={styles.input}
          placeholder="Açıklama"
          value={data.description}
          onChangeText={(text) => onChange('description',text)}
        />
        <ErrorMessage value={errors.description}/>
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

export default AddressDetailScreen;