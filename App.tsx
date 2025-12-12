// App.tsx
import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MenuProvider } from './src/contexts/MenuContext';
import HomeScreen from './src/screens/HomeScreen';
import AddItemScreen from './src/screens/AddItemScreen';
import FilterScreen from './src/screens/FilterScreen';
import { RootStackParamList } from './src/types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <MenuProvider>
      <NavigationContainer>
        <Stack.Navigator 
          initialRouteName="Home"
          screenOptions={{
            headerStyle: { backgroundColor: '#2B6CB0' },
            headerTintColor: '#fff',
            headerTitleStyle: { fontWeight: 'bold' },
          }}
        >
          <Stack.Screen 
            name="Home" 
            component={HomeScreen}
            options={{ title: "Christoffel's Menu" }}
          />
          <Stack.Screen 
            name="AddItem" 
            component={AddItemScreen}
            options={{ title: 'Add Menu Item' }}
          />
          <Stack.Screen 
            name="Filter" 
            component={FilterScreen}
            options={{ title: 'Filter Menu' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </MenuProvider>
  );
}