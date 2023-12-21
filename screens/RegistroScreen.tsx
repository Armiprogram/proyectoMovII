import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, Image, ImageBackground} from 'react-native';
import { getDatabase, ref, set, onValue, update, remove } from "firebase/database";
import { db } from '../components/Config';
import { auth } from '../components/Config';
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";
import * as ImagePicker from 'expo-image-picker';
import { storage } from '../components/Config';
import { getDownloadURL,uploadBytes,ref as storRef} from "firebase/storage";
export default function RegistroScreen({ navigation }: any) {

  const [email, setEmail] = useState("");
  const [nick, setNick] = useState("");
  const [edad, setEdad] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [contrasenia, setContrasenia] = useState("");

  const handleRegistro = (email:string, nick:string, edad:string,nombre:string,apellido:string, contrasenia:string) => {
    // Aquí puedes manejar la lógica de registro, por ejemplo, enviar la información a tu servidor.
    set(ref(db, 'usuarios/' + nick), {
      usermail: email,
      age:edad,
      name:nombre,
      last:apellido,
      pass:contrasenia
  
    });
    setEmail("")
    setNick("")
    setEdad("")
    setNombre("")
    setApellido("")
    setContrasenia("")
    navigation.navigate("Login")
    createUserWithEmailAndPassword(auth, email, contrasenia)
      .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
        console.log("Usuario registrado");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        Alert.alert("ERROR", "Error al registrarse");
      });
  };
  
  const [imagen, setImagen] = useState('')

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
      aspect: [19, 6]
    });

    switch (true) {
      case !result.canceled:
        console.log(result);
        setImagen(result.assets[0].uri);
        break;
      default:
        Alert.alert('Error', 'You did not select any image.');
    }
  };

  async function subir(nombre: string) {
    const storageRef = storRef(storage, 'test/' + nombre);

    const response = await fetch(imagen);
    const blob = await response.blob();

    try {
      await uploadBytes(storageRef, blob, { contentType: 'image/jpg' });
      console.log("La imagen se subió con éxito");

      // Obtiene la URL de la imagen
      const imageURL = await getDownloadURL(storageRef);
      console.log('URL de descarga de la imagen', imageURL);

    } catch (error:any) {
      console.log(error);

      switch (error.code) {
        case 'storage/canceled':
          Alert.alert("La subida de la imagen fue cancelada");
          break;
        case 'storage/unknown':
          Alert.alert("Error desconocido al subir la imagen");
          break;
        default:
          Alert.alert("Error al subir la imagen");
      }
    }
  };
 

  return (
    <ImageBackground
    style={styles.fondo}
    source={{
      uri:
        'https://i.pinimg.com/736x/12/ef/b2/12efb296c5109d4fcd533f16bdbf06b2.jpg',
    }}
  >
    <View style={styles.container}>
      <Text style={{ fontSize: 20}}>Registro</Text>

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
        placeholder="Nombre"
        keyboardType="default"
        onChangeText={(texto) => (setNombre(texto))}
      />
            <TextInput
        style={styles.input}
        placeholder="Apellido"
        keyboardType="default"
        onChangeText={(texto) => (setApellido(texto))}
      />

      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        onChangeText={(texto) => (setContrasenia(texto))}
      />

      <Button title="Registrarse" onPress={()=> handleRegistro(email,nick,edad,nombre,apellido,contrasenia)}color="#00796B" />
      <View style={styles.subirImagenContainer}>
      <Text style={{ marginBottom: 10 }}>Subir imagen desde la Galería</Text>
      <Button title='Seleccionar imagen' onPress={() => pickImageAsync()} color="#ff4500" />
      <Image source={{ uri: imagen }} style={styles.img} />
      <Button title='Subir' onPress={() => subir("foto1")} color="#F9A825" />
    </View>
    </View>

    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",

  },
  img: {
    width: 300,
    height: 200,
    alignSelf: 'center',

  },
  input: {
    height: 35,
    borderColor: "gray",
    borderWidth: 1,
    margin: 10,
    padding: 6,
    width: 200,

  },
  fondo: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  subirImagenContainer: {
    alignItems: 'center',
  },
});
