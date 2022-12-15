import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React, {useState, useEffect} from 'react'
import { Input, Icon, Button, CheckBox } from '@rneui/themed';
import { signup } from '../../Login/index';
import SyncStorage from 'sync-storage';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Toast from 'react-native-toast-message'

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
        location:"",
        isShipper: false,
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
        location,
        isShipper,
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
          location,
          isShipper,
        })
          .then((data) => {
            if (data.error) {
              setValues({ ...values, error: data.error, success: false });
            } else {
              setValues({
                ...values,
                username: "",
                phone_number:"",
                email: "",
                password: "",
                role: "",
                pincode: "",
                street: "",
                area: "",
                location:"",
                isShipper: false,
                error: "",
                success: true,
              });
              Toast.show({
                type: 'success',
                text1: "User Created Successfully"
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
        <Toast 
        position='top'
        />
      <Text style={styles.signup_header}>Create User</Text>
      <Input
      placeholder="Username"
      onChangeText={value => setValues({ ...values, error: false, username: value })}
      value={username}
      />
        <Input
      placeholder="Phone Number"
      onChangeText={value => setValues({ ...values, error: false, phone_number: value })}
      value={phone_number}
      />
        <Input
      placeholder="Email"
      onChangeText={value => setValues({ ...values, error: false, email: value })}
      value={email}
      />
        <Input
      placeholder="Role (1 - Admin, 0 - Vendor, 2 - Delivery)"
      onChangeText={value => setValues({ ...values, error: false, role: value })}
      value={role}
      />
        <Input
      placeholder="Password"
      onChangeText={value => setValues({ ...values, error: false, password: value })}
      value={password}
      />
        <Input
      placeholder="Pincode"
      onChangeText={value => setValues({ ...values, error: false, pincode: value })}
      value={pincode}
      />
        <Input
      placeholder="Street"
      onChangeText={value => setValues({ ...values, error: false, street: value })}
      value={street}
      />
        <Input
      placeholder="Area"
      onChangeText={value => setValues({ ...values, error: false, area: value })}
      value={area}
      />
          <Input
      placeholder="Location"
      onChangeText={value => setValues({ ...values, error: false, location: value })}
      value={location}
      />
                <CheckBox
                center
                title="Is Shipper?"
                checkedIcon={<FontAwesome name='dot-circle-o' size={20}/>}
                uncheckedIcon={<FontAwesome name='circle-o' size={20}/>}
                checked={isShipper}
                onPress={() => setValues({ ...values, error: false, isShipper: !isShipper }) }
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
