import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './contexts/AuthContext';
import AppNavigator from './navigation/AppNavigator';

const App = () => {
  return (
    <NavigationContainer>
      <AuthProvider>
        <AppNavigator />
      </AuthProvider>
    </NavigationContainer>
  );
};

export default App;