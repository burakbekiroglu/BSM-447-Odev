import React, { useLayoutEffect, useState } from 'react';
import { View, Text, Image, Button, ScrollView, StyleSheet, Dimensions,TouchableOpacity,ActivityIndicator } from 'react-native';
import ProductService from '../services/ProductService';
import {useAuth} from '../contexts/AuthContext';
import CartService from '../services/CartService';

const ProductDetailScreen = ({route}) => {
  const { id } = route.params;
  const{user}=useAuth();
  const [quantity, setQuantity] = useState(1);
  const [isLoading,setIsLoading]=useState(false);
  const [isFav,setIsFav]=useState(0);
  const[isWishList,setIsWishList]=useState(0);
  const [product,setProduct]=useState({
    name: '',
    category:'',
    description: '',
    stock: 0,
    amount: 0,
    images: [
      'https://as2.ftcdn.net/v2/jpg/03/15/18/09/1000_F_315180932_rhiXFrJN27zXCCdrgx8V5GWbLd9zTHHA.jpg',
    ],
  });

  const getProduct=async()=>{

    setIsLoading(true)
    const response = await ProductService.GetProductForCustomer({id:id});
    setIsLoading(false);

    if(response && !response.error){
      const{data}=response;
      
      if(!data.images?.length>0){
        data.images=['https://as2.ftcdn.net/v2/jpg/03/15/18/09/1000_F_315180932_rhiXFrJN27zXCCdrgx8V5GWbLd9zTHHA.jpg']
      }
      setProduct(data);
    }else{
      alert('Ürün yüklenirken bir hata oluştu');
    }
  };

  const getFavWishListInfo=async()=>{
    setIsLoading(true);
    const response = await  ProductService.GetProductFavWishListInfo({userId:user.id,productId:id});
    setIsLoading(false);
    if(response && !response.error){
      const {data}=response;
      setIsFav(data.favId);
      setIsWishList(data.wishListId);
    }
  };


  useLayoutEffect(()=>{
(async()=>{
  await getProduct();
  await getFavWishListInfo();
})();
  },[id]);

  const addToCart = async() => {
    const response= await CartService.SaveCartItem({productId:id,quantity:quantity});
    if(response && !response.error){
      alert("Ürün sepete eklendi")
    }else{
      alert("ürün sepete eklenirken hata oluştu");
    }
  };

  const addToWishlist =  async() => {
    setIsLoading(true);
    const response = await ProductService.SaveWishList({userId:user.id,productId:id});
    setIsLoading(false);

    if(response && !response.error){
      alert('Ürün İstek Listenize Eklendi')
      await getFavWishListInfo();
    }else{
      alert('Bir hata oluştu...')
    }
  };

  const addToFav= async()=>{
    setIsLoading(true);
    const response = await ProductService.SaveFavProduct({userId:user.id,productId:id});
    setIsLoading(false);

    if(response && !response.error){
      alert('Ürün Favorilerinize Eklendi')
      await getFavWishListInfo();
    }else{
      alert('Bir hata oluştu...')
    }
  };

  const deleteFromFav=async()=>{
    const response= await ProductService.DeleteFavProductById({id:isFav});
    if(response && !response.error){
       await getFavWishListInfo();
    }
  }

  const deleteFromWishList=async()=>{
    const response= await ProductService.DeleteWishListById({id:isWishList});
    if(response && !response.error){
       await getFavWishListInfo();
    }
  };

  return (
    <View style={styles.container}>
      {isLoading?(<ActivityIndicator size="large" color="#0000ff" style={{flexDirection:"row" }} />):(<>
        <View style={styles.imageContainer}>
        <ScrollView horizontal pagingEnabled>
          {product.images.map((image, index) => (
            <Image key={index} source={{ uri: image }} style={styles.carouselImage} />
          ))}
        </ScrollView>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.category}>Kategori: {product.category}</Text>
        <Text style={styles.description}>{product.description}</Text>
        <Text style={styles.stock}>Stok: {product.stock}</Text>
        <Text style={styles.price}>Fiyat: ₺{product.amount}</Text>
        <View style={styles.quantityContainer}>
          <Text style={styles.quantityText}>Miktar:</Text>
          <Button title="-" onPress={() => setQuantity(quantity > 1 ? quantity - 1 : 1)} />
          <Text style={styles.quantity}>{quantity}</Text>
          <Button title="+" onPress={() => setQuantity(quantity + 1)} />
        </View>
        <View style={styles.buttonContainer}>
        <TouchableOpacity disabled={quantity>product.stock} style={styles.addToCartButton}  onPress={addToCart} >
        Sepete Ekle
        </TouchableOpacity>
        {isWishList===0?(<TouchableOpacity style={styles.addToWishlistButton}  onPress={addToWishlist} >
        İstek Listesine Ekle
        </TouchableOpacity>):(<TouchableOpacity style={styles.addToWishlistButton}  onPress={deleteFromWishList} >
        İstek Listesinden Kaldır
        </TouchableOpacity>)}        
        {isFav===0?( <TouchableOpacity style={styles.addToFavButton} onPress={addToFav} >
        Favorilere Ekle
        </TouchableOpacity>):( <TouchableOpacity style={styles.addToFavButton} onPress={deleteFromFav} >
        Favorilererden Kaldır
        </TouchableOpacity>)}
        </View>
      </View>
      </>)}
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  imageContainer: {
    height: Dimensions.get('window').width * 0.75, 
  },
  carouselImage: {
    width: Dimensions.get('window').width,
    height: '100%',
    resizeMode: 'stretch',
    borderWidth:1
  },
  detailsContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    marginBottom: 8,
  },
  stock: {
    fontSize: 16,
    marginBottom: 8,
  },
  category: {
    fontSize: 13,
    marginBottom: 8,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  quantityText: {
    fontSize: 16,
    marginRight: 8,
  },
  quantity: {
    fontSize: 16,
    marginHorizontal: 8,
  },
  buttonContainer:{
    flex:1,
    justifyContent:'center',
  },
  addToCartButton: {
    backgroundColor: '#FFE7C1',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginBottom: 16,
    color:'white'
  },
  addToWishlistButton: {
    backgroundColor: '#F6D6D6',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginBottom: 16,
    color:'white'
  },
  addToFavButton: {
    backgroundColor: '#DBCC95',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginBottom: 16,
    color:'white'
  },
});

export default ProductDetailScreen;