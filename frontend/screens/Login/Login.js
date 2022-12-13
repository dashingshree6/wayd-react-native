import React, { useState } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {user_login} from '../API/user_api';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TextInput,
} from 'react-native';
import {Input, Icon, Button} from '@rneui/themed';

const Login = ({navigation}) => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [seePassword, setSeePassword] = useState(true);

  const handleLogin = () => {
    user_login({
      phone: phone,
      password: password,
    })
      .then(result => {
        if (result.status == 200) {
          AsyncStorage.setItem('AccessToken', result.data.token);
          navigation.navigate('SalesHomepage');
        }
      })
      .catch(err => {
        console.error(err);
      });
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.login}>
          <Text style={styles.login_header}>Welcome Back</Text>
          <Text style={styles.phone}>Phone Number</Text>
          <Input
            placeholder="Enter your phonenumber"
            keyboardType="numeric"
            value={phone}
            onChangeText={text => setPhone(text)}

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
            placeholder="Enter your password"
            value={password}
            secureTextEntry={seePassword}
            onChangeText={text => setPassword(text)}
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
              // onPress={() => navigation.navigate("SalesHomepage")}
              onPress={handleLogin}
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
  );
};

const styles = StyleSheet.create({
  login: {
    marginTop: 150,
    padding: 10,
  },
  login_header: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 15,
  },
  phone: {
    fontWeight: 'bold',
    textAlign: 'left',
  },
  password: {
    fontWeight: 'bold',
  },
  forgot_password: {
    fontWeight: 'bold',
    color: 'silver',
    textAlign: 'right',
  },
  btn_pw: {
    alignItems: 'center',
  },
});

export default Login;
