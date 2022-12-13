import { View, Text, StyleSheet } from 'react-native'
import React, {useEffect, useState} from 'react'
import { Button, Image } from '@rneui/themed';
import axios from 'axios';




const API="https://e56d-49-205-239-58.in.ngrok.io/api/product/61a8c81b1e5a79501663f912"

const TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDA3ZjRmM2VmOTRjMTAwMjQ4ODI1N2QiLCJpYXQiOjE2NzA4NzQzODN9.p2pTjEY0jEMGK7qhJYDTRrpqS5mAQgv5Weo-QPRNi_4"

export default function CheckoutDetails(props) {


  const [data,setData] = React.useState({});



  const checkoutDetails =()=>{
    
    
    axios.get(API, { headers : {"Authorization" : `Bearer ${TOKEN}`}})
    .then(res => {
      console.log(res.data)
      setData(res.data)
    }).catch((error) => {
      console.log(error)
    });
    
    
   
    
  }
  //call useeffect outside function****
  useEffect(() => {
    checkoutDetails()
  },[])
  





  return (
    <View>
        <Text style={styles.vendor_checkout_head}>Checkout Details</Text>
        <View style={styles.vendor_checkout_btns}>
                <Button
                title={'Instant Order'}
                containerStyle={{
                    // width: '100%',
                    marginVertical: 10,
                }}
                />
                <Button
                title={'Advanced Order'}
                containerStyle={{
                    // width: "100%",
                    marginVertical: 10,
                }}
                />  
        </View>
        <View style={styles.vendor_checkout_content}>
              <View>
                <Text style={styles.vendor_checkout_modalText}>Product Name : {data.name}</Text>
                <Text style={styles.vendor_checkout_modalText}>Grade: {data.grade} </Text>
                <Text style={styles.vendor_checkout_modalText}>4kg {data.description}</Text>                    
              </View>
                <Image
                      source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Tomato.jpg/220px-Tomato.jpg" }}
                      containerStyle={styles.vendor_checkout_img}
                      // PlaceholderContent={<ActivityIndicator />}
                />
        </View>
        <Button
              title="Add Coupon"
              buttonStyle={{
                backgroundColor: 'black',
                borderWidth: 2,
                borderColor: 'white',
                borderRadius: 30,
              }}
              containerStyle={{
                width: 200,
                // marginHorizontal: 50,
                marginVertical: 10,
              }}
              titleStyle={{ fontWeight: 'bold' }}
            />
        <Text>Final Price :</Text>
        <Text>Address :</Text>
        <Text>Current Due Amount :</Text>
        <Text>Propose Payment :</Text>
        <Button
                title={'Place Order'}
                containerStyle={{
                    // width: '100%',
                    marginVertical: 10,
                }}
        />
        
    </View>
  )
}

const styles = StyleSheet.create({
    vendor_checkout_head: {
      fontSize: 20,
      fontWeight:'bold',
      color:'black',
      textAlign:'center'
    },
    vendor_checkout_btns: {
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-around'
    },
    vendor_checkout_img:{
        width: 50,
        aspectRatio: 1,
      },
      vendor_checkout_content:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-around',
        margin: 6,
        backgroundColor:'silver',
        padding: 10
    },
    vendor_checkout_modalText:{
        flexWrap:'wrap',
        flex: 0.5
    }
    });