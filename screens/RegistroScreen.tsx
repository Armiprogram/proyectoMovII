import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, Image} from 'react-native';
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
  const [image, setImage] = useState('');

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);
    
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const subirImagen = () => {
    // Aquí puedes implementar la lógica para subir la imagen a Firebase Storage
    console.log("Implementa la lógica para subir la imagen:", image);
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
      <View>
      <Text>Subir imagen desde la Galería</Text>
      <Button title='Seleccionar imagen' onPress={() => pickImageAsync()} />
      <Image source={{ uri: imagen }} style={styles.img} />
      <Button title='Subir' onPress={() => subir("foto1")} />
    </View>
    <View style={styles.container}>
      <Text>Cargar una imagen desde la cámara</Text>
      <Button title='Cámara' onPress={() => pickImage()} />
      <Image source={{ uri: image }} style={styles.img} />
      <Button title='Subir' onPress={() => subirImagen()} />
    </View>
    </View>

    
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
    marginVertical: 20,
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
