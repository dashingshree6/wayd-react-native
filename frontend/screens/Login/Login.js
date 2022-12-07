import React from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    TextInput 
  } from 'react-native';
import { 
    Input,
    Icon,
    Button 
    } 
     from '@rneui/themed';
  
const Login = ({ navigation, route  }) => {
    return (
        <SafeAreaView>
            <ScrollView>
                <View style={styles.login}>
                    <Text style={styles.login_header}>Welcome Back</Text>
                    <Text style={styles.phone}>Phone Number</Text>
                    <Input
                    placeholder='Enter your phonenumber'
                    keyboardType='numeric'
                    // leftIcon={{ type: 'Feather', name: 'phone' }}
                    // onChangeText={value => this.setState({ comment: value })}
                    // leftIcon={
                    //     <Icon
                    //     name='phone'
                    //     size={24}
                    //     color='black'
                    //     />
                    //     }
                    />
                    <Text style={styles.password}>Password</Text>
                    <Input
                    placeholder='Enter your password'
                    secureTextEntry={true}
                    // leftIcon={{ type: 'Feather', name: 'phone' }}
                    // onChangeText={value => this.setState({ comment: value })}
                    // leftIcon={
                    //     <Icon
                    //     name='phone'
                    //     size={24}
                    //     color='black'
                    //     />
                    //     }
                    />
                    <Text style={styles.forgot_password}>Forgot Password ?</Text>
                    <View style={styles.btn_pw}> 
                        <Button
                        title="Login"
                        buttonStyle={{ 
                            backgroundColor: 'rgba(127, 220, 103, 1)', 
                        }}
                        containerStyle={{
                            height: 40,
                            width: 200,
                            marginHorizontal: 50,
                            marginVertical: 10,
                        }}
                        titleStyle={{
                            color: 'white',
                            marginHorizontal: 20,
                        }}
                        />
                    </View>
     
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    login:{
        marginTop: 150,
        padding: 10
    },
    login_header:{
        fontSize: 20,
        textAlign:'center',
        fontWeight:'bold',
        marginBottom: 15
    },
    phone: {
        fontWeight:'bold',
        textAlign:'left'
    },
    password: {
        fontWeight:'bold'
    },
    forgot_password: {
        fontWeight:'bold',
        color:'silver',
        textAlign:'right'
    },
    btn_pw: {
        alignItems:'center'
    }
});

export default Login;