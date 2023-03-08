import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import 'react-native-gesture-handler';
import { TodoContextProvider } from './contexts/TodoContext';
import { ProtectedRoutes } from './routes/ProtectedRoutes';

export default function App() {
  return (
    <TodoContextProvider>
      <NavigationContainer>
        <TodoContextProvider>
          <ProtectedRoutes />
        </TodoContextProvider>
      </NavigationContainer>
    </TodoContextProvider>
  );
}
