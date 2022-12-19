import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native';
import {
  DrawerItem,
} from '@react-navigation/drawer';
import AntDesign from "react-native-vector-icons/AntDesign";
import axios from 'axios';
import SyncStorage from 'sync-storage';
import { signout, isAuhenticated } from '../../Login/index';



const API="https://e56d-49-205-239-58.in.ngrok.io/api/user/636a56f35c526e4144ad5773"

const TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDA3ZjRmM2VmOTRjMTAwMjQ4ODI1N2QiLCJpYXQiOjE2NzA4NzQzODN9.p2pTjEY0jEMGK7qhJYDTRrpqS5mAQgv5Weo-QPRNi_4"


export default function AdminDrawer(props) {



const [data,setData] = useState({});



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


    
                <Text style={{marginLeft: 15}}>Username : {data.username}</Text>
                <Text style={{marginLeft: 15}}>Phone Number : {data.phone_number}</Text>
                <Text style={{marginLeft: 15}}>Email : {data.email}</Text>
                </View>
              
              
                <DrawerItem
                label="Create User"
                onPress={() => props.navigation.navigate('Signup')}
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
      <Text
      style={{
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 5
      }}
      >Order</Text>
        <DrawerItem
          label="Sales Order"
          onPress={() => props.navigation.navigate('SalesHomepage')}
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
          label="Create Sales Order"
          onPress={() => props.navigation.navigate('SalesVendorForm')}
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
          label="Procurement Order"
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
  
      <Text
      style={{
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 5
      }}
      >Peoples</Text>
        <DrawerItem
          label="Customers"
          onPress={() => props.navigation.navigate('Customers', { role: 0 })}
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
          label="Suppliers"
          onPress={() => props.navigation.navigate('Customers', { role: 1 })}
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
          label="Delivery"
          onPress={() => props.navigation.navigate('Customers', { role: 2 })}
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
          label="Category"
          onPress={() => props.navigation.navigate('Category')}
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
          label="PriceAddition"
          onPress={() => props.navigation.navigate('PriceAddition')}
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
          label="Stock"
          onPress={() => props.navigation.navigate('Stock')}
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

        { SyncStorage.get("jwt") && (

        <DrawerItem
        label="Logout"
        onPress={() => {
          signout(() => {
            props.navigation.navigate('Login')
          })
        }}
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
        )}

        
      
  
      </>
    )
  }