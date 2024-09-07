import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import DetailsScreen from './screens/DetailsScreen';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ tabBarStyle: { display: 'none' } }}
        />
        <Stack.Screen 
          name="Details"
          component={DetailsScreen}
          options={{ tabBarStyle: { display: 'none' } }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;