import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  HomeScreen,
  BuildingManager,
  AddBuildings,
  AddBuildingsStep2,
  AddBuildingsStep3,
  Service,
  Utilities,
  AddService,
  AddUtilities,
  BuildingInformation,
  FloorInformation,
} from '../../../Screens';
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
        component={BuildingManager}
        name={'BuildingManager'}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={AddBuildings}
        name={'AddBuildings'}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={AddBuildingsStep2}
        name={'AddBuildingsStep2'}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={AddBuildingsStep3}
        name={'AddBuildingsStep3'}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={Service}
        name={'Service'}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={AddService}
        name={'AddService'}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={Utilities}
        name={'Utilities'}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={AddUtilities}
        name={'AddUtilities'}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={BuildingInformation}
        name={'BuildingInformation'}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={FloorInformation}
        name={'FloorInformation'}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};
export default StackHomepage;
