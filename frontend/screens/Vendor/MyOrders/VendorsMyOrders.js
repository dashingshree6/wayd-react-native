import { View, Text,StyleSheet } from 'react-native';
import React from 'react';
import { Tab, TabView, } from '@rneui/themed';

export default function VendorsMyOrders({navigation}) {
  const [index, setIndex] = React.useState(0);

  return (
    <View>
       <Tab
      value={index}
      onChange={(e) => setIndex(e)}
      indicatorStyle={{
        backgroundColor: 'white',
        height: 3,
      }}
      variant="primary"
    >
      <Tab.Item
        title="Live Orders"
        titleStyle={{ fontSize: 12 }}
        // icon={{ name: 'timer', type: 'ionicon', color: 'white' }}
      />
      <Tab.Item
        title="Past Orders"
        titleStyle={{ fontSize: 12 }}
        // icon={{ name: 'heart', type: 'ionicon', color: 'white' }}
      />
      {/* <Tab.Item
        title="cart"
        titleStyle={{ fontSize: 12 }}
        icon={{ name: 'cart', type: 'ionicon', color: 'white' }}
      /> */}
    </Tab>

    <TabView value={index} onChange={setIndex} animationType="spring">
      <TabView.Item style={{ backgroundColor: 'red', width: '100%' }}>
        <View style={styles.vendor_myorder_lo}>
          <Text style={styles.vendor_liveorder}>Live Order 1</Text>
        </View>
        
        
      </TabView.Item>
      <TabView.Item style={{ backgroundColor: 'blue', width: '100%' }}>
        <Text h1>Favorite</Text>
      </TabView.Item>
      <TabView.Item style={{ backgroundColor: 'green', width: '100%' }}>
        <Text h1>Cart</Text>
      </TabView.Item>
    </TabView>
    </View>
  )
}

const styles = StyleSheet.create({
  vendor_myorder_lo: {
    backgroundColor:'silver',
    padding: 10,
    height: 60
  },
  vendor_liveorder: {
    fontWeight:'bold',
    color:'black'
  },
  });