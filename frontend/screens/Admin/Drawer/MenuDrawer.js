import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

//Screens
//Admin
import Login from '../../Login/Login';
import SalesHomepage from '../SalesHomepage/SalesHomepage';
import SalesLiveOrder from '../SalesLiveOrder/SalesLiveOrder';
import Customers from '../Customers/Customers';
import ProcurementHomepage from '../ProcurementHomepage/ProcurementHomepage';
import ProductDetails from '../ProductDetails/ProductDetails';
import Suppliers from '../Suppliers/Suppliers';
import DeliveryLocation from '../DeliveryLocation/DeliveryLocation';

//Vendor
import CheckoutDetails from '../../Vendor/CheckoutDetails/CheckoutDetails';
import VendorHomepage from '../../Vendor/Homepage/VendorHomepage';
import VendorOrderTracking from '../../Vendor/LiveOrderTracking/VendorOrderTracking';
import VendorsMyOrders from '../../Vendor/MyOrders/VendorsMyOrders';
//

//Drawer
import AdminDrawer from './AdminDrawer';
import VendorDrawer from './VendorDrawer';
import DeliveryDrawer from './DeliveryDrawer';
//
//
import { Icon, ListItem } from '@rneui/themed';
import Ionicons from "react-native-vector-icons/Ionicons";


function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      {/* <DrawerItemList {...props} /> */}
      <AdminDrawer {...props}/>
      {/* <VendorDrawer {...props}/> */}
      {/* <DeliveryDrawer {...props}/> */}

    </DrawerContentScrollView>
  );
}

const Drawer = createDrawerNavigator();

const MyDrawer = () => {
  return (
    // <Drawer.Navigator
    //   useLegacyImplementation
    //   drawerContent={(props) => <CustomDrawerContent {...props} />}
    // >
    //             <Drawer.Screen
    //               name="Login"
    //               component={Login}
    //               // options={{ title: 'Homepage' }}
    //               options={{
    //                 headerShown: false,
    //               }}

    //             />
    //             <Drawer.Screen
    //               name="SalesHomepage"
    //               component={SalesHomepage}
    //               options={{
    //                 title: ' Sales Homepage'
    //                 // headerLeft: <Icon name='menu' size={24} color='white'
    //                 // onPress={()=> navigation.toggleDrawer()}
    //                 // />,

    //               }}
    //             />
    //             <Drawer.Screen
    //               name="SalesLiveOrder"
    //               component={SalesLiveOrder}
    //               options={{
    //                 title: ' Sales Live Order'
    //                 // headerLeft: <Icon name='menu' size={24} color='white'
    //                 // onPress={()=> navigation.toggleDrawer()}
    //                 // />,

    //               }}
    //             />
    //             <Drawer.Screen
    //               name="Customers"
    //               component={Customers}
    //               options={{
    //                 title: 'Customers'
    //                 // headerLeft: <Icon name='menu' size={24} color='white'
    //                 // onPress={()=> navigation.toggleDrawer()}
    //                 // />,

    //               }}
    //             />
    //             <Drawer.Screen
    //               name="ProcurementHomepage"
    //               component={ProcurementHomepage}
    //               options={{
    //                 title: 'Procurement Homepage'
    //                 // headerLeft: <Icon name='menu' size={24} color='white'
    //                 // onPress={()=> navigation.toggleDrawer()}
    //                 // />,

    //               }}
    //             />
    //             <Drawer.Screen
    //               name="ProductDetails"
    //               component={ProductDetails}
    //               options={{
    //                 title: 'Product Details'
    //                 // headerLeft: <Icon name='menu' size={24} color='white'
    //                 // onPress={()=> navigation.toggleDrawer()}
    //                 // />,

    //               }}
    //             />
    //             <Drawer.Screen
    //               name="Suppliers"
    //               component={Suppliers}
    //               options={{
    //                 title: 'Suppliers',
    //                 headerLeft: ({props}) => (
    //                   <Ionicons 
    //                   name='menu'
    //                   size={25}
    //                   onPress={()=> props.navigation.openDrawer()}
    //                   />
    //                 ),     
    //               }}
    //             />
    // </Drawer.Navigator>

    <Drawer.Navigator 
          useLegacyImplementation
          initialRouteName='DeliveryLocation'
          drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
                    {/* <Drawer.Screen
                      name="Login"
                      component={Login}
                      // options={{ title: 'Homepage' }}
                      options={{
                        headerShown: false,
                      }}

                    /> */}
                    <Drawer.Screen
                      name="SalesHomepage"
                      component={SalesHomepage}
                      options={({ navigation }) => ({
                        title: ' Sales Homepage',
                        headerLeft: () => (
                          <Ionicons 
                          name='menu'
                          size={25}
                          onPress={()=> navigation.openDrawer()}
                          />
                        ),
                        // drawerIcon: () => (
                        //   <AntDesign
                        //   name='right'
                        //   size={15}
                        //   />
                        // )

                      })}
                    />
                    <Drawer.Screen
                      name="SalesLiveOrder"
                      component={SalesLiveOrder}
                      options={({ navigation }) => ({
                        title: ' Sales Live Order',
                        headerLeft: () => (
                          <Ionicons 
                          name='menu'
                          size={25}
                          onPress={()=> navigation.openDrawer()}
                          />
                        ),

                      })}
                    />
                    <Drawer.Screen
                      name="Customers"
                      component={Customers}
                      options={({ navigation }) => ({
                        title: 'Customers',
                        headerLeft: () => (
                          <Ionicons 
                          name='menu'
                          size={25}
                          onPress={()=> navigation.openDrawer()}
                          />
                        ),

                      })}
                    />
                    <Drawer.Screen
                      name="ProcurementHomepage"
                      component={ProcurementHomepage}
                      options={({ navigation }) => ({
                        title: 'Procurement Homepage',
                        headerLeft: () => (
                          <Ionicons 
                          name='menu'
                          size={25}
                          onPress={()=> navigation.openDrawer()}
                          />
                        ),

                      })}
                    />
                    <Drawer.Screen
                      name="ProductDetails"
                      component={ProductDetails}
                      options={({ navigation }) => ({
                        title: 'Product Details',
                        headerLeft: () => (
                          <Ionicons 
                          name='menu'
                          size={25}
                          onPress={()=> navigation.openDrawer()}
                          />
                        ),

                  })}
                />
                <Drawer.Screen
                  name="Suppliers"
                  component={Suppliers}
                  options={{
                    title: 'Suppliers',
                    headerLeft: ({props}) => (
                      <Ionicons 
                      name='menu'
                      size={25}
                      onPress={()=> props.navigation.openDrawer()}
                      />
                    ),     
                  }}
                />
    </Drawer.Navigator>
  );
}

export default MyDrawer;