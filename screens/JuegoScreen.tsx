import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'

export default function JuegoScreen() {
  //tiempo restante
  const[tiempoRestante, setTiempoRestante] = useState(60);

  //puntaje del jugador
  const[puntaje, setPuntaje] = useState(0);

  const[posicioninsecto, setPosiscionInsecto]=useState({
    left: Math.random() * 300,
    top: Math.random()* 500,
  });

  useEffect(()=>{
    const intervaloTiempo = setInterval(()=>{
      setTiempoRestante((inicioTiemp)=>(inicioTiemp>0? inicioTiemp - 1 : 0));
    }, 1000);

  return ()=> clearInterval(intervaloTiempo);
  }, []);

  const muerteExitosa = ()=>{
    setPuntaje((inicioPuntaje)=> inicioPuntaje + 1);

    setPosiscionInsecto({
      left: Math.random() * 300,
      top: Math.random() * 500,
    })
  };

  return (
    <View style={styles.container}>
      <Text>Tiempo restante: {tiempoRestante} segundos</Text>
      <Text>Puntaje: {puntaje}</Text>
      <TouchableOpacity
        style={[styles.button, { left: posicioninsecto.left, top: posicioninsecto.top }]}
        onPress={muerteExitosa}
      >
        <Text>Mover Botón</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({

  container:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    position: 'absolute',
    backgroundColor: 'lightblue',
    padding: 10,
    borderRadius: 5,
  },
})