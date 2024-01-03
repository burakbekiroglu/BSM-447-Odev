import React, { useCallback, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity,StyleSheet,ActivityIndicator } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import AddressService from '../services/AddressService';




const AddressScreen = ({navigation}) => {
  const[isLoading,setIsLoading]=useState(false);
  const [addreses, setAddreses] = useState([]);

  const handleNewAddress=()=>{
    navigation.navigate('AddressDetail',{id:0});
  };

  const getAddreses=async()=>{
    setIsLoading(true);
    const res= await AddressService.GetUserAddreses();
    setIsLoading(false);
    if(res&& !res.error){
      setAddreses(res.data);
    }
  };


  useFocusEffect(
    useCallback(() => {
      (async()=>{
        await getAddreses();
      })();
      return () => {
       
      };
    }, []));





  const addressRenderItem = ({item}) => (
    <TouchableOpacity style={styles.addressItem} onPress={()=>{
      navigation.navigate('AddressDetail',{id:item.id});
    }}>
      <View style={styles.addressInfo}>
        <Text style={styles.addressTitle}>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );



  return (
    <View style={styles.container}>
      {isLoading?( <ActivityIndicator size="large" color="#0000ff" style={{flexDirection:"row" }} />):(<>
        <Text style={styles.tittleContainer}>
            <Text style={styles.title}>Adreslerim</Text>
        </Text>
    <FlatList
      data={addreses}
      renderItem={addressRenderItem}
      keyExtractor={item => item.id}
      numColumns={1}
      style={styles.addressList}
      
    />
    <View style={styles.buttonContainer}>
    <TouchableOpacity style={styles.saveButton}  onPress={handleNewAddress}>
          <Text style={{color:'white'}}>Yeni Adres Ekle</Text>
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
  tittleContainer:{
    display:'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
     fontSize: 18,
  },
  addressList: {
     paddingHorizontal: 20,
     paddingTop:10,
     marginVertical:10,
  },
  addressItem: {
    margin:3,
     flexDirection: 'row',
     padding: 10,
     borderColor:'gray',
     borderStyle:'solid',
     borderWidth:1,
     borderRadius:10,
  },
    addressInfo: {
     flexDirection: 'column',
     justifyContent: 'space-between',
     paddingLeft: 10,
  },
  addressTitle: {
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

export default AddressScreen;