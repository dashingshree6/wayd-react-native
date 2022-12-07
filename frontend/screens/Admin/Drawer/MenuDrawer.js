import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

// Screens
import SalesHomepage from './screens/Admin/SalesHomepage/SalesHomepage';
import SalesLiveOrder from './screens/Admin/SalesLiveOrder/SalesLiveOrder';
import Customers from './screens/Admin/Customers/Customers';
//


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

const MenuDrawer = () => {
  return (
    <Drawer.Navigator
      useLegacyImplementation
    //   drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
                <Drawer.Screen
                  name="Login"
                  component={Login}
                />
                <Drawer.Screen
                  name="SalesHomepage"
                  component={SalesHomepage}
                />
                <Drawer.Screen
                  name="SalesLiveOrder"
                  component={SalesLiveOrder}
                />
                <Drawer.Screen
                  name="Customers"
                  component={Customers}
                />
    </Drawer.Navigator>
  );
}

export default MenuDrawer;