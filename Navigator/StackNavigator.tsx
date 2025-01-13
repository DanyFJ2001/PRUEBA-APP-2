import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Welcome from '../Screens/Welcome';
import Inicio from '../Screens/Login';
import Registro from '../Screens/Registro';
import Aplicacion from '../Screens/Aplicacion'; // Pantalla para el Bottom Tab
import Operaciones from '../Screens/Aplicacion';
import Historial from '../Screens/Historial';
import Perfil from '../Screens/Perfil';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Configuración del Bottom Tab Navigator
function BottomTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Operaciones" component={Operaciones} />
      <Tab.Screen name="Historial" component={Historial} />
      <Tab.Screen name="Perfil" component={Perfil} />
      {/* Agrega más pestañas aquí si las necesitas */}
    </Tab.Navigator>
  );
}

// Configuración del Stack Navigator
export default function AppNavegador() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Login" component={Inicio} />
        <Stack.Screen name="Registro" component={Registro} />
        {/* Al llegar a "Operaciones", se muestra el Bottom Tab */}
        <Stack.Screen
          name="Operaciones"
          component={BottomTabs}
          options={{ headerShown: false }} // Oculta el encabezado del Stack para el Bottom Tab
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
