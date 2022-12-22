import React, { useState, useEffect, useContext} from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    TextInput,
    ActivityIndicator 
  } from 'react-native';
import { 
    Input,
    Icon,
    Button 
    } 
     from '@rneui/themed';
import { signin, authenticate, isAuthenticated } from '.';
import SyncStorage from 'sync-storage';
import { AuthContext } from '../../App';

const Login = ({ navigation  }) => {
    const [values, setValues] = useState({
        phone_number: "",
        password: "",
        error: "",
        loading: false,
        didRedirect: false,
      });

    const { phone_number, password, error, loading, didRedirect } = values;
    const { user, token } = isAuthenticated();

    const handleChange = (name) => (event) => {
        setValues({ ...values, error: false, [name]: event.target.value });
    }; 

    const { signInContext } = useContext(AuthContext)
    const onSubmit = () => {
        setValues({ ...values, error: false, loading: true });
        signin({ phone_number, password })
          .then((data) => {
            console.log(data.data);
    
            if (data.error) {
              setValues({ ...values, error: data.data.error, loading: false });
            } else {
                authenticate(data.data, () => {
                  setValues({
                    ...values,
                    didRedirect: true,
                    phone_number: "",
                    password: "",
                  });
                });
                //new added
                SyncStorage.set("role",data.data.user.role)
                SyncStorage.set("userToken",data.data.token)
                SyncStorage.set("userId", data.data.user._id)
                let userRole = SyncStorage.get("role")
                let userToken = SyncStorage.get("userToken")
                console.log("Signin Role",SyncStorage.get("role"))
                console.log("Signin Token",SyncStorage.get("userToken"))
                console.log("Signin User Id",SyncStorage.get("userId"))
                signInContext(userToken,userRole)
                // if (data.data.token) {
                //     if (data.data.user && data.data.user.role === 1) {
                //       // return <Redirect to="/admin/dashboard" />;
                //       return navigation.navigate("PriceAddition")
                //     } else {
                //       return navigation.navigate("VendorHomepage")
                //     }
                //   }
                //   if (isAuthenticated() && user.role === 1) {
                //     return navigation.navigate("SalesHomepage")
                //   }
                //   if (isAuthenticated() && user.role === 0) {
                //       return navigation.navigate("VendorHomepage")
                //   }

                // if (didRedirect) {
                //   if (user && user.role === 1) {
                //     return navigation.navigate("PriceAddition")
                //   } else {
                //     return navigation.navigate("VendorHomepage")
                //   }
                // }


                // if(userToken) {
                //   if ( userRole === 1) {
                //     return navigation.navigate("SalesHomepage")
                //   } else if ( userRole === 0) {
                //     return navigation.navigate("VendorHomepage")
                //   } else {
                //     return navigation.navigate("DeliveryHomepage")
                //   }
                // } else {
                //   return navigation.navigate("Login")
                // }      

              }
              //
            
          })
          .catch((err) =>
            setValues({
              ...values,
              error: err.response.data.error,
              loading: false,
            })
          );
      };

    const performRedirect = () => {
        //TODO: do a redirect here
        if (didRedirect) {
          if (user && user.role === 1) {
            // return <Redirect to="/admin/dashboard" />;
            return navigation.navigate("SalesHomepage")
          } else {
            return navigation.navigate("VendorHomepage")
          }
        }
        if (isAuthenticated() && user.role === 1) {
          return navigation.navigate("SalesHomepage")
        }
        if (isAuthenticated() && user.role === 0) {
            return navigation.navigate("VendorHomepage")
        }
      };
    
      useEffect(()=>{
    //     SyncStorage.remove('jwt')
       console.log("Before Login",SyncStorage.get("jwt"))
      })

    if(values.loading) {
      <ActivityIndicator
      size={"large"}
      style={{
        justifyContent:'center',
        alignItems:'center'
      }}
      />
    }
    return (
        <SafeAreaView>
            <ScrollView>
                <View style={styles.login}>
                    <Text style={styles.login_header}>Welcome Back</Text>
                    <Text style={styles.phone}>Phone Number</Text>
                    <Input
                    placeholder='Enter your phonenumber'
                    keyboardType='numeric'
                    value={phone_number}
                    // leftIcon={{ type: 'Feather', name: 'phone' }}
                    // onChangeText={value => this.setState({ comment: value })}
                    // leftIcon={
                    //     <Icon
                    //     name='phone'
                    //     size={24}
                    //     color='black'
                    //     />
                    //     }
                    onChangeText={value => setValues({ ...values, error: false, phone_number: value })}
                    />
                    <Text style={styles.password}>Password</Text>
                    <Input
                    placeholder='Enter your password'
                    secureTextEntry={true}
                    value={password}
                    // leftIcon={{ type: 'Feather', name: 'phone' }}
                    // onChangeText={value => this.setState({ comment: value })}
                    // leftIcon={
                    //     <Icon
                    //     name='phone'
                    //     size={24}
                    //     color='black'
                    //     />
                    //     }
                    onChangeText={value => setValues({ ...values, error: false, password: value })}
                    />
                    <Text style={styles.forgot_password}>Forgot Password ?</Text>
                    <View style={styles.btn_pw}> 
                        <Button
                        title="Login"
                        disabled={phone_number && password ? false : true}
                        onPress={() => onSubmit()}
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