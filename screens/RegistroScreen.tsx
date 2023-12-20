import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Button, Alert } from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../components/Config";


export default function RegistroScreen({ navigation }: any) {
  const [email, setEmail] = useState("");
  const [nick, setNick] = useState("");
  const [edad, setEdad] = useState("");
  const [contrasena, setContrasena] = useState("");

  function Registro() {
 
    createUserWithEmailAndPassword(auth, email,contrasena)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        switch (errorCode) {
          case "auth/email-already-in-use":
            Alert.alert("La dirección de correo ya esta siendo utilizada");
            break;
          case "auth/invalid-email":
            Alert.alert("La dirección de correo no es válida");
            break;
          default:
            Alert.alert("Mensaje", "Error al registrarse");
        }
        // ..
      });

    navigation.navigate("Login");
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

      <Button title="Registrarse" onPress={()=> Registro()} />
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
