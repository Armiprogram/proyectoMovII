import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";


import JuegoScreen from "../screens/JuegoScreen";
import PuntosScreen from "../screens/PuntosScreen";
import LoginScreen from "../screens/LoginScreen";
import RegistroScreen from "../screens/RegistroScreen";

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
      <Tab.Screen name="JuegoScreen" component={JuegoScreen} />
      <Tab.Screen name="PuntosScreen" component={PuntosScreen} />
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