import React, { useLayoutEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView,TouchableOpacity,ActivityIndicator } from 'react-native';
import AddressService from '../services/AddressService';
import OrderService from '../services/OrderService';
import { paymentSchema } from '../validations/Validation';
import {Picker} from '@react-native-picker/picker';
const ErrorMessage=({value})=>(value ? <Text style={styles.errorText}>{value}</Text> : null);

const PaymentScreen = ({navigation,route}) => {
    const [isLoading,setIsLoading]=useState(false);
    const{id,total}=route.params;
    const [data,setData]=useState({
        cartId:id,
        addressId:null,
    })
    const [payment,setPayment]=useState({
        cardNumber:'',
        fullName:'',
        cvv:'',
        validDate:''
    });
    const [errors, setErrors] = useState({
        addressId:'',
        cardNumber:'',
        fullName:'',
        cvv:'',
        validDate:''
      });
    const [addreses,setAddreses]=useState([{label:'Adres seçiniz',value:0}]);


    const  onChange=(key,value)=>{
        setPayment({ ...payment, [key]: value });
      };


  const handlePayment = async() => {

    try {
        const formData={
            ...data,
            paymentDetail:payment
        }
        await paymentSchema.validate({...data,...payment}, { abortEarly: false });
        setIsLoading(true);
        const response = await OrderService.Save(formData);
        setIsLoading(false);
        if(response  && !response.error){
            alert('Ödeme başarılı bir şekilde tamamlandı')
          navigation.navigate('CustomerHome');
        }
      } catch (error) {
        setIsLoading(false);
        if (error.name === 'ValidationError') {
          const newErrors = {};
          error.inner.forEach((e) => {
            if(e.path.includes('.')){
                const property=e.path.split('.')[1];
                
                newErrors.paymentDetail[property]=e.message;
            }else{
                newErrors[e.path] = e.message;
            }
            
            
          });
          console.log(newErrors);
          setErrors(newErrors);
        }
      }
  };

  const getAddressOptions=async()=>{
    const response= await AddressService.GetUserAddressSelectOptions();
    if(response && !response.error){
        setAddreses([...addreses,...response.data]);
    }
  }

  useLayoutEffect(()=>{
    (async()=>{
        await getAddressOptions();
    })();
  },[id]);

  return (
    isLoading?(<ActivityIndicator size="large" color="#0000ff" style={{flexDirection:"row" }} />):( <ScrollView style={styles.container}>     
        <View>
          <Text style={styles.title}>Ödeme Bilgileri</Text>
          <Text>Ödenecek Tutar: {total}₺</Text>
          <Picker
          style={styles.input}
            selectedValue={data.addressId}
            onValueChange={(itemValue) => setData({...data,addressId:itemValue})}
          >
            {addreses.map((item) => (
              <Picker.Item key={item.label} label={item.label} value={item.value} />
            ))}
          </Picker>
          <ErrorMessage value={errors.addressId}/>
          <TextInput
            style={styles.input}
            placeholder="Kart Numarası"
            value={payment.cardNumber}
            onChangeText={(text) => onChange('cardNumber',text)}
          />
          <ErrorMessage value={errors.cardNumber}/>   
  
          <TextInput
            style={styles.input}
            placeholder="Ad Soyad"
            value={payment.fullName}
             onChangeText={(text) => onChange('fullName',text)}
          />
          <ErrorMessage value={errors.fullName}/>
          <TextInput
            style={styles.input}
            placeholder="CVV"
            value={payment.cvv}
            onChangeText={(text) => onChange('cvv',text)}
          />
           <ErrorMessage value={errors.cvv}/>
          <TextInput
            style={styles.input}
            placeholder="Geçerlilik Tarihi (MM/YY)"
            value={payment.validDate}
            onChangeText={(text) => onChange('validDate',text)}
          />
          <ErrorMessage value={errors.validDate}/>
  
          <TouchableOpacity style={styles.paymentButton} onPress={handlePayment}>
              <Text style={{display:'flex', justifyContent:'center' }}>Ödemeyi Tamamla</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>)
   
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8, 
    marginBottom: 10,
    paddingLeft: 10,
    marginTop:10
  },
  errorText: {
    color: 'red',
    marginBottom: 8,
  },
  paymentButton: {
    backgroundColor: 'orange',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginBottom: 16,
  },
});

export default PaymentScreen;