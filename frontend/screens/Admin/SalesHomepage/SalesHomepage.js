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
import foodImg from '../../../assets/images/food.jpg';

import {SelectList} from 'react-native-dropdown-select-list';
import SyncStorage from 'sync-storage';

export default function SalesHomepage() {
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

  React.useEffect(() => {
    let allOrderAPI = `${API}/order/all`;
    console.log(
      `-------token-----------------------------`,
      syncStorageState?.token,
    );
    axios
      .get(allOrderAPI, {
        headers: {Authorization: `Bearer ${syncStorageState?.token}`},
      })
      .then(res => {
        setAllOrder(res.data);
        console.log(`--all order`, allOrder);
      })
      .catch(error => {
        console.log('Error:', error);
      });
    // all user api call
    let allUserAPI = `${API}/users`;
    axios
      .get(allUserAPI, {
        headers: {Authorization: `Bearer ${syncStorageState?.token}`},
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

  let pastButtonColor = showLiveOrder ? 'grey' : 'black';
  let activeButtonColor = !showLiveOrder ? 'grey' : 'black';
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      {/* Top Tab  */}
      <View style={styles.upperTabView}>
        <TouchableOpacity
          style={[styles.liveOrderBtn]}
          onPress={() => {
            setShowLiveOrder(true);
            getData();
            setFilterPastOrder(
              allOrder?.filter((item, index) => item.status === 'Delivered'),
            );
          }}>
          <Text
            style={{
              textAlign: 'center',
              color: activeButtonColor,
              fontSize: 18,
            }}>
            Active Order
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.pastOrderBtn]}
          onPress={() => {
            setShowLiveOrder(false);
            getData();
          }}>
          <Text
            style={{textAlign: 'center', color: pastButtonColor, fontSize: 18}}>
            Past Order
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.orderListView}>
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
              backgroundColor: 'white',
            }}>
            {showLiveOrder &&
              filterOrder?.map((item, index) => (
                <View style={styles.orderCard} key={index}>
                  <View style={styles.firstRowCard}>
                    <View
                      style={{
                        width: 50,
                        height: 50,
                        backgroundColor: 'white',
                      }}>
                      <Image
                        source={foodImg}
                        style={{
                          resizeMode: 'cover',
                          width: 50,
                          height: 50,
                          borderRadius: 50,
                        }}
                      />
                    </View>
                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        paddingLeft: 10,
                        paddingRigt: 5,
                      }}>
                      <View>
                        <Text
                          style={{
                            fontSize: 18,
                            color: 'black',
                          }}>
                          {item.user.username
                            ? item.user.username
                            : 'Admin Order'}
                        </Text>
                        <Text
                          style={{
                            fontSize: 13,
                            fontWeight: 'bold',
                            color: '#979797',
                          }}>
                          {item?.user?.address?.area
                            ? `${item.user.address.area}, India`
                            : 'Address Not Found'}
                        </Text>
                      </View>
                      <View style={{padding: 5, backgroundColor: '#dfdfdf'}}>
                        <Text style={{color: '#696969'}}>{item.status}</Text>
                      </View>
                    </View>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'column',
                      borderBottomWidth: 0.5,
                      borderColor: '#696969',
                      borderStyle: 'dashed',
                      margin: 10,
                      paddingBottom: 10,
                    }}>
                    {item.products.details.map((elem, index) => (
                      <View
                        style={{
                          flex: 1,
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}
                        key={index}>
                        <Text
                          style={{
                            fontWeight: 'bold',
                            color: '#3B3B3B',
                            fontSize: 13,
                          }}>
                          {`${index + 1}) ${elem.name} x `}
                        </Text>
                        <Text style={{fontWeight: 'bold'}}>
                          {elem.Selectedquantity} Kg
                        </Text>
                      </View>
                    ))}
                  </View>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      margin: 10,
                    }}>
                    <Text style={{fontSize: 12}}>
                      {item.status == 'Placed'
                        ? `Placed on ${item.createdAt.slice(
                            8,
                            10,
                          )}-${item.createdAt.slice(
                            5,
                            7,
                          )}-${item.createdAt.slice(
                            0,
                            4,
                          )} at ${item.createdAt.slice(12, 16)}  ${
                            item.createdAt.charAt(12) <= 11 ? `AM` : `PM`
                          }`
                        : `Placed data not available`}
                    </Text>
                    <Text style={{fontWeight: 'bold', color: '#3B3B3B'}}>
                      ₹ {item.products.cost}
                    </Text>
                  </View>

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
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: 20,
  },
  scrollViewParent: {paddingTop: 20},
  liveOrderBtn: {
    padding: 10,
    width: '50%',
    height: 40,

    backgroundColor: 'white',
  },
  pastOrderBtn: {
    padding: 10,
    width: '50%',
    height: 40,
    backgroundColor: 'white',
  },
  orderCard: {
    backgroundColor: 'white',
    borderRadius: 20,
    margin: 10,
    borderWidth: 1,
    borderColor: '#dfdfdf',
    marginRight: 5,
    elevation: 10,
    shadowColor: 'grey',
  },
  firstRowCard: {
    padding: 10,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 0.3,
    borderStyle: 'solid',
    borderColor: 'grey',
    borderBottomColor: 'grey',
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
    backgroundColor: 'white',
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
    backgroundColor: 'orange',
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
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
});
