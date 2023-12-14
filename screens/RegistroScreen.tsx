import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

export default function RegistroScreen({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [nick, setNick] = useState('');
  const [edad, setEdad] = useState('');
  const [contrasena, setContrasena] = useState('');

  const handleRegistro = () => {
    // Aquí puedes manejar la lógica de registro, por ejemplo, enviar la información a tu servidor.
   
    console.log('Email:', email);
    console.log('Nick:', nick);
    console.log('Edad:', edad);
    console.log('Contraseña:', contrasena);
    navigation.navigate("Login")
    
  };

  return (
    <View style={styles.container}>
      <Text>RegistroScreen</Text>

      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        keyboardType="email-address"
        autoCapitalize="none"
        onChangeText={(text) => setEmail(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Nick"
        autoCapitalize="none"
        onChangeText={(text) => setNick(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Edad"
        keyboardType="numeric"
        onChangeText={(text) => setEdad(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        onChangeText={(text) => setContrasena(text)}
      />

      <Button title="Registrarse" onPress={handleRegistro} />
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
    margin: 10,
    padding: 8,
    width: 200,
  },
});
