import * as React from 'react';
import { Text, View } from 'react-native';
import {
  DrawerItem,
} from '@react-navigation/drawer';
import AntDesign from "react-native-vector-icons/AntDesign";

export default function VendorDrawer(props) {
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
          <Text style={{marginLeft: 15}}>Name :</Text>
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