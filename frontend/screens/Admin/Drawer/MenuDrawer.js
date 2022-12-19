import React, {useState, useEffect} from 'react';
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

import {Icon, ListItem} from '@rneui/themed';

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      {/* <DrawerItemList {...props} /> */}

      { SyncStorage.get("role") === 1 &&   <AdminDrawer {...props} /> }
      { SyncStorage.get("role") === 0 &&   <VendorDrawer {...props} /> }
      { SyncStorage.get("role") === 2 &&   <DeliveryDrawer {...props} /> }

    </DrawerContentScrollView>
  );
}

const Drawer = createDrawerNavigator();

const MyDrawer = () => {
  const [initialRoute, setInitialRoute] = useState("Login")
  const token = SyncStorage.get("userToken")

  const setInitialRouteName = () => {
    if(isAuthenticated()) {
      if(isAuthenticated().user.role === 1) {
        setInitialRoute("SalesHomepage")
      }  
      if(isAuthenticated().user.role === 0) {
        setInitialRoute("VendorHomepage")
      } 
      if(isAuthenticated().user.role === 2) {
        setInitialRoute("DeliveryLocation")
      } 
    } else {
      setInitialRoute('Login');
    }
  }
  // useEffect(() => {
  //   setAuthToken(isAuthenticated().token);
  //   setInitialRouteName()
  // }, []);

  return (

    <Drawer.Navigator 
          useLegacyImplementation
          initialRouteName={initialRoute}
          drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
                  
                  { !token && 
                  
                  <Drawer.Screen
                    name="Login"
                    component={Login}
                    // options={{ title: 'Homepage' }}
                    options={{
                      headerShown: false,
                    }}
                  /> 
                  }
   
     
                    <Drawer.Screen
                      name="SalesHomepage"
                      component={SalesHomepage}
                      // component={CheckoutDetails}
                      // component={DeliveryHomepage}
                      // component={DeliverySingleOrderStatus}
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
                      // component={CheckoutDetails}
                      // component={VendorHomepage}
                      // component={ProductDetails}
                      component={ProcurementHomepage}
                      // component={Coupons}
                      // component={Tabs}
                      options={({ navigation }) => ({
                        title: 'Vendor Homepage',
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


                    {/* Vendor */}

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
                    
   
    
 
   
      {/* <Drawer.Screen
        name="ProcurementHomepage"
        component={ProcurementHomepage}
        options={({navigation}) => ({
          title: 'Procurement Homepage',
          headerLeft: () => (
            <Ionicons
              name="menu"
              size={25}
              onPress={() => navigation.openDrawer()}
            />
          ),
        })}
      /> */}
      {/* <Drawer.Screen
        name="ProductDetails"
        component={ProductDetails}
        options={({navigation}) => ({
          title: 'Product Details',
          headerLeft: () => (
            <Ionicons
              name="menu"
              size={25}
              onPress={() => navigation.openDrawer()}
            />
          ),
        })}
      /> */}
      {/* <Drawer.Screen
        name="Suppliers"
        component={Suppliers}
        options={{
          title: 'Suppliers',
          headerLeft: ({props}) => (
            <Ionicons
              name="menu"
              size={25}
              onPress={() => props.navigation.openDrawer()}
            />
          ),
        }}
      /> */}
    </Drawer.Navigator>
  );
};

export default MyDrawer;
