import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Alert } from 'react-native';

export default function JuegoScreen() {
  const [tiempoRestante, setTiempoRestante] = useState(60);
  const [puntaje, setPuntaje] = useState(0);
  const [posicionBoton, setPosicionBoton] = useState({
    left: Math.random() * 300,
    top: Math.random() * 500,
  });

  useEffect(() => {
    const intervalo = setInterval(() => {
      setTiempoRestante((prevTiempo) => (prevTiempo > 0 ? prevTiempo - 1 : 0));
    }, 1000);

    return () => clearInterval(intervalo);
  }, []);

  useEffect(() => {
    if (tiempoRestante === 0) {
      mostrarAlerta();
    }
  }, [tiempoRestante]);

  const manejarAccionExitosa = () => {
    setPuntaje((prevPuntaje) => prevPuntaje + 1);

    setPosicionBoton({
      left: Math.random() * 300,
      top: Math.random() * 500,
    });
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
  };

  return (
    <View style={styles.container}>
      <Text>Tiempo restante: {tiempoRestante} segundos</Text>
      <Text>Puntaje: {puntaje}</Text>
      <TouchableOpacity
        style={[styles.button, { left: posicionBoton.left, top: posicionBoton.top }]}
        onPress={manejarAccionExitosa}
      >
        <Image
          source={require('../assets/insecto.png')}
          style={styles.image}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    position: 'absolute',
  },
  image: {
    width: 200,
    height: 200,
  },
});
