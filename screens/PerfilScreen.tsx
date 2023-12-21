import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';
import { auth, db } from '../components/Config';
import { getAuth, updateEmail, updatePassword } from 'firebase/auth';
import { getDatabase, ref, onValue, set } from 'firebase/database';

interface UserData {
  usermail: string;
  nick: string;
  age: string;
  name:string;
  last:string;
  pass: string; // Esto es solo para referencia, no es recomendable almacenar contraseñas en el estado
}

export default function PerfilScreen({ navigation }: any) {
  const [user, setUser] = useState<any>(null);
  const [email, setEmail] = useState('');
  const [nick, setNick] = useState('');
  const [edad, setEdad] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [contrasenia, setContrasenia] = useState('');

 useEffect(() => {
  const cargarDatosUsuario = () => {
    const user = auth.currentUser;
    if (user) {
      setUser(user);

      // Obtener datos del usuario desde la base de datos usando el correo electrónico como identificador
      const userRef = ref(db, 'usuarios');
      onValue(userRef, (snapshot) => {
        if (snapshot.exists()) {
          const usersData = snapshot.val();
          const userData: UserData | undefined = Object.values(usersData).find(
            (u: UserData) => u.usermail === user.email
          );

          if (userData) {
            setEmail(userData.usermail);
            setNick(userData.nick);
            setEdad(userData.age);
            setNombre(userData.name);  // Corregir aquí
            setApellido(userData.last);  // Corregir aquí
            // No recomendado almacenar la contraseña en el estado
            // setContrasenia(userData.pass);
          }
        }
      });
    }
  };

  cargarDatosUsuario();
}, []);

  const handleGuardarCambios = () => {
    // Actualizar email y contraseña en Firebase Authentication
    updateEmail(user, email)
      .then(() => {
        return updatePassword(user, contrasenia);
      })
      .then(() => {
        // Actualizar datos del usuario en la base de datos
        const userRef = ref(db, 'usuarios');
        // Buscar el usuario por correo electrónico
        const currentUser = Object.values(userRef).find((u: UserData) => u.usermail === user.email);
        if (currentUser) {
          // Actualizar los datos específicos del usuario
          set(ref(db, 'usuarios/' + currentUser.nick), {
            usermail: email,
            nick: nick,
            age: edad,
            name:nombre,
            last:apellido,
            pass: contrasenia,
          });

          Alert.alert('Éxito', 'Cambios guardados correctamente');
        } else {
          Alert.alert('Error', 'No se encontró el usuario');
        }
      })
      .catch((error) => {
        Alert.alert('Error', error.message);
      });
  };

  return (
    <View style={styles.container}>
      <Text>PerfilScreen</Text>
      <Text>Email: {email}</Text>

      <Text>Edad: {edad}</Text>
      <TextInput
        style={styles.input}
        placeholder="Nueva Edad"
        value={edad}
        onChangeText={(texto) => setEdad(texto)}
      />
      <Text>Nombre: {nombre}</Text>
      <TextInput
        style={styles.input}
        placeholder="Nuevo Nombre"
        value={nombre}
        onChangeText={(texto) => setNombre(texto)}
      />
      <Text>Apellido: {apellido}</Text>
      <TextInput
        style={styles.input}
        placeholder="Nuevo Apellido"
        value={apellido}
        onChangeText={(texto) => setApellido(texto)}
      />
      <Button title="Guardar Cambios" onPress={handleGuardarCambios} />
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
