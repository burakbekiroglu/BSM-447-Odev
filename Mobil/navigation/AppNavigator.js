import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import LoginScreen from '../screens/LoginScreen';
import AdminHomeScreen from '../screens/AdminHomeScreen';
import CustomerHomeScreen from '../screens/CustomerHomeScreen';
import RegisterScreen from '../screens/RegisterScreen'; 
import { useAuth } from '../contexts/AuthContext';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const { token, userType } = useAuth();

  return (
    <Stack.Navigator
      initialRouteName={token ? (userType === 'admin' ? 'AdminHome' : 'CustomerHome') : 'Login'}
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
      <Stack.Screen name="AdminHome" component={AdminHomeScreen} />
      <Stack.Screen name="CustomerHome" component={CustomerHomeScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;