import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { TodoContextProvider } from './contexts/TodoContext';
import { GuestRoutes } from './routes/GuestRoutes';
import { HomeScreen } from './screens/HomeScreen';
import { theme } from './themes';

export default function App() {
  return (
    <NavigationContainer>
      <PaperProvider theme={theme}>
        {/* <GuestRoutes /> */}
        <TodoContextProvider>
          <HomeScreen />
        </TodoContextProvider>
      </PaperProvider>
    </NavigationContainer>
  );
}
