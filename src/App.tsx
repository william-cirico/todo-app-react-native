import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { LoginScreen } from './screens/LoginScreen';
import { SignUpScreen } from './screens/SignUpScreen';
import { theme } from './themes';

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <SignUpScreen />
    </PaperProvider>
  );
}
