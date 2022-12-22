import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Icon, Input, Button, Text, ListItem, Tab, TabView} from '@rneui/themed';
import axios from 'axios';

const API =
  'https://5602-49-205-239-58.in.ngrok.io/api/orders/user/5ffc2229a70cf50024a4e3cb';
// const API = 'https://5602-49-205-239-58.in.ngrok.io/api/order/all'
const TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDA3ZjRmM2VmOTRjMTAwMjQ4ODI1N2QiLCJpYXQiOjE2NzA3MTgxMDF9.ITnJjF8atFSnGl7dwBejIVLRnPantE5F8YWsW1uehHY';

const Item = props => (
  <TouchableOpacity
    style={styles.sales_live_button}
    // onPress={onPress}
  >
    <View
    // style={styles.item}
    >
      <Text style={styles.title}>Id: {props.order._id} </Text>
      <Text style={styles.title}>Order Status: {props.order.status}</Text>
    </View>
  </TouchableOpacity>
);

export default function VendorsMyOrders({navigation, route}) {
  const [index, setIndex] = React.useState(0);
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = useState(true);
  const [liveOrdersDisplay, setLiveOrdersDisplay] = useState(true);
  const renderItem = ({item}) => <Item order={item} />;
  const getUserOrdersList = () => {
    axios
      .get(API, {headers: {Authorization: `Bearer ${TOKEN}`}})
      .then(res => {
        console.log(res.data);
        setData(res.data);
      })
      .catch(error => {
        console.log(error);
      });
  };
  //call useeffect outside function****
  useEffect(() => {
    getUserOrdersList();
  }, []);

  return (
    // <View>
    //   <Tab
    //     value={index}
    //     onChange={e => setIndex(e)}
    //     indicatorStyle={{
    //       backgroundColor: 'white',
    //       height: 3,
    //     }}
    //     variant="primary">
    //     <Tab.Item
    //       title="Live Orders"
    //       titleStyle={{fontSize: 12}}
    //       // icon={{ name: 'timer', type: 'ionicon', color: 'white' }}
    //     />
    //     <Tab.Item
    //       title="Past Orders"
    //       titleStyle={{fontSize: 12}}
    //       // icon={{ name: 'heart', type: 'ionicon', color: 'white' }}
    //     />
    //     {/* <Tab.Item
    //     title="cart"
    //     titleStyle={{ fontSize: 12 }}
    //     icon={{ name: 'cart', type: 'ionicon', color: 'white' }}
    //   /> */}
    //   </Tab>

    //   <TabView value={index} onChange={setIndex} animationType="spring">
    //     <TabView.Item style={{backgroundColor: 'red', width: '100%'}}>
    //       {/* <View>
    //         {data.map(post => {
    //           return (
    //             <View>
    //               <Text style={styles.vendor_liveorder}>{post.status}</Text>
    //             </View>
    //           );
    //         })}
    //       </View> */}
    //     </TabView.Item>
    //     <TabView.Item style={{backgroundColor: 'blue', width: '100%'}}>
    //       <Text h1>Favorite</Text>
    //     </TabView.Item>
    //     <TabView.Item style={{backgroundColor: 'green', width: '100%'}}>
    //       <Text h1>Cart</Text>
    //     </TabView.Item>
    //   </TabView>
    // </View>

    <View style={styles.sales_cont}>
      <View style={styles.sales_btn}></View>
      <Tab
        value={index}
        onChange={e => {
          setIndex(e);
          setLiveOrdersDisplay(!liveOrdersDisplay);
        }}
        indicatorStyle={{
          backgroundColor: 'white',
          height: 3,
        }}
        variant="primary">
        <Tab.Item
          title="Live Orders"
          titleStyle={{fontSize: 12}}
          // icon={{ name: 'timer', type: 'ionicon', color: 'white' }}
        />
        <Tab.Item
          title="Past Orders"
          titleStyle={{fontSize: 12}}
          // icon={{ name: 'heart', type: 'ionicon', color: 'white' }}
        />
      </Tab>

      {/* <TabView value={index} onChange={setIndex} animationType="spring">
      <TabView.Item style={{ backgroundColor: 'red', width: '100%' }}>
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </TabView.Item>
      <TabView.Item style={{ backgroundColor: 'blue', width: '100%' }}>
        <Text h1>Favorite</Text>
      </TabView.Item>
  </TabView> */}
      {liveOrdersDisplay ? (
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item._id}
        />
      ) : (
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item._id}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  vendor_myorder_lo: {
    backgroundColor: 'silver',
    padding: 10,
    height: 60,
  },
  vendor_liveorder: {
    fontWeight: 'bold',
    color: 'black',
  },
});
