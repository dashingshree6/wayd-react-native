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
import Ionicons from "react-native-vector-icons/Ionicons";

const API="https://e56d-49-205-239-58.in.ngrok.io/api/user/6396be811f1893235c9b2661"

const TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDA3ZjRmM2VmOTRjMTAwMjQ4ODI1N2QiLCJpYXQiOjE2NzA4NzQzODN9.p2pTjEY0jEMGK7qhJYDTRrpqS5mAQgv5Weo-QPRNi_4"

export default function DeliveryDrawer(props) {
  const { signOutContext } = useContext(AuthContext)  
  const [data,setData] = React.useState({});

  const [syncStorageState, setSyncStorageState] = useState({
    token: '',
    user: {
      _id: '',
      username: '',
      phone_number: 3490579639,
      location: '',
      email: '',
      role: 2,
    },
  });

  useEffect(() => {
    const userDetail = SyncStorage.get('userDetail');
    setSyncStorageState(userDetail);
    const url = `${API}/user/${syncStorageState.user._id}`;
    axios
      .get(url, {headers: {Authorization: `Bearer ${syncStorageState.token}`}})
      .then(res => {
        console.log(res.data);
        setData(res.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
      <>
           <View
        style={{
            padding: 10,
        }}
        >
          <Text style={{
            fontSize:18,
            fontWeight:'600',
            color:'grey'
            }}>Hey</Text>
          <Text 
          style={{
            fontSize: 25,
            fontWeight:'bold',
            color:'black'
          }}
          >{ SyncStorage.get("userName") }</Text>
             <Text style={{
            fontSize:18,
            fontWeight:'600',
            color:'grey'
            }}>Have a nice day !!</Text>
        </View>

  
        <View
        style={{
          backgroundColor:'#f2f2f2',
          padding: 10,
          flexDirection:'row',
          alignItems:'center',
          marginBottom: 2
        }}
        >
              <Ionicons
                  name='call'
                  color={'green'}
                  size={25}
                />
              <Text style={{
                  fontWeight:'bold',
                  color:'green',
                  justifyContent:'space-between',
                  marginLeft: 15,
                  }}>
                  { SyncStorage.get("userPhone") }
                </Text>

        </View>

        <View
        style={{
          backgroundColor:'#f2f2f2',
          padding: 10,
          flexDirection:'row',
          alignItems:'center'
        }}
        >
              <Ionicons
                  name='reader-outline'
                  color={'green'}
                  size={25}
                />
              <Text style={{
                  fontWeight:'bold',
                  color:'green',
                  justifyContent:'space-between',
                  marginLeft: 15
                  }}>
                  Rs.456
                </Text>

        </View>
  
        <DrawerItem
          label="Home"
          onPress={() => props.navigation.navigate('DeliveryHomepage')}
          labelStyle={{
            fontSize: 15,
            color:'black'
          }}
          icon={()=> (
            // <AntDesign
            // name='right'
            // size={15}
            // style={{
            //   position: "absolute",
            //   right: 10,
            // }}
            // />
            <Ionicons
            name='home'
            color={'green'}
            size={25}
            style={{
              position: "absolute",
              left: 0,
            }}
          />
          )}
        />

        <DrawerItem
          label="My Orders"
          onPress={() => props.navigation.navigate('ProcurementHomepage')}
          labelStyle={{
            fontSize: 15,
            color:'black'
          }}
          icon={()=> (
            // <AntDesign
            // name='right'
            // size={15}
            // style={{
            //   position: "absolute",
            //   right: 10,
            // }}
            // />
            <Ionicons
            name='menu'
            color={'green'}
            size={25}
            style={{
              position: "absolute",
              left: 0,
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
        labelStyle={{
          fontSize: 15,
          color:'black'
        }}
        icon={()=> (
          // <AntDesign
          // name='right'
          // size={15}
          // style={{
          //   position: "absolute",
          //   right: 10,
          // }}
          // />
          <Ionicons
          name='log-out'
          color={'green'}
          size={25}
          style={{
            position: "absolute",
            left: 0,
          }}
        />
        )}
      />
      )}

    </>
  );
}
