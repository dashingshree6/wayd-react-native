import React, { useState, useEffect} from 'react';
import { Text, View } from 'react-native';
import {
  DrawerItem,
} from '@react-navigation/drawer';
import AntDesign from "react-native-vector-icons/AntDesign";
import axios from 'axios';



const API="https://f5b6-49-205-239-58.in.ngrok.io/api/user/636e0bf09598d4489cdb1ff4"

const TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDA3ZjRmM2VmOTRjMTAwMjQ4ODI1N2QiLCJpYXQiOjE2NzA3MTAzODd9.jIhWWHg1Zh3nChGzUZbgMiGj3oVcrQkVbwEUz-PTtyc"

export default function VendorDrawer(props) {



  const [data,setData] = React.useState({});



  const getUser =()=>{
    
    
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
    getUser()
  },[])
  


    return (
      <>
      <Text
      style={{
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 5
      }}
      >User Details</Text>
        <View
        style={{
            backgroundColor:'silver',
            padding: 20,
            margin: 10
        }}
        >
          <Text style={{marginLeft: 15}}>Name :{data.phone_number}</Text>
          <Text style={{marginLeft: 15}}>Phone Number :</Text>
          <Text style={{marginLeft: 15}}>Due Amount :</Text>
        </View>

        <DrawerItem
          label="Home"
          onPress={() => props.navigation.navigate('VendorHomepage')}
          icon={()=> (
            <AntDesign
            name='right'
            size={15}
            style={{
              position: "absolute",
              right: 10,
            }}
            />
          )}
        />
           <DrawerItem
          label="My Orders"
          onPress={() => props.navigation.navigate('VendorsMyOrders')}
          icon={()=> (
            <AntDesign
            name='right'
            size={15}
            style={{
              position: "absolute",
              right: 10,
            }}
            />
          )}
        />
        <DrawerItem
          label="Credit Cycle Time Remaining"
          onPress={() => props.navigation.navigate('ProcurementHomepage')}
          icon={()=> (
            <AntDesign
            name='right'
            size={15}
            style={{
              position: "absolute",
              right: 10,
            }}
            />
          )}
        />
  
        <DrawerItem
          label="Logout"
          onPress={() => props.navigation.navigate('Login')}
          icon={()=> (
            <AntDesign
            name='right'
            size={15}
            style={{
              position: "absolute",
              right: 10,
            }}
            />
          )}
        />
       
  
      </>
    )
  }