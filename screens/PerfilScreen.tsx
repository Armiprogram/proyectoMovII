import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, ImageBackground } from 'react-native';
import { auth, db } from '../components/Config';
import { update } from 'firebase/database';
import { getDatabase, ref, onValue, set } from 'firebase/database';
import { query, orderByChild, equalTo } from 'firebase/database';

interface UserData {
  usermail: string;
  nick: string;
  age: string;
  name: string;
  last: string;
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
            const data = snapshot.val();
            const userData: UserData | undefined = Object.values(data).find(
              (u: UserData) => u.usermail === user.email
            );

            if (userData) {
              setEmail(userData.usermail);
              setNick(userData.nick);
              setEdad(userData.age);
              setNombre(userData.name);
              setApellido(userData.last);
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
    // Actualizar los datos del usuario en la base de datos en tiempo real
    const userRef = ref(db, 'usuarios');

    // Realizar una consulta para encontrar al usuario por su correo electrónico
    const queryRef = query(userRef, orderByChild('usermail'), equalTo(user.email));

    onValue(queryRef, (snapshot) => {
      if (snapshot.exists()) {
        const key = Object.keys(snapshot.val())[0];
        const datosUsuarioActualizados: Partial<UserData> = {
          name: nombre,
          last: apellido,
          age: edad,
        };

        // Utilizar 'update' en lugar de 'set' para actualizar solo los campos específicos
        update(ref(db, `usuarios/${key}`), datosUsuarioActualizados);

        Alert.alert('Éxito', 'Cambios guardados correctamente');
      } else {
        Alert.alert('Error', 'No se encontró al usuario en la base de datos');
      }
    });
  };

  return (
    <ImageBackground
      style={styles.fondo}
      source={{
        uri: 'https://i.pinimg.com/736x/12/ef/b2/12efb296c5109d4fcd533f16bdbf06b2.jpg',
      }}
    >
      <View style={styles.container}>
        <Text style={styles.titulo}>PerfilScreen</Text>
        <Text style={styles.infoText}>Email: {email}</Text>

        <Text style={styles.infoText}>Edad: {edad}</Text>
        <TextInput
          style={styles.input}
          placeholder="Nueva Edad"
          value={edad}
          onChangeText={(texto) => setEdad(texto)}
        />
        <Text style={styles.infoText}>Nombre: {nombre}</Text>
        <TextInput
          style={styles.input}
          placeholder="Nuevo Nombre"
          value={nombre}
          onChangeText={(texto) => setNombre(texto)}
        />
        <Text style={styles.infoText}>Apellido: {apellido}</Text>
        <TextInput
          style={styles.input}
          placeholder="Nuevo Apellido"
          value={apellido}
          onChangeText={(texto) => setApellido(texto)}
        />
        <Button title="Guardar Cambios" onPress={handleGuardarCambios}color="#ff4500" />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000',
  },
  infoText: {
    fontSize: 16,
    marginBottom: 10,
    color: '#212121',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 10,
    padding: 8,
    width: 200,
    backgroundColor: '#fff',

  },
  fondo: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
