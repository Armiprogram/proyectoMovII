import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { getDatabase, ref, onValue } from 'firebase/database';
import { firebaseConfig } from '../components/Config';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

type UserData = {
  usermail: string;
  age: string; // Ajusta el tipo según el tipo real en tu base de datos
};

export default function PerfilScreen() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const auth = getAuth();

  useEffect(() => {
    const firebaseApp = initializeApp(firebaseConfig);
    const db = getDatabase(firebaseApp);

    const user = auth.currentUser;

    if (user) {
      const userUid = user.email
      ;

      const userRef = ref(db,'usuarios/');
      const unsubscribe = onValue(userRef, (snapshot) => {
        const userData = snapshot.val();

        if (userData) {
          // Accede directamente al objeto de usuario logueado
          setUserData(userData);

          console.log('Datos del usuario:', userData);
        } else {
          console.log('No se encontraron datos para el usuario');
        }
      });

      return () => {
        unsubscribe();
      };
    }
  }, [auth]);

  return (
    <View>
      {userData && (
        <View>
          <Text>Email: {userData.usermail} | Edad: {userData.age}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({});