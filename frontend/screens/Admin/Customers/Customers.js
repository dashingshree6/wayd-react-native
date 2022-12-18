import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  Modal,
  Pressable,
  TextInput,
} from 'react-native';
import {API} from '../../backend';

export default function Customers() {
  const [allUsers, setAllUser] = useState([
    {
      due_amount: 0,
      role: 1,
      purchases: [],
      _id: '5ff9694dbc54c3002478b2de',
      username: 'Krisffdh',
      phone_number: 9581295811,
      email: 'krishnan@gmail.com',
      salt: '2f9c65c6-e858-47eb-906d-7933c8c0fc4b',
      encry_password:
        '22f458007d811131cd76cae60b05b5dbcfe80eb234676fa23982f9f9091fe1cb',
      d_product: [
        {
          _id: '5ff9694dbc54c3002478b2e0',
          name: 'Mango',
          minprice: '50',
          maxprice: '60',
        },
        {
          _id: '5ff9694dbc54c3002478b2df',
          name: 'vegetable',
          minprice: '56',
          maxprice: '66',
        },
      ],
      createdAt: '2021-11-27T08:29:01.737Z',
      updatedAt: '2022-12-16T08:48:12.840Z',
      __v: 0,
      photo: '',
      max_due: 50000,
    },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState({
    Amount: 0,
    time: '19:30 ',
    isCashCollected: true,
    userId: '',
  });

  let url = `${API}/users`;
  const TOKEN =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDA3ZjRmM2VmOTRjMTAwMjQ4ODI1N2QiLCJpYXQiOjE2NzA3MTgxMDF9.ITnJjF8atFSnGl7dwBejIVLRnPantE5F8YWsW1uehHY';

  React.useEffect(() => {
    axios
      .get(url, {headers: {Authorization: `Bearer ${TOKEN}`}})
      .then(res => {
        console.log(res.data);
        setAllUser(res.data);
      })
      .catch(error => {
        console.log(`Error:`, error);
      });
  }, [selectedUser.Amount]);

  let handlepost = async () => {
    console.log(`---selectedUser`, selectedUser);

    let options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(selectedUser), // body data type must match "Content-Type" header
    };

    let url = `${API}/cashcollection`;
    await fetch(url, options)
      .then(res => res.json())
      .then(data => {
        console.clear();
        console.log(`-----response data-------`, data);
      });

    setModalVisible(!modalVisible);

    axios
      .get(url, {headers: {Authorization: `Bearer ${TOKEN}`}})
      .then(res => {
        console.log(res.data);
        setAllUser(res.data);
      })
      .catch(error => {
        console.log(`Error:`, error);
      });
  };
  return (
    <>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {allUsers
          .filter((item, index) => item.role == 0)
          .map((item, key) => (
            <View style={styles.usersCard}>
              {item.due_amount > item.max_due ? (
                <View style={styles.redCard}>
                  <Text>Role: {item.role}</Text>
                  <Text>Name: {item.username}</Text>
                  <Text>User id: {item._id}</Text>
                  <Text>
                    Max Due: {item.max_due ? item.max_due : `Not Assigned`}
                  </Text>

                  <View>
                    <Text>Due: {item.due_amount}</Text>
                  </View>

                  <Button
                    title="Update"
                    color="black"
                    onPress={() => {
                      setSelectedUser(prev => ({
                        ...prev,
                        userId: `${item._id}`,
                        Amount: item.due_amount,
                      }));
                      setModalVisible(true);
                    }}
                    id={item._id}
                  />
                </View>
              ) : (
                <View>
                  <Text>Role: {item.role}</Text>
                  <Text>Name: {item.username}</Text>
                  <Text>User id: {item._id}</Text>
                  <Text>
                    Max Limit: {item.max_due ? item.max_due : `Not Assigned`}
                  </Text>

                  <View>
                    <Text>Due: {item.due_amount}</Text>
                  </View>

                  <Button
                    title="Update Due Amount"
                    color="black"
                    onPress={() => {
                      setSelectedUser(prev => ({
                        ...prev,
                        userId: `${item._id}`,
                        Amount: item.due_amount,
                      }));
                      setModalVisible(true);
                    }}
                    id={item._id}
                  />
                </View>
              )}
            </View>
          ))}
      </ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              User Id {`${selectedUser.userId}`}
            </Text>

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

            <Pressable
              style={styles.SaveBtn}
              onPress={() => {
                handlepost();
              }}>
              <Text style={styles.textStyle}>Save</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}>
              <Text style={styles.textStyle}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  usersCard: {
    width: '90%',
    margin: 10,
    backgroundColor: '#189AB4',
    borderRadius: 10,
    shadowColor: 'black',
    textAlign: 'center',
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
  },
  redCard: {
    backgroundColor: 'red',
  },
  SaveBtn: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: 'grey',
    width: 200,
    padding: 8,
    margin: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
