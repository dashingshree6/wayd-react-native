import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {
  ScrollView,
  Image,
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  Modal,
  Pressable,
  TextInput,
} from 'react-native';
import {API, TOKEN} from '../../backend';
import CashImg from './cashImg.jpg';
import modalImg from './modalImg.jpg';

export default function Customers() {
  const [allUsers, setAllUser] = useState();
  const [apiTrigger, setApiTrigger] = useState();

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState({
    Amount: 0,
    time: '19:30 ',
    isCashCollected: true,
    userId: '',
  });

  // const TOKEN =
  //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDA3ZjRmM2VmOTRjMTAwMjQ4ODI1N2QiLCJpYXQiOjE2NzA3MTgxMDF9.ITnJjF8atFSnGl7dwBejIVLRnPantE5F8YWsW1uehHY';

  React.useEffect(() => {
    let url = `${API}/users`;
    axios
      .get(url, {headers: {Authorization: `Bearer ${TOKEN}`}})
      .then(res => {
        console.log(res.data);
        setAllUser(res.data);
      })
      .catch(error => {
        console.log(`Error:`, error);
      });
  }, [apiTrigger]);

  let handlepost = () => {
    let url = `${API}/cashcollection`;
    axios
      .post(url, selectedUser, {headers: {Authorization: `Bearer ${TOKEN}`}})
      .then(res => {
        console.log(`---------------`, res.data);
        alert(`Cash Details Updated Successfully!`);
        setModalVisible(!modalVisible);
        setApiTrigger(Math.floor(Math.random() * 100000));
      })
      .catch(error => {
        console.log(`Error:`, error);
      });
  };
  return (
    <>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.imgView}>
          <Image style={styles.cashImg} source={CashImg} />
        </View>
        <View style={styles.allUsersView}>
          <Text style={styles.dashboardTitle}>Cash Collection Dashbaord</Text>
          {allUsers
            ?.filter((item, index) => item.role === 0)
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
                        setSelectedUser({
                          userId: `${item._id}`,
                          Amount: item.due_amount,
                          time: '19:30 ',
                          isCashCollected: true,
                        });
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
                        setSelectedUser({
                          userId: `${item._id}`,
                          Amount: item.due_amount,
                          time: '19:30 ',
                          isCashCollected: true,
                        });
                        setModalVisible(true);
                      }}
                      id={item._id}
                    />
                  </View>
                )}
              </View>
            ))}
        </View>
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
            <Image source={modalImg} style={{height: 100}} />

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
                  color="black"
                />
              </View>
              <View style={{width: 100, height: 50}}>
                <Button
                  title="Close"
                  onPress={() => {
                    setModalVisible(!modalVisible);
                  }}
                />
              </View>
            </View>
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
  postCancelView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: '95%',
    height: 100,
  },

  cashImg: {
    width: 400,
    height: 200,
  },
  redCard: {
    backgroundColor: 'red',
  },
  imgView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
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
    marginTop: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
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
    marginTop: 10,
    textAlign: 'center',
  },
  allUsersView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dashboardTitle: {
    fontSize: 20,
    padding: 5,
    fontWeight: 'bold',
    color: 'black',
  },
});
