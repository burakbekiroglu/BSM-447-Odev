import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons'; 
import {  Text } from 'react-native';
import Products from '../components/Admin/Products';
import Categories from '../components/Admin/Categories';

const Tab = createBottomTabNavigator();
const AdminHomeScreen = () => {
  return (
    <Tab.Navigator
    tabBarOptions={{
      activeTintColor: '#3498db', 
      inactiveTintColor: 'gray', 
    }}
  >
    <Tab.Screen
      name="Home"
      component={Products}
      options={{
        headerShown:false,
        tabBarLabel: 'Ürünler',
        tabBarIcon: ({ color, size }) => <FontAwesome name="shopping-cart" color={color} size={size} />,
        tabBarStyle:{
          
        }
      }}
    />
    <Tab.Screen
      name="Categories"
      component={Categories}
      options={{
        headerShown:false,
        tabBarLabel: 'Kategoriler',
        tabBarIcon: ({ color, size }) => <FontAwesome name="list" color={color} size={size} />,
      }}
    />
    <Tab.Screen
      name="logout"
      component={()=>(<Text>close</Text>)}
      options={{
        headerShown:false,
        tabBarLabel: 'Çıkış Yap',
        tabBarIcon: ({ color, size }) => <FontAwesome name="sign-out" color={color} size={size} />,
      }}
    />
  </Tab.Navigator>
  );
};

export default AdminHomeScreen;