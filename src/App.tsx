import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import 'react-native-gesture-handler';
import { ThemeContextProvider } from './contexts/ThemeContext';
import { TodoContextProvider } from './contexts/TodoContext';
import { ProtectedRoutes } from './routes/ProtectedRoutes';

export default function App() {
  return (
    <NavigationContainer>
      <TodoContextProvider>
        <ThemeContextProvider>
          <ProtectedRoutes />
        </ThemeContextProvider>
      </TodoContextProvider>
    </NavigationContainer>
  );
}
