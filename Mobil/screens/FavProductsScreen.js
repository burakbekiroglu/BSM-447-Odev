import React, { useCallback, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity,StyleSheet,Image,ActivityIndicator } from 'react-native';
import ProductService from '../services/ProductService';
import { useFocusEffect } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons'; 

const FavProductsScreen = ({ navigation }) => {
  const[isLoading,setIsLoading]=useState(false);
  const [products, setProducts] = useState([]);
  
  const getProducts=async()=>{
    setIsLoading(true);
    const res= await ProductService.GetFavProducts();
    setIsLoading(false);
    if(res&& !res.error){
      setProducts(res.data);
    }
  };

  const remove= async(id)=>{
    const response= await ProductService.DeleteFavProductById({id:id});
    if(response && !response.error){
       await getProducts();
    }
  };

  useFocusEffect(
    useCallback(() => {
      (async()=>{
        await getProducts();
      })();
      return () => {   
      };
    }, []));


  const productRenderItem = ({item}) => (
    <TouchableOpacity style={styles.productItem} onPress={()=>{
      navigation.navigate('ProductDetail',{id:item.id});
    }}>
      <Image source={{uri: item.image??'https://as2.ftcdn.net/v2/jpg/03/15/18/09/1000_F_315180932_rhiXFrJN27zXCCdrgx8V5GWbLd9zTHHA.jpg'}} style={styles.productImage} />
      <View style={styles.productInfo}>
        <Text style={styles.productTitle}>{item.name}</Text>
        <Text style={styles.productPropertyInfo}>Kategori: {item.category}</Text>
        <Text style={styles.productPropertyInfo}>Stok: {item.stock>0?item.stock:'Stokta Yok'}</Text>
        <View style={styles.removeButtonContainer}>
            <TouchableOpacity onPress={()=>remove(item.favId)}>
            <FontAwesome name="remove" color={'red'} size={20} />
            </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
        <Text style={styles.title}>Favoriler</Text>
      {isLoading?( <ActivityIndicator size="large" color="#0000ff" style={{flexDirection:"row" }} />):(
      <>
      {products?.length>0?(<FlatList
      data={products}
      renderItem={productRenderItem}
      keyExtractor={item => item.id}
      numColumns={1}
      style={styles.productList}  
    />):(<Text style={styles.infoText}>Favori Ürün Bulunmamaktadır</Text>)}
    
    </>)}
    
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
     flex: 1,
     paddingTop: 20,
     backgroundColor:'#fafafa'
  },
  title: {
     fontSize: 20,
     display:'flex',
     justifyContent:'center',
  },
  productList: {
    marginVertical:10,
     paddingHorizontal: 20,
  },
  productItem: {
    margin:3,
     flexDirection: 'row',
     justifyContent:'space-around',
     padding: 10,
     borderRadius:10,
     borderColor:'gray',
     borderStyle:'solid',
     borderWidth:1
  },
  productImage: {
     width: 100,
     height: 100,
     resizeMode: 'cover',
  },
  productInfo: {
     flexDirection: 'column',
     justifyContent: 'space-between',
     paddingLeft: 10,
  },
  productTitle: {
     fontSize: 16,
  },
  productPropertyInfo: {
     fontSize: 14,
     color: 'gray',
  },
  infoText:{
    marginVertical:20,
    fontSize: 16,
    display:'flex',
    justifyContent:'center',
    color:'red'
  },
  removeButtonContainer:{
    alignItems:'flex-end'
  }
 });

export default FavProductsScreen;