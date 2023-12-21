import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, Button, Alert } from 'react-native';
import { getDatabase, ref, set } from "firebase/database";
import { db } from '../components/Config';

export default function JuegoScreen() {
  const [nick, setNick] = useState("");
  const [tiempoRestante, setTiempoRestante] = useState(60);
  const [puntaje, setPuntaje] = useState(0);
  const [posicionBoton, setPosicionBoton] = useState({
    left: Math.random() * 300,
    top: Math.random() * 500,
  });

  const [juegoIniciado, setJuegoIniciado] = useState(false);

  useEffect(() => {
    if (juegoIniciado && tiempoRestante > 0) {
      const intervalo = setInterval(() => {
        setTiempoRestante((prevTiempo) => (prevTiempo > 0 ? prevTiempo - 1 : 0));
      }, 1000);

      return () => clearInterval(intervalo);
    }
  }, [juegoIniciado, tiempoRestante]);

  useEffect(() => {
    if (tiempoRestante === 0 && juegoIniciado) {
      mostrarAlerta();
      subirPuntuacion(nick, puntaje);
      setJuegoIniciado(false);
    }
  }, [tiempoRestante, juegoIniciado]);

  const manejarAccionExitosa = () => {
    if (juegoIniciado) {
      setPuntaje((prevPuntaje) => prevPuntaje + 1);

      setPosicionBoton({
        left: Math.random() * 300,
        top: Math.random() * 500,
      });
    }
  };

  const iniciarJuego = () => {
    setJuegoIniciado(true);
  };

  const mostrarAlerta = () => {
    Alert.alert(
      '¡Juego terminado!',
      `Puntaje final: ${puntaje}`,
      [
        {
          text: 'Reiniciar Juego',
          onPress: reiniciarJuego,
        },
      ],
      { cancelable: false }
    );
  };

  const reiniciarJuego = () => {
    setPuntaje(0);
    setTiempoRestante(60);
    setJuegoIniciado(false);
  };

  const subirPuntuacion = (nick: string, puntaje: number) => {
    set(ref(db, 'tablapuntuacion/' + nick), {
      Puntuacion: puntaje
    });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>JuegoScreen</Text>
      <Text style={styles.infoText}>Tiempo restante: {tiempoRestante} segundos</Text>
      <Text style={styles.infoText}>Puntaje: {puntaje}</Text>

      {!juegoIniciado && (
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Ingrese su nick"
            autoCapitalize="none"
            onChangeText={(texto) => setNick(texto)}
          />
          <Button title="Iniciar Juego" onPress={iniciarJuego} color="#ff4500" />
        </View>
      )}

      {juegoIniciado && (
        <TouchableOpacity
          style={[styles.button, { left: posicionBoton.left, top: posicionBoton.top }]}
          onPress={manejarAccionExitosa}
        >
          <Image
            source={require('../assets/insecto.png')}
            style={styles.image}
          />
        </TouchableOpacity>
      )}
    </View>
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
  inputContainer: {
    alignItems: 'center',
    marginBottom: 20,
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
  button: {
    position: 'absolute',
  },
  image: {
    width: 200,
    height: 200,
  },
});
