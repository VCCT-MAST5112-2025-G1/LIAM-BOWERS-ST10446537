// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './screens/HomeScreen';
import AddItemScreen from './screens/AddItemScreen';
import { MenuProvider } from './contexts/MenuContext';

export type RootStackParamList = {
  Home: undefined;
  AddItem: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <MenuProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerTintColor: "#fff",
            headerStyle: { backgroundColor: "#2B6CB0" },
          }}
        >
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: "Christoffel — Menu" }}
          />
          <Stack.Screen
            name="AddItem"
            component={AddItemScreen}
            options={{ title: "Add Menu Item" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </MenuProvider>
  );
}
