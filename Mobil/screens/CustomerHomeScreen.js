import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons'; 
import {  Text } from 'react-native';

const Tab = createBottomTabNavigator();
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
        component={()=>(<Text>Mağaza</Text>)}
        options={{
          tabBarLabel: 'Ana Sayfa',
          tabBarIcon: ({ color, size }) => <FontAwesome name="home" color={color} size={size} />,
          tabBarStyle:{
            
          }
        }}
      />
      <Tab.Screen
        name="Cart"
        component={()=>(<Text>hodsadme</Text>)}
        options={{
          tabBarLabel: 'Sepet',
          tabBarIcon: ({ color, size }) => <FontAwesome name="shopping-cart" color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={()=>(<Text>das</Text>)}
        options={{
          tabBarLabel: 'Profil',
          tabBarIcon: ({ color, size }) => <FontAwesome name="user" color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="logout"
        component={()=>(<Text>close</Text>)}
        options={{
          tabBarLabel: 'log Out',
          tabBarIcon: ({ color, size }) => <FontAwesome name="sign-out" color={color} size={size} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default CustomerHomeScreen;