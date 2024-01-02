import React, { useCallback, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity,StyleSheet,Image,ActivityIndicator } from 'react-native';
import ProductService from '../../services/ProductService';
import { useFocusEffect } from '@react-navigation/native';






const Categories = ({ navigation }) => {
  const[isLoading,setIsLoading]=useState(false);
  const [categories, setCategories] = useState([]);

  const handleNewCategory=()=>{
    navigation.navigate('SaveCategory',{id:0});
  };

  const getCategories=async()=>{
    setIsLoading(true);
    const res= await ProductService.GetCategories();
    setIsLoading(false);
    if(res&& !res.error){
      setCategories(res.data);
    }
  };


  useFocusEffect(
    useCallback(() => {
      (async()=>{
        await getCategories();
      })();
      return () => {
       
      };
    }, []));





  const categoryRenderItem = ({item}) => (
    <TouchableOpacity style={styles.categoryItem} onPress={()=>{
      navigation.navigate('SaveCategory',{id:item.id});
    }}>
      <View style={styles.categoryInfo}>
        <Text style={styles.categoryTitle}>{item.category}</Text>
        <Text style={styles.categoryStatus}>Durum: {item.status?"Aktif":"Pasif"}</Text>
      </View>
    </TouchableOpacity>
  );



  return (
    <View style={styles.container}>
      {isLoading?( <ActivityIndicator size="large" color="#0000ff" style={{flexDirection:"row" }} />):(<>
    <FlatList
      data={categories}
      renderItem={categoryRenderItem}
      keyExtractor={item => item.id}
      numColumns={1}
      style={styles.categoryList}
      
    />
    <View style={styles.buttonContainer}>
    <TouchableOpacity style={styles.saveButton}  onPress={handleNewCategory}>
          <Text style={{color:'white'}}>Yeni Kategori Ekle</Text>
      </TouchableOpacity>
    </View>
    </>)}
    
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
     flex: 1,
     paddingTop: 20,
  },
  title: {
     fontSize: 18,
  },
  categoryList: {
     paddingHorizontal: 20,
     paddingTop:10,
     marginVertical:10,
  },
  categoryItem: {
    margin:3,
     flexDirection: 'row',
     padding: 10,
     borderColor:'gray',
     borderStyle:'solid',
     borderWidth:1,
     borderRadius:10,
  },
    categoryInfo: {
     flexDirection: 'column',
     justifyContent: 'space-between',
     paddingLeft: 10,
  },
  categoryTitle: {
     fontSize: 16,
  },
  categoryStatus: {
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

export default Categories;