import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React, {useState, useEffect} from 'react'
import { Input, Icon, Button } from '@rneui/themed';
import { signup } from '../../Login/index';
import SyncStorage from 'sync-storage';

export default function Signup() {
    const [values, setValues] = useState({
        username: "",
        phone_number: "",
        email: "",
        role: "",
        password: "",
        pincode: "",
        street: "",
        area: "",
        error: "",
        success: false,
      });
    
      const {
        username,
        phone_number,
        email,
        role,
        password,
        pincode,
        street,
        area,
        error,
        success,
      } = values;

      const onSubmit = () => {
        setValues({ ...values, error: false });
        signup({
          username,
          phone_number,
          email,
          role,
          password,
          pincode,
          street,
          area,
        })
          .then((data) => {
            if (data.error) {
              setValues({ ...values, error: data.error, success: false });
            } else {
              setValues({
                ...values,
                username: "",
                email: "",
                password: "",
                role: "",
                pincode: "",
                street: "",
                area: "",
                error: "",
                success: true,
              });
            }
          })
          .catch((err) => console.log("Error in signup",err));
      };
    
    //        useEffect(()=>{
    //     SyncStorage.remove('jwt')
    //   })

  return (
    <View  style={styles.signup_container}>
        <ScrollView>
      <Text style={styles.signup_header}>Signup</Text>
      <Input
      placeholder="Username"
      onChangeText={value => setValues({ ...values, error: false, username: value })}
      />
        <Input
      placeholder="Phone Number"
      onChangeText={value => setValues({ ...values, error: false, phone_number: value })}
      />
        <Input
      placeholder="Email"
      onChangeText={value => setValues({ ...values, error: false, email: value })}
      />
        <Input
      placeholder="Role (1 - Admin, 0 - Vendor, 2 - Delivery)"
      onChangeText={value => setValues({ ...values, error: false, role: value })}
      />
        <Input
      placeholder="Password"
      onChangeText={value => setValues({ ...values, error: false, password: value })}
      />
        <Input
      placeholder="Pincode"
      onChangeText={value => setValues({ ...values, error: false, pincode: value })}
      />
        <Input
      placeholder="Street"
      onChangeText={value => setValues({ ...values, error: false, street: value })}
      />
        <Input
      placeholder="Area"
      onChangeText={value => setValues({ ...values, error: false, area: value })}
      />
       <Button
              title={'Submit'}
              containerStyle={{
                width: 200,
                marginHorizontal: 50,
                marginVertical: 10,
              }}
              onPress={() => onSubmit()}
        />

    </ScrollView>
    </View>
    
  )
}

const styles = StyleSheet.create({
    signup_container: {
        padding: 10
    },
    signup_header: {
        fontSize: 25,
        fontWeight: 'bold',
        textAlign:'center'
    }
})
