import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  CheckServiceManager,
  ConfirmService,
  ContractManager,
  DetailContract,
  DetailContractLiquidated,
  HomeScreen,
  InvoiceManager,
  InvoicePaidDetail,
  InvoiceUnpaidDetail,
  PaymentScreen,
} from '../../screens';
const Stack = createStackNavigator();

const StackHomeNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="HomeScreen">
      <Stack.Screen
        component={HomeScreen}
        name={'HomeScreen'}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={ContractManager}
        name={'ContractManager'}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={DetailContract}
        name={'DetailContract'}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={DetailContractLiquidated}
        name={'DetailContractLiquidated'}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={InvoiceManager}
        name={'InvoiceManager'}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={InvoicePaidDetail}
        name={'InvoicePaidDetail'}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        component={InvoiceUnpaidDetail}
        name={'InvoiceUnpaidDetail'}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={CheckServiceManager}
        name={'CheckServiceManager'}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={ConfirmService}
        name={'ConfirmService'}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={PaymentScreen}
        name={'PaymentScreen'}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};
export default StackHomeNavigator;
