import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';
import { TouchableOpacity, StyleSheet, View, Text, TextInput, Button } from 'react-native';
import axios from 'axios';

export default function Login({ navigation }) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState(undefined)

    const handleLogin = async () => {

        if (username === '' || password === '') {
            alert('Vui lòng nhập đầy đủ thông tin');
        }
        else {
            /*  const auth = await AsyncStorage.getItem('currentUser');
             if (auth && username === JSON.parse(auth).username && password === JSON.parse(auth).password) {
                 navigation.navigate('Home')
             }
             else {
                 alert('Sai tên tài khoản hoặc mật khẩu');
             } */
            try {
                const { data } = await axios.post('http://localhost:9000/api/login', {
                    username: username,
                    password: password
                });

                console.log(data)

                await AsyncStorage.setItem('currentUser', JSON.stringify(data));

                navigation.navigate('Home');

            } catch (error) {
                alert(error.response.data)
            }
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <View style={styles.form}>
                    <TextInput
                        style={styles.textInput}
                        placeholder='Username'
                        onChangeText={newText => setUsername(newText)}
                        name="username" />

                    <TextInput
                        style={styles.textInput}
                        placeholder='Password'
                        onChangeText={newText => setPassword(newText)}
                        secureTextEntry
                        name="password" />

                    <Button
                        style={styles.button}
                        title='Login' onPress={handleLogin} />

                    <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                        <Text>Or register now!</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#eee',
        width: '100%',
        height: '100%',
    },
    content: {
        flex: 1,
        justifyContent: 'space-between',
        width: '100%',
        backgroundColor: '#eee',
    },

    form: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },

    textInput: {
        borderWidth: 1,
        borderColor: '#999',
        padding: 10,
        marginBottom: 20,
        minWidth: 200,
        textAlign: 'center'
    },

    button: {}
});