import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { getDatabase, ref, set } from 'firebase/database';
import { auth, database } from '../config/Config';

type LoginProps = {
  navigation: any;
};

const Registro: React.FC<LoginProps> = ({ navigation }) => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');

  const registrarUsuario = () => {
    if (!userName || !email || !password || !phone) {
      Alert.alert('Error', 'Por favor, completa todos los campos.');
      return;
    }

    // Registro del usuario en Authentication
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        // Guardar los datos en Realtime Database
        set(ref(database, `usuarios/${user.uid}`), {
          userName,
          email,
          phone: phone.toString(),  // Guardar teléfono como string
        })
          .then(() => {
            Alert.alert('¡Éxito!', 'Usuario registrado correctamente.');
            navigation.navigate('Welcome');  // Redirigir a la pantalla de bienvenida
          })
          .catch((error) => {
            Alert.alert('Error', `Error al guardar usuario: ${error.message}`);
          });
      })
      .catch((error) => {
        Alert.alert('Error', `No se pudo registrar: ${error.message}`);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro</Text>
       <Image 
              source={{ uri: 'https://cdn-icons-png.flaticon.com/512/2037/2037667.png' }} 
              style={styles.image} 
            />
      <TextInput
        placeholder="Nombre de usuario"
        style={styles.input}
        value={userName}
        onChangeText={setUserName}
      />
      <TextInput
        placeholder="Correo electrónico"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        placeholder="Contraseña"
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        placeholder="Número de teléfono"
        style={styles.input}
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />
      <TouchableOpacity style={styles.button} onPress={registrarUsuario}>
        <Text style={styles.buttonText}>Registrar</Text>
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
    backgroundColor: '#f2f2f2',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  image: {
    width: 150,
    height: 150,
    marginTop: 20,
    resizeMode: 'contain',
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

export default Registro;
