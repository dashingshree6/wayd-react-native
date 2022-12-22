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
  Alert,
} from 'react-native';

import {API, TOKEN} from '../../backend';
import axios from 'axios';
import salesDashImg from './salesDashImg.jpg';
import modalImg from './modalImg.jpg';
import {SelectList} from 'react-native-dropdown-select-list';
import SyncStorage from 'sync-storage';

export default function SalesHomepage() {
  const [allOrder, setAllOrder] = useState();
  const [showLiveOrder, setShowLiveOrder] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(
    allOrder?.filter((item, index) => item.status === 'Placed'),
  );
  const [filterOrder, setFilterOrder] = useState();
  const [filterPastOrder, setFilterPastOrder] = useState();
  const [fetchTrigger, setFetchTrigger] = useState();
  const [allDelivery, setAllDelivery] = useState();
  const [selectedDelivery, setSelectedDelivery] = React.useState();
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

  React.useEffect(() => {
    const userDetail = SyncStorage.get('userDetail');
    setSyncStorageState(userDetail);
  }, []);

  React.useEffect(() => {
    let allOrderAPI = `${API}/order/all`;
    axios
      .get(allOrderAPI, {
        headers: {Authorization: `Bearer ${syncStorageState.token}`},
      })
      .then(res => {
        setAllOrder(res.data);
      })
      .catch(error => {
        console.log('Error:', error);
      });

    // all user api call
    let allUserAPI = `${API}/users`;
    axios
      .get(allUserAPI, {
        headers: {Authorization: `Bearer ${syncStorageState.token}`},
      })
      .then(res => {
        setAllDelivery(res.data.filter((item, index) => item.role == '2'));
      })
      .catch(error => {
        console.log('Error:', error);
      });
  }, [fetchTrigger, syncStorageState]);

  const data = allDelivery?.map((item, index) => ({
    key: `${index + 1}`,
    value: `${item.username}`,
    disabled: false,
  }));
  let getData = () => {
    setFetchTrigger(Math.floor(Math.random() * 100000));
  };

  let acceptOrder = e => {
    let url = `${API}/order/${selectedOrder._id}/status`;
    console.log(syncStorageState.token);
    console.log(url);
    axios
      .put(
        url,

        {
          status: 'Accepted',
          payment_status: 'UNPAID',
          amount: 0,
        },
        {
          headers: {Authorization: `Bearer ${TOKEN}`},
        },
      )
      .then(res => {
        getData();
        alert(`Order Accepted Successfully`);
        setModalVisible(false);
      })
      .catch(error => {
        Alert(`error`);
        console.log('Error:', error);
      });
  };

  let processOrder = e => {
    let url = `${API}/order/${selectedOrder?._id}/status`;
    axios
      .put(
        url,
        {
          status: 'Processing',
          payment_status: 'UNPAID',
          amount: 0,
        },
        {
          headers: {Authorization: `Bearer ${TOKEN}`},
        },
      )
      .then(res => {
        getData();
        alert(`Order Processed Successfully`);
        setModalVisible(false);
      })
      .catch(error => {
        console.log('Error:', error);
      });
  };

  let rejectOrder = e => {
    let url = `${API}/order/${selectedOrder?._id}/status`;
    console.log(url);
    axios
      .put(
        url,
        {
          status: 'Cancelled',
          payment_status: 'UNPAID',
          amount: 0,
        },
        {
          headers: {Authorization: `Bearer ${TOKEN}`},
        },
      )
      .then(res => {
        alert(`Order Shipped Successfully`);
        getData();
        setModalVisible(false);
      })
      .catch(error => {
        console.log(`Error:`, error);
      });
  };
  let shipProduct = e => {
    let url = `${API}/assigndelivery/${selectedOrder?._id}`;
    console.log(`----url---`, url);
    let body = {
      amount: 0,
      delivery: selectedDelivery[0]._id,
      payment_status: 'UNPAID',
      status: 'Shipped',
    };

    axios
      .put(url, body, {
        headers: {Authorization: `Bearer ${syncStorageState.token}`},
      })
      .then(res => {
        console.log(`------shipper details`, res.data);
        alert(`Order Shipped`);
        getData();
        setModalVisible(false);
      })
      .catch(error => {
        alert(`Error`);
        console.log(`Error:`, error);
      });
  };

  return (
    <View style={{flex: 1}}>
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
            setFilterPastOrder(
              allOrder?.filter((item, index) => item.status === 'Delivered'),
            );
          }}>
          <Text style={{fontFamily: 'Poppins'}}>Live Order</Text>
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
                getData();
                setFilterOrder(
                  allOrder?.filter((item, index) => item.status === 'Accepted'),
                );
              }}>
              <Text style={styles.tabText}>Accepted</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.tab}
              onPress={e => {
                getData();
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
                getData();
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
                getData();
                setFilterPastOrder(
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
                setFilterPastOrder(
                  allOrder?.filter(
                    (item, index) => item.status === 'Cancelled',
                  ),
                );
              }}>
              <Text style={styles.tabText}>Cancelled</Text>
            </TouchableOpacity>
          </View>
        )}
        <View style={{flex: 1}}>
          <ScrollView
            style={{
              paddingRight: 10,
              paddingBottom: 50,
              marginBottom: 140,
              marginTop: 20,
              paddingTop: 10,
              backgroundColor: '#f2f2f2',
            }}>
            {showLiveOrder &&
              filterOrder?.map((item, index) => (
                <View style={styles.liveOrderCard} key={index}>
                  <Text>Order Id: {item?._id}</Text>
                  <Text>Status: {item?.status}</Text>
                  <Text>Payment: {item?.payment_status}</Text>
                  <Text>Order Date: {item?.ordered}</Text>
                  <Button
                    title="Update Order Status"
                    color="#26b50f"
                    onPress={() => {
                      setSelectedOrder(item);
                      setModalVisible(true);
                    }}
                  />
                </View>
              ))}

            {!showLiveOrder &&
              filterPastOrder?.map((item, index) => (
                <View style={styles.liveOrderCard} key={index}>
                  <Text>Order Id: {item?._id}</Text>
                  <Text>Status: {item?.status}</Text>
                  <Text>Payment: {item?.payment_status}</Text>
                  <Text>Order Date: {item?.ordered}</Text>
                </View>
              ))}
          </ScrollView>
        </View>
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
              {selectedDelivery && (
                <Text>
                  {selectedDelivery[0].username}: {selectedDelivery[0]._id}
                </Text>
              )}
            </View>

            <View>
              {selectedOrder?.status === 'Placed' && (
                <>
                  <View style={styles.buttonView}>
                    {/* <Image source={modalImg} /> */}
                    <View style={styles.buttonInnerView}>
                      <Button
                        title="Reject Order"
                        color="red"
                        style={styles.buttonInnerView}
                        onPress={() => {
                          rejectOrder();
                        }}
                      />
                    </View>
                    <View style={styles.buttonInnerView}>
                      <Button
                        title="Accept Order"
                        color="green"
                        style={styles.buttonInnerView}
                        onPress={e => {
                          acceptOrder();
                        }}
                      />
                    </View>
                  </View>
                </>
              )}

              {selectedOrder?.status === 'Accepted' && (
                <View style={styles.buttonView}>
                  <View style={styles.buttonInnerView}>
                    <Button
                      title="Process Order"
                      color="green"
                      style={styles.buttonInnerView}
                      onPress={e => {
                        processOrder();
                      }}
                    />
                  </View>
                </View>
              )}

              {selectedOrder?.status === 'Processing' && (
                <ScrollView>
                  <SelectList
                    setSelected={val =>
                      setSelectedDelivery(
                        allDelivery.filter(
                          (item, index) => item.username == val,
                        ),
                      )
                    }
                    data={data}
                    save="value"
                    onSelect={() =>
                      alert(`Shipper ${selectedDelivery[0].username} selected`)
                    }
                    boxStyles={{margin: 10}}
                    dropdownStyles={{margin: 10}}
                  />

                  <View style={styles.buttonView}>
                    <View style={styles.buttonInnerView}>
                      <Button
                        title="Ship Order"
                        color="green"
                        style={styles.buttonInnerView}
                        onPress={e => {
                          shipProduct();
                        }}
                      />
                    </View>
                  </View>
                </ScrollView>
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
  scrollViewParent: {paddingTop: 20},

  buttonInnerView: {
    width: 150,
    height: 40,
  },
  buttonView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'flex-start',
    padding: 10,
  },
  liveOrderBtn: {
    padding: 10,
    backgroundColor: '#26b50f',
    borderRadius: 5,
    marginTop: 10,
    marginLeft: 10,
    marginBottom: 2,
    width: 100,
    height: 40,
  },
  pastOrderBtn: {
    padding: 10,
    backgroundColor: '#f10606',
    borderRadius: 5,
    marginTop: 10,
    marginRight: 10,
    marginBottom: 2,
    width: 100,
    height: 40,
  },
  liveOrderCard: {
    padding: 10,
    backgroundColor: '#ffffff',
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 20,
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

  orderTitle: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    paddingTop: 5,
    paddingBottom: 5,
  },
  orderListView: {
    marginTop: 50,
    backgroundColor: '#f2f2f2',
    height: '100%',
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
