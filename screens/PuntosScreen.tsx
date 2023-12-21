import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { getDatabase, ref, orderByChild, limitToLast, query, onValue } from '@firebase/database';
import { db } from '../components/Config';

interface Puntuacion {
  id: string;
  Puntuacion: number;
}

export default function PuntosScreen() {
  const [puntuaciones, setPuntuaciones] = useState<Puntuacion[]>([]);

  useEffect(() => {
    const obtenerPuntuaciones = async () => {
      try {
        const puntuacionesRef = ref(db, 'tablapuntuacion');
        const q = query(puntuacionesRef, orderByChild('Puntuacion'), limitToLast(10));

        onValue(q, (snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.val();
            const puntuacionesArray: Puntuacion[] = Object.keys(data).map((key) => ({
              id: key,
              Puntuacion: data[key].Puntuacion,
            }));
            const puntuacionesOrdenadas = puntuacionesArray.sort((a, b) => b.Puntuacion - a.Puntuacion);
            setPuntuaciones(puntuacionesOrdenadas);
          } else {
            setPuntuaciones([]);
          }
        });
      } catch (error) {
        console.error('Error al obtener puntuaciones', error);
      }
    };

    obtenerPuntuaciones();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Puntuaciones</Text>
      {puntuaciones.map((puntuacion) => (
        <View key={puntuacion.id} style={styles.puntuacionItem}>
         <Text>{`${puntuacion.Puntuacion} puntos - ${puntuacion.id}`}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  puntuacionItem: {
    marginVertical: 10,
  },
});