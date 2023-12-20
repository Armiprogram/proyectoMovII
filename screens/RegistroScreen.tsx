import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { getDatabase, ref, set, onValue, update, remove } from "firebase/database";
import { db } from '../components/Config';
import { auth } from '../components/Config';
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";

export default function RegistroScreen({ navigation }: any) {
  const [email, setEmail] = useState("");
  const [nick, setNick] = useState("");
  const [edad, setEdad] = useState("");
  const [contrasenia, setContrasenia] = useState("");

  const handleRegistro = (email:string, nick:string, edad:string, contrasenia:string) => {
    // Aquí puedes manejar la lógica de registro, por ejemplo, enviar la información a tu servidor.
    set(ref(db, 'usuarios/' + nick), {
      usermail: email,
      age:edad,
      pass:contrasenia
  
    });
    setEmail("")
    setNick("")
    setEdad("")
    setContrasenia("")
    navigation.navigate("Login")
    createUserWithEmailAndPassword(auth, email, contrasenia)
      .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
   
      })
  };

  return (
    <View style={styles.container}>
      <Text>RegistroScreen</Text>

      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        keyboardType="email-address"
        autoCapitalize="none"
        onChangeText={(texto) => (setEmail(texto))}
      />

      <TextInput
        style={styles.input}
        placeholder="Nick"
        autoCapitalize="none"
        onChangeText={(texto) => (setNick(texto))}
      />

      <TextInput
        style={styles.input}
        placeholder="Edad"
        keyboardType="numeric"
        onChangeText={(texto) => (setEdad(texto))}
      />

      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        onChangeText={(texto) => (setContrasenia(texto))}
      />

      <Button title="Registrarse" onPress={()=> handleRegistro(email,nick,edad,contrasenia)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    margin: 10,
    padding: 8,
    width: 200,
  },
});
