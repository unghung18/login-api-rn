import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

export default function Home({ navigation }) {

    const [user, setUser] = useState(undefined);
    const [isAuth, setIsAuth] = useState(false);

    const getUser = async () => {
        const auth = await AsyncStorage.getItem('currentUser');

        if (auth) {
            setIsAuth(true);
            setUser(JSON.parse(auth))
        }
    }

    const handleLogout = async () => {
        navigation.navigate('Login');
        setIsAuth(false)
    }

    useEffect(() => {
        getUser();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.welcome}>Hello {user && user.name}</Text>

            {
                isAuth &&
                <Button color='#999' title='Logout' onPress={handleLogout} />
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },

    welcome: {
        fontSize: 20,
        marginBottom: 20
    }
})