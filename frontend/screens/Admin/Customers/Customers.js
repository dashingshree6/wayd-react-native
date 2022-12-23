import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {
  ScrollView,
  Image,
  StyleSheet,
  Text,
  View,
  Alert,
  Modal,
  Pressable,
  TextInput,
  Button,
} from 'react-native';
import SyncStorage from 'sync-storage';
import {API, TOKEN} from '../../backend';
import foodImg from '../../../assets/images/food.jpg';
import CallImg from '../../../assets/images/call.png';
import messageImg from '../../../assets/images/message.png';
import videoCallImg from '../../../assets/images/video.png';
import pencilImg from '../../../assets/images/pencil.png';

import {PhoneOutlined} from '@rneui/themed';
import {SafeAreaProvider} from 'react-native-safe-area-context';
export default function Customers() {
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

  const [allCustomer, setAllCustomer] = useState();
  const [apiTrigger, setApiTrigger] = useState();
  const [modalVisible, setModalVisible] = useState(false);

  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedDetail, setSelectedDetail] = useState();
  const [showDetailEditModal, setShowDetailEditModal] = useState(false);
  React.useEffect(() => {
    let url = `${API}/users`;

    axios
      .get(url, {headers: {Authorization: `Bearer ${syncStorageState?.token}`}})
      .then(res => {
        setAllCustomer(res.data.filter(item => item.role === 0));
        console.log(`all Customer -----`, allCustomer);
      })
      .catch(error => {
        console.log(`Error:`, error);
      });
  }, [apiTrigger, syncStorageState.token]);
  let postForm = () => {
    let url = `${API}/update/user/${selectedDetail._id}`;
    axios
      .post(url, selectedDetail, {
        headers: {Authorization: `Bearer ${syncStorageState?.token}`},
      })
      .then(res => {
        setAllCustomer(res.data.filter(item => item.role === 0));
        setSelectedDetail(
          setAllCustomer.filter(item => item._id === selectedDetail._id),
        );
      })
      .then(err => console.log(err));
  };

  return (
    <>
      <SafeAreaProvider>
        <ScrollView style={{backgroundColor: 'white'}}>
          {allCustomer?.map((item, index) => (
            <Pressable
              onPress={() => {
                setShowDetailModal(true);
                setSelectedDetail(item);
              }}>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  marginTop: 5,
                  marginBottom: 5,
                  paddingLeft: 30,
                }}>
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
                  }}>
                  <View style={{padding: 10, marginLeft: 10}}>
                    <Text style={{fontWeight: 'bold', fontSize: 20}}>
                      {item.username}
                    </Text>
                    <View>
                      <Text>{item.phone_number}</Text>
                    </View>
                  </View>
                </View>
              </View>
            </Pressable>
          ))}
        </ScrollView>
        <Modal
          animationType="slide"
          transparent={false}
          visible={showDetailModal}>
          <View
            style={{
              flex: 0.4,
              justifyContent: 'flex-start',
            }}>
            <View
              style={{
                flex: 1,
                justifyContent: 'flex-start',
              }}>
              <View
                style={{
                  width: `100%`,
                  height: 50,
                  backgroundColor: 'white',
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  source={foodImg}
                  style={{
                    resizeMode: 'cover',
                    width: 75,
                    height: 75,
                    borderRadius: 50,
                  }}
                />
              </View>
              <View
                style={{
                  flex: 0.4,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  position: 'relative',
                  top: -40,
                }}>
                <Text
                  style={{
                    fontSize: 30,
                    fontWeight: 'bold',
                  }}>
                  {selectedDetail?.username}
                </Text>
              </View>

              <View
                style={{
                  flex: 0.4,
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  alignItems: 'center',
                  paddingRight: 10,
                  paddingLeft: 10,
                  position: 'relative',
                  top: -40,
                }}>
                <Pressable onPress={() => alert(`Call`)}>
                  <Image
                    source={CallImg}
                    style={{
                      resizeMode: 'cover',
                      width: 40,
                      height: 40,
                      borderRadius: 50,
                    }}
                  />
                </Pressable>
                <Pressable onPress={() => alert(`Mesage`)}>
                  <Image
                    source={messageImg}
                    style={{
                      resizeMode: 'cover',
                      width: 50,
                      height: 50,
                      borderRadius: 50,
                    }}
                  />
                </Pressable>
                <Pressable onPress={() => alert(`Video`)}>
                  <Image
                    source={videoCallImg}
                    style={{
                      resizeMode: 'cover',
                      width: 42,
                      height: 42,
                      borderRadius: 50,
                    }}
                  />
                </Pressable>
              </View>
            </View>
          </View>

          <View
            style={{flex: 0.5, marginLeft: 15, position: 'relative', top: -15}}>
            <View style={{flex: 1, marginTop: 10}}>
              <Text style={{fontSize: 15}}>Role</Text>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 'bold',
                  paddingTop: 4,
                  color: 'grey',
                }}>
                {selectedDetail?.role == 0 ? 'Customer' : 'Wrong Data'}
              </Text>
            </View>
            <View style={{flex: 1, marginTop: 10}}>
              <Text>Shop Name</Text>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 'bold',
                  paddingTop: 4,
                  color: 'grey',
                }}>
                {selectedDetail?.shop ? selectedDetail.shop : `Not Found`}
              </Text>
            </View>
            <View style={{flex: 1, marginTop: 10}}>
              <Text>Mobile</Text>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 'bold',
                  paddingTop: 4,
                  color: 'grey',
                }}>
                {selectedDetail?.phone_number}
              </Text>
            </View>
            <View style={{flex: 1, marginTop: 10}}>
              <Text style={{paddingTop: 4}}>Email</Text>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 'bold',
                  paddingTop: 4,
                  color: 'grey',
                }}>
                {selectedDetail?.email ? selectedDetail.email : 'Not Found'}
              </Text>
            </View>
            <View style={{flex: 1, marginTop: 10}}>
              <Text>Address</Text>
              <Text style={{fontSize: 18, fontWeight: 'bold', paddingTop: 4}}>
                {` ${selectedDetail?.address?.street}, ${selectedDetail?.address?.area}, India - ${selectedDetail?.address?.pincode} `}{' '}
              </Text>
            </View>
          </View>
          <Pressable
            style={{
              position: 'absolute',
              bottom: 110,
              right: 0,

              borderRadius: 50,
              width: 50,
              height: 50,
              marginRight: 5,
              top: 10,
              right: 5,
            }}
            onPress={() => {
              setShowDetailModal(false);
              setShowDetailEditModal(true);
            }}>
            <Image
              source={pencilImg}
              style={{
                width: 40,
                height: 40,
                resizeMode: 'center',
                position: 'relative',
              }}
            />
            <Text style={{paddingTop: 5, paddingLeft: 8}}>Edit </Text>
          </Pressable>
          <View style={{position: 'absolute', bottom: 0, width: '100%'}}>
            <Button title="Go back" onPress={() => setShowDetailModal(false)} />
          </View>
        </Modal>
        {/* //////////////////////////// */}
        <Modal
          animationType="slide"
          transparent={false}
          visible={showDetailEditModal}>
          <View
            style={{
              flex: 0.4,
              justifyContent: 'flex-start',
            }}>
            <View
              style={{
                flex: 1,
                justifyContent: 'flex-start',
              }}>
              <View
                style={{
                  width: `100%`,
                  height: 50,
                  backgroundColor: 'white',
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  source={foodImg}
                  style={{
                    resizeMode: 'cover',
                    width: 75,
                    height: 75,
                    borderRadius: 50,
                  }}
                />
              </View>
              <View
                style={{
                  flex: 0.4,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  position: 'relative',
                  top: -40,
                }}>
                <TextInput
                  style={{
                    fontSize: 30,
                    fontWeight: 'bold',
                  }}
                  placeholder={selectedDetail?.username}
                  onChangeText={val => {
                    setSelectedDetail(prev => ({...prev, username: val}));
                  }}
                  value={selectedDetail?.username}></TextInput>
              </View>
            </View>
          </View>

          <View
            style={{
              flex: 0.5,
              marginLeft: 15,
              position: 'relative',
              top: -15,
            }}>
            <ScrollView>
              <View style={{flex: 1, marginTop: 10}}>
                <Text style={{fontSize: 15}}>Role</Text>
                <TextInput
                  style={{
                    fontSize: 18,
                    paddingTop: 4,
                    color: 'grey',
                  }}
                  placeholder={
                    selectedDetail?.role == 0
                      ? 'Customer'
                      : 'Enter Customer Role'
                  }
                  onChangeText={val => {
                    setSelectedDetail(prev => ({...prev, role: val}));
                  }}
                  value={selectedDetail?.role}></TextInput>
              </View>
              <View style={{flex: 1, marginTop: 10}}>
                <Text>Shop Name</Text>
                <TextInput
                  style={{
                    fontSize: 18,
                    paddingTop: 4,
                    color: 'grey',
                  }}
                  placeholder={
                    selectedDetail?.shop
                      ? selectedDetail.shop
                      : `Enter Shop Name`
                  }
                  onChangeText={val => {
                    setSelectedDetail(prev => ({...prev, shop: val}));
                  }}
                  value={selectedDetail?.shop}></TextInput>
              </View>
              <View style={{flex: 1, marginTop: 10}}>
                <Text>Mobile</Text>
                <TextInput
                  style={{
                    fontSize: 18,
                    paddingTop: 4,
                    color: 'grey',
                  }}
                  placeholder={
                    selectedDetail?.phone_number
                      ? `${selectedDetail.phone_number}`
                      : `Enter Shop Name`
                  }
                  onChangeText={val => {
                    setSelectedDetail(prev => ({...prev, phone_number: val}));
                  }}
                  value={selectedDetail?.phone_number}></TextInput>
              </View>
              <View style={{flex: 1, marginTop: 10}}>
                <Text style={{paddingTop: 4}}>Email</Text>
                <TextInput
                  style={{
                    fontSize: 18,
                    paddingTop: 4,
                    color: 'grey',
                  }}
                  placeholder={
                    selectedDetail?.email
                      ? `${selectedDetail.email}`
                      : `Enter Shop Name`
                  }
                  onChangeText={val => {
                    setSelectedDetail(prev => ({...prev, email: val}));
                  }}
                  value={selectedDetail?.email}></TextInput>
              </View>
              <View style={{flex: 1, marginTop: 10}}>
                <Text>Address</Text>
                <TextInput
                  style={{
                    fontSize: 18,
                    paddingTop: 4,
                    color: 'grey',
                  }}
                  placeholder={
                    selectedDetail?.address?.area
                      ? `${selectedDetail?.address?.area}`
                      : `Enter City`
                  }
                  onChangeText={val => {
                    setSelectedDetail(prev => ({
                      ...prev,
                      address: {
                        ...prev.address,
                        area: val,
                      },
                    }));
                  }}
                  value={selectedDetail?.address?.area}></TextInput>
                <TextInput
                  style={{
                    fontSize: 18,
                    paddingTop: 4,
                    color: 'grey',
                  }}
                  placeholder={
                    selectedDetail?.address?.street
                      ? `${selectedDetail?.address?.street}`
                      : `Enter Street Address`
                  }
                  onChangeText={val => {
                    setSelectedDetail(prev => ({
                      ...prev,
                      address: {
                        ...prev.address,
                        street: val,
                      },
                    }));
                  }}
                  value={selectedDetail?.address?.street}></TextInput>
                <TextInput
                  style={{
                    fontSize: 18,
                    paddingTop: 4,
                    color: 'grey',
                  }}
                  placeholder={
                    selectedDetail?.address?.pincode
                      ? `${selectedDetail?.address?.pincode}`
                      : `Enter Pincode`
                  }
                  onChangeText={val => {
                    setSelectedDetail(prev => ({
                      ...prev,
                      address: {
                        ...prev.address,
                        pincode: val,
                      },
                    }));
                  }}
                  value={selectedDetail?.address?.pincode}></TextInput>
              </View>
            </ScrollView>
          </View>

          <View
            style={{
              position: 'absolute',
              bottom: 0,
              width: '100%',
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-evenly',
            }}>
            <View style={{width: '50%'}}>
              <Button
                title="Go back"
                onPress={() => {
                  setShowDetailModal(true);
                  setShowDetailEditModal(false);
                }}
              />
            </View>

            <View style={{width: '50%'}}>
              <Button
                title="Save Details"
                color="green"
                onPress={() => {
                  setShowDetailModal(true);
                  setShowDetailEditModal(false);
                  postForm();
                }}
              />
            </View>
          </View>
        </Modal>
      </SafeAreaProvider>
    </>
  );
}

const styles = StyleSheet.create({});
