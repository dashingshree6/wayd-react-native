import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Button,
  Modal,
  Image,
} from 'react-native';

import {API, TOKEN} from '../../backend';
import axios from 'axios';
import salesDashImg from './salesDashImg.jpg';

export default function SalesHomepage() {
  const [allOrder, setAllOrder] = useState();
  const [showLiveOrder, setShowLiveOrder] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState();
  const [filterOrder, setFilterOrder] = useState();

  let url = `${API}/order/all`;

  React.useEffect(() => {
    axios
      .get(url, {headers: {Authorization: `Bearer ${TOKEN}`}})
      .then(res => {
        console.log(res.data);
        setAllOrder(res.data);
      })
      .catch(error => {
        console.log('Error:', error);
      });
  }, [url]);

  let getData = () => {
    console.log(
      'Api Called for Fetching new Data------------------------------',
    );
    axios
      .get(url, {headers: {Authorization: `Bearer ${TOKEN}`}})
      .then(res => {
        console.log(res.data);
        setAllOrder(res.data);
      })
      .catch(error => {
        console.log('Error:', error);
      });
  };

  let acceptOrder = e => {
    url = `${API}/order/${selectedOrder?._id}/status`;
    axios
      .put(url, {
        status: 'Accepted',
        payment_status: 'UNPAID',
        amount: 0,
      })
      .then(res => {
        getData();
      })
      .catch(error => {
        console.log('Error:', error);
      });
    setModalVisible(false);
  };

  let processOrder = e => {
    url = `${API}/order/${selectedOrder?._id}/status`;
    axios
      .put(url, {
        status: 'Processing',
        payment_status: 'UNPAID',
        amount: 0,
        delivey: '5ff9694dbc54c3002478b2de',
      })
      .then(res => {
        getData();
      })
      .catch(error => {
        console.log('Error:', error);
      });
    setModalVisible(false);
  };

  let rejectOrder = e => {
    url = `${API}/order/${selectedOrder?._id}/status`;
    axios
      .put(url, {
        status: 'Rejected',
        payment_status: 'UNPAID',
        amount: 0,
      })
      .then(res => {
        console.log(res);
        getData();
      })
      .catch(error => {
        console.log(`Error:`, error);
      });
    setModalVisible(false);
  };

  return (
    <View>
      {/* Top Hero Image */}
      <View style={styles.salesDashImgView}>
        <Image source={salesDashImg} style={styles.salesDashImg} />
      </View>
      {/* Top Tab  */}
      <View style={styles.upperTabView}>
        <TouchableOpacity
          style={styles.liveOrderBtn}
          onPress={() => {
            setShowLiveOrder(true);
            getData();
          }}>
          <Text>Live Order</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.pastOrderBtn}
          onPress={() => {
            setShowLiveOrder(false);
            getData();
          }}>
          <Text>Past Order</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.orderListView}>
        {/* Live order tab and Past Order Tab */}
        {showLiveOrder ? (
          <Text style={styles.orderTitle}>Live Order</Text>
        ) : (
          <Text style={styles.orderTitle}>Past Order</Text>
        )}
        {/* Dynamic Tab Rendering */}
        {showLiveOrder && (
          <View style={styles.tabView}>
            <TouchableOpacity
              style={styles.tab}
              onPress={e => {
                setFilterOrder(
                  allOrder?.filter((item, index) => item.status === 'Placed'),
                );
              }}>
              <Text style={styles.tabText}>Placed</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.tab}
              onPress={e => {
                setFilterOrder(
                  allOrder?.filter((item, index) => item.status === 'Accepted'),
                );
              }}>
              <Text style={styles.tabText}>Accepted</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.tab}
              onPress={e => {
                setFilterOrder(
                  allOrder?.filter(
                    (item, index) => item.status === 'Processing',
                  ),
                );
              }}>
              <Text style={styles.tabText}>Processing</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.tab}
              onPress={e => {
                setFilterOrder(
                  allOrder?.filter((item, index) => item.status === 'Shipped'),
                );
              }}>
              <Text style={styles.tabText}>Shipped</Text>
            </TouchableOpacity>
          </View>
        )}

        {!showLiveOrder && (
          <View style={styles.tabView}>
            <TouchableOpacity
              style={styles.tab}
              onPress={e => {
                setFilterOrder(
                  allOrder?.filter(
                    (item, index) => item.status === 'Delivered',
                  ),
                );
              }}>
              <Text style={styles.tabText}>Delivered</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.tab}
              onPress={e => {
                setFilterOrder(
                  allOrder?.filter(
                    (item, index) => item.status === 'Cancelled',
                  ),
                );
              }}>
              <Text style={styles.tabText}>Cancelled</Text>
            </TouchableOpacity>
          </View>
        )}

        <ScrollView>
          {showLiveOrder &&
            filterOrder?.map((item, index) => (
              <View style={styles.liveOrderCard} key={index}>
                <Text>Order Id: {item?._id}</Text>
                <Text>Status: {item?.status}</Text>
                <Text>Payment: {item?.payment_status}</Text>
                <Text>Order Date: {item?.ordered}</Text>
                <Button
                  title="Update Order Status"
                  color="black"
                  onPress={() => {
                    setSelectedOrder(item);
                    setModalVisible(true);
                  }}
                />
              </View>
            ))}

          {!showLiveOrder &&
            filterOrder?.map((item, index) => (
              <View style={styles.liveOrderCard} key={index}>
                <Text>Order Id: {item?._id}</Text>
                <Text>Status: {item?.status}</Text>
                <Text>Payment: {item?.payment_status}</Text>
                <Text>Order Date: {item?.ordered}</Text>
              </View>
            ))}
        </ScrollView>
      </View>
      {/* //////////////////////// MODAL /////////////////////////////// */}
      <Modal animationType="slide" transparent={false} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.liveOrderCard}>
              <Text>Order Id: {selectedOrder?._id}</Text>
              <Text>Status: {selectedOrder?.status}</Text>
              <Text>Payment: {selectedOrder?.payment_status}</Text>
              <Text>Order Date: {selectedOrder?.ordered}</Text>
            </View>

            <View>
              {selectedOrder?.status === 'Placed' && (
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    alignItems: 'flex-start',
                    padding: 10,
                  }}>
                  <View style={{width: 150, height: 40}}>
                    <Button
                      title="Reject Order"
                      color="red"
                      style={{width: 150, height: 40}}
                      onPress={() => {
                        rejectOrder();
                      }}
                    />
                  </View>
                  <View style={{width: 150, height: 40}}>
                    <Button
                      title="Accept Order"
                      color="green"
                      style={{width: 100, height: 40}}
                      onPress={e => {
                        acceptOrder();
                      }}
                    />
                  </View>
                </View>
              )}

              {selectedOrder?.status === 'Accepted' && (
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    alignItems: 'flex-start',
                    padding: 10,
                  }}>
                  <View style={{width: 150, height: 40}}>
                    <Button
                      title="Process Order"
                      color="green"
                      style={{width: 150, height: 40}}
                      onPress={e => {
                        processOrder();
                      }}
                    />
                  </View>
                </View>
              )}

              {selectedOrder?.status === 'Processing' && (
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    alignItems: 'flex-start',
                    padding: 10,
                  }}>
                  <View style={{width: 150, height: 40}}>
                    <Button
                      title="Assign Delivery"
                      color="green"
                      style={{width: 150, height: 40}}
                      onPress={e => {
                        processOrder();
                      }}
                    />
                  </View>
                </View>
              )}
              <View style={styles.closeBtnView}>
                <Button
                  title="Close"
                  color="black"
                  onPress={() => {
                    setModalVisible(false);
                  }}
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  upperTabView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 50,
  },
  liveOrderBtn: {
    padding: 10,
    backgroundColor: '#94C973',
    borderRadius: 5,
    marginTop: 10,
    marginLeft: 10,
    marginBottom: 2,
    width: 100,
    height: 40,
  },
  pastOrderBtn: {
    padding: 10,
    backgroundColor: '#C0C0C0',
    borderRadius: 5,
    marginTop: 10,
    marginRight: 10,
    marginBottom: 2,
    width: 100,
    height: 40,
  },
  liveOrderCard: {
    padding: 10,
    backgroundColor: '#DDFFE7',
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
    textAlign: 'center',
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
  salesDashImg: {
    height: 300,
  },
  salesDashImgView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ordersListView: {
    paddingTop: 10,
    paddingRight: 10,
    backgroundColor: '#2E8BC0',
    height: '100%',
  },
  orderTitle: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    paddingTop: 5,
    paddingBottom: 5,
  },
  orderListView: {
    marginTop: 50,
    backgroundColor: '#B1D4E0',
    height: '100%',
    paddingBottom: 10,
  },
  tabView: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-evenly',
    marginTop: 10,
  },
  tab: {
    marginBottom: 2,
    padding: 10,
    width: 90,
    height: 40,
    backgroundColor: 'black',
    borderRadius: 5,
  },
  tabText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
  },
  closeBtnView: {
    width: 100,
    height: 70,
    marginTop: 50,
    marginLeft: 150,
  },
});
