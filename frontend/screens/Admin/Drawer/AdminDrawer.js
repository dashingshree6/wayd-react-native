import * as React from 'react';
import { Text, View } from 'react-native';
import {
  DrawerItem,
} from '@react-navigation/drawer';
import AntDesign from "react-native-vector-icons/AntDesign";

export default function AdminDrawer(props) {
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
          onPress={() => props.navigation.navigate('Customers')}
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
          onPress={() => props.navigation.navigate('Suppliers')}
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
          onPress={() => props.navigation.navigate('DeliveryLocation')}
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
          onPress={() => props.navigation.navigate('Customers')}
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