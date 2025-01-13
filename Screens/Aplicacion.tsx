import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import { getDatabase, ref, push } from 'firebase/database';

const Operaciones = () => {
  const [idOperacion, setIdOperacion] = useState('');
  const [monto, setMonto] = useState('');
  const [tipoOperacion, setTipoOperacion] = useState('');
  const [comentario, setComentario] = useState('');

  const registrarOperacion = () => {
    const montoNumerico = parseFloat(monto);

    // Validar que todos los campos estén llenos
    if (!idOperacion || !monto || !tipoOperacion || !comentario) {
      Alert.alert('Error', 'Por favor, completa todos los campos.');
      return;
    }

    // Validar monto negativo
    if (montoNumerico < 0) {
      Alert.alert('Error', 'El monto no puede ser negativo.');
      return;
    }

    // Confirmar si el monto es mayor a $500
    if (montoNumerico > 500) {
      Alert.alert(
        'Monto alto',
        'El monto es mayor a $500, ¿deseas continuar?',
        [
          { text: 'Cancelar', style: 'cancel' },
          { text: 'Continuar', onPress: guardarOperacion },
        ]
      );
      return;
    }

    // Si no hay problemas, guardar directamente
    guardarOperacion();
  };

  const guardarOperacion = () => {
    const db = getDatabase(); // Obtener la instancia de la base de datos
    const operacionesRef = ref(db, 'operaciones'); // Referencia a la colección "operaciones"

    const nuevaOperacion = {
      idOperacion,
      monto,
      tipoOperacion,
      comentario,
      fecha: new Date().toISOString(), // Fecha de la operación
    };

    push(operacionesRef, nuevaOperacion) // Guardar en Firebase
      .then(() => {
        Alert.alert('¡Éxito!', 'La operación se ha registrado correctamente.');
        // Reiniciar campos
        setIdOperacion('');
        setMonto('');
        setTipoOperacion('');
        setComentario('');
      })
      .catch((error) => {
        Alert.alert('Error', `No se pudo registrar la operación: ${error.message}`);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Operaciones</Text>
      <Image 
              source={{ uri: 'https://static.vecteezy.com/system/resources/previews/002/486/468/non_2x/withdraw-money-icon-vector.jpg' }} 
              style={styles.image} 
            />
      
      <TextInput
        placeholder="ID operación"
        style={styles.input}
        value={idOperacion}
        onChangeText={setIdOperacion}
      />
      <TextInput
        placeholder="Monto"
        style={styles.input}
        value={monto}
        onChangeText={setMonto}
        keyboardType="numeric"
      />
      <TextInput
        placeholder="Tipo operación"
        style={styles.input}
        value={tipoOperacion}
        onChangeText={setTipoOperacion}
      />
      <TextInput
        placeholder="Comentario"
        style={styles.input}
        value={comentario}
        onChangeText={setComentario}
      />
      <TouchableOpacity style={styles.button} onPress={registrarOperacion}>
        <Text style={styles.buttonText}>Ejecutar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    padding: 20,
  },
  image: {
    width: 150,
    height: 150,
    marginTop: 20,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Operaciones;
