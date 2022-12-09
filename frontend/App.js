/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
// import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View, Button
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

/* $FlowFixMe[missing-local-annot] The type annotation(s) required by Flow's
 * LTI update could not be added via codemod */

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// const Stack = createNativeStackNavigator();

import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';


//Screens

//Admin
import Login from './screens/Login/Login';
import SalesHomepage from './screens/Admin/SalesHomepage/SalesHomepage';
import SalesLiveOrder from './screens/Admin/SalesLiveOrder/SalesLiveOrder';
import Customers from './screens/Admin/Customers/Customers';
import ProcurementHomepage from './screens/Admin/ProcurementHomepage/ProcurementHomepage';
import ProductDetails from './screens/Admin/ProductDetails/ProductDetails';
import Suppliers from './screens/Admin/Suppliers/Suppliers';
import MyDrawer from './screens/Admin/Drawer/MenuDrawer';

//Vendor
import CheckoutDetails from './screens/Vendor/CheckoutDetails/CheckoutDetails';
import VendorHomepage from './screens/Vendor/Homepage/VendorHomepage';
import VendorOrderTracking from './screens/Vendor/LiveOrderTracking/VendorOrderTracking';
import VendorsMyOrders from './screens/Vendor/MyOrders/VendorsMyOrders';
//
import { Icon } from '@rneui/themed';
import Ionicons from "react-native-vector-icons/Ionicons";
import DeliveryHomepage from './screens/Delivery/DeliveryHomepage';

const Stack = createNativeStackNavigator()
// const App: () => Node = () => {
const App = () => {
  return (
        <NavigationContainer>
          {/* <MyDrawer/> */}
            <Stack.Navigator initialRouteName='VendorHomepage'>
                <Stack.Screen
                  name="Login"
                  component={Login}
                  // options={{ title: 'Homepage' }}
                  options={{
                    headerShown: false,
                  }}

                />
                <Stack.Screen
                  name="SalesHomepage"
                  component={SalesHomepage}
                  options={{
                    title: ' Sales Homepage',
                    headerLeft: ({props}) => (
                      <Ionicons 
                      name='menu'
                      size={25}
                      // onPress={()=> props.navigation.openDrawer()}
                      />
                    ),

                  }}
                />
                <Stack.Screen
                  name="SalesLiveOrder"
                  component={SalesLiveOrder}
                  options={{
                    title: ' Sales Live Order',
                    headerLeft: ({props}) => (
                      <Ionicons 
                      name='menu'
                      size={25}
                      // onPress={()=> props.navigation.openDrawer()}
                      />
                    ),

                  }}
                />
                <Stack.Screen
                  name="Customers"
                  component={Customers}
                  options={{
                    title: 'Customers',
                    headerLeft: ({props}) => (
                      <Ionicons 
                      name='menu'
                      size={25}
                      // onPress={()=> props.navigation.openDrawer()}
                      />
                    ),

                  }}
                />
                <Stack.Screen
                  name="ProcurementHomepage"
                  component={ProcurementHomepage}
                  options={{
                    title: 'Procurement Homepage',
                    headerLeft: ({props}) => (
                      <Ionicons 
                      name='menu'
                      size={25}
                      // onPress={()=> props.navigation.openDrawer()}
                      />
                    ),

                  }}
                />
                <Stack.Screen
                  name="ProductDetails"
                  component={ProductDetails}
                  options={{
                    title: 'Product Details',
                    headerLeft: ({props}) => (
                      <Ionicons 
                      name='menu'
                      size={25}
                      // onPress={()=> props.navigation.openDrawer()}
                      />
                    ),

                  }}
                />
                <Stack.Screen
                  name="Suppliers"
                  component={Suppliers}
                  options={{
                    title: 'Suppliers',
                    headerLeft: ({props}) => (
                      <Ionicons 
                      name='menu'
                      size={25}
                      // onPress={()=> props.navigation.openDrawer()}
                      />
                    ),
                
                  }}
                />

                <Stack.Screen
                  name="CheckoutDetails"
                  component={CheckoutDetails}
                  options={{
                    title: 'Checkout Details',
                    headerLeft: ({props}) => (
                      <Ionicons 
                      name='menu'
                      size={25}
                      // onPress={()=> props.navigation.openDrawer()}
                      />
                    ),
                
                  }}
                />

                <Stack.Screen
                  name="VendorsMyOrders"
                  component={VendorsMyOrders}
                  options={{
                    title: 'MyOrders Details',
                    headerLeft: ({props}) => (
                      <Ionicons 
                      name='menu'
                      size={25}
                      // onPress={()=> props.navigation.openDrawer()}
                      />
                    ),
                
                  }}
                />

                <Stack.Screen
                  name="VendorHomepage"
                  // component={VendorHomepage}
                  component={DeliveryHomepage}
                  options={{
                    title: 'Homepage',
                    headerLeft: ({props}) => (
                      <Ionicons 
                      name='menu'
                      size={25}
                      // onPress={()=> props.navigation.openDrawer()}
                      />
                    ),
                
                  }}
                />

                <Stack.Screen
                  name="VendorOrderTracking"
                  component={VendorOrderTracking}
                  options={{
                    title: 'Order Tracking',
                    headerLeft: ({props}) => (
                      <Ionicons 
                      name='menu'
                      size={25}
                      // onPress={()=> props.navigation.openDrawer()}
                      />
                    ),
                
                  }}
                />
            </Stack.Navigator>
        </NavigationContainer>
  )
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
