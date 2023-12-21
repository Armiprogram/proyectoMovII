import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import JuegoScreen from "../screens/JuegoScreen";
import PuntosScreen from "../screens/PuntosScreen";
import LoginScreen from "../screens/LoginScreen";
import RegistroScreen from "../screens/RegistroScreen";
import PerfilScreen from "../screens/PerfilScreen";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const MyTabs = () => {
  return (
    <Stack.Navigator initialRouteName="Screen1">
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Registro" component={RegistroScreen} />
      <Stack.Screen name="BottomTab" component={BottomTabNavigator} />
    </Stack.Navigator>
  );
};

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Juego"
        component={JuegoScreen}
        options={{
          tabBarLabel: "Juego",
          tabBarIcon: () => (
            <MaterialCommunityIcons
              name="nintendo-game-boy"
              size={24}
              color="black"
            />
          ),
        }}
      />
      <Tab.Screen
        name="Puntos"
        component={PuntosScreen}
        options={{
          tabBarLabel: "Puntos",
          tabBarIcon: () => (
            <Ionicons name="stats-chart" size={24} color="black" />
          ),
        }}
      />
      <Tab.Screen name="Perfil" component={PerfilScreen} 
      options={{
        tabBarLabel: "Perfil",
        tabBarIcon: () => (
          <MaterialCommunityIcons name="account-star" size={24} color="black" />
        ),
      }}
      />
    </Tab.Navigator>
  );
};

export default function TabNavigator() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}
