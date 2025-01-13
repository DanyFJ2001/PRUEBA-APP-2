import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

type WelcomeProps = {
    navigation: any;
};

const Welcome: React.FC<WelcomeProps> = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome</Text>


            <Image
                source={{ uri: 'https://img.freepik.com/vector-premium/edificio-bancario-columnas-edificio-gubernamental-casa-financiera-fachada-edificio_101087-624.jpg?semt=ais_hybrid' }}
                style={styles.image}
            />

            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Login')}
            >
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Registro')}
            >
                <Text style={styles.buttonText}>Registro</Text>
            </TouchableOpacity>

            <Text style={styles.developedBy}>Desarrollado por: Dany Fernández</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5', // Fondo gris claro
        padding: 20,
    },
    title: {
        fontSize: 36,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333', // Texto gris oscuro
        textAlign: 'center',
    },
    image: {
        width: 150,
        height: 150,
        marginBottom: 20,
        resizeMode: 'contain',
    },
    button: {
        backgroundColor: '#007BFF', // Azul estándar
        borderRadius: 10,
        paddingVertical: 15,
        paddingHorizontal: 40,
        marginBottom: 20,
        width: '80%',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 3,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    developedBy: {
        fontSize: 14,
        color: '#555', // Gris medio
        marginTop: 30,
        textAlign: 'center',
    },
});

export default Welcome;
