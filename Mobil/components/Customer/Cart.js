import React, { useCallback, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity,StyleSheet,Image,ActivityIndicator } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import CartService from '../../services/CartService';
import { FontAwesome } from '@expo/vector-icons'; 


const Cart = ({ navigation }) => {
  const[isLoading,setIsLoading]=useState(false);
  const [cart,setCart]=useState(null)

  const getCartDetail=async()=>{
    setIsLoading(true);
    const res= await CartService.GetCartDetailByUserId();
    setIsLoading(false);
    if(res&& !res.error){
      setCart(res.data);
    }else{
        alert("Bir hata oluştu");
    }
  };

  useFocusEffect(
    useCallback(() => {
      (async()=>{
        await getCartDetail();
      })();
      return () => {
       
      };
    }, []));
    

    const deleteCart=async()=>{

        setIsLoading(true);
        const response= await CartService.DeleteCardById({id:cart.cartId});
        setIsLoading(false);
        if(response && !response.error){
            alert("Sepet başarılı bir şekilde boşaltıldı");
            await getCartDetail();
        }else{
            alert("Bir hata  oluştu");
        }
    };

  const productRenderItem = ({item}) => (
    <TouchableOpacity style={styles.productItem} onPress={()=>{
      navigation.navigate('ProductDetail',{id:item.productId});
    }}>
      <Image source={{uri: item.image??'https://as2.ftcdn.net/v2/jpg/03/15/18/09/1000_F_315180932_rhiXFrJN27zXCCdrgx8V5GWbLd9zTHHA.jpg'}} style={styles.productImage} />
      <View style={styles.productInfo}>
        <Text style={styles.productTitle}>{item.name}</Text>
        <Text style={styles.productPropertyInfo}>Kategori: {item.category}</Text>
        <Text style={styles.productPropertyInfo}>Miktar: {item.quantity}</Text>
        <Text style={styles.productPropertyInfo}>Tutar: {item.total}₺</Text>
      </View>
    </TouchableOpacity>
  );



  return (
    <View style={styles.container}>
      {isLoading?( <ActivityIndicator size="large" color="#0000ff" style={{flexDirection:"row" }} />):(
      <>
      <Text style={styles.title}>Sepet</Text>
      {
        cart?.cartItems.length>0?(
            <>
        <FlatList
            data={cart?.cartItems}
            renderItem={productRenderItem}
            keyExtractor={item => item.productId}
            numColumns={1}
            style={styles.productList}  
          />
        
        
        <TouchableOpacity style={styles.paymentButton} onPress={()=>navigation.navigate('Payment',{id:cart.cartId,total:cart.total})} >
            <Text style={styles.buttonText}>Öde {cart?.total}₺</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.clearButton} onPress={deleteCart} >
            <Text style={styles.buttonText}>Sepeti Boşalt <FontAwesome name="trash" color={'white'} size={20} /></Text>
        </TouchableOpacity>
       
        </>
          ):(<Text style={styles.infoText}>Sepetinizde ürün bulunmamaktadır</Text>)      
    }
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
     fontSize: 18,
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
  buttonContainer:{
    display:'flex',
    justifyContent:'space-between',
    alignContent:'space-between',
    marginHorizontal:5,
    marginVertical:10
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
  paymentButton: {
    backgroundColor: '#AAD9BB',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  clearButton:{
    backgroundColor: '#FAEF5D',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginBottom: 16,
  }
 });

export default Cart;