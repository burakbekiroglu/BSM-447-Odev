import React, { useCallback, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity,StyleSheet,Image,ActivityIndicator } from 'react-native';
import ProductService from '../../services/ProductService';
import { useFocusEffect } from '@react-navigation/native';






const Products = ({ navigation }) => {
  const[isLoading,setIsLoading]=useState(false);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [filterProducts,setFilterProducts]=useState([]);
  
  const getProducts=async()=>{
    setIsLoading(true);
    const res= await ProductService.GetProducts();
    setIsLoading(false);
    if(res&& !res.error){
      setProducts(res.data);
      setFilterProducts(res.data);
    }
  };

  const getCategories=async()=>{
    setIsLoading(true)
    const res= await ProductService.CategorySelectOptions();
    setIsLoading(false)
    if(res&& !res.error){
      setCategories([{label:'Tüm kategoriler',value:0},...res.data.filter(f=>f.common.status)]);
    }
  };
  const handleFilter=(id)=>{
    console.log(id);
    if(id===0) setFilterProducts(products);
    else{
      setFilterProducts(products.filter(f=>f.categoryId===id))
    }
  };

  useFocusEffect(
    useCallback(() => {
      (async()=>{
        await getCategories();
        await getProducts();
      })();
      return () => {
       
      };
    }, []));




  const productRenderItem = ({item}) => (
    <TouchableOpacity style={styles.productItem} onPress={()=>{
      navigation.navigate('ProductDetail',{id:item.id});
    }}>
      <Image source={{uri: item.images[0]??'https://as2.ftcdn.net/v2/jpg/03/15/18/09/1000_F_315180932_rhiXFrJN27zXCCdrgx8V5GWbLd9zTHHA.jpg'}} style={styles.productImage} />
      <View style={styles.productInfo}>
        <Text style={styles.productTitle}>{item.name}</Text>
        <Text style={styles.productPropertyInfo}>Kategori: {item.category}</Text>
        <Text style={styles.productPropertyInfo}>Stok: {item.stock>0?item.stock:'Stokta Yok'}</Text>
      </View>
    </TouchableOpacity>
  );

  const categoryRenderItem = ({item}) => (
    <TouchableOpacity style={styles.categoryItem} onPress={()=>{
      handleFilter(item.value);
    }}>
      <Text style={styles.title}>{item.label}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {isLoading?( <ActivityIndicator size="large" color="#0000ff" style={{flexDirection:"row" }} />):(<><FlatList
      data={categories}
      renderItem={categoryRenderItem}
      keyExtractor={item => item.value}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      style={styles.list}
    />
    <FlatList
      data={filterProducts}
      renderItem={productRenderItem}
      keyExtractor={item => item.id}
      numColumns={1}
      style={styles.productList}  
    />
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
  list: {
     paddingHorizontal: 15,
  },
  categoryItem: {
     backgroundColor: '#f9c2ff',
     paddingHorizontal: 10,
     marginRight: 10,
     borderRadius: 5,
     justifyContent:'center',
     height:24,
     padding:2
  },
  title: {
     fontSize: 18,
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
  buttonContainer: {
    flexDirection: 'row', 
    justifyContent: 'center', 
    width: '100%',
    marginBottom:2
  },
  saveButton: {
    backgroundColor: "#3498db",
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 24,
  }
 });

export default Products;