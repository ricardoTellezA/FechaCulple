import React, { useState } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import LoginForm from './LoginForm';
import RegsiterForm from './RegsiterForm';

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);

    const toggleForm = () => {
        setIsLogin(!isLogin);
    }
    return (
        <View style={styles.view}>
            <Image style={styles.logo} source={require('../../assets/logo.png')} />
            {isLogin ? <LoginForm toggleForm={toggleForm} /> : <RegsiterForm toggleForm={toggleForm} />}
        </View>
    )
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        alignItems: 'center',
    },

    logo: {
        width: '80%',
        height: 240,
        marginTop: 50,
        marginBottom: 50,
    }
});

export default Auth;