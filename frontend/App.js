import React, {useEffect} from 'react';
// import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
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

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

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
import {Icon} from '@rneui/themed';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DeliveryHomepage from './screens/Delivery/DeliveryHomepage';
import SyncStorage from 'sync-storage';

import {setAuthToken, isAuthenticated} from './screens/Login';

const Stack = createNativeStackNavigator();
// const App: () => Node = () => {
const App = () => {
  useEffect(() => {
    // setAuthToken(SyncStorage.get("jwt"))
    setAuthToken(isAuthenticated().token);
  });

  return (
    <NavigationContainer>
      <MyDrawer />
    </NavigationContainer>
  );
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
