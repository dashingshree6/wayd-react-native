import {
  StyleSheet,
  View,
  TouchableOpacity,
  TouchableHighlight,
  Text,
  Button,
} from 'react-native';
import React from 'react';
import axios from 'axios';
import {API, TOKEN} from '../../backend';
import SyncStorage from 'sync-storage';

export default function VendorsMyOrders({navigation, route}) {
  const [data, setData] = React.useState([]);
  const [liveOrder, setLiveOrder] = React.useState([]);
  const [pastOrder, setPastOrder] = React.useState([]);
  const [showLiveorder, setShowLiveOrder] = React.useState(true);
  const [syncStorageState, setSyncStorageState] = React.useState({
    token: '',
    user: {
      _id: '',
      username: '',
      phone_number: 3490579639,
      location: '',
      email: '',
      role: 2,
    },
  });

  React.useEffect(() => {
    const userDetail = SyncStorage.get('userDetail');
    setSyncStorageState(userDetail);
  }, []);

  React.useEffect(() => {
    let liveOrderArr = data?.filter(
      (item, index) => item.status != 'Delivered',
    );
    setLiveOrder(liveOrderArr);
    let pastOrderArr = data?.filter(
      (item, index) => item.status == 'Delivered',
    );
    setPastOrder(pastOrderArr);
  }, [data]);

  React.useEffect(() => {
    const url = `${API}/orders/user/${syncStorageState?.user?._id}`;
    console.log(url);
    console.log(syncStorageState.token);
    axios
      .get(url, {headers: {Authorization: `Bearer ${syncStorageState.token}`}})
      .then(res => {
        setData(res.data);
      })
      .catch(error => {
        console.log(`Error:`, error);
      });
  }, [syncStorageState]);

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
                  <TouchableOpacity
                    onPress={() => {
                      alert(`click`);
                    }}>
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
                      <Button
                        onPress={() => {
                          alert(`PDF`);
                        }}
                        title="Invoice"
                        color="#841584"
                      />
                    </View>
                  </TouchableOpacity>
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
