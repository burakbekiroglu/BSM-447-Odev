import React, { useState } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import ProductService from '../services/ProductService';


const SaveProductImageScreen = ({route}) => {
    const{id}=route.params;
  const [images, setImages] = useState([]);



  const handleAddImages = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== 'granted') {
      alert('Galeri izinleri reddedildi!');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        aspect: [4, 3],
        quality: 1,
        allowsMultipleSelection: true,
      });

    if (result.canceled) {
        return;
    }

  


    const formData= new FormData();
    formData.append("productId",id);

    result.assets.forEach((m)=> {
       
      const filename = m.uri.split('/').pop();
      const filetype = filename.split('.').pop();
      const file={
         uri:m.uri, 
        name:new Date().getUTCMinutes().toString(), 
        type: `image/jpg`,
      };
      
      formData.append(`files[]`,{
        file:file,
        status:true,
        sort:0
      });
      
    });


     console.log(formData);
    const response = await ProductService.SaveProductImages(formData);

    if(response && !response.error){
        alert("Resim/ler başarılı bir şekilde yüklendi")
    }else{
        alert('Resimler yüklenirken hata oluştu');
    }
 };


  const renderImageItem = ({ item }) => (
    <View style={styles.imageContainer}>
      <Image source={{ uri: item.uri }} style={styles.image} />
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={images}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderImageItem}
        numColumns={2}
      />
      <TouchableOpacity onPress={handleAddImages} style={styles.addButton}>
        <Text style={{ fontSize: 16, color: 'white' }}>Resim Ekle</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    margin: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  addButton: {
    marginTop: 20,
    backgroundColor: '#7FC7D9',
    padding: 10,
    borderRadius: 10,
    marginBottom:2
  },
});

export default SaveProductImageScreen;