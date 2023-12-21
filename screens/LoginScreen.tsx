import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, TouchableOpacity, ImageBackground } from 'react-native';
import { auth } from '../components/Config';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
export default function LoginScreen({ navigation }: any) {
  const [correo, setCorreo] = useState("");
  const [contrasenia, setContrasenia] = useState("");

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, correo, contrasenia)
      .then((userCredential) => {
        // Acceso concedido 
        const user = userCredential.user;
        console.log("Acceso correcto");
        navigation.navigate('BottomTab');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("Acceso denegado");
        console.log(errorCode);
        console.log(errorMessage);

        switch (errorCode) {
          case 'auth/missing-password':
            Alert.alert("Error", "No puede ingresar una contraseña en blanco");
            break;
          case 'auth/wrong-password':
            Alert.alert("Error", "Error en las credenciales");
            break;
          default:
            Alert.alert("Error", "Comuníquese con el administrador");
        }
      });
  };


  const handleRegistro = () => {
    // Navegar a la pantalla de registro
    navigation.navigate('Registro');
  };

  return (
    <ImageBackground
      style={styles.fondo}
      source={{
        uri:
          'https://i.pinimg.com/564x/77/4e/01/774e0172c6c89c018065ef2c7c254077.jpg',
      }}
    >

    <View style={styles.container}>
      <Text style={{ fontSize: 24 }}>Inicio de sesión</Text>
      <TextInput
        style={styles.input}
        placeholder="Usuario"
        onChangeText={(texto) => setCorreo(texto)}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        onChangeText={(texto) => setContrasenia(texto)}
      />
      <Button title="Iniciar sesión" onPress={handleLogin}  color="#ff4500" />
      
      {/* Botón para ir a la pantalla de registro */}
      <TouchableOpacity onPress={handleRegistro}>
        <Text style={[styles.registroButton, { fontSize: 18, fontWeight: 'bold' }]}>Registrarse</Text>
      </TouchableOpacity>
    </View>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
  },
  input: {
    height: 50,
    borderColor: 'black',
    borderWidth: 2,
    marginBottom: 10,
    padding: 10,
    width: '90%',
  },
  registroButton: {
    marginTop: 20,
    color: 'black', // Puedes personalizar el color del texto
    textDecorationLine: 'underline',
  },
  fondo: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

