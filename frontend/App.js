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
  View,
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

const Stack = createNativeStackNavigator();


//Screens
import Login from './screens/Login/Login'
import SalesHomepage from './screens/Admin/SalesHomepage/SalesHomepage';
import SalesLiveOrder from './screens/Admin/SalesLiveOrder/SalesLiveOrder';
import Customers from './screens/Admin/Customers/Customers';
import ProcurementHomepage from './screens/Admin/ProcurementHomepage/ProcurementHomepage';
import ProductDetails from './screens/Admin/ProductDetails/ProductDetails';
import Suppliers from './screens/Admin/Suppliers/Suppliers';
//
import { Icon } from '@rneui/themed';

// const App: () => Node = () => {
const App = ({navigation}) => {
  return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Suppliers'>
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
                    title: ' Sales Homepage'
                    // headerLeft: <Icon name='menu' size={24} color='white'
                    // onPress={()=> navigation.toggleDrawer()}
                    // />,

                  }}
                />
                <Stack.Screen
                  name="SalesLiveOrder"
                  component={SalesLiveOrder}
                  options={{
                    title: ' Sales Live Order'
                    // headerLeft: <Icon name='menu' size={24} color='white'
                    // onPress={()=> navigation.toggleDrawer()}
                    // />,

                  }}
                />
                <Stack.Screen
                  name="Customers"
                  component={Customers}
                  options={{
                    title: 'Customers'
                    // headerLeft: <Icon name='menu' size={24} color='white'
                    // onPress={()=> navigation.toggleDrawer()}
                    // />,

                  }}
                />
                <Stack.Screen
                  name="ProcurementHomepage"
                  component={ProcurementHomepage}
                  options={{
                    title: 'Procurement Homepage'
                    // headerLeft: <Icon name='menu' size={24} color='white'
                    // onPress={()=> navigation.toggleDrawer()}
                    // />,

                  }}
                />
                <Stack.Screen
                  name="ProductDetails"
                  component={ProductDetails}
                  options={{
                    title: 'Product Details'
                    // headerLeft: <Icon name='menu' size={24} color='white'
                    // onPress={()=> navigation.toggleDrawer()}
                    // />,

                  }}
                />
                <Stack.Screen
                  name="Suppliers"
                  component={Suppliers}
                  options={{
                    title: 'Suppliers'
                    // headerLeft: <Icon name='menu' size={24} color='white'
                    // onPress={()=> navigation.toggleDrawer()}
                    // />,

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
