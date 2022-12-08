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
// import Login from './screens/Login/Login';
// import SalesHomepage from './screens/Admin/SalesHomepage/SalesHomepage';
// import SalesLiveOrder from './screens/Admin/SalesLiveOrder/SalesLiveOrder';
// import Customers from './screens/Admin/Customers/Customers';
// import ProcurementHomepage from './screens/Admin/ProcurementHomepage/ProcurementHomepage';
// import ProductDetails from './screens/Admin/ProductDetails/ProductDetails';
// import Suppliers from './screens/Admin/Suppliers/Suppliers';
//
import { Icon } from '@rneui/themed';
import Ionicons from "react-native-vector-icons/Ionicons";


function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Close drawer"
        onPress={() => props.navigation.closeDrawer()}
      />
      <DrawerItem
        label="Toggle drawer"
        onPress={() => props.navigation.toggleDrawer()}
      />
    </DrawerContentScrollView>
  );
}

const Drawer = createDrawerNavigator();

const MyDrawer = () => {
  return (
    <Drawer.Navigator
      useLegacyImplementation
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
                <Drawer.Screen
                  name="Login"
                  component={Login}
                  // options={{ title: 'Homepage' }}
                  options={{
                    headerShown: false,
                  }}

                />
                <Drawer.Screen
                  name="SalesHomepage"
                  component={SalesHomepage}
                  options={{
                    title: ' Sales Homepage'
                    // headerLeft: <Icon name='menu' size={24} color='white'
                    // onPress={()=> navigation.toggleDrawer()}
                    // />,

                  }}
                />
                <Drawer.Screen
                  name="SalesLiveOrder"
                  component={SalesLiveOrder}
                  options={{
                    title: ' Sales Live Order'
                    // headerLeft: <Icon name='menu' size={24} color='white'
                    // onPress={()=> navigation.toggleDrawer()}
                    // />,

                  }}
                />
                <Drawer.Screen
                  name="Customers"
                  component={Customers}
                  options={{
                    title: 'Customers'
                    // headerLeft: <Icon name='menu' size={24} color='white'
                    // onPress={()=> navigation.toggleDrawer()}
                    // />,

                  }}
                />
                <Drawer.Screen
                  name="ProcurementHomepage"
                  component={ProcurementHomepage}
                  options={{
                    title: 'Procurement Homepage'
                    // headerLeft: <Icon name='menu' size={24} color='white'
                    // onPress={()=> navigation.toggleDrawer()}
                    // />,

                  }}
                />
                <Drawer.Screen
                  name="ProductDetails"
                  component={ProductDetails}
                  options={{
                    title: 'Product Details'
                    // headerLeft: <Icon name='menu' size={24} color='white'
                    // onPress={()=> navigation.toggleDrawer()}
                    // />,

                  }}
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