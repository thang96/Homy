import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {LoginScreen} from '../screens';

const Stack = createStackNavigator();
const AuthNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="LoginScreen">
      <Stack.Screen
        component={LoginScreen}
        name={'LoginScreen'}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};
export default AuthNavigator;
