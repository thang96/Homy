import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {LoginScreen, RegisterScreen, VerifyOtpScreen} from '../../Screens';

const Stack = createStackNavigator();
const LoginNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="LoginScreen">
      <Stack.Screen
        component={LoginScreen}
        name={'LoginScreen'}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={RegisterScreen}
        name={'RegisterScreen'}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={VerifyOtpScreen}
        name={'VerifyOtpScreen'}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};
export default LoginNavigation;
