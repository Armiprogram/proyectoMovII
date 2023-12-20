import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, TouchableOpacity } from 'react-native';
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
    <View style={styles.container}>
      <Text>Inicio de sesión</Text>
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

