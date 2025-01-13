import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { getDatabase, ref, onValue } from 'firebase/database';

const Historial = () => {
  const [operaciones, setOperaciones] = useState([]);

  useEffect(() => {
    const db = getDatabase();
    const operacionesRef = ref(db, 'operaciones'); // Referencia a la colección "operaciones"

    // Obtener las operaciones en tiempo real
    onValue(operacionesRef, (snapshot) => {
      const data = snapshot.val();
      const operacionesArray = data ? Object.values(data) : [];
      setOperaciones(operacionesArray);
    });
  }, []);

  const mostrarComentario = (comentario) => {
    Alert.alert('Comentario', comentario);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.item} onPress={() => mostrarComentario(item.comentario)}>
      <Text style={styles.text}>ID: {item.idOperacion}</Text>
      <Text style={styles.text}>Monto: ${item.monto}</Text>
      <Text style={styles.text}>Tipo: {item.tipoOperacion}</Text>
      <Text style={styles.text}>Fecha: {item.fecha}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Historial de Operaciones</Text>
      <FlatList
        data={operaciones}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f2f2f2',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  item: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default Historial;
