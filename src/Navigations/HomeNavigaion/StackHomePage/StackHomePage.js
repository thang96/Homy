import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {ContractScreen, HomeScreen} from '../../../Screens';
const Stack = createStackNavigator();
const StackHomepage = () => {
  return (
    <Stack.Navigator initialRouteName="LoginScreen">
      <Stack.Screen
        component={HomeScreen}
        name={'HomeScreen'}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={ContractScreen}
        name={'ContractScreen'}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};
export default StackHomepage;
