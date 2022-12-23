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
import {API, TOKEN} from '../backend';
import foodImg from '../../assets/images/food.jpg';

export default function Delivery() {
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

  const [allDelivery, setAllDelivery] = useState();
  const [apiTrigger, setApiTrigger] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState({
    Amount: 0,
    time: '19:30 ',
    isCashCollected: true,
    userId: '',
  });

  React.useEffect(() => {
    let url = `${API}/users`;

    axios
      .get(url, {headers: {Authorization: `Bearer ${syncStorageState?.token}`}})
      .then(res => {
        setAllDelivery(res.data.filter(item => item.role === 2));
        console.log(`all Customer -----`, allCustomer);
      })
      .catch(error => {
        console.log(`Error:`, error);
      });
  }, [apiTrigger, syncStorageState.token]);

  return (
    <>
      <ScrollView style={{backgroundColor: 'white'}}>
        {allDelivery?.map((item, index) => (
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
              marginTop: 5,
              marginBottom: 5,
              paddingLeft: 10,
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
            <View style={{padding: 10, marginLeft: 10}}>
              <Text style={{fontWeight: 'bold', fontSize: 20}}>
                {item.username}
              </Text>
              <View>
                <Text>{item.phone_number}</Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
      {/* <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={{paddingTop: 10}}>User id: {selectedUser.userId}</Text>

            <TextInput
              style={styles.input}
              placeholder="Enter Cash Colllected"
              id="Amount"
              onChangeText={val => {
                setSelectedUser(prev => ({
                  ...prev,
                  Amount: val,
                }));
              }}
              value={selectedUser.Amount}
            />

            <View style={styles.postCancelView}>
              <View style={{width: 100, height: 50}}>
                <Button
                  title="Save"
                  onPress={() => {
                    handlepost();
                  }}
                />
              </View>
              <View style={{width: 100, height: 50}}>
                <Button
                  title="Close"
                  onPress={() => {
                    setModalVisible(!modalVisible);
                  }}
                  color="black"
                />
              </View>
            </View>
          </View>
        </View>
      </Modal> */}
    </>
  );
}

const styles = StyleSheet.create({});
