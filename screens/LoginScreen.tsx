import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, TouchableOpacity } from 'react-native';

export default function LoginScreen({ navigation }: any) {


  const handleLogin = () => {
   
    navigation.navigate('BottomTab');
  };


  const handleRegistro = () => {
    // Navegar a la pantalla de registro
    navigation.navigate('Registro');
  };

  return (
    <View style={styles.container}>
      <Text>Inicio de sesión</Text>
      <TextInput
        style={styles.input}
        placeholder="Usuario"
    

      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry

 
      />
      <Button title="Iniciar sesión" onPress={handleLogin} />
      
      {/* Botón para ir a la pantalla de registro */}
      <TouchableOpacity onPress={handleRegistro}>
        <Text style={styles.registroButton}>Registrarse</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    width: '80%',
  },
  registroButton: {
    marginTop: 10,
    color: 'blue', // Puedes personalizar el color del texto
    textDecorationLine: 'underline',
  },
});

