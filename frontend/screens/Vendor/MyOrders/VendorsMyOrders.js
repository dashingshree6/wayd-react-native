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
  TouchableHighlight,
  Text,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';

const API =
  'https://0c63-49-205-239-58.in.ngrok.io/api/orders/user/5ffc2229a70cf50024a4e3cb';

const TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDA3ZjRmM2VmOTRjMTAwMjQ4ODI1N2QiLCJpYXQiOjE2NzA3MTgxMDF9.ITnJjF8atFSnGl7dwBejIVLRnPantE5F8YWsW1uehHY';

export default function VendorsMyOrders({navigation, route}) {
  const [data, setData] = React.useState([]);
  const [liveOrder, setLiveOrder] = React.useState([]);
  const [pastOrder, setPastOrder] = React.useState([]);
  const [showLiveorder, setShowLiveOrder] = React.useState(true);

  React.useEffect(() => {
    let liveOrderArr = data.filter((item, index) => item.status != 'Delivered');
    setLiveOrder(liveOrderArr);
    let pastOrderArr = data.filter((item, index) => item.status == 'Delivered');
    setPastOrder(pastOrderArr);
  }, [data]);

  console.log(`PAST ORDER ---------------`, pastOrder);

  React.useEffect(() => {
    axios
      .get(API, {headers: {Authorization: `Bearer ${TOKEN}`}})
      .then(res => {
        setData(res.data);
      })
      .catch(error => {
        console.log(`Error:`, error);
      });
  }, []);

  return (
    <View style={styles.sales_cont}>
      <TouchableHighlight
        style={styles.liveOrder}
        onPress={() => {
          setShowLiveOrder(true);
        }}>
        <Text style={styles.liveOrderHeading}>Live Orders</Text>
      </TouchableHighlight>
      <TouchableHighlight
        style={styles.pastOrder}
        onPress={() => {
          setShowLiveOrder(false);
        }}>
        <Text style={styles.pastOrderHeading}>Past Orders</Text>
      </TouchableHighlight>

      <View>
        {showLiveorder &&
          liveOrder.map((item, index) => {
            return (
              <>
                {item.status != 'Delivered' && (
                  <View style={styles.orderCards}>
                    <Text>
                      <Text style={styles.cardTitle}>Order Id : </Text>

                      {item.user._id}
                    </Text>
                    <Text>
                      <Text style={styles.cardTitle}>Delivery Status :</Text>
                      {item.status}
                    </Text>

                    <Text>Rs.{item.products.cost}/-</Text>
                    {item.products.details.map((elem, index) => (
                      <Text>{elem.name}</Text>
                    ))}
                  </View>
                )}
              </>
            );
          })}

        {!showLiveorder &&
          pastOrder.map((item, index) => {
            return (
              <>
                <View style={styles.orderCards}>
                  <Text>
                    <Text style={styles.cardTitle}>Order Id : </Text>

                    {item.user._id}
                  </Text>
                  <Text>
                    <Text style={styles.cardTitle}>Delivery Status :</Text>
                    {item.status}
                  </Text>
                  <Text>Order Date: {item.ordered}</Text>
                  <Text>Delivered on: {item.delivered}</Text>
                  <Text>Rs.{item.products.cost}/-</Text>
                  <View>
                    {item.products.details.map((elem, index) => (
                      <Text>{elem.name}</Text>
                    ))}
                  </View>
                </View>
              </>
            );
          })}
      </View>
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
  orderList: {
    backgroundColor: 'silver',
    margin: 2,
  },
  orderListView: {
    margin: 20,
  },
  orderListHeading: {
    backgroundColor: 'green',
  },
  liveOrder: {
    marginTop: 10,
    backgroundColor: '#116530',
    width: 100,
    height: 40,
    borderRadius: 20,
  },
  liveOrderHeading: {
    textAlign: 'center',
    margin: 10,
    fontWeight: 'bold',
    fontSize: 14,
    color: 'white',
  },
  pastOrder: {
    marginTop: 10,
    backgroundColor: '#FF7F50',
    width: 100,
    height: 40,
    borderRadius: 20,
  },
  pastOrderHeading: {
    textAlign: 'center',
    margin: 10,
    fontWeight: 'bold',
    fontSize: 14,
    color: 'white',
  },
  orderCards: {
    margin: 10,
    backgroundColor: '#F9F1F0',
    padding: 10,
  },
  cardTitle: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
  },
  itemList: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});
