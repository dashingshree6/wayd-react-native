import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  TouchableHighlight,
  Text,
  Pressable,
  Button,
  Alert,
  Modal,
} from 'react-native';
import {API} from '../../backend';
import axios from 'axios';
export default function SalesHomepage() {
  let url = `${API}/order/all`;
  const TOKEN =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDA3ZjRmM2VmOTRjMTAwMjQ4ODI1N2QiLCJpYXQiOjE2NzA3MTgxMDF9.ITnJjF8atFSnGl7dwBejIVLRnPantE5F8YWsW1uehHY';
  const [allOrder, setAllOrder] = useState();
  const [showLiveOrder, setShowLiveOrder] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState();

  React.useEffect(() => {
    axios
      .get(url, {headers: {Authorization: `Bearer ${TOKEN}`}})
      .then(res => {
        console.log(res.data);
        setAllOrder(res.data);
      })
      .catch(error => {
        console.log(`Error:`, error);
      });
  }, []);

  let getData = () => {
    axios
      .get(url, {headers: {Authorization: `Bearer ${TOKEN}`}})
      .then(res => {
        console.log(res.data);
        setAllOrder(res.data);
      })
      .catch(error => {
        console.log(`Error:`, error);
      });
  };

  let confirmStatus = () => {
    let url1 = `${API}/order/${selectedOrder._id}/status`;
    axios
      .put(url1, {status: 'Confirmed'})
      .then(res => {
        console.log(res.data);
      })
      .catch(error => {
        console.log(`Error:`, error);
      });
  };

  return (
    <View>
      <View>
        <TouchableHighlight
          style={styles.liveOrderBtn}
          onPress={() => {
            setShowLiveOrder(true);
            getData();
          }}>
          <Text>Live Order</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.pastOrderBtn}
          onPress={() => {
            setShowLiveOrder(false);
            getData();
          }}>
          <Text>Past Order</Text>
        </TouchableHighlight>
      </View>
      <ScrollView>
        {showLiveOrder &&
          allOrder
            ?.filter((item, index) => item.status != 'Delivered')
            .map((item, index) => (
              <>
                <View style={styles?.liveOrderCard} key={index}>
                  <Text>Order Id: {item?._id}</Text>
                  <Text>Status: {item?.status}</Text>
                  <Text>Payment: {item?.payment_status}</Text>
                  <Text>Order Date: {item?.ordered}</Text>
                  <Button
                    title="Update Order Status"
                    onPress={() => {
                      setSelectedOrder(item);
                      console.log(selectedOrder);
                      setModalVisible(true);
                    }}
                  />
                </View>
              </>
            ))}

        {!showLiveOrder &&
          allOrder
            ?.filter((item, index) => item.status == 'Delivered')
            .map((item, index) => (
              <>
                <View style={styles.liveOrderCard}>
                  <Text>Order Id: {item._id}</Text>
                  <Text>Status: {item.status}</Text>
                  <Text>Payment: {item.payment_status}</Text>
                  <Text>Order Date: {item.ordered}</Text>
                </View>
              </>
            ))}
      </ScrollView>
      <Modal animationType="slide" transparent={false} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.liveOrderCard}>
              <Text>Order Id: {selectedOrder?._id}</Text>
              <Text>Status: {selectedOrder?.status}</Text>
              <Text>Payment: {selectedOrder?.payment_status}</Text>
              <Text>Order Date: {selectedOrder?.ordered}</Text>
            </View>

            {selectedOrder?.status == 'Ordered' && (
              <Pressable
                style={styles.cancelButton}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.postStatusButtonText}>Cancel Order</Text>
              </Pressable>
            )}

            {selectedOrder?.status == 'Ordered' && (
              <Pressable
                style={styles.confirmButton}
                onPress={() => {
                  confirmStatus();
                  setModalVisible(!modalVisible);
                }}>
                <Text style={styles.postStatusButtonText}>Confirm Order</Text>
              </Pressable>
            )}

            <Pressable
              style={styles.postStatusButton}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.postStatusButtonText}>Close Button</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  liveOrderBtn: {
    padding: 10,
    backgroundColor: '#94C973',
    borderRadius: 5,
    marginTop: 10,
    marginLeft: 10,
    marginBottom: 2,
    width: 100,
  },
  pastOrderBtn: {
    padding: 10,
    backgroundColor: 'grey',
    borderRadius: 5,
    marginLeft: 10,
    marginBottom: 10,
    width: 100,
  },
  liveOrderCard: {
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    marginTop: 10,
    marginLeft: 10,
  },
  postStatusButton: {
    backgroundColor: 'black',
    padding: 10,
    width: 200,
    borderRadius: 5,
    marginTop: 10,
    marginLeft: 10,
  },
  postStatusButtonText: {
    color: 'white',
  },
  cancelButton: {
    backgroundColor: 'red',
    padding: 10,
    width: 200,
    borderRadius: 5,
    marginTop: 10,
    marginLeft: 10,
  },
  confirmButton: {
    backgroundColor: 'green',
    padding: 10,
    width: 200,
    borderRadius: 5,
    marginTop: 10,
    marginLeft: 10,
  },
});
