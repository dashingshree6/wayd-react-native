import {Button} from '@rneui/base';
import axios from 'axios';
import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, Text, View, Modal} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {API, TOKEN} from '../backend';
import SyncStorage from 'sync-storage';

export default function DeliveryHomepage({navigation, route}) {
  const [selectedOrder, setSelectedOrder] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [apiTrigger, setApiTrigger] = useState(0);
  const [syncStorageState, setSyncStorageState] = useState({
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
  const [allOrders, setAllOrders] = useState();
  const [showLiveOrder, setShowLiveOrder] = useState(true);
  const [liveOrder, setLiveOrder] = useState();
  const [pastOrder, setPastOrder] = useState();

  React.useEffect(() => {
    const userDetail = SyncStorage.get('userDetail');
    setSyncStorageState(userDetail);
  }, []);

  React.useEffect(() => {
    let url = `${API}/orders/delivery/${syncStorageState.user._id}`;
    console.log(`url`, url);
    axios
      .get(url, {headers: {Authorization: `Bearer ${syncStorageState.token}`}})
      .then(res => {
        setAllOrders([res.data]);
        console.log(`----all orders`, allOrders);
        setLiveOrder(allOrders.filter(order => order.status == 'Shipped'));
        setPastOrder(allOrders.filter(order => order.status == 'Delivered'));
      })
      .catch(error => {
        console.log(error);
      });
  }, [apiTrigger, syncStorageState]);

  let updateDeliveryStatus = () => {
    let url = `${API}/deivery/updatestatus/${selectedOrder?._id}`;
    axios
      .put(
        url,
        {
          status: 'Delivered',
          payment_status: 'UNPAID',
          amount: 0,
        },
        {headers: {Authorization: `Bearer ${TOKEN}`}},
      )
      .then(res => {
        alert(`Marked Successfully as Delivered`);
        apiTriggerFn();
        setModalVisible(false);
      })
      .catch(error => {
        console.log(error);
      });
  };
  let apiTriggerFn = () => {
    setApiTrigger(Math.floor(Math.random() * 10000));
  };

  return (
    <SafeAreaView>
      <View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            padding: 10,
          }}>
          <View style={{width: 150, height: 50, marginTop: 100}}>
            <Button
              title="Live Order"
              onPress={() => {
                setApiTrigger();
                setShowLiveOrder(true);
              }}
            />
          </View>
          <View style={{width: 150, height: 50, marginTop: 100}}>
            <Button
              title="Delivered Order"
              color="grey"
              onPress={() => {
                setApiTrigger();
                setShowLiveOrder(false);
              }}
            />
          </View>
        </View>
        {showLiveOrder && <Text style={styles.titlePage}>Live Orders</Text>}
        {!showLiveOrder && <Text style={styles.titlePage}>Past Orders</Text>}
        <ScrollView>
          {showLiveOrder &&
            liveOrder?.map((item, index) => (
              <View style={styles.deliveryOrderCard} key={index}>
                <Text>Order ID: {item.status}</Text>
                <Text>Order ID: {item._id}</Text>
                <Text>Payment Status : {item.payment_status}</Text>
                <Text>Customer Name: {item.user.username}</Text>
                <Text>Customer Name: {item.user.phone_number}</Text>
                <Text>
                  Delivery Id:
                  {item.delivery
                    ? item.delivery
                    : `Old Order without Delivery partner`}
                </Text>
                {item.status === 'Shipped' && (
                  <View style={{marginTop: 10}}>
                    <Button
                      color="black"
                      title="Update Delivery Status"
                      onPress={() => {
                        setModalVisible(true);
                        setSelectedOrder(item);
                      }}
                    />
                  </View>
                )}
              </View>
            ))}

          {!showLiveOrder &&
            pastOrder?.map((item, index) => (
              <View style={styles.deliveryOrderCard} key={index}>
                <Text>Order ID: {item.status}</Text>
                <Text>Order ID: {item._id}</Text>
                <Text>Payment Status : {item.payment_status}</Text>
                <Text>Customer Name: {item.user.username}</Text>
                <Text>Customer Name: {item.user.phone_number}</Text>
                <Text>
                  Delivery Id:
                  {item.delivery
                    ? item.delivery
                    : `Old Order without Delivery partner`}
                </Text>
                {item.status === 'Shipped' && (
                  <View style={{marginTop: 10}}>
                    <Button
                      color="black"
                      title="Update Delivery Status"
                      onPress={() => {
                        setModalVisible(true);
                        setSelectedOrder(item);
                      }}
                    />
                  </View>
                )}
              </View>
            ))}
        </ScrollView>
      </View>
      {/* ////// MODAL /////// */}
      <Modal animationType="slide" transparent={false} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.modalCard}>
              <Text>Order ID: {selectedOrder?.status}</Text>
              <Text>Order ID: {selectedOrder?._id}</Text>
              <Text>Payment Status : {selectedOrder?.payment_status}</Text>

              <Text>Customer Name: {selectedOrder?.user.username}</Text>
              <Text>Customer Name: {selectedOrder?.user.phone_number}</Text>
              <Text>Delivery Id: {selectedOrder?.delivery}</Text>
            </View>
            <View style={styles.modalButtonView}>
              <View style={styles.modalButton}>
                <Button
                  title="Close"
                  onPress={() => {
                    apiTriggerFn();
                    setModalVisible(false);
                  }}
                  color="black"
                />
              </View>
              <View style={styles.modalButton}>
                <Button
                  title="Mark as Delivered"
                  onPress={() => {
                    updateDeliveryStatus();
                  }}
                  color="green"
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  deliveryOrderCard: {
    padding: 20,
    backgroundColor: '#E7D2CC',
    borderRadius: 10,
    margin: 10,
  },
  titlePage: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 20,
    marginTop: 50,
  },
  modalCard: {
    backgroundColor: '#E7D2CC',
    margin: 10,
    padding: 10,
    borderRadius: 5,
  },

  modalButtonView: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 40,
  },
  modalButton: {
    width: 150,
    height: 50,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 10,
  },
});
