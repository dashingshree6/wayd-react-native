import React, {useState, useEffect, useContext} from 'react';
import {View, Text, Button} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

//Screens
//Admin
import Login from '../../Login/Login';
import Signup from '../Signup/Signup';
import SalesHomepage from '../SalesHomepage/SalesHomepage';
import SalesLiveOrder from '../SalesLiveOrder/SalesLiveOrder';
import Customers from '../Customers/Customers';
import ProcurementHomepage from '../ProcurementHomepage/ProcurementHomepage';
import ProductDetails from '../ProductDetails/ProductDetails';
import Suppliers from '../Suppliers/Suppliers';
import DeliveryLocation from '../DeliveryLocation/DeliveryLocation';
import Category from '../Category/Category';
import PriceAddition from '../PriceAddition.js/PriceAddition';
import Stock from '../Stock/Stock';
import OrderStatus from '../OrderStatus/OrderStatus';
import SalesVendorForm from '../SalesHomepage/SalesVendorForm';
import SelectSupplierForm from '../ProcurementHomepage/SelectSupplierForm';

//Vendor
import CheckoutDetails from '../../Vendor/CheckoutDetails/CheckoutDetails';
import VendorHomepage from '../../Vendor/Homepage/VendorHomepage';
import VendorOrderTracking from '../../Vendor/LiveOrderTracking/VendorOrderTracking';
import VendorsMyOrders from '../../Vendor/MyOrders/VendorsMyOrders';
import CreateOrder from '../../Admin/SalesHomepage/CreateOrder';
import AddProducts from '../../Admin/ProductDetails/AddProducts';
//

//Drawer
import AdminDrawer from './AdminDrawer';
import VendorDrawer from './VendorDrawer';
import DeliveryDrawer from './DeliveryDrawer';
import Ionicons from "react-native-vector-icons/Ionicons";
import DeliveryHomepage from '../../Delivery/DeliveryHomepage';
import DeliverySingleOrderStatus from '../../Delivery/DeliverySingleOrderStatus';
import Coupon from '../Coupon/Coupon';
import Coupons from '../Coupon/Coupons';


import { isAuthenticated, setAuthToken } from '../../Login/index';
import SyncStorage from 'sync-storage';
import { AuthContext } from '../../../App';

import {Icon, ListItem} from '@rneui/themed';

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView style={{height: 0}} {...props}>
      {/* <DrawerItemList {...props} /> */}

      { SyncStorage.get("role") === 1 &&   <AdminDrawer {...props} /> }
      { SyncStorage.get("role") === 0 &&   <VendorDrawer {...props} /> }
      { SyncStorage.get("role") === 2 &&   <DeliveryDrawer {...props} /> }

    </DrawerContentScrollView>
  );
}

const Drawer = createDrawerNavigator();

const token = SyncStorage.get("userToken")
const role = SyncStorage.get("role")

const MyDrawer = ({navigation, state}) => {
  // const token = SyncStorage.get("userToken")
  // const role = SyncStorage.get("role")



  // useEffect(() => {
  //   setAuthToken(isAuthenticated().token);
  //   setInitialRouteName()
  // }, []);

  return (

    <Drawer.Navigator 
          useLegacyImplementation
          // initialRouteName={initialRoute}
          drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
            { state.isSignout ? (
                    
                    <Drawer.Screen
                    name="Login"
                    component={Login}
                    // options={{ title: 'Homepage' }}
                    options={{
                      headerShown: false,
                    }}
                  /> 
              ) : (
              
             //Admin Screens
              state.userRole === 1 ? 
              (
              <>
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
                      name="PriceAddition"
                      component={PriceAddition}
                      options={({ navigation }) => ({
                        title: 'Price Addition',
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
                      options={({ navigation }) => ({
                        title: 'Suppliers',
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
                      name="DeliveryLocation"
                      component={DeliveryLocation}
                      options={({ navigation }) => ({
                        title: 'Delivery Location',
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
                      name="Category"
                      component={Category}
                      options={({ navigation }) => ({
                        title: 'Category',
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
                      name="Stock"
                      component={Stock}
                      options={({ navigation }) => ({
                        title: 'Stock',
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
                      name="OrderStatus"
                      component={OrderStatus}
                      options={({ navigation }) => ({
                        title: 'Order Status',
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
                      name="Signup"
                      component={Signup}
                      options={({ navigation }) => ({
                        title: 'Create User',
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
                      name="SalesVendorForm"
                      component={SalesVendorForm}
                      options={({ navigation }) => ({
                        title: 'Create Sales Order',
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
                      name="SelectSupplierForm"
                      component={SelectSupplierForm}
                      options={({ navigation }) => ({
                        title: 'Select Supplier Form',
                        headerLeft: () => (
                          <Ionicons 
                          name='menu'
                          size={25}
                          onPress={()=> navigation.openDrawer()}
                          />
                        ),

                      })}
                    /> 
   
              </>
              ) :
             
              // Customer Screens        
                 state.userRole === 0 ? 
              (
              <>

                    <Drawer.Screen
                      name="VendorHomepage"
                      component={VendorHomepage}
                      options={({ navigation }) => ({
                        title: 'Homepage',
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
                      name="CheckoutDetails"
                      component={CheckoutDetails}
                      options={({ navigation }) => ({
                        title: 'Checkout Details',
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
                      name="VendorsMyOrders"
                      component={VendorsMyOrders}
                      options={({ navigation }) => ({
                        title: 'My Orders',
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
                      name="VendorOrderTracking"
                      component={VendorOrderTracking}
                      options={({ navigation }) => ({
                        title: 'Order Tracking',
                        headerLeft: () => (
                          <Ionicons 
                          name='menu'
                          size={25}
                          onPress={()=> navigation.openDrawer()}
                          />
                        ),

                      })}
                    />

              </>) :

              // Delivery Screens

              (<>

                    <Drawer.Screen
                      name="DeliveryHomepage"
                      component={DeliveryHomepage}
                      options={({ navigation }) => ({
                        title: 'Delivery Homepage',
                        headerLeft: () => (
                          <Ionicons 
                          name='menu'
                          size={25}
                          onPress={()=> navigation.openDrawer()}
                          />
                        ),

                      })}
                    />
              
              </>)
               
          )
         }

      
    </Drawer.Navigator>
  );
};

export default MyDrawer;
