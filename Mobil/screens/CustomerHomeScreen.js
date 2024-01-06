import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons'; 
import {  Text } from 'react-native';
import Products from '../components/Customer/Products';
import { useAuth } from '../contexts/AuthContext';
import Profile from '../components/Customer/Profile';
import Cart from '../components/Customer/Cart';


const Tab = createBottomTabNavigator();

const onLogout=()=>{
  const { logout} = useAuth();
  logout();
};


const CustomerHomeScreen = () => {
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
          tabBarLabel: 'Mağaza',
          tabBarIcon: ({ color, size }) => <FontAwesome name="home" color={color} size={size} />,
          tabBarStyle:{
            
          }
        }}
      />
      <Tab.Screen
        name="Cart"
        component={Cart}
        options={{
          headerShown:false,
          tabBarLabel: 'Sepet',
          tabBarIcon: ({ color, size }) => <FontAwesome name="shopping-cart" color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown:false,
          tabBarLabel: 'Profil',
          tabBarIcon: ({ color, size }) => <FontAwesome name="user" color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="logout"  
        component={onLogout}
        options={{
          headerShown:false,
          tabBarLabel: 'Çıkış Yap',
          tabBarIcon: ({ color, size }) => <FontAwesome name="sign-out" color={color} size={size} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default CustomerHomeScreen;