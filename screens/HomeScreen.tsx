import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';

export default function HomeScreen({ navigation }: any) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Aquí debes realizar la lógica de autenticación
    // En un entorno real, esto podría ser una llamada a una API o algún otro proceso seguro.
    // Este ejemplo simplemente compara el usuario y la contraseña con valores fijos.

    if (username === 'usuario' && password === 'contrasena') {
      // Si las credenciales son válidas, puedes navegar a la siguiente pantalla.
      navigation.navigate('Screen2');  // Ajusta el nombre de la pantalla según tu configuración
    } else {
      // Si las credenciales no son válidas, muestra un mensaje de error.
      Alert.alert('Error', 'Credenciales incorrectas');
    }
  };

  return (
    <View style={styles.container}>
      <Text>Inicio de sesión</Text>
      <TextInput
        style={styles.input}
        placeholder="Usuario"
        onChangeText={(text) => setUsername(text)}
        value={username}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
        value={password}
      />
      <Button title="Iniciar sesión" onPress={handleLogin} />
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
});
