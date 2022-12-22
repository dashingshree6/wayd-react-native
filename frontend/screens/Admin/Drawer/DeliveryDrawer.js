import  React,{useState, useEffect, useContext} from 'react';
import { Text, View } from 'react-native';
import {
  DrawerItem,
} from '@react-navigation/drawer';
import AntDesign from "react-native-vector-icons/AntDesign";
import axios from 'axios';
import SyncStorage from 'sync-storage';
import { signout, isAuhenticated } from '../../Login/index';
import { AuthContext } from '../../../App';

const API="https://e56d-49-205-239-58.in.ngrok.io/api/user/6396be811f1893235c9b2661"

const TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDA3ZjRmM2VmOTRjMTAwMjQ4ODI1N2QiLCJpYXQiOjE2NzA4NzQzODN9.p2pTjEY0jEMGK7qhJYDTRrpqS5mAQgv5Weo-QPRNi_4"

export default function DeliveryDrawer(props) {
  const { signOutContext } = useContext(AuthContext)  
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
      >User Details x</Text>
            <View
                style={{
                    backgroundColor:'silver',
                    padding: 20,
                    margin: 10
                }}
                >
                <Text style={{marginLeft: 15}}>Name :{data.username}</Text>
                <Text style={{marginLeft: 15}}>Phone Number : {data.phone_number}</Text>
                <Text style={{marginLeft: 15}}>Due Amount :{data.email}</Text>
            </View>
  
        <DrawerItem
          label="Home"
          onPress={() => props.navigation.navigate('DeliveryHomepage')}
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
  
  { SyncStorage.get("jwt") && (

        <DrawerItem
        label="Logout"
        onPress={() => {
          props.navigation.closeDrawer();
          signOutContext()
          signout()
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