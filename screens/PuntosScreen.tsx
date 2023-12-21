import React, { useState, useEffect } from "react";
import { ImageBackground, StyleSheet, Text, View, FlatList } from "react-native";
import {
  getDatabase,
  ref,
  orderByChild,
  limitToLast,
  query,
  onValue,
} from "@firebase/database";
import { db } from "../components/Config";

interface Puntuacion {
  id: string;
  Puntuacion: number;
}

export default function PuntosScreen() {
  const [puntuaciones, setPuntuaciones] = useState<Puntuacion[]>([]);

  useEffect(() => {
    const obtenerPuntuaciones = async () => {
      try {
        const puntuacionesRef = ref(db, "tablapuntuacion");
        const q = query(
          puntuacionesRef,
          orderByChild("Puntuacion"),
          limitToLast(10)
        );

        onValue(q, (snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.val();
            const puntuacionesArray: Puntuacion[] = Object.keys(data).map(
              (key) => ({
                id: key,
                Puntuacion: data[key].Puntuacion,
              })
            );
            const puntuacionesOrdenadas = puntuacionesArray.sort(
              (a, b) => b.Puntuacion - a.Puntuacion
            );
            setPuntuaciones(puntuacionesOrdenadas);
          } else {
            setPuntuaciones([]);
          }
        });
      } catch (error) {
        console.error("Error al obtener puntuaciones", error);
      }
    };

    obtenerPuntuaciones();
  }, []);

  return (
    <ImageBackground
      style={styles.fondo}
      source={{
        uri: "https://i.pinimg.com/736x/12/ef/b2/12efb296c5109d4fcd533f16bdbf06b2.jpg",
      }}
    >
      <View style={styles.container}>
        <Text style={styles.titulo}>Puntuaciones</Text>
        <FlatList
          data={puntuaciones}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.puntuacionItem}>
              <Text style={styles.puntuacionTexto}>{`${item.Puntuacion} puntos - ${item.id}`}</Text>
            </View>
          )}
        />
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
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#212121",
  },
  puntuacionItem: {
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    padding: 10,
    marginVertical: 10,
    borderRadius: 8,
    width: 300,
    alignItems: "center",
  },
  puntuacionTexto: {
    fontSize: 16,
    color: "#333",
  },
  fondo: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
