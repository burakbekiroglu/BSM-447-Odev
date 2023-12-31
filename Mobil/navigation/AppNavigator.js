import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import LoginScreen from '../screens/LoginScreen';
import AdminHomeScreen from '../screens/AdminHomeScreen';
import CustomerHomeScreen from '../screens/CustomerHomeScreen';
import RegisterScreen from '../screens/RegisterScreen'; 
import { useAuth } from '../contexts/AuthContext';
import SaveCategoryScreen from '../screens/SaveCategoryScreen';
import SaveProductScreen from '../screens/SaveProductScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import Constants from '../constants/Constants';
import PersonalInfoScreen from '../screens/PersonalInfoScreen';
import AddressScreen from '../screens/AddressScreen';
import AddressDetailScreen from '../screens/AddressDetailScreen';
import FavProductsScreen from '../screens/FavProductsScreen';
import WishListScreen from '../screens/WishListScreen';
import PaymentScreen from '../screens/PaymentScreen';
import SaveProductImageScreen from '../screens/SaveProductImageScreen';


const Stack = createStackNavigator();

const AppNavigator = () => {
  const { user } = useAuth();
  return (
    <Stack.Navigator
      initialRouteName={user ? (user.typeId === Constants.UserType.Admin ? 'AdminHome' : 'CustomerHome') : 'Login'}
      screenOptions={{
        headerShown: true,
        title:"BSM 447",
        headerTitleAlign:'center'
      }}
    >
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          headerLeft: null,
        }}
      />
      <Stack.Screen 
      name="AdminHome" 
      options={{
        headerLeft: null,
      }}
      component={AdminHomeScreen} />
      <Stack.Screen 
      name="SaveProduct" 
      component={SaveProductScreen} />
       <Stack.Screen 
      name="SaveProductImage" 
      component={SaveProductImageScreen} />
      <Stack.Screen 
      name="SaveCategory" 
      component={SaveCategoryScreen} />
      <Stack.Screen 
      name="ProductDetail" 
      component={ProductDetailScreen} />
      <Stack.Screen 
      name="PersonalInfo" 
      component={PersonalInfoScreen} />
      <Stack.Screen 
      name="Addresses" 
      component={AddressScreen} />
      <Stack.Screen 
      name="AddressDetail" 
      component={AddressDetailScreen} />
      <Stack.Screen 
      name="FavProducts" 
      component={FavProductsScreen} />
      <Stack.Screen 
      name="WishList" 
      component={WishListScreen} />
       <Stack.Screen 
      name="Payment" 
      component={PaymentScreen} />
      <Stack.Screen 
      name="CustomerHome" 
      options={{
        headerLeft: null,
      }}
      component={CustomerHomeScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;