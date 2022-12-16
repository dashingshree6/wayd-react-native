import React, {useState, useEffect} from 'react';
import {View, Text, Button} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

import Ionicons from 'react-native-vector-icons/Ionicons';
import SyncStorage from 'sync-storage';
import GenerateInvoice from '../GenerateInvoice/GenerateInvoice';

//--------------------Screens
//Admin
import SalesHomepage from '../SalesHomepage/SalesHomepage';
import SalesLiveOrder from '../SalesLiveOrder/SalesLiveOrder';
import Customers from '../Customers/Customers';
import ProcurementHomepage from '../ProcurementHomepage/ProcurementHomepage';
import ProductDetails from '../ProductDetails/ProductDetails';
import Suppliers from '../Suppliers/Suppliers';
import DeliveryLocation from '../DeliveryLocation/DeliveryLocation';
import PriceAddition from '../PriceAddition.js/PriceAddition';
import Stock from '../Stock/Stock';
import OrderStatus from '../OrderStatus/OrderStatus';
import Login from '../../Login/Login';
import Signup from '../Signup/Signup';
import Category from '../Category/Category';

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

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      {SyncStorage.get('role') === 1 && <AdminDrawer {...props} />}
      {SyncStorage.get('role') === 0 && <VendorDrawer {...props} />}
      {SyncStorage.get('role') === 2 && <DeliveryDrawer {...props} />}
    </DrawerContentScrollView>
  );
}

const Drawer = createDrawerNavigator();

const MyDrawer = () => {
  const [initialRoute, setInitialRoute] = useState('');
  const token = SyncStorage.get('jwt');
  const userRole = SyncStorage.get('role');

  const setInitialRouteName = () => {
    if (token) {
      if (userRole === 1) {
        setInitialRoute('SalesHomepage');
      }
      if (userRole === 0) {
        setInitialRoute('VendorHomepage');
      }
      if (userRole === 2) {
        setInitialRoute('DeliveryLocation');
      }
    } else {
      setInitialRoute('Login');
    }
  };

  return (
    <Drawer.Navigator
      useLegacyImplementation
      initialRouteName={'Login'}
      drawerContent={props => <CustomDrawerContent {...props} />}>
      {!token && (
        <Drawer.Screen
          name="Login"
          component={VendorsMyOrders}
          options={{
            headerShown: false,
          }}
        />
      )}

      <Drawer.Screen
        name="SalesHomepage"
        component={SalesHomepage}
        options={({navigation}) => ({
          title: ' Sales Homepage',
          headerLeft: () => (
            <Ionicons
              name="menu"
              size={25}
              onPress={() => navigation.openDrawer()}
            />
          ),
        })}
      />

      <Drawer.Screen
        name="GenerateInvoice"
        component={GenerateInvoice}
        options={({navigation}) => ({
          title: 'Generate Invoice',
          headerLeft: () => (
            <Ionicons
              name="menu"
              size={25}
              onPress={() => navigation.openDrawer()}
            />
          ),
        })}
      />

      <Drawer.Screen
        name="SalesLiveOrder"
        component={SalesLiveOrder}
        options={({navigation}) => ({
          title: ' Sales Live Order',
          headerLeft: () => (
            <Ionicons
              name="menu"
              size={25}
              onPress={() => navigation.openDrawer()}
            />
          ),
        })}
      />
      <Drawer.Screen
        name="Customers"
        component={Customers}
        options={({navigation}) => ({
          title: 'Customers',
          headerLeft: () => (
            <Ionicons
              name="menu"
              size={25}
              onPress={() => navigation.openDrawer()}
            />
          ),
        })}
      />

      <Drawer.Screen
        name="ProcurementHomepage"
        component={CheckoutDetails}
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
      />

      <Drawer.Screen
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
      />

      <Drawer.Screen
        name="PriceAddition"
        component={PriceAddition}
        options={({navigation}) => ({
          title: 'Price Addition',
          headerLeft: () => (
            <Ionicons
              name="menu"
              size={25}
              onPress={() => navigation.openDrawer()}
            />
          ),
        })}
      />
      <Drawer.Screen
        name="Suppliers"
        component={Suppliers}
        options={({navigation}) => ({
          title: 'Suppliers',
          headerLeft: () => (
            <Ionicons
              name="menu"
              size={25}
              onPress={() => navigation.openDrawer()}
            />
          ),
        })}
      />
      <Drawer.Screen
        name="DeliveryLocation"
        component={DeliveryLocation}
        options={({navigation}) => ({
          title: 'Delivery Location',
          headerLeft: () => (
            <Ionicons
              name="menu"
              size={25}
              onPress={() => navigation.openDrawer()}
            />
          ),
        })}
      />

      <Drawer.Screen
        name="Stock"
        component={Stock}
        options={({navigation}) => ({
          title: 'Stock',
          headerLeft: () => (
            <Ionicons
              name="menu"
              size={25}
              onPress={() => navigation.openDrawer()}
            />
          ),
        })}
      />

      <Drawer.Screen
        name="OrderStatus"
        component={OrderStatus}
        options={({navigation}) => ({
          title: 'Order Status',
          headerLeft: () => (
            <Ionicons
              name="menu"
              size={25}
              onPress={() => navigation.openDrawer()}
            />
          ),
        })}
      />

      {/* Vendor */}

      <Drawer.Screen
        name="CheckoutDetails"
        component={CheckoutDetails}
        options={({navigation}) => ({
          title: 'Checkout Details',
          headerLeft: () => (
            <Ionicons
              name="menu"
              size={25}
              onPress={() => navigation.openDrawer()}
            />
          ),
        })}
      />

      <Drawer.Screen
        name="VendorsMyOrders"
        component={VendorsMyOrders}
        options={({navigation}) => ({
          title: 'My Orders',
          headerLeft: () => (
            <Ionicons
              name="menu"
              size={25}
              onPress={() => navigation.openDrawer()}
            />
          ),
        })}
      />

      <Drawer.Screen
        name="VendorHomepage"
        component={VendorHomepage}
        options={({navigation}) => ({
          title: 'Homepage',
          headerLeft: () => (
            <Ionicons
              name="menu"
              size={25}
              onPress={() => navigation.openDrawer()}
            />
          ),
        })}
      />

      <Drawer.Screen
        name="VendorOrderTracking"
        component={VendorOrderTracking}
        options={({navigation}) => ({
          title: 'Order Tracking',
          headerLeft: () => (
            <Ionicons
              name="menu"
              size={25}
              onPress={() => navigation.openDrawer()}
            />
          ),
        })}
      />
    </Drawer.Navigator>
  );
};

export default MyDrawer;
