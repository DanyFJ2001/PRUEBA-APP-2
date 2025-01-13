import { signInWithEmailAndPassword } from 'firebase/auth';
import { getDatabase, ref, get, update } from 'firebase/database';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import { auth, database } from '../config/Config';

type LoginProps = {
  navigation: any;
};

const Inicio: React.FC<LoginProps> = ({ navigation }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = () => {
    if (email.trim() === '' || password.trim() === '') {
      Alert.alert('Por favor, ingrese ambos campos.');
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        const userRef = ref(database, `usuarios/${user.uid}`);

        get(userRef)
          .then((snapshot) => {
            if (snapshot.exists()) {
              update(userRef, {
                lastLogin: new Date().toISOString(),
              })
                .then(() => {
                  navigation.navigate('Operaciones');
                })
                .catch((error) => {
                  Alert.alert('Error al actualizar los datos: ', error.message);
                });
            } else {
              update(userRef, {
                userName: user.displayName || 'Nombre de Usuario',
                email: user.email,
                phone: '',
                createdAt: new Date().toISOString(),
              })
                .then(() => {
                  navigation.navigate('Operaciones');
                })
                .catch((error) => {
                  Alert.alert('Error al guardar los datos: ', error.message);
                });
            }
          })
          .catch((error) => {
            Alert.alert('Error al leer los datos: ', error.message);
          });
      })
      .catch((error) => {
        Alert.alert('Error', error.message);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inicia sesión</Text>
      <Image 
        source={{ uri: 'https://e7.pngegg.com/pngimages/146/551/png-clipart-user-login-mobile-phones-password-user-miscellaneous-blue.png' }} 
        style={styles.image} 
      />

      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Iniciar sesión</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.linkText}>¿No tienes cuenta? Regístrate</Text>
      </TouchableOpacity>

     
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    fontSize: 16,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  linkText: {
    color: '#007bff',
    fontSize: 14,
  },
  image: {
    width: 150,
    height: 150,
    marginTop: 20,
    resizeMode: 'contain',
  },
});

export default Inicio;
