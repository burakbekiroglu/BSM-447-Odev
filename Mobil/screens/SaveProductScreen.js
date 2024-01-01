import React, { useEffect, useLayoutEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet,Picker ,Switch,ActivityIndicator } from 'react-native';
import ProductService from '../services/ProductService';
import { productSchema } from '../validations/AuthValidation';

const ErrorMessage=({value})=>(value ? <Text style={styles.errorText}>{value}</Text> : null);

const SaveProductScreen=({route})=>{
    const [isLoading,setIsLoading]=useState(false);
    const[categories,setCategories]=useState([{label:"Kategori Seçiniz", value:0}]);
    const { id } = route.params;
    const [data,setData]=useState({
        id:id,
        categoryId:null,
        name:'',
        description:'',
        amount:'',
        status:true,
        stock:''
    });

    const [errors, setErrors] = useState({
        categoryId:'',
        name:'',
        description:'',
        amount:'',
        status:true,
        stock:''
      });

    const getProduct= async (productId)=>{
        setIsLoading(true);
        const res= await ProductService.GetProductById({id:productId});
        setIsLoading(false);
        if(res&& !res.error){
            setData(res.data);
        }
    };

    const handleSave= async()=>{
        try {
            await productSchema.validate(data, { abortEarly: false });
      
            setIsLoading(true);
            const response = await ProductService.SaveProduct(data);
            setIsLoading(false);
            await getProduct(response.data.id);
            
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

    const getCategories= async ()=>{
        const response = await ProductService.CategorySelectOptions();
        if(response && !response.error){
            setCategories([...categories,...response.data]);
        }
    }


    useLayoutEffect(()=>{
        (async()=>{
            await getCategories();
            if(id>0){
                await getProduct(id);
            }
        })();
        
    },[id]);

    const  onChange=(key,value)=>{
        setData({ ...data, [key]: value });
      };
      const toggleSwitch = () => {
        setData({...data,status:!data.status});
      };

    return (
        <View style={styles.container}>
          <Text style={styles.title}>Ürün İşlemleri</Text> 
        
        {isLoading?( <ActivityIndicator size="large" color="#0000ff" style={{flexDirection:"row" }} />):(<> <TextInput
          style={styles.input}
          placeholder="İsim"
          value={data.name}
          onChangeText={(text) => onChange('name',text)}
        />
        <ErrorMessage value={errors.name}/>
        <Picker
        selectedValue={data.categoryId}
        style={styles.picker}
        onValueChange={(itemValue, itemIndex) => onChange("categoryId",itemValue)}
      >
        {categories.map(m=> (<Picker.Item key={m.id}  label={m.label} value={m.value}/>))}
      </Picker>
      <ErrorMessage value={errors.categoryId}/>
      <TextInput
          style={styles.input}
          placeholder="Açıklama"
          value={data.description}
          onChangeText={(text) => onChange('description',text)}
        />
        <ErrorMessage value={errors.description}/>
        <TextInput
          style={styles.input}
          placeholder="Tutar"
          value={data.amount}
          onChangeText={(text) => onChange('amount',text)}
        />
        <ErrorMessage value={errors.amount}/>
        <TextInput
          style={styles.input}
          placeholder="Stok"
          value={data.stock}
          onChangeText={(text) => onChange('stock',text)}
        />
        <ErrorMessage value={errors.stock}/>
<Text style={{ fontSize: 24, marginBottom: 16 }}>Durum</Text>
<Switch
        trackColor={{ false: '#767577', true: '#81b0ff' }}
        thumbColor={data.status ? '#f5dd4b' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={data.status}
      />
   <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.buttonText}>Kaydet</Text>
        </TouchableOpacity>  </>) }
        
        </View>
      );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems:'center',
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
    picker: {
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
    buttonText: {
        color: 'white',
        fontSize: 18,
        textAlign: 'center',
      },
      saveButton: {
        marginTop:2,
        backgroundColor: "#3498db",
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

export default SaveProductScreen;