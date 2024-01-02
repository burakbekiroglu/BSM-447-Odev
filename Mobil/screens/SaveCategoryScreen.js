import React, { useEffect, useLayoutEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet,Picker ,Switch,ActivityIndicator } from 'react-native';
import ProductService from '../services/ProductService';
import { categorySchema } from '../validations/AuthValidation';

const ErrorMessage=({value})=>(value ? <Text style={styles.errorText}>{value}</Text> : null);

const SaveProductScreen=({route})=>{
    const [isLoading,setIsLoading]=useState(false);
    const { id } = route.params;
    const [data,setData]=useState({
        id:id,
        category:'',
        status:true,
    });

    const [errors, setErrors] = useState({
        id:id,
        category:'',
      });

    const getCategory= async (categoryId)=>{
        setIsLoading(true);
        const res= await ProductService.GetCategoryById({id:categoryId});
        setIsLoading(false);
        if(res&& !res.error){
            setData(res.data);
        }
    };

    const handleSave= async()=>{
        try {
            await categorySchema.validate(data, { abortEarly: false });
      
            setIsLoading(true);
            const response = await ProductService.SaveCategory(data);
            setIsLoading(false);
            await getCategory(response.data.id);
            
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



    useLayoutEffect(()=>{
        (async()=>{
            if(id>0){
                await getCategory(id);
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
          <Text style={styles.title}>Kategori İşlemleri</Text> 
        
        {isLoading?( <ActivityIndicator size="large" color="#0000ff" style={{flexDirection:"row" }} />):(<> 
            <Text style={{ fontSize: 24, marginBottom: 16 }}>Kategori</Text>
        <TextInput
          style={styles.input}
          placeholder="Kategori Giriniz..."
          value={data.category}
          onChangeText={(text) => onChange('category',text)}
        />
        <ErrorMessage value={errors.name}/>
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