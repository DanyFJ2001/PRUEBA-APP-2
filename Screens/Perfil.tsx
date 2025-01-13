import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { onAuthStateChanged } from 'firebase/auth';
import { ref, onValue } from 'firebase/database';
import { auth, database } from '../config/Config';

const Perfil: React.FC = () => {
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userRef = ref(database, `usuarios/${user.uid}`);
        onValue(userRef, (snapshot) => {
          if (snapshot.exists()) {
            setUserData(snapshot.val());
          } else {
            Alert.alert('Error', 'No se encontraron datos del usuario.');
          }
          setLoading(false);
        });
      } else {
        Alert.alert('Error', 'No se encontró un usuario autenticado.');
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007BFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {userData ? (
        <>
          {/* Información de perfil */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Información de perfil</Text>
            <View style={styles.card}>
              <Text style={styles.label}>Nombre completo</Text>
              <Text style={styles.value}>{userData.userName || 'No disponible'}</Text>
            </View>
            <View style={styles.card}>
              <Text style={styles.label}>Saludo de bienvenida</Text>
              <Text style={styles.value}>{userData.greeting || 'hola'}</Text>
            </View>
            <View style={styles.card}>
              <Text style={styles.label}>Autorización de uso de datos</Text>
              <Text style={[styles.value, userData.dataConsent ? styles.authorized : styles.notAuthorized]}>
                {userData.dataConsent ? 'Autorizado' : 'aja'}
              </Text>
            </View>
          </View>

          {/* Mantén actualizada tu información */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Mantén actualizada tu información</Text>
            <View style={styles.card}>
              <Text style={styles.label}>Número de celular</Text>
              <Text style={styles.value}>{userData.phone || 'No disponible'}</Text>
            </View>
            <View style={styles.card}>
              <Text style={styles.label}>Correo electrónico</Text>
              <Text style={styles.value}>{userData.email || 'No disponible'}</Text>
            </View>
          </View>
        </>
      ) : (
        <Text style={styles.errorText}>No se pudieron cargar los datos del usuario.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
    color: '#333',
  },
  authorized: {
    color: '#28a745',
  },
  notAuthorized: {
    color: '#dc3545',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
  },
});

export default Perfil;
